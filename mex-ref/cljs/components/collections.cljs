(ns mex.components.collections
  (:require-macros [cljs.core.async.macros :refer [go]]
                   [reagent.ratom :refer [reaction]])
  (:require [cljs.core.async :as async]
            [clojure.string :as string]
            [mex.components.button :refer [button]]
            [mex.components.download-counter :refer [download-counter]]
            [mex.components.dropdown :refer [dropdown]]
            [mex.components.icon-bar :refer [icon-bar]]
            [mex.re-frame :as rf]
            [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [reagent.core :as r]))

(defn error-messages [errors]
  [:div {:class "errors"}
    (for [error errors]
      ^{:key (utils/make-unique-id)} [:p {:class "error"} error])])

(defn- manager-item-did-update [this]
  (let [props (r/props this)]
    (when (:updated? props)
      (dom-utils/scroll-node-to-top! (r/dom-node this))
      (go []
          (<! (async/timeout 4000))
          (rf/dispatch [:collections/remove-updated (:id props)])))))

(defn title-input [{:keys [title on-save on-cancel]}]
  (let [value (r/atom title)
        cancel #(do
                  (reset! value title)
                  (when on-cancel
                    (on-cancel))
                  nil)
        save #(let [v (-> @value str string/trim)]
                (when (and (utils/not-empty? v)
                           (not= v title))
                  (on-save v)
                  nil)
               (cancel))]
    (r/create-class
      {:display-name "collections-manager-title-input"
       :component-did-mount #(let [node (r/dom-node %)]
                               (.focus node)
                               (.select node))
       :reagent-render (fn [props]
                         [:input {:type "text"
                                  :value @value
                                  :max-length 100
                                  :on-blur save
                                  :on-change #(reset! value (-> % .-target .-value))
                                  :on-key-down #(case (.-which %)
                                                  13 (save)
                                                  27 (cancel)
                                                  nil)}])})))

(defn title [collection]
  (let [editing? (r/atom false)]
    (fn [collection]
      [:div {:class (utils/map->classes {:collection-title true
                                         :in-edit-mode @editing?
                                         :not-in-edit-mode (not @editing?)
                                         :renaming (:renaming? collection)
                                         :deleted (:deleted? collection)})}
        (if (not @editing?)
          [:h3 {:title (str "Open " (:title collection))
                :on-click #(rf/dispatch [:collections/set-nav (:id collection)])}
            (:title collection)]
          [title-input {:title (:title collection)
                        :on-save #(rf/dispatch [:collections/rename (:id collection) %])
                        :on-cancel #(reset! editing? false)}])
        [:span {:class "rename-button"
                :title "Edit this collection's title"
                :on-click #(when-not (:renaming? collection)
                             (reset! editing? true)
                             nil)}]])))

(defn item-actions [collection]
  [:div {:class "collection-actions"}
    [button {:type :inline
             :class (utils/map->classes {:download-icon true
                                         :disabled (empty? (:guids collection))
                                         :downloading (:downloading? collection)})
             :on-click #(rf/dispatch [:collections/download (:id collection)])}
      "Download Collection"]
    [button {:type :inline
             :class (utils/map->classes {:delete-icon true
                                         :deleting (:deleting? collection)})
             :on-click #(rf/dispatch [:collections/delete (:id collection)])}
      "Delete Collection"]])

(defn manager-item [collection]
  (r/create-class
    {:display-name "collections-manager-item"
     :component-did-mount (fn [this]
                             (manager-item-did-update this))
     :component-did-update (fn [this]
                             (manager-item-did-update this))
     :reagent-render (fn [collection]
                       [:div {:class (utils/map->classes {:collections-manager-item true
                                                          :disabled (or (:deleting? collection)
                                                                        (:renaming? collection))
                                                          :updated (:updated? collection)})}
                        [title collection]
                        [:div {:class "collection-actions-container"}
                          [icon-bar collection "(empty)"]
                          [item-actions collection]]])}))

(defn manager []
  (let [collections @(rf/subscribe [:collections/list])]
    [:div {:class "content"}
      [:div {:class "content-header"}
        [:h2 "Collections"]
        [:div [button {:type :default
                       :on-click #(rf/dispatch [:collections/create-new])}
                "Add New"]]
        [download-counter]]
      [:div {:class "collections-manager"}
        (for [collection collections]
           ^{:key (:id collection)} [manager-item collection])]]))

(defn content-icon-bar []
  (let [selected-collection (rf/subscribe [:collections/selected])]
    (fn []
      (when @selected-collection
        [icon-bar @selected-collection "(empty)"]))))

(defn empty-collection []
  [:div {:class "content"}
    [:div {:class "empty-collection"}
      [:p "This collection is empty."]
      [:p "The " [:b "Add to Collection"] " link is available in every item displayed across all content in Media Express, and allows you to move the particular item to a dedicated Collection. By default each item will be moved to the last Collection you have used. To change the destination Collection, simply choose another Collection from the " [:b "Add to Collection"] " dropdown menu."]
      ; [:p "Note that all items are available for a maximum of 30 days. When you get closer to the expiry date a warning display for each item will tell how many more days it will be available in your Collection."]
      [:p "Once you gathered all relevant content in a Collection, use the download option to download individual items or the complete Collection to your local machine."]]])

(defn add-item-ok-toast [title]
  [:div "Item added to collection: " [:b title]])

(defn delete-ok-toast [title]
  [:div "Collection " [:b title] " has been deleted."])

(defn delete-err-toast [error]
  [:div "Collection deletion failed: " [:b error]])

(defn add-button []
  (let [collections @(rf/subscribe [:collections/list])
        recent-collection @(rf/subscribe [:collections/most-recent])
        selected-collection @(rf/subscribe [:collections/selected])
        selected-item @(rf/subscribe [:item/selected])
        create-view (fn [classes]
                      [button {:type nil
                               :class classes
                               :on-click #(rf/dispatch [:collections/create-new {:guid (:guid selected-item)
                                                                                 :type (:type selected-item)}])}
                       "Create New Collection"])
        add-view (fn [selected-collection?]
                   (fn [collection]
                     [button {:type nil
                              :title (:title collection)
                              :class (utils/map->classes {:add-to-collection true
                                                          :in-collection (some #(= (:guid selected-item) %)
                                                                               (:guids collection))})
                              :on-click (fn [e]
                                          (when selected-collection?
                                            (-> e .stopPropagation))
                                          (rf/dispatch [:collections/add-item (:id collection)
                                                                              (:guid selected-item)
                                                                              (:type selected-item)]))}
                      (if selected-collection?
                        (str "Add to Collection (" (:title collection) ")")
                        (:title collection))]))]
    (when-not selected-collection
      [:div {:class (utils/map->classes {:collections-add-button-wrapper true
                                         :loading (:adding-to-collection? selected-item)})}
        (if (empty? collections)
          (create-view "add-to-collection selected")
          [dropdown {:options collections
                     :fixed-options [(create-view "create-collection")]
                     :selected recent-collection
                     :class "split collections"
                     :open-on-hover? false
                     :item-view (add-view false)
                     :selected-view (add-view true)}])])))

(defn remove-button []
  (let [collection @(rf/subscribe [:collections/selected])
        selected-item @(rf/subscribe [:item/selected])]
    (when collection
      [:div {:class (utils/map->classes {:collections-remove-button-wrapper true})}
        [button {:type :item-action
                 :class (utils/map->classes {:remove-from-collection true
                                             :loading (:deleting? collection)})
                 :on-click #(rf/dispatch [:collections/remove-item (:id collection) (:guid selected-item)])}
          "Remove from Collection"]])))

(defn modal-content-add-input []
  (let [state (rf/subscribe [:collections/new])
        on-save #(rf/dispatch [:collections/save-new])
        on-cancel #(rf/dispatch [:collections/clear-new])]
    (r/create-class
      {:component-did-mount #(let [node (r/dom-node %)]
                               (.focus node))
       :component-did-update #(let [node (r/dom-node %)]
                                (.focus node))
       :reagent-render (fn []
                         (let [title (:title @state)
                               errors (:errors @state)
                               has-errors? (not (empty? errors))]
                           [:input {:type "text"
                                    :class (utils/map->classes {:error has-errors?
                                                                :loading (:saving? @state)})
                                    :disabled (:saving? @state)
                                    :value title
                                    :on-change #(rf/dispatch-sync [:collections/update-new (-> % .-target .-value)])
                                    :on-key-down #(case (.-which %)
                                                    13 (on-save)
                                                    27 (on-cancel)
                                                    nil)}]))})))

(defn modal-content-add-errors []
  (let [state (rf/subscribe [:collections/new])]
    (fn []
      (let [errors (:errors @state)
            has-errors? (not (empty? errors))]
        (when has-errors?
          [error-messages errors])))))

(defn modal-content-add-buttons []
  (let [state (rf/subscribe [:collections/new])]
    (fn []
      (let [saving? (:saving? @state)]
        [:div {:class "buttons"}
          ^{:key (utils/make-unique-id)} [button {:on-click #(rf/dispatch [:collections/save-new])
                                                  :class (utils/map->classes {:disabled saving?})}
                                           "Create"]
          ^{:key (utils/make-unique-id)} [button {:on-click #(rf/dispatch [:collections/clear-new])
                                                  :type :link
                                                  :class (utils/map->classes {:disabled saving?})}
                                           "Cancel"]]))))

(defn open-modal
  ([view] (open-modal view nil))
  ([view data]
    (let [params (case view
                   :new {:title "Add New Collection"
                         :classes "collections"
                         :content [:div [modal-content-add-input]
                                        [modal-content-add-errors]
                                        [modal-content-add-buttons]]
                         :buttons []}
                   :errors {:title (:title data)
                            :content [error-messages (:errors data)]
                            :overlay-close? true}
                   nil)]
      (when params
        (rf/dispatch [:modal/open params])))))
