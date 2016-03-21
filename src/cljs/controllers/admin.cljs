(ns mex.controller.admin
  (:require-macros [mex.macros.core :refer [-<>]]
                   [reagent.ratom :refer [reaction]])
  (:require [mex.controller.contributor-logos :as contributor-logos]
            [mex.controller.fixed-positions :as fixed-positions]
            [mex.controller.labels :as labels]
            [mex.controller.vanity-urls :as vanity-urls]
            [mex.middleware :as mw]
            [mex.re-frame :as rf]
            [mex.utils.core :as utils]))

(defonce admin-path [:admin])

(defn register-topics []
  (rf/topic :admin/components
    (fn [db _]
      (reaction (get-in @db (conj admin-path :components)))))

  (rf/topic :admin/selected
    (fn [db _]
      (reaction (get-in @db (conj admin-path :selected)))))

  (rf/topic :admin/selected-component
    (fn [_ _]
      (let [components (rf/subscribe [:admin/components])
            selected-path (rf/subscribe [:admin/selected])]
        (reaction
          (-<> @components
               (filter #(= (:db %) @selected-path) <>)
               (first <>)))))))

(defn register-handlers []
  (rf/handler :admin/initialize-db
    (mw/path admin-path)
    (fn [_ [_ data]]
      (let []
        {:selected nil
         :components []})))

  (rf/handler :admin/register-component
    (mw/path admin-path)
    (fn [db [_ new-component]]
      (let [components (:components db)]
        (assoc db :components (conj components new-component)))))

  (rf/handler :admin/tab-click
    (mw/path admin-path)
    (mw/after (fn [db [_ target-path]]
                (let [current-path (:selected db)
                      current-component (utils/find-first #(= (:db %) current-path) (:components db))]
                  (if (nil? current-path)
                    (rf/dispatch [:admin/set-selected target-path])
                    (rf/dispatch (:close current-component))))))
    (fn [db [_ target-path]]
      (if (not= (:selected db) target-path)
        (assoc db :next-component target-path)
        db)))

  (rf/handler :admin/clear-next-component
    (mw/path admin-path)
    (fn [db _]
      (dissoc db :next-component)))

  (rf/handler :admin/set-selected
    (mw/path admin-path)
    (mw/after (fn [db _]
                (let [current-component (utils/find-first #(= (:db %) (:selected db)) (:components db))]
                  (when (:open current-component)
                    (rf/dispatch (:open current-component))))))
    (fn [db [_ component-path]]
      (let [components (mapv #(if (= (:db %) component-path)
                                (assoc % :selected? true)
                                (assoc % :selected? false))
                             (:components db))]
        (assoc db :selected component-path
                  :components components
                  :next-component nil))))

  (rf/handler :admin/unset-selected
    (mw/path admin-path)
    (mw/after (fn [db]
                (when (utils/not-nil? (:next-component db))
                  (rf/dispatch [:admin/set-selected (:next-component db)]))))
    (fn [db _]
      (let [components (mapv #(assoc % :selected? false)
                             (:components db))]
        (assoc db :selected nil
                  :components components)))))

(defn init [settings]
  (defn reset []
    (register-topics)
    (register-handlers)

    (when fixed-positions/reset (fixed-positions/reset))
    (when vanity-urls/reset (vanity-urls/reset))
    (when contributor-logos/reset (contributor-logos/reset))
    (when labels/reset (labels/reset)))

  (reset)

  (rf/dispatch-sync [:admin/initialize-db])

  (fixed-positions/init (:fixed-positions settings))
  (vanity-urls/init (:vanity-urls settings))
  (contributor-logos/init (:contributor-logos settings))
  (labels/init (:labels settings)))

(defn get-ns []
  (namespace ::x))
