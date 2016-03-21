(ns mex.controller.modal
  (:require-macros [mex.macros.core :refer [-<>]]
                   [reagent.ratom :refer [reaction]])
  (:require [clojure.string :as str]
            [mex.components.collections :as view]
            [mex.controller.search :as search]
            [mex.middleware :as mw]
            [mex.re-frame :as rf]
            [mex.service.collections :as collections-api]
            [mex.service.connect :as service]
            [mex.state.core :as state]
            [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [mex.utils.local-storage :as local-storage]
            [mex.utils.analytics :as analytics-utils]
            [mex.utils.nav :as nav-utils]
            [plumbing.core :refer-macros [?>]]))

(defonce modal-path [:modal])

(defonce local-storage-key nil)

(defonce default-state {:title "Media Express"
                        ; raw text, an html string, or reagent hiccup
                        :content [:p "Place your message here"]
                        ; custom buttons are responsible for closing the modal themselves
                        ; nil == "ok"
                        ; see types/ModalButton
                        :buttons nil
                        :classes nil
                        :open? false
                        :overlay-close? false})

(defonce loading-state {:title nil
                        :content nil
                        :buttons []
                        :classes "loading"
                        :open? true
                        :overlay-close? false})

(defn register-topics []
  (rf/topic :modal
    (fn [db _]
      (reaction (get-in @db modal-path)))))

(defn register-handlers []
  (rf/handler :modal/initialize-db
    (mw/path modal-path)
    (fn [db [_ params]]
      (merge db default-state)))

  (rf/handler :modal/open
    (mw/path modal-path)
    (mw/after #(rf/dispatch [:app/disable-scrolling]))
    (fn [db [_ params]]
      (merge default-state params {:open? true})))

  (rf/handler :modal/close
    (mw/path modal-path)
    (mw/after #(rf/dispatch [:app/enable-scrolling]))
    (fn [db _]
      (assoc db :open? false)))

  (rf/handler :modal/loading
    (mw/path modal-path)
    (fn [db _]
      (merge db loading-state {:open? true}))))

(defn init []
  (defn reset []
    (register-topics)
    (register-handlers))

  (reset)

  (rf/dispatch-sync [:modal/initialize-db]))

(defn get-ns []
  (namespace ::x))
