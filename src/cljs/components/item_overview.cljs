(ns mex.components.item-overview
  (:require-macros [mex.macros.core :refer [for-eager -<>]]
                   [reagent.ratom :refer [reaction]])
  (:require [mex.components.fragment :refer [fragment]]
            [mex.components.headline :refer [headline]]
            [mex.components.icon-bar :refer [icon-bar]]
            [mex.components.image :refer [image video-thumbnail]]
            [mex.components.item-detail :refer [item-detail-desktop]]
            [mex.components.meta-data :refer [meta-data]]
            [mex.components.slug :refer [slug]]
            [mex.components.video-placeholder :refer [video-placeholder]]
            [mex.re-frame :as rf]
            [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [plumbing.core :refer-macros [fnk ?>]]
            [reagent.core :as r]))

(defmulti overview* (fn [item _] (:type item)))

(defmethod overview* :alert [item props]
  [:div props
    [:div {:class "new-item-indicator"}]
    [meta-data item [:date]]
    [slug item]
    [headline item]
    [:div {:class "olr-top-10-rank"}]])

(defmethod overview* :reva-video [item props]
  [:div props
    [:div {:class "new-item-indicator"}]
    [video-thumbnail item]
    [meta-data item [:date]]
    [headline item :ellipsify]
    [icon-bar item]
    [:div {:class "olr-top-10-rank"}]])

(defmethod overview* :early-access-script [item props]
  [:div props
    [:div {:class "new-item-indicator"}]
    [video-placeholder item]
    [meta-data item [:date :edit-number-w-version]]
    [slug item]
    [headline item :ellipsify]
    [icon-bar item]
    [:div {:class "olr-top-10-rank"}]])

(defmethod overview* :fixed-positions-item [item props]
  [:div props
    (let [{:keys [description url-or-itemid image-url type]} (:fp-data item)
          action-params {:href url-or-itemid
                         :target "_blank"
                         :on-click (fn [e]
                                     (when (or (= type :search)
                                               (= type :path))
                                       (. e preventDefault))
                                     (rf/dispatch [:fixed-positions/click (:fp-data item)]))}]
      [:div {:class (utils/map->classes {:fixed-positions-wrapper true
                                         :has-image (utils/not-nil? image-url)
                                         :no-image (nil? image-url)})}
        [:div {:class "fixed-positions-background"}
          [:a action-params]]
        [:div {:class "fixed-positions-content"}
          [:h2 {:class "headline"}
            [:a action-params description]]
          (when (utils/not-nil? image-url)
            [:a (assoc action-params :title description
                                     :style {:backgroundImage (str "url(" image-url ")")})])]])])

(defmethod overview* :fixed-positions-static [item props]
  [:div props
    (let [{:keys [description url-or-itemid image-url type]} (:fp-data item)
          click-fn (fn [e]
                     (. e preventDefault)
                     (. e stopPropagation))]
      [:div {:class (utils/map->classes {:fixed-positions-wrapper true
                                         :has-image (utils/not-nil? image-url)
                                         :no-image (nil? image-url)})}
        [:div {:class "fixed-positions-background"
               :on-click click-fn}]
        [:div {:class "fixed-positions-content"}
          [:h2 {:class "headline"}
            [:span description]]
          (when (utils/not-nil? image-url)
            [:span {:title description
                    :style {:backgroundImage (str "url(" image-url ")")}
                    :on-click click-fn}])]])])

(defmethod overview* :graphic [item props]
  [:div props
    [:div {:class "new-item-indicator"}]
    [image item]
    [meta-data item [:date]]
    [slug item]
    [headline item :ellipsify]
    [:div {:class "olr-top-10-rank"}]])

(defmethod overview* :package [item props]
  (let [has-thumbnail? (not (empty? (:thumbnail-url item)))]
    [:div props
      [:div {:class "new-item-indicator"}]
      (when has-thumbnail? [image item])
      [meta-data item [:date]]
      [slug item]
      [headline item :ellipsify]
      (when-not has-thumbnail? [fragment item :ellipsify])
      [icon-bar item]
      [:div {:class "olr-top-10-rank"}]]))

(defmethod overview* :picture [item props]
  [:div props
    [:div {:class "new-item-indicator"}]
    [image item]
    [meta-data item [:date]]
    [slug item]
    [headline item :ellipsify]
    [icon-bar item]
    [:div {:class "olr-top-10-rank"}]])

(defmethod overview* :script [item props]
  [:div props
    [:div {:class "new-item-indicator"}]
    [meta-data item [:date]]
    [slug item]
    [headline item :ellipsify]
    [fragment item :ellipsify]
    [icon-bar item]
    [:div {:class "olr-top-10-rank"}]])

(defmethod overview* :text [item props]
  [:div props
    [:div {:class "new-item-indicator"}]
    [meta-data item [:date]]
    [slug item]
    [headline item :ellipsify]
    [fragment item :ellipsify]
    [icon-bar item]
    [:div {:class "olr-top-10-rank"}]])

(defmethod overview* :video [item props]
  [:div props
    [:div {:class "new-item-indicator"}]
    [video-thumbnail item]
    [meta-data item [:date :edit-number-w-version]]
    [slug item]
    [headline item :ellipsify]
    [icon-bar item]
    [:div {:class "olr-top-10-rank"}]])

(defn overview [item]
  (let [selected-item (rf/subscribe [:item/selected])
        is-selected? (reaction (= (:id @selected-item) (:id item)))
        has-been-scrolled? (r/atom false)
        selected-view (rf/subscribe [:app/selected-view])
        item-offsets (rf/subscribe [:items/node-offsets])
        row-heights (rf/subscribe [:items/row-heights])
        height (reaction
                 (if-not (and @is-selected?
                              (= @selected-view :grid))
                           "auto"
                           (-<> (:id item)
                                (get @item-offsets <> 0)
                                (get @row-heights <> "auto"))))]
    (r/create-class
      {:component-did-update (fn [this _]
                               ; scroll to top                               
                               (if @is-selected?
                                 (when-not @has-been-scrolled?
                                   (do
                                     (dom-utils/scroll-node-to-top! (r/dom-node this))
                                     (reset! has-been-scrolled? true)))
                                 (when @has-been-scrolled?
                                   (reset! has-been-scrolled? false))))
       :reagent-render (fnk [id type view-class
                             item-downloaded? new-item? show-inline-item-detail? show-label-on-headline? visited?
                             {urgent? false} {fixed-position? nil} {icon-bar-content nil} :as item]
                         (let [classes (utils/map->classes {:item true
                                                            :detail-open @is-selected?
                                                            :item-downloaded item-downloaded?
                                                            :fixed-positions-asset (and fixed-position?
                                                                                        (not= type :fixed-positions-item))
                                                            :new-item new-item?
                                                            type true
                                                            :urgent urgent?
                                                            :visited visited?})
                               set-selected (dom-utils/prevent-default
                                              #(do
                                                 (when (and (not @is-selected?)
                                                            fixed-position?)
                                                   (rf/dispatch [:fixed-positions/analytics-event item]))
                                                 (if @is-selected?
                                                   (rf/dispatch [:item/detail-close])
                                                   (rf/dispatch [:item/detail-open id nil]))))
                               props (-> {:class (utils/map->classes {:item-overview true
                                                                      :has-icon-bar (utils/not-empty? icon-bar-content)
                                                                      view-class true})
                                          :style {:height @height}}
                                         (?> (and (not= type :fixed-positions-item)
                                                  (not= type :fixed-positions-static))
                                               (assoc ,,, :on-click set-selected)))]
                           [:li {:class classes
                                 :data-item-id id}
                             [overview* item props]
                             (when (and show-inline-item-detail?
                                        @is-selected?)
                               [item-detail-desktop])]))})))

(defn list-wrapper [props]
  (let []
    (r/create-class
      {:component-did-mount (fn [this]
                              (rf/dispatch [:search/clear-previous-results])
                              (rf/dispatch [:items/set-container-node (r/dom-node this)]))
       :component-did-update #(rf/dispatch [:search/clear-previous-results])
       ; This is purely a perf optimization, a not= check takes 50ms+ when going over all items
       :should-component-update (fn [_ [_ old] [_ new]] (not (identical? old new)))
       :reagent-render (fn [props]
                         [:ul {:id (:id props)
                               :class (:classes props)}
                           (for-eager [item (:items props)]
                             ^{:key (if (:fixed-position? item) (str "fp-" (:id item)) (:id item))}
                               [overview item])])})))

(defn list-all []
  (let [items (rf/subscribe [:items/all])
        selected-view (rf/subscribe [:app/selected-view])
        selected-olr-view (rf/subscribe [:app/selected-olr-view])
        last-sync (rf/subscribe [:app/last-sync])
        selected-nav-item (rf/subscribe [:nav/selected])
        search-results-count (rf/subscribe [:search/current-results-count])]
    (fn []
      (let [view-id (str "items-" (name @selected-view))
            olr-view-class (when (and (not= (:search @last-sync) :loading)
                                      (:olr? @selected-nav-item))
                             (str "olr-items-" (name @selected-olr-view)))]
        (when (> @search-results-count 0)
          [list-wrapper {:items @items
                         :id view-id
                         :classes (utils/map->classes {:items true
                                                       view-id true
                                                       olr-view-class olr-view-class})}])))))
