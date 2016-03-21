(ns mex.utils.session-storage
  (:require [cljs.reader :as reader]))

(defn set-item!
  ([k v] (set-item! k v true))
  ([k v clear-on-fail?]
    (try
      (.setItem js/sessionStorage (name k) (pr-str v))
      (catch js/Object e
        (if (not clear-on-fail?)
          (.error js/console e)
          (do
            (.clear js/sessionStorage)
            (js/setTimeout #(set-item! k v false) 1)))))))

(defn get-item [k]
  (when-let [v (.getItem js/sessionStorage (name k))]
    (reader/read-string v)))
