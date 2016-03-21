(ns re-frame.subs
 (:require
   [reagent.ratom  :refer [make-reaction]]
   [re-frame.utils :refer [first-in-vector warn error]]))


(defn clear-handlers!
  "Unregister all subscription handlers"
  [key->fn]
  (reset! key->fn {}))


(defn register
  "register a handler function for an id"
  [app-db key->fn key-v handler-fn]
  (when (contains? @key->fn key-v)
    (warn (str "re-frame: overwriting topic: " (pr-str key-v)))) ;; allow it, but warn.
  (swap! key->fn assoc key-v handler-fn))


(defn subscribe
  "returns a reagent/reaction which observes a part of app-db"
  [app-db key->fn v]
  (let [key-v       (first-in-vector v)
        handler-fn  (get @key->fn key-v)]
    (if (nil? handler-fn)
      (error "re-frame: no subscription handler registered for: \"" key-v "\".  Returning a nil subscription.")
      (handler-fn app-db v))))

