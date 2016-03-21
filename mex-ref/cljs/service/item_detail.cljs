(ns mex.service.item-detail
  (:require-macros [mex.macros.core :refer [-<>]])
  (:require [mex.utils.core :as utils]))

(defn- add-common-item-properties [item timezone-offset datetime-formatter]
  (assoc item :date (utils/format-date (:date item) timezone-offset datetime-formatter)))

(defn- get-package-properties [item timezone-offset datetime-formatter]
  (let [text? #(= (:type %) :text)
        text-item (utils/find-first text? (:children item))
        package-counts (-<> (:children item)
                            (group-by :type <>)
                            (mapv (fn [[k v]] [k (count v)]) <>))]
    {:children (mapv #(add-common-item-properties % timezone-offset datetime-formatter)
                     (:children item))
     :sidebars (mapv #(add-common-item-properties % timezone-offset datetime-formatter)
                     (:sidebars item))
     :story (or (:story text-item) "")
     :truncated? (:truncated? text-item)
     :word-count (:word-count text-item)}))

(defn build-item [item settings]
  (let [{:keys [timezone-offset datetime-formatter]} settings]
    (if (not= (:type item) :package)
      (add-common-item-properties item timezone-offset datetime-formatter)
      (merge (add-common-item-properties item timezone-offset datetime-formatter)
             (get-package-properties item timezone-offset datetime-formatter)))))