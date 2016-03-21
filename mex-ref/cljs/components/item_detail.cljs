(ns mex.components.item-detail
  (:require-macros [mex.macros.core :refer [for-eager -<>]])
  (:require [mex.components.reva-keywords :refer [reva-keywords]]
            [mex.components.ask-reuters :refer [ask-reuters]]
            [mex.components.button :refer [button]]
            [mex.components.delete-item :refer [delete-item]]
            [mex.components.embed-video :refer [embed-video]]
            [mex.components.headline :refer [headline]]
            [mex.components.image :refer [image]]
            [mex.components.item-buttons :as item-buttons]
            [mex.components.lynx :refer [lynx-drag-handle]]
            [mex.components.meta-data :refer [item-detail-meta-data]]
            [mex.components.olr-sidebars :refer [olr-sidebars]]
            [mex.components.package-views :refer [package-items]]
            [mex.components.qr-code :refer [qr-code]]
            [mex.components.read-more :refer [read-more]]
            [mex.components.renditions :refer [renditions]]
            [mex.components.share-item :refer [share-item]]
            [mex.components.slideshow :refer [slideshow]]
            [mex.components.slug :refer [slug]]
            [mex.components.story :refer [story]]
            [mex.components.video :refer [video]]
            [mex.components.video-placeholder :refer [video-placeholder]]
            [mex.controller.item :as item-ctrl]
            [mex.re-frame :as rf]
            [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [plumbing.core :refer-macros [?>]]
            [reagent.core :as r]))

(defn- set-transform [node x]
  (dom-utils/set-transform node x "0px"))

(defn- unset-selected [node selected]
  (rf/dispatch [:item/detail-close])
  (when (:set-on-close selected)
    (set-transform node "0px")))

(defn- touch-end [e $node start-x node-width selected]
  (let [node (. $node get 0)
        event (. e -originalEvent)
        touch (aget event "changedTouches" 0)
        pos-x (. touch -pageX)
        dist-x (utils/abs (- start-x pos-x))
        swipe-closed-threshold (utils/floor (* node-width 0.33))]
    (if (>= dist-x swipe-closed-threshold)
      (unset-selected node selected)
      (set-transform node "0px")))
  (-> $node
      (. ,,, off "touchmove.drag-to-close")
      (. ,,, off "touchend.drag-to-close")))

(defn- touch-move [e $node start-x start-y node-width selected]
  (let [node (. $node get 0)
        pos-x (-> (. e -originalEvent)
                  (aget ,,, "touches" 0)
                  (. ,,, -pageX))
        dist-x (utils/abs (- start-x pos-x))]
    (do
      (. e preventDefault)
      (. e stopPropagation)
      (cond
        (<= pos-x 0) (set-transform node "0px")
        (>= pos-x node-width) (unset-selected node selected)
        :else (set-transform node (str pos-x "px"))))))

(defn- touch-start [e selected]
  (let [node (. e -delegateTarget)
        $node (js/jQuery node)
        event (. e -originalEvent)
        node-width (utils/to-int (. $node width))
        drag-start-target (utils/floor (* node-width 0.2))]
    (when (= (.. event -touches -length) 1)
      (let [touch (aget event "touches" 0)
            start-x (. touch -pageX)
            start-y (. touch -pageY)]
        (when (<= start-x drag-start-target)
          (-> $node
              (. ,,, on "touchmove.drag-to-close" #(touch-move % $node start-x start-y node-width selected))
              (. ,,, on "touchend.drag-to-close" #(touch-end % $node start-x node-width selected))))))))

(defn- bind-swipe-to-close [component]
  (-> component r/dom-node js/jQuery
      (. ,,, off "touchstart.drag-to-close")
      (. ,,, on "touchstart.drag-to-close" #(touch-start % (r/props component)))))

(defn- unbind-swipe-to-close [component]
  (-> component r/dom-node js/jQuery
      (. ,,, off "touchstart.drag-to-close")))

(defn- set-loading-height [component]
  ; when not a pop-out
  (when (nil? (js/document.querySelector "#item"))
    (let [node (r/dom-node component)
          viewport (-> js/window .-document .-documentElement .-clientHeight)
          overview (-> node .-previousSibling .-offsetHeight)
          padding (-<> (. js/document querySelector "#body")
                       (. js/window getComputedStyle <>)
                       (aget <> "padding-top")
                       (utils/to-int <>))
          height (- viewport overview padding)]
      (set! (-> node .-style .-height) (str height "px")))))

(defn- remove-loading-height [component]
  (let [node (r/dom-node component)
        status (-> component r/props :status)]
    (when (not= status :loading)
      (set! (-> node .-style .-height) "auto"))))

(defn- item-detail-error []
  (let [features (rf/subscribe [:preferences/features])
        view-opts (rf/subscribe [:app/view-options])]
    (fn []
      (let [support-url (:contact-support-url @view-opts)]
        [:div {:class "error"}
          [item-buttons/close-detail]
          [:p "We're sorry, this item cannot be displayed at this time. Please try to load the item again."]
          (when-not (:open-mex? @features)
            [:p
              "If you are still unable to see it, "
              [button {:type :inline
                       :on-click #(rf/dispatch-sync [:app/help-open support-url "Item detail error"])}
                "please contact support"]])]))))

(defmulti detail* (fn [item _] (:type item)))

(defmethod detail* :alert [item is-mobile?]
  (if is-mobile?
    [:div {:class "single"}
      [slug item (:clickable-slug? item)]
      [headline item]
      [item-detail-meta-data item [:date :copyright]]
      [item-detail-meta-data item [:logo :source-news-feeds]]
      [share-item item]
      [item-buttons/close-detail]]
    [:div {}
      [:div {:class "left"}
        [slug item (:clickable-slug? item)]
        [headline item]
        [read-more item]]
      [:div {:class "right"}
        [item-buttons/close-detail]
        [item-buttons/open-pop-out item]
        [renditions item]
        [item-buttons/sign-in-register item]
        [item-buttons/add-to-collection item]
        [item-buttons/remove-from-collection item]
        [share-item item]
        [item-buttons/print]
        [delete-item item]
        [item-detail-meta-data item [:logo :date :copyright :source-news-feeds :id]]
        [qr-code item]]]))

(defmethod detail* :reva-video [item is-mobile?]
  (if is-mobile?
    [:div {:class "single"}
      [video item]
      [headline item]
      [story item :intro-text]
      [story item :story :force-markup]
      [reva-keywords item]
      [item-detail-meta-data item [:logo :date :duration :clip-id :copyright]]
      [share-item item]
      [item-buttons/close-detail]]
    [:div {}
      [:div {:class "left"}
        [video item]
        [headline item]
        [story item :intro-text]
        [story item :story :force-markup]
        [reva-keywords item]]
      [:div {:class "right"}
        [item-buttons/close-detail]
        [item-buttons/open-pop-out item]
        [renditions item]
        [item-buttons/sign-in-register item]
        [share-item item]
        [item-buttons/print]
        [delete-item item]
        [item-detail-meta-data item [:logo :date :duration :clip-id :copyright]]
        [qr-code item]]]))

(defmethod detail* :early-access-script [item is-mobile?]
  (if is-mobile?
    [:div {:class "single"}
      [video-placeholder]
      [slug item (:clickable-slug? item)]
      [headline item]
      [item-detail-meta-data item [:date :duration :edit-number :copyright :restrictions]]
      [story item :intro-text]
      [story item :story :force-markup]
      [item-detail-meta-data item [:logo :source-format :audio :locations :source :revision :source-news-feeds]]
      [share-item item]
      [item-buttons/close-detail]]
    [:div {}
      [:div {:class "left"}
        [video-placeholder]
        [slug item (:clickable-slug? item)]
        [headline item]
        [story item :intro-text]
        [story item :story :force-markup]
        [read-more item]]
      [:div {:class "right"}
        [item-buttons/close-detail]
        [item-buttons/open-pop-out item]
        [renditions item]
        [item-buttons/sign-in-register item]
        [item-buttons/add-to-collection item]
        [item-buttons/remove-from-collection item]
        [share-item item]
        [ask-reuters item]
        [item-buttons/print]
        [delete-item item]
        [item-detail-meta-data item [:logo :date :duration :edit-number :copyright :restrictions :source-format :audio
                                     :locations :source :revision :source-news-feeds :id]]
        [qr-code item]]]))

(defmethod detail* :graphic [item is-mobile?]
  (if is-mobile?
    [:div {:class "single"}
      [image item (:show-large-preview? item)]
      [slug item (:clickable-slug? item)]
      [headline item]
      [story item :caption :force-markup]
      [item-detail-meta-data item [:logo :date :file-size :source-news-feeds]]
      [share-item item]
      [item-buttons/close-detail]]
    [:div {}
      [:div {:class "left"}
        [image item (:show-large-preview? item)]
        [slug item (:clickable-slug? item)]
        [headline item]
        [story item :caption :force-markup]
        [read-more item]]
      [:div {:class "right"}
        [item-buttons/close-detail]
        [item-buttons/open-pop-out item]
        [renditions item]
        [item-buttons/sign-in-register item]
        [item-buttons/add-to-collection item]
        [item-buttons/remove-from-collection item]
        [share-item item]
        [item-buttons/print]
        [delete-item item]
        [item-detail-meta-data item [:logo :date :file-size :source-news-feeds :id]]
        [qr-code item]]]))

(defmethod detail* :package [item is-mobile?]
  (if is-mobile?
    [:div {:class "single"}
      [headline item]
      [slug item (:clickable-slug? item)]
      [slideshow item]
      [story item :story :force-markup]
      [olr-sidebars item]
      [item-detail-meta-data item [:logo :date :pictures-count :videos-count :sidebars-count :word-count
                                   :source-news-feeds]]
      [share-item item]
      [item-buttons/close-detail]]
    [:div {}
      [:div {:class "left"}
        [headline item]
        [slug item (:clickable-slug? item)]
        [package-items item]
        [story item :story :force-markup]
        [read-more item]]
      [:div {:class "right"}
        [item-buttons/close-detail]
        [item-buttons/open-pop-out item]
        [renditions item]
        [item-buttons/sign-in-register item]
        [item-buttons/add-to-collection item]
        [item-buttons/remove-from-collection item]
        [share-item item]
        [item-buttons/print]
        [delete-item item]
        [item-detail-meta-data item [:logo :date :pictures-count :videos-count :sidebars-count :word-count
                                     :source-news-feeds :id]]
        [olr-sidebars item]
        [qr-code item]]]))

(defmethod detail* :picture [item is-mobile?]
  (if is-mobile?
    [:div {:class "single"}
      [image item (:show-large-preview? item)]
      [slug item (:clickable-slug? item)]
      [story item :caption :force-markup]
      [item-detail-meta-data item [:logo :date :dimensions :file-size :edit-status :category :supplemental-category
                                   :fixture-id :byline :city :country-name :country-code :special-instructions :otr
                                   :credit :source :caption-writer :source-news-feeds]]
      [share-item item]
      [item-buttons/close-detail]]
    [:div {}
      [:div {:class "left"}
        [image item (:show-large-preview? item)]
        [slug item (:clickable-slug? item)]
        [headline item]
        [story item :caption :force-markup]
        [read-more item]]
      [:div {:class "right"}
        [item-buttons/close-detail]
        [item-buttons/open-pop-out item]
        [renditions item]
        [item-buttons/sign-in-register item]
        [item-buttons/add-to-collection item]
        [item-buttons/remove-from-collection item]
        [share-item item]
        [lynx-drag-handle item]
        [item-buttons/print]
        [delete-item item]
        [item-detail-meta-data item [:logo :date :dimensions :file-size :edit-status :category :supplemental-category
                                     :fixture-id :byline :city :country-name :country-code :special-instructions :otr
                                     :credit :source :caption-writer :source-news-feeds :id]]
        [qr-code item]]]))

(defmethod detail* :script [item is-mobile?]
  (if is-mobile?
    [:div {:class "single"}
      [slug item (:clickable-slug? item)]
      [headline item]
      [item-detail-meta-data item [:date :duration :edit-number :copyright :restrictions]]
      [story item :intro-text]
      [story item :story :force-markup]
      [item-detail-meta-data item [:logo :source-format :audio :locations :source :revision :topic :source-news-feeds]]
      [share-item item]
      [item-buttons/close-detail]]
    [:div {}
      [:div {:class "left"}
          [slug item (:clickable-slug? item)]
          [headline item]
          [story item :intro-text]
          [story item :story :force-markup]
          [read-more item]]
      [:div {:class "right"}
        [item-buttons/close-detail]
        [item-buttons/open-pop-out item]
        [renditions item]
        [item-buttons/add-to-collection item]
        [item-buttons/remove-from-collection item]
        [share-item item]
        [ask-reuters item]
        [item-buttons/print]
        [delete-item item]
        [item-detail-meta-data item [:logo :date :duration :edit-number :copyright :restrictions :source-format :audio
                                     :locations :source :revision :topic :source-news-feeds :id]]
        [qr-code item]]]))

(defmethod detail* :text [item is-mobile?]
  (if is-mobile?
    [:div {:class "single"}
      [slug item (:clickable-slug? item)]
      [headline item]
      [item-detail-meta-data item [:date :word-count :copyright]]
      [story item :story :force-markup]
      [item-detail-meta-data item [:logo :source-news-feeds]]
      [share-item item]
      [item-buttons/close-detail]]
    [:div {}
      [:div {:class "left"}
        [slug item (:clickable-slug? item)]
        [headline item]
        [story item :story :force-markup]
        [read-more item]]
      [:div {:class "right"}
        [item-buttons/close-detail]
        [item-buttons/open-pop-out item]
        [renditions item]
        [item-buttons/sign-in-register item]
        [item-buttons/add-to-collection item]
        [item-buttons/remove-from-collection item]
        [share-item item]
        [lynx-drag-handle item]
        [item-buttons/print]
        [delete-item item]
        [item-detail-meta-data item [:logo :date :word-count :copyright :source-news-feeds :id]]
        [qr-code item]]]))

(defmethod detail* :video [item is-mobile?]
  (if is-mobile?
    [:div {:class "single"}
      [video item]
      [slug item (:clickable-slug? item)]
      [headline item]
      [item-detail-meta-data item [:date :duration :edit-number :copyright :restrictions]]
      [story item :intro-text]
      [story item :story :force-markup]
      [item-detail-meta-data item [:logo :source-format :audio :locations :source :revision :topic :source-news-feeds]]
      [share-item item]
      [item-buttons/close-detail]]
    [:div {}
      [:div {:class "left"}
          [video item]
          [slug item (:clickable-slug? item)]
          [headline item]
          [story item :intro-text]
          [story item :story :force-markup]
          [read-more item]]
      [:div {:class "right"}
        [item-buttons/close-detail]
        [item-buttons/open-pop-out item]
        [renditions item]
        [item-buttons/sign-in-register item]
        [embed-video item]
        [item-buttons/add-to-collection item]
        [item-buttons/remove-from-collection item]
        [share-item item]
        [lynx-drag-handle item]
        [ask-reuters item]
        [item-buttons/print]
        [delete-item item]
        [item-detail-meta-data item [:logo :date :duration :edit-number :copyright :restrictions :source-format :audio
                                     :locations :source :revision :topic :source-news-feeds :id]]
        [qr-code item]]]))

(defn item-detail* [selected-item]
  (let [is-mobile? (rf/subscribe [:app/is-mobile?])]
    (r/create-class
      {:component-did-mount (fn [this]
                              (when (= (-> this r/props :status) :loading)
                                (if @is-mobile?
                                  (bind-swipe-to-close this)
                                  (set-loading-height this))))
       :component-did-update (fn [this]
                               (if @is-mobile?
                                 (bind-swipe-to-close this)
                                 (remove-loading-height this)))
       :component-will-unmount (fn [this]
                                 (when @is-mobile?
                                   (unbind-swipe-to-close this)))
       :reagent-render (fn [selected-item]
                         (let [status (:status selected-item)]
                            ^{:key (:id selected-item)}
                               [:div {:class "item-detail"
                                      :data-qa-component "item-detail"}
                                 [:div {:class (utils/map->classes {:wrapper true
                                                                    :loading (= status :loading)})}
                                   (case status
                                     (:error :forbidden) [item-detail-error]
                                     (:init :loading) [:div {:class "placeholder"}]
                                     :success [detail* selected-item @is-mobile?]
                                     nil)]]))})))

(defn item-detail-mobile []
  (let [selected-item (rf/subscribe [:item/selected-decorated])]
    (fn []
      (let [type (:type @selected-item)]
        [:div {:class (utils/map->classes (-> {:urgent (:urgent? @selected-item)}
                                              (?> (utils/not-nil? type) (assoc ,,, type true))))}
          [dom-utils/transition-group {:component "div"
                                       :class "mobile-item-detail-transition-group"
                                       :transition-name "mobile-item-detail"
                                       :transition-enter true
                                       :transition-leave true}
            (when (:id @selected-item)
              [item-detail* @selected-item])]]))))

(defn item-detail-desktop []
  (let [selected-item (rf/subscribe [:item/selected-decorated])]
    (fn []
      (when (:id @selected-item)
        [item-detail* @selected-item]))))
