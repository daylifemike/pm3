(ns mex.components.package-views
  (:require-macros [mex.macros.core :refer [for-eager -<>]]
                   [reagent.ratom :refer [reaction]])
  (:require [clojure.string :as str]
            [goog.dom :as dom]
            [goog.dom.classlist :as classlist]
            [mex.components.button :refer [button]]
            [mex.components.headline :refer [headline]]
            [mex.components.image :refer [image]]
            [mex.components.meta-data :refer [meta-data]]
            [mex.components.slideshow :refer [slideshow]]
            [mex.components.story :refer [story]]
            [mex.components.video :refer [video]]
            [mex.re-frame :as rf]
            [mex.state.core :as state]
            [mex.utils.core :as utils]
            [plumbing.core :refer-macros [?>]]
            [reagent.core :as r]))

(defn- get-scaled-width [image target-height]
  (-> (get-in image [:width :original])
      (* ,,, target-height)
      (/ ,,, (get-in image [:height :original]))
      (utils/floor ,,,)))

(defn- scale-to-height [images height]
  (mapv (fn [image]
          (-> image
              (assoc-in ,,, [:height :container] height)
              (assoc-in ,,, [:width :container] (get-scaled-width image height))))
        images))

(defn- plumb-row [row row-width max-width]
  (let [diff (- max-width row-width)]
    (loop [images row
           diff diff
           idx 0]
      (if (or (= diff 0)
              (> diff (/ max-width 10))) ; arbitrary - prevents orphans from being over-scaled
        images
        (let [image (nth images idx)
              new-width (inc (get-in image [:width :container]))
              new-image (assoc-in image [:width :container] new-width)]
          (recur (assoc images idx new-image)
                 (dec diff)
                 (if (= (inc idx) (count images)) 0 (inc idx))))))))

(defn- get-row-width [images]
  (-<> images
       (mapv #(get-in % [:width :container]) <>)
       (interpose 3 <>) ; this needs to match the $gutter var in _package-grid.scss
       (reduce + 0 <>)))

(defn- balance-last-row [rows max-width]
  (if (= (count rows) 1)
    rows
    (let [last-row (last rows)]
      (if (= (get-row-width last-row) max-width)
        rows
        (let [average-row-height (-<> (pop rows)
                                  (mapv #(-> % first :height :container) <>)
                                  (#(/ (apply + %) (count %)) <>))]
          (conj (pop rows) (scale-to-height last-row average-row-height)))))))

(defn- balance-row [images max-width max-height]
  (loop [images images
         height max-height]
    (let [row-width (get-row-width images)]
      (cond
        (js/isNaN row-width) images ; just in case something goes horribly wrong
        (= row-width max-width) images
        (< row-width max-width) (plumb-row images row-width max-width)
        :else (recur (scale-to-height images (dec height))
                     (dec height))))))

(defn- row-ify [images max-width max-height]
  (-<> images
       ; prep data obj
       (mapv (fn [image]
               (let [[original-width original-height] (or (:dimensions image) [16 9])] ; in case dimensions are missing
                 (assoc image :height {:original original-height
                                       :container max-height}
                              :width {:original original-width
                                      :container (-> original-width
                                                     (* ,,, max-height)
                                                     (/ ,,, original-height)
                                                     (utils/floor ,,,))})))
             <>)
       ; build the rows
       (reduce (fn [carry image]
                 (if (empty? carry)
                   (conj carry [image])
                   (let [last-row (last carry)
                         row-width (get-row-width last-row)]
                     (if (< row-width max-width)
                       (conj (pop carry) (conj last-row image))
                       (conj carry [image])))))
               []
               <>)
       ; scale the containers
       (mapv #(balance-row % max-width max-height) <>)
       ; make sure the last row isn't oddly large
       (balance-last-row <> max-width)
       ; mark the last image in each row
       (mapv #(assoc-in % [(-> % count dec) :class] "last") <>)
       (flatten <>)))

(defn- package-item-actions [item]
  [:div {:class "actions"}
    (when (:show-popout-button? item)
      [button {:type :inline
               :class "slide-detail"
               :on-click #(rf/dispatch-sync [:item/pop-out (:id item)])}
        "Details"])
    (when (:show-renditions? item)
      [button {:type :inline
               :class "slide-download"
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
        "Download"])])

(defmulti package-item-details (fn [item] (:type item)))

(defmethod package-item-details :picture [item]
  [:div {:class "media-obj__body"}
    [:div {:class "media-obj__wrapper"}
      [story item :caption :force-markup]
      [meta-data item [:dimensions :file-size]]
      [package-item-actions item]]])

(defmethod package-item-details :video [item]
  [:div {:class "media-obj__body"}
    [:div {:class "media-obj__wrapper"}
      [story item :intro-text]
      [meta-data item [:duration :edit-number]]
      [package-item-actions item]]])

(defn- view-all-button [items-count default-take expanded?]
  [button {:type :inline
           :class "view-all full-width"
           :on-click #(reset! expanded? true)}
   (str "Showing " default-take " of " items-count " - View All")])

(defn- package-grid-hover-card [item]
  (let [hover-width (r/atom nil)
        offset-top (r/atom nil)]
    (r/create-class {
      :component-did-mount (fn [component]
                              (let [node (r/dom-node component)
                                    container-node (dom/getAncestor node #(classlist/contains % "item-detail"))
                                    node-rect (-> node .getBoundingClientRect)
                                    container-rect (-> container-node .getBoundingClientRect)
                                    node-right (-> node-rect .-right utils/floor)
                                    node-width (-> node-rect .-width utils/floor)
                                    container-right (-> container-rect .-right utils/floor)
                                    node-bottom (-> node-rect .-bottom utils/floor)
                                    container-bottom (-> container-rect .-bottom utils/floor)]
                                (when (> node-right container-right)
                                  (reset! hover-width (- node-width (- node-right container-right))))
                                (when (> node-bottom container-bottom)
                                  (reset! offset-top (-> (- node-bottom container-bottom)
                                                         (+ ,,, (-<> node
                                                                     (. js/window getComputedStyle <>)
                                                                     (aget <> "top")
                                                                     (utils/to-int <>)
                                                                     (js/Math.abs <> )))
                                                         (+ ,,, 10) ;; for glorious padding
                                                         (* ,,, -1))))))
      :reagent-render (fn [item]
                        [:div {:class "hover-card media-obj"
                               :style (-> {}
                                          (?> @hover-width (assoc ,,, :width (str @hover-width "px")))
                                          (?> @offset-top (assoc ,,, :top (str @offset-top "px"))))}
                            [:div {:class "media-obj__aside"}
                              [:div {:style {:width (get-in item [:width :container])
                                             :height (get-in item [:height :container])}}]]
                            [package-item-details item]])})))

(defn- package-grid-item [item]
  (let [is-hovered (r/atom false)]
    (fn [item]
      [:div {:class (utils/map->classes {(:type item) true
                                         (or (:class item) "") true
                                         "is-hovered" @is-hovered})
             :on-mouse-enter #(reset! is-hovered true)
             :on-mouse-leave #(reset! is-hovered false)}
        [:div {:class "image-wrapper"
               :style {:width (get-in item [:width :container])
                       :height (get-in item [:height :container])}}
          [image item (:show-large-preview? item) {:class "no-style"
                                                   :no-title true}]]
        (when @is-hovered
          [package-grid-hover-card item @is-hovered])])))

(defn package-grid []
  (let [items (rf/subscribe [:item/package-view-items])
        window-resize (rf/subscribe [:app/window-resize])
        container-width (r/atom 0)
        expanded? (r/atom false)
        default-take 20]
    (r/create-class {
      :component-did-mount #(reset! container-width (-> % r/dom-node .getBoundingClientRect .-width utils/floor))
      :component-did-update #(reset! container-width (-> % r/dom-node .getBoundingClientRect .-width utils/floor))
      :reagent-render (fn []
                        (let [_ @window-resize ; forces a render
                              max-row-height 175
                              items-count (count @items)
                              view-all? (or @expanded?
                                            (<= items-count default-take))
                              visible-items (when (and (utils/not-empty? @items)
                                                       (> @container-width 0))
                                              (if view-all?
                                                (row-ify @items @container-width max-row-height)
                                                (row-ify (take default-take @items) @container-width max-row-height)))]
                          [:div {:class "package-grid"}
                            (for-eager [item visible-items]
                              ^{:key (:id item)}
                                [package-grid-item item])
                            (when-not view-all?
                              [view-all-button items-count default-take expanded?])]))})))

(defn package-list []
  (let [items (rf/subscribe [:item/package-view-items])
        expanded? (r/atom false)
        default-take 20]
    (fn []
      (let [items-count (count @items)
            view-all? (or @expanded?
                          (<= items-count default-take))
            visible-items (if view-all?
                            @items
                            (take default-take @items))]
        [:div {:class "package-list"}
          (for-eager [item visible-items]
            (let [item-id (:id item)]
              ^{:key item-id}
                [:div {:class (utils/map->classes {:package-list-item true
                                                   (:type item) true})}
                  [:div {:class "media-obj__aside"}
                    [image item (:show-large-preview? item)]]
                  [package-item-details item]]))
          (when-not view-all?
            [view-all-button items-count default-take expanded?])]))))

(defn package-single []
  (let [items (rf/subscribe [:item/package-view-items])]
    (fn []
      (when-let [item (first @items)]
        [:div {:class "package-single"}
         (if (= (:type item) :video)
           [video item]
           [image item (:show-large-preview? item)])
         [package-item-details item]]))))

(defn package-view-select []
  (let [views [{:type :grid
                :title "Grid"}
               {:type :list
                :title "List"}]
        selected-view (rf/subscribe [:app/selected-package-view])]
    (fn [item]
      [:div {:class "package-view-select"}
        (for-eager [view views]
          (let [type (:type view)]
            ^{:key (:type view)} [:span {:title (:title view)
                                         :class (utils/map->classes {(str "package-view-" (name type)) true
                                                                     :selected (= type @selected-view)})
                                         :on-click #(rf/dispatch [:app/package-view-change type])}
                                   (:title view)]))])))

(defn package-items [item]
  (let [package-view (rf/subscribe [:app/selected-package-view])
        items (rf/subscribe [:item/package-view-items])
        is-mobile? (rf/subscribe [:app/is-mobile?])]
    (fn [item]
      (let [has-more-than-one-item? (> (count @items) 1)]
        (if (or (not @package-view) ; nil if the experiment is turned off
                @is-mobile?)
          [slideshow item]
          [:div {:class "package-view-container"}
            (when has-more-than-one-item?
              [package-view-select])
            (cond
              (not has-more-than-one-item?) [package-single item]
              ; (= @package-view :slideshow) [slideshow item]
              (= @package-view :grid) [package-grid]
              (= @package-view :list) [package-list]
              :else nil)])))))
