(ns re-frame.core
  (:require
    [cljs.core.async     :as async]
    [re-frame.handlers   :as handlers]
    [re-frame.subs       :as subs]
    [re-frame.router     :as router]
    [re-frame.utils      :as utils :refer [warn error]]
    [re-frame.middleware :as middleware]))

(defonce apps (atom {}))

;; --  API  -------

(defn app [path db & common-middlewares]
  #_(when-not (empty? @db)
    (warn "Re-frame init passed in db should be empty and initialized via event"))
  (let [sub-map (atom {})
        handler-map (atom {})
        route-ch (async/chan)
        common-middlewares (into [] common-middlewares)]

    ;; start event processing
    (router/router-loop db handler-map route-ch)

    (let [app {:dispatch      (partial router/dispatch route-ch)
               :dispatch-sync (partial router/dispatch-sync db handler-map)
               :topic         (partial subs/register db sub-map)
               :subscribe     (partial subs/subscribe db sub-map)
               :clear-topics! (partial handlers/clear-handlers! sub-map)

               :handler (fn [id & args]
                          (let [args (into [] (concat common-middlewares args))]
                            (apply (partial handlers/register-base handler-map id) args)))

               :handler! (partial handlers/register-base handler-map)
               :clear-handlers! (partial handlers/clear-handlers! handler-map)

               ;; --  Logging -----
               ;; re-frame uses the logging functions: warn, log, error, group and groupEnd
               ;; By default, these functions map directly to the js/console implementations
               ;; But you can override with your own (set or subset):
               ;;   (set-loggers!  {:warn  my-warn   :log  my-looger ...})
               :set-loggers! utils/set-loggers!}]
      (when (utils/get-dwim apps path)
        (warn "Duplicate app mount at " path))
      (swap! apps assoc-in (if (seq? path) path [path]) app)
      app)))

;; Unsure about making this available...
(defn get-app [path] (utils/get-dwim @apps path))

(defn subscribe [path & args]
  (if-let [sub (:subscribe (utils/get-dwim @apps path))]
    (apply sub args)
    (throw (str "Unknown app path `" path "` args: " (pr-str args)))))

(defn dispatch [path v]
  (if-let [disp (:dispatch (utils/get-dwim @apps path))]
    (disp v)
    (throw (str "Unknown app path `" path "` args: " (pr-str v)))))

(defn dispatch-sync [path v]
  (if-let [disp-sync (:dispatch-sync (utils/get-dwim @apps path))]
    (disp-sync v)
    (throw (str "Unknown app path `" path "`args: " (pr-str v)))))
