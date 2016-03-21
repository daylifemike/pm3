(ns mex.components.large-preview
  (:require-macros [cljs.core.async.macros :refer [go]]
                   [mex.macros.core :refer [for-eager]]
                   [reagent.ratom :refer [reaction]])
  (:require [cljs.core.async :as async]
            [mex.components.button :refer [button]]
            [mex.components.slideshow :refer [slides-nav]]
            [mex.components.story :refer [story]]
            [mex.components.video :refer [video]]
            [mex.components.headline :refer [headline]]
            [mex.components.meta-data :refer [item-detail-meta-data]]
            [mex.re-frame :as rf]
            [mex.state.core :as state]
            [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [plumbing.core :refer-macros [?>]]
            [reagent.core :as r]))

;; ------------------
;; - alt view stuff -
;; ------------------

(defn- get-image-rect [node]
  (-> node
      (. ,,, querySelector "[data-rects-target]")
      .getBoundingClientRect))

(defn- get-offsets [focus-coords rect max-container-dimensions scaled-dimensions unscaled-dimensions]
  (let [scaled-width (:width scaled-dimensions)
        scaled-height (:height scaled-dimensions)
        [container-width container-height] max-container-dimensions
        container-center-x (-> container-width (/ 2) utils/floor)
        container-center-y (-> container-height (/ 2) utils/floor)
        [focus-x focus-y] focus-coords
        [unscaled-width unscaled-height] unscaled-dimensions
        focus-over-scaled-x (-> rect (. -left) (- focus-x) js/Math.abs)
        focus-over-scaled-y (-> rect (. -top) (- focus-y) js/Math.abs)
        focus-over-unscaled-x (-> focus-over-scaled-x (* unscaled-width) (/ scaled-width) utils/floor)
        focus-over-unscaled-y (-> focus-over-scaled-y (* unscaled-height) (/ scaled-height) utils/floor)
        offset-x (- focus-over-unscaled-x container-center-x)
        offset-y (- focus-over-unscaled-y container-center-y)]
    [offset-x offset-y]))

(defn- get-window-dims []
  (let [gutter 50 ; as appears in the max-width/max-height modal.scss (under .large-preview)
        actions-height 60 ; allowance for height of the .actions container
        window-width (- (-> js/window js/jQuery .width) gutter)
        window-height (- (-> js/window js/jQuery .height) gutter actions-height)]
    [window-width window-height]))

(defn- make-container-dims [data window-dims image-dims]
  (let [{:keys [is-scaled? show-detail?]} data
        [window-width window-height] window-dims
        [image-width image-height] image-dims
        adjusted-window-height (if (and is-scaled?
                                        show-detail?
                                        (< (/ window-width window-height)
                                           (/ 16 9)))
                                 (-> window-width (* ,,, 9) (/ ,,, 16))
                                 window-height)
        constrain-by-height? (utils/should-constrain-image-by-height? image-dims [window-width adjusted-window-height])
        is-wider-than-window? (> image-width window-width)
        is-taller-than-window? (> image-height adjusted-window-height)
        is-larger-than-window? (or is-wider-than-window?
                                   is-taller-than-window?)
        scaled-image-width (-> adjusted-window-height
                               (* ,,, image-width)
                               (/ ,,, image-height)
                               (utils/floor ,,,))
        scaled-image-height (-> window-width
                                (* ,,, image-height)
                                (/ ,,, image-width)
                                (utils/floor ,,,))]
    (cond
      (not is-scaled?) {:width (if is-wider-than-window? window-width image-width)
                        :height (if is-taller-than-window? adjusted-window-height image-height)}
      show-detail? {:width window-width
                    :height adjusted-window-height}
      is-larger-than-window? {:width (if constrain-by-height? scaled-image-width window-width)
                              :height (if constrain-by-height? adjusted-window-height scaled-image-height)}
      :else {:width image-width
             :height image-height})))

(defn- make-image-dims [data container-dims image-dims]
  (let [detail-width 40 ; % - matches width in large-preview.scss
        {:keys [is-scaled? show-detail?]} data
        [container-width container-height] container-dims
        [image-width image-height] image-dims
        image-container-width (if-not show-detail?
                                container-width
                                (-> container-width
                                    (* ,,, (/ detail-width 100))
                                    (- ,,, container-width)
                                    (js/Math.abs ,,,)
                                    (utils/floor ,,,)))
        constrain-by-height? (utils/should-constrain-image-by-height? image-dims [image-container-width container-height])
        is-larger-than-container? (or (> image-width container-width)
                                      (> image-height container-height))
        scaled-image-width (-> container-height
                               (* ,,, image-width)
                               (/ ,,, image-height)
                               (utils/floor ,,,))
        scaled-image-height (-> image-container-width
                                (* ,,, image-height)
                                (/ ,,, image-width)
                                (utils/floor ,,,))]
    (cond
      (not is-scaled?) {:width image-width
                        :height image-height}
      is-larger-than-container? {:width (if constrain-by-height? scaled-image-width image-container-width)
                                 :height (if constrain-by-height? container-height scaled-image-height)}
      :else {:width image-width
             :height image-height})))

;; -------------------
;; - common handlers -
;; -------------------

(defn- mouse-down-handler [e scaled? being-dragged? prev-mouse-x prev-mouse-y]
  (when (not scaled?)
    (reset! being-dragged? true)
    (reset! prev-mouse-x (. e -clientX))
    (reset! prev-mouse-y (. e -clientY))
    (. e preventDefault)
    (. e stopPropagation)))

(defn- mouse-up-handler [e being-dragged?]
  (when (= @being-dragged? true)
    (reset! being-dragged? false)
    (. e preventDefault)
    (. e stopPropagation))
  nil)

(defn- mouse-move-handler [e being-dragged? prev-mouse-x prev-mouse-y]
  (when (= @being-dragged? true)
    (. e preventDefault)
    (. e stopPropagation)
    (let [mouse-x (. e -clientX)
          mouse-y (. e -clientY)
          diff-x (- (. e -clientX) @prev-mouse-x)
          diff-y (- (. e -clientY) @prev-mouse-y)
          scroll-x (-> e .-currentTarget .-scrollLeft)
          scroll-y (-> e .-currentTarget .-scrollTop)]
      (set! (-> e .-currentTarget .-scrollLeft) (- scroll-x diff-x))
      (set! (-> e .-currentTarget .-scrollTop) (- scroll-y diff-y))
      (reset! prev-mouse-x mouse-x)
      (reset! prev-mouse-y mouse-y)))
  nil)

;; ------------------
;; - alt view stuff -
;; ------------------

(defn- double-click-handler [e is-scaled? img-style dimensions prev-mouse-x prev-mouse-y entering-maximize?]
  (. e preventDefault)
  (. e stopPropagation)
  (if (not is-scaled?)
    (rf/dispatch [:item/large-preview-toggle-scaling])
    (let [[offset-x offset-y] (get-offsets [(. e -clientX) (. e -clientY)]
                                           (-> e .-currentTarget get-image-rect)
                                           (get-window-dims)
                                           img-style
                                           dimensions)]
      (reset! entering-maximize? true)
      (reset! prev-mouse-x offset-x)
      (reset! prev-mouse-y offset-y)
      (rf/dispatch [:item/large-preview-toggle-scaling])))
  nil)

(defn- close-button []
  [button {:type :close
           :title "\"esc\" to close"
           :on-click #(rf/dispatch [:modal/close])}])

(defn- actions [item is-larger-than-container? is-scaled?]
  [:div {:class "actions"}
    (when is-larger-than-container?
      [button {:type :link
               :title "\"z\" or double-click to zoom"
               :class (utils/map->classes {:zoom true
                                           :scaled is-scaled?
                                           :original (not is-scaled?)})
               :on-click (fn []
                           (rf/dispatch [:item/large-preview-toggle-scaling])
                           nil)}
        (if is-scaled? "Maximize" "Minimize")])
    [:div {:class "right"}
      [button {:class "download"
               :on-click (fn [e]
                           (let [file (:file item)
                                 rendition {:content-url (:url file)
                                            :url (if (:count-download? item)
                                                   (:count-url file)
                                                   (:url file))}
                                 data (merge state/empty-download
                                             rendition
                                             {:type :file
                                              :id (utils/now-as-long)
                                              :data {:content-url (:content-url rendition)}})]
                             (rf/dispatch [:item/download data])))}
        "Download"]]])

(defn- nav [data]
  (let [{:keys [is-part-of-a-package? has-more-than-one-item? enable-prev-item-btn? enable-next-item-btn?]} data]
    (when (and is-part-of-a-package?
               has-more-than-one-item?)
      [slides-nav enable-prev-item-btn? enable-next-item-btn?])))

(defn- current-position [x-of-y]
  (when x-of-y
    (let [[x y] x-of-y]
      [:div {:class "current-position"}
        (str x " of " y)])))

(defn- preload-buffer [data]
  (let [{:keys [buffer-items]} data]
    [:div {:class "preloader"}
      (for-eager [item buffer-items]
        (let [url (or (:image-url item) (:thumbnail-url item))]
          ^{:key (str "buffer-" url)}
            [:img {:src url}]))]))

(defn- loading [data vars]
  (let [{:keys [item]} data
        {:keys [img-style]} vars
        {:keys [image-url thumbnail-url]} item
        low-res-url (or image-url thumbnail-url)]
    [:div {:class "loader"}
      ^{:key (str "loader-" low-res-url)}
        [:img {:src low-res-url
               :style img-style}]]))

(defn- video-container [item]
  [:div {:class "content-container"}
    [:div {:class "flowplayer-wrapper"}
      ^{:key (:id item)}
        [video item]]])

(defn- main-image [item vars]
  (let [delay-load? (r/atom true)]
    (r/create-class {
      :component-did-mount #(when @delay-load?
                              (go []
                                  (async/<! (async/timeout 1500))
                                  (reset! delay-load? false)))
      :reagent-render (fn [item vars]
                        (when-not @delay-load?
                          (let [{:keys [full-preview-url]} item
                                {:keys [img-style]} vars]
                            [:img {:id "main-image"
                                   :src full-preview-url
                                   :style img-style}])))})))

(defn- image-container [data vars]
  (let [being-dragged? (r/atom false)
        prev-mouse-x (r/atom 0)
        prev-mouse-y (r/atom 0)
        entering-maximize? (r/atom false)]
    (r/create-class {
      :component-will-receive-props (fn [component new-argv]
                                      (let [was-scaled? (-> component r/props :is-scaled?)
                                            will-be-scaled? (-> new-argv second :is-scaled?)]
                                        (cond
                                          ; entering max
                                          (and was-scaled?
                                               (not will-be-scaled?)
                                               (= @prev-mouse-x 0)
                                               (= @prev-mouse-y 0))
                                            (reset! entering-maximize? true)
                                          ; leaving max
                                          (and (not was-scaled?)
                                               will-be-scaled?)
                                            (do
                                              (reset! prev-mouse-x 0)
                                              (reset! prev-mouse-y 0))
                                          :else nil)))
      :component-did-update (fn [component]
                              (when @entering-maximize?
                                (let [node (r/dom-node component)
                                      [offset-x offset-y] (if (and (not= @prev-mouse-x 0)
                                                                   (not= @prev-mouse-y 0))
                                                            [@prev-mouse-x @prev-mouse-y]
                                                            (let [[_ data vars] (r/argv component)
                                                                  rects (get-image-rect node)
                                                                  center-x (-> (. rects -width) (/ 2) utils/floor)
                                                                  center-y (-> (. rects -height) (/ 2) utils/floor)]
                                                              (get-offsets [center-x center-y]
                                                                           rects
                                                                           (get-window-dims)
                                                                           (:img-style vars)
                                                                           (get-in data [:item :dimensions]))))]
                                    (set! (. node -scrollLeft) offset-x)
                                    (set! (. node -scrollTop) offset-y)
                                    (reset! entering-maximize? false))))
      :reagent-render (fn [data vars]
                        (let [{:keys [item is-scaled?]} data
                              {:keys [img-style]} vars
                              {:keys [dimensions full-preview-url]} item]
                          [:div {:class (utils/map->classes {:content-container true
                                                             :low-res-loading true
                                                             :draggable (not is-scaled?)})
                                 :on-mouse-down #(mouse-down-handler % is-scaled? being-dragged? prev-mouse-x prev-mouse-y)
                                 :on-mouse-up #(mouse-up-handler % being-dragged?)
                                 :on-mouse-move #(mouse-move-handler % being-dragged? prev-mouse-x prev-mouse-y)
                                 :on-double-click #(double-click-handler %
                                                                         is-scaled?
                                                                         img-style
                                                                         dimensions
                                                                         prev-mouse-x
                                                                         prev-mouse-y
                                                                         entering-maximize?)}
                            [preload-buffer data]
                            [:div {:class "loader-wrapper"
                                   :style img-style
                                   :data-rects-target true}
                              [loading data vars]
                              ^{:key (str "hi-res-" full-preview-url)}
                                [main-image item vars]
                              [:div {:class "prevent-right-click"}]]]))})))

(defmulti item-detail (fn [data] (get-in data [:item :type])))

(defmethod item-detail :picture [data]
  (let [{:keys [item is-scaled? show-detail? x-of-y]} data
        {:keys [caption description]} item]
    (when (and is-scaled?
               show-detail?)
      [:div {:class "detail"}
        [current-position x-of-y]
        [headline item]
        [:div {:class "story-wrapper"}
          [story item :caption :force-markup]]
        [item-detail-meta-data item [:date :dimensions :file-size :byline :city :country-name :country-code
                                     :credit :id]]])))

(defmethod item-detail :video [data]
  (let [{:keys [item is-scaled? show-detail? x-of-y]} data
        {:keys [caption description]} item]
    (when (and is-scaled?
               show-detail?)
      [:div {:class "detail"}
        [current-position x-of-y]
        [headline item]
        [:div {:class "story-wrapper"}
          [story item :intro-text]
          [story item :story :force-markup]]
        [item-detail-meta-data item [:date :duration :edit-number :copyright :restrictions :audio :locations
                                     :revision :id]]])))

(defn- make-vars
  "some rules:
   - item-details are shown by default
   - item-details can be toggled when not maximized
   - maximized never sees the details"
  [data]
  (let [{:keys [item is-scaled? show-detail?]} data
        {:keys [dimensions]} item
        [image-width image-height] (if (and (= (:type item) :video)
                                            (= dimensions [16 9])) ; means we don't have real dimension data
                                     [600 337] ; completely arbitrary but 16:9
                                     dimensions)
        [window-width window-height] (get-window-dims)
        container-style (make-container-dims data [window-width window-height] [image-width image-height])
        img-style (make-image-dims data [(:width container-style) (:height container-style)] [image-width image-height])]
    {:container-style container-style
     :img-style img-style
     :is-larger-than-container? (or (> image-width (:width container-style))
                                    (> image-height (:height container-style)))}))

(defn alt-large-preview []
  (let [data (rf/subscribe [:item/large-preview-data])
        window-resize (rf/subscribe [:app/window-resize])
        key-handler #(let [{:keys [is-larger-than-container?]} (make-vars @data)]
                       (case (dom-utils/key-name %)
                         "z" (when is-larger-than-container? (rf/dispatch [:item/large-preview-toggle-scaling]))
                         "i" (rf/dispatch [:item/large-preview-toggle-detail])
                         "left" (rf/dispatch [:item/slideshow-show-prev-slide])
                         "right" (rf/dispatch [:item/slideshow-show-next-slide])
                         nil))]
    (r/create-class {
      :component-will-mount #(. js/window addEventListener "keyup" key-handler)
      :component-will-unmount (fn []
                                (. js/window removeEventListener "keyup" key-handler)
                                (rf/dispatch [:item/large-preview-close]))
      :reagent-render (fn []
                        (if (nil? (:item @data))
                          (rf/dispatch [:modal/close])
                          (let [_ @window-resize ; forces a render
                                vars (make-vars @data)
                                {:keys [item is-scaled?]} @data
                                {:keys [container-style is-larger-than-container?]} vars]
                            [:div {:class (utils/map->classes {:alt-large-preview true
                                                               :maximized (not (:is-scaled? @data))})}
                              [:div {:class "wrapper"
                                     :style container-style}
                                (if (= (:type item) :video)
                                  [video-container item]
                                  [image-container @data vars])
                                [item-detail @data]]
                              [nav @data]
                              [close-button]
                              [actions item is-larger-than-container? is-scaled?]])))})))

;; ------------
;; - original -
;; ------------

(defn modal-large-preview []
  (let [data (rf/subscribe [:item/large-preview-data])
        being-dragged? (r/atom false)
        prev-mouse-x (r/atom 0)
        prev-mouse-y (r/atom 0)
        key-handler #(case (dom-utils/key-name %)
                       "z" (rf/dispatch [:item/large-preview-toggle-scaling])
                       "left" (rf/dispatch [:item/slideshow-show-prev-slide])
                       "right" (rf/dispatch [:item/slideshow-show-next-slide])
                       nil)]
    (r/create-class {
      :display-name "large-preview"
      :component-will-mount #(. js/window addEventListener "keyup" key-handler)
      :component-will-unmount (fn []
                                (. js/window removeEventListener "keyup" key-handler)
                                (rf/dispatch [:item/large-preview-close]))
      :reagent-render (fn []
                        (let [{:keys [item is-part-of-a-package? is-open? is-scaled? enable-prev-item-btn?
                                      enable-next-item-btn? has-more-than-one-item?]} @data
                              dimensions (:dimensions item)
                              [image-width image-height] dimensions
                              gutter 50 ; as appears in the max-width/max-height .large-preview css
                              actions-height 60 ; allowance for height of the .actions container
                              window-width (- (-> js/window js/jQuery .width) gutter)
                              window-height (- (-> js/window js/jQuery .height) gutter actions-height)
                              is-larger-than-window? (or (> image-width window-width)
                                                         (> image-height window-height))
                              constrain-by-height? (utils/should-constrain-image-by-height? dimensions
                                                                                            [window-width window-height])
                              scaled-image-width (-> window-height
                                                     (* ,,, image-width)
                                                     (/ ,,, image-height)
                                                     (utils/floor ,,,))
                              scaled-image-height (-> window-width
                                                      (* ,,, image-height)
                                                      (/ ,,, image-width)
                                                      (utils/floor ,,,))
                              container-style {:width (cond
                                                        (not is-larger-than-window?) image-width
                                                        (and is-scaled?
                                                             constrain-by-height?) scaled-image-width
                                                        (and (not is-scaled?)
                                                             (< image-width window-width)) image-width
                                                        :else window-width)
                                               :height (cond
                                                         (not is-larger-than-window?) image-height
                                                         (and is-scaled?
                                                              (not constrain-by-height?)) scaled-image-height
                                                         (and (not is-scaled?)
                                                              (< image-height window-height)) image-height
                                                         :else window-height)}
                              img-style {:width (cond
                                                  (not is-larger-than-window?) image-width
                                                  (not is-scaled?) image-width
                                                  (not constrain-by-height?) window-width
                                                  :else scaled-image-width)
                                         :height (cond
                                                   (not is-larger-than-window?) image-height
                                                   (not is-scaled?) image-height
                                                   constrain-by-height? window-height
                                                   :else scaled-image-height)}]
                          (if (nil? item)
                            (rf/dispatch [:modal/close])
                            [:div {:class "large-image-preview"}
                              (if (= (:type item) :video)
                                [:div {:class "video-container"}
                                  ^{:key (:id item)}
                                    [video item]]
                                [:div {:class (utils/map->classes {:image-container true
                                                                   :draggable (not is-scaled?)})
                                       :style container-style
                                       :on-mouse-down #(mouse-down-handler % is-scaled? being-dragged? prev-mouse-x prev-mouse-y)
                                       :on-mouse-up #(mouse-up-handler % being-dragged?)
                                       :on-mouse-move #(mouse-move-handler % being-dragged? prev-mouse-x prev-mouse-y)}
                                  ^{:key (:full-preview-url item)}
                                    [:img {:src (:full-preview-url item)
                                           :style img-style}]
                                  [:div {:class "prevent-right-click"
                                         :style img-style}]])
                              (when (and is-part-of-a-package?
                                         has-more-than-one-item?)
                                [slides-nav enable-prev-item-btn? enable-next-item-btn?])
                              [button {:type :close
                                       :title "\"esc\" to close"
                                       :on-click #(rf/dispatch [:modal/close])}]
                              [:div {:class "actions"}
                                (when is-larger-than-window?
                                  [button {:type :link
                                           :title "\"z\" to toggle zoom"
                                           :class (utils/map->classes {:zoom true
                                                                       :scaled is-scaled?
                                                                       :original (not is-scaled?)})
                                           :on-click (fn []
                                                       (rf/dispatch [:item/large-preview-toggle-scaling])
                                                       (reset! being-dragged? false)
                                                       nil)}
                                    (if is-scaled? "Maximize" "Minimize")])
                                [:div {:class "right"}
                                  [button {:class "download"
                                           :on-click (fn [e]
                                                       (let [file (:file item)
                                                             rendition {:content-url (:url file)
                                                                        :url (if (:count-download? item)
                                                                               (:count-url file)
                                                                               (:url file))}
                                                             data (merge state/empty-download
                                                                         rendition
                                                                         {:type :file
                                                                          :id (utils/now-as-long)
                                                                          :data {:content-url (:content-url rendition)}})]
                                                         (rf/dispatch [:item/download data])))}
                                    "Download"]]]])))})))

(defn show []
  (let [is-open? (rf/subscribe [:item/large-preview-open?])
        experiments (rf/subscribe [:experiments/user-settings])
        alt-large-preview? (reaction (:alt-large-preview? @experiments))]
    (fn []
      (when @is-open?
        (rf/dispatch [:modal/open {:title nil
                                   :classes "large-preview"
                                   :overlay-close? true
                                   :buttons []
                                   :content (if @alt-large-preview?
                                              [alt-large-preview]
                                              [modal-large-preview])}])))))
