(ns mex.components.image
  (:require [mex.re-frame :as rf]
            [mex.utils.core :as utils]))

(defn image
  ([item] [image item false])
  ([item enlarge?] [image item enlarge? nil])
  ([item enlarge? opts]
    (let [{:keys [dimensions fragment headline id image-url thumbnail-url type]
           :or {fragment nil image-url nil thumbnail-url nil}} item
          [width height] dimensions
          constrain-height? (utils/should-constrain-image-by-height? dimensions [16 9])
          is-landscape? (>= width height)
          show-enlarge? (and enlarge?
                             (or thumbnail-url image-url))
          classes (utils/map->classes {:image true
                                       :constrain-height constrain-height?
                                       :constrain-width (not constrain-height?)
                                       :landscape is-landscape?
                                       :portrait (not is-landscape?)
                                       :enlarge show-enlarge?
                                       (:class opts) (:class opts)})]
      [:div {:class classes
             :on-click (if show-enlarge?
                         #(rf/dispatch [:item/large-preview-open id])
                         (:on-click opts))}
        [:div {:class "aspect-ratio"}
          [:div {:class "container-match"}
            [:img {:src (or thumbnail-url image-url)
                   :alt headline
                   :title (cond
                            (:no-title opts) nil
                            (and thumbnail-url
                                 (= type :picture)
                                 (utils/not-nil? fragment)) fragment
                            :else headline)}]]]
        (when (:after opts)
          (:after opts))])))

(defn video-thumbnail [item]
  [image item false {:after [:div {:class "duration"}
                              (:duration item)]}])
