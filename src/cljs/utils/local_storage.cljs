(ns mex.utils.local-storage
  (:require [cljs.reader :as reader]))

(defn set-item! [k v]
  (.setItem js/localStorage (name k) (pr-str v)))

(defn get-item [k]
  (when-let [v (.getItem js/localStorage (name k))]
    (reader/read-string v)))

(defonce storage-listeners (atom {}))

(defn watch [k f]
  (let [cb (fn [e] (when (= (.-key e) (name k)) (f e)))
        listener (js/window.addEventListener "storage" cb false)]
    (swap! storage-listeners assoc k listener)))

(defn unwatch [k]
  (when-let [listener (get @storage-listeners k)]
    (js/window.removeEventListener "storage" listener false)
    (swap! storage-listeners dissoc k)))