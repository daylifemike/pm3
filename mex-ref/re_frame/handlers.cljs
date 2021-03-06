(ns re-frame.handlers
  (:require [re-frame.utils      :refer [first-in-vector warn error]]))


;; -- composing middleware  -----------------------------------------------------------------------

(defn comp-middleware
  "Given a vector of middleware, filter out any nils, and use \"comp\" to compose the elements.
  v can have nested vectors, and will be flattened before \"comp\" is applied.
  For convienience, if v is a function (assumed to be middleware already), just return it.
  Filtering out nils allows us to create Middleware conditionally like this:
     (comp-middleware [pure (when debug? debug)])  ;; that 'when' might leave a nil
  "
  [v]
  (cond
    (fn? v)       v  ;; assumed to be existing middleware
    (vector? v)   (let [v (remove nil? (flatten v))]
                    (cond
                      (empty? v)       identity     ;; no-op middleware
                      (= 1 (count v))  (first v)    ;; only one middleware, no composing needed
                      :else            (apply comp v)))
    :else         (warn "re-frame: comp-middleware expects a vector, got: " v)))


;; -- the register of event handlers --------------------------------------------------------------

(defn lookup-handler
  [id->fn event-id]
  (get @id->fn event-id))


(defn clear-handlers!
  "Unregister all event handlers"
  [id->fn]
  (reset! id->fn {}))

(defn register-base
  "register a handler for an event.
  This is low level and it is expected that \"re-frame.core/register-handler\" would
  generally be used."
  [id->fn event-id & args]
  {:pre [(> (count args) 0)]}
  (let  [handler-fn (last args)
         middleware (comp-middleware (into [] (butlast args)))]
    (when (contains? @id->fn event-id)
      (warn "re-frame: overwriting an event-handler for: " (pr-str event-id))) ;; allow it, but warn.
    (swap! id->fn assoc event-id (middleware handler-fn))))




;; -- lookup and call -----------------------------------------------------------------------------

(def ^:dynamic *handling* nil)    ;; remember what event we are currently handling


(defn handle
  "Given an event vector, look up the handler, then call it.
  By default, handlers are not assumed to be pure. They are called with
  two paramters:
    - the `app-db` atom
    - the event vector
  The handler is assumed to side-effect on `app-db` - the return value is ignored.
  To write a pure handler, use the \"pure\" middleware when registering the handler."
  [app-db id->fn event-v]
  (let [event-id    (first-in-vector event-v)
        handler-fn  (lookup-handler id->fn event-id)]
    (if (nil? handler-fn)
      (error "re-frame: no event handler registered for: \"" event-id "\". Ignoring.")
      (if  *handling*
        (error "re-frame: while handling \""  *handling*  "\"  dispatch-sync was called for \"" event-v "\". You can't call dispatch-sync in an event handler.")
        (binding [*handling*  event-v]
          (handler-fn app-db event-v))))))

