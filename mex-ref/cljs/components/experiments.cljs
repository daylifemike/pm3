(ns mex.components.experiments
  (:require-macros [mex.macros.core :refer [for-eager -<>]]
                   [reagent.ratom :refer [reaction]])
  (:require [clojure.string :as str]
            [mex.components.button :refer [button]]
            [mex.re-frame :as rf]
            [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [reagent.core :as r]))

(defn- prettyify [text]
  (-<> (name text)
       (str/replace <> #"\?" "")
       (str/replace <> #"-" " ")
       (str " " <>)))

(defn- experiments []
  (let [experiments (rf/subscribe [:experiments/user-settings])]
    (fn []
      [:div
        (for-eager [[k v] @experiments]
          ^{:key k}
            [:p
              [:label
                [:input {:type "checkbox"
                         :default-checked v
                         :on-click #(rf/dispatch [:experiments/update-features (assoc {} k (not v))])}]
                (prettyify k)]])])))

(defn- error-messages [errors]
  [:div {:class "errors"}
    (for [error errors]
      ^{:key (utils/make-unique-id)} [:p {:class "error"} error])])

(defn- password-input []
  (let [state (rf/subscribe [:experiments])]
    (r/create-class
      {:component-did-mount #(let [node (r/dom-node %)] (.focus node))
       :reagent-render (fn []
                         (let [errors (:errors @state)
                               has-errors? (not (empty? errors))]
                           [:input {:type "text"
                                    :class (utils/map->classes {:error has-errors?})
                                    :value (:password-attempt @state)
                                    :on-change #(rf/dispatch-sync [:experiments/update-password-attempt (-> % .-target .-value)])
                                    :on-key-down #(case (dom-utils/key-name %)
                                                    "enter" (rf/dispatch [:experiments/password-submit])
                                                    "esc" (rf/dispatch [:experiments/password-cancel])
                                                    nil)}]))})))

(defn- password-buttons []
  [:div {:class "buttons"}
    ^{:key (utils/make-unique-id)}
      [button {:on-click #(rf/dispatch [:experiments/password-submit])}
        "Submit"]
    ^{:key (utils/make-unique-id)}
      [button {:type :link
               :on-click #(rf/dispatch [:experiments/password-cancel])}
        "Cancel"]])

(defn- password-errors []
  (let [state (rf/subscribe [:experiments])]
    (fn []
      (let [errors (:errors @state)
            has-errors? (not (empty? errors))]
        (when has-errors?
          [error-messages errors])))))

(defn- modal-unlock []
  (let [experiments (rf/subscribe [:experiments/user-settings])
        active-experiments (reaction (filter (fn [[_ v]] (true? v)) @experiments))]
    (fn []
      [:div
        [password-input]
        [password-errors]
        [password-buttons]
        (when (utils/not-empty? @active-experiments)
          [:div {:class "active-experiments"}
            [:p "Active experiments can be turned off without authentication."]
            (for-eager [[k _] @active-experiments]
              ^{:key k}
                [button {:type :link
                         :on-click #(rf/dispatch [:experiments/update-features (assoc {} k false)])}
                  (prettyify k)])])])))

(defn open-modal
  ([view] (open-modal view nil))
  ([view data]
    (let [params (case view
                   :password {:title "Unlock Experiments"
                              :classes "experiments"
                              :content [modal-unlock]
                              :buttons []}
                   :experiments {:title "Experimental Features"
                                 :content [experiments]}
                   nil)]
      (when params
        (rf/dispatch [:modal/open params])))))