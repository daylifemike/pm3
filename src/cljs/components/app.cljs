(ns mex.components.app
  (:require [mex.components.back-to-top :refer [back-to-top]]
            [mex.components.collections :as collections]
            [mex.components.contents :refer [contents]]
            [mex.components.download-manager :refer [download-manager]]
            [mex.components.drawer :refer [drawer]]
            [mex.components.footer :refer [footer]]
            [mex.components.header :refer [header]]
            [mex.components.item-detail :refer [item-detail-mobile]]
            [mex.components.large-preview :as large-preview]
            [mex.components.live-video :refer [live-video]]
            [mex.components.modal :refer [modal]]
            [mex.components.package-downloads :refer [package-downloads]]
            [mex.components.redirect :refer [redirect]]
            [mex.components.results-messages :as results-messages]
            [mex.components.sidebar :refer [sidebar]]
            [mex.components.toasts :refer [toasts]]
            [mex.re-frame :as rf]
            [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [reagent.core :as r]))

(defn app []
  (let [container-classes (rf/subscribe [:app/container-classes])
        is-mobile? (rf/subscribe [:app/is-mobile?])
        last-sync (rf/subscribe [:app/last-sync])
        search-results-count  (rf/subscribe [:search/current-results-count])
        selected-nav-item (rf/subscribe [:nav/selected])
        route (rf/subscribe [:app/route])
        features (rf/subscribe [:preferences/features])
        settings (rf/subscribe [:preferences/settings])
        sidebar-open? (rf/subscribe [:app/sidebar-open?])]
    (r/create-class
      {:component-did-mount (fn [_]
                              (dom-utils/add-body-class "mex") ; needed by the Vice "Cost Center Reporter" Chrome Extension
                              (when (:prevent-copy-paste? @features)
                                (dom-utils/enable-prevent-selection)))
       :component-will-unmount #(dom-utils/disable-prevent-selection)
       :reagent-render  (fn []
                          [:div {:id "container"
                                 :class @container-classes}
                            [:div {:class (utils/map->classes {:mobile-scroll-lock-wrapper @is-mobile?})}
                              [header]
                              [:div {:id "body"
                                     :class (utils/map->classes {:sidebar-open @sidebar-open?
                                                                 :sidebar-close (not @sidebar-open?)})}
                                [:div {:class "wrapper"}
                                  (when-not @is-mobile?
                                    [drawer {:class "sidebar"
                                               :on-click (fn [open?]
                                                           (rf/dispatch [:nav/change []])
                                                           (rf/dispatch [:app/sidebar-drawer (not open?)]))}
                                      [sidebar]])
                                  (cond
                                    (:live-video? @selected-nav-item) [live-video]
                                    (= (:search @last-sync) :error) [results-messages/error]
                                    (:redirect? @settings) [redirect @settings]
                                    (= (:controller @route) :collections-manager) [collections/manager]
                                    (= (:controller @route) :settings) [:h1 (str "Settings" (-> @route :route-params :page))]
                                    (= (:controller @route) :downloads) [download-manager]
                                    (= (:preferences @last-sync) :no-channels) [results-messages/no-channels]
                                    (and (= (:search @last-sync) :success)
                                         (= @search-results-count 0)
                                         (not (:collection-id @selected-nav-item))
                                         (not (:olr? @selected-nav-item))) [results-messages/empty-response]
                                    :else [contents])]]
                              (when-not @is-mobile?
                                [footer])]
                            (if @is-mobile?
                              [item-detail-mobile]
                              [:div
                                [modal]
                                [toasts]
                                [package-downloads]
                                [back-to-top]
                                [large-preview/show]])])})))
