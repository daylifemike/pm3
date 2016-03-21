(ns mex.components.button
  (:require [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [plumbing.core :refer-macros [?>]]))

(defn button [{:keys [type class on-click prevent-default?]
               :or {type :default ; alt | link | inline | full-width
                    class nil
                    prevent-default? true}
               :as args}
              body]
  (let [params (-> args
                   (assoc ,,, :class (utils/map->classes {:action true
                                                          type (utils/not-nil? type)
                                                          class class}))
                   (assoc ,,, :type "button") ;; prevents IE from automatically setting to "submit"
                   (?> on-click (assoc ,,, :on-click (if prevent-default?
                                                       (dom-utils/prevent-default on-click)
                                                       on-click))))]
    [:button params
      [:span body]]))
