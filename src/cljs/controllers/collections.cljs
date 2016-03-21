(ns mex.controller.collections
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

(defonce collections-path [:collections])

(defonce local-storage-key "collections")

(defn- build-counts [collections]
  (if (map? collections)
    (first (build-counts [collections]))
    (mapv (fn [collection]
            (let [count-keys [:alert-items :reva-video-items :graphic-items :package-items :picture-items :text-items
                              :video-items]
                  counts (-<> collection
                              (select-keys <> count-keys)
                              (filter (fn [[_ v]]
                                        (not= v 0))
                                      <>)
                              (map (fn [[k v] count]
                                     [(str/replace (name k) "-items" "") v])
                                   <>)
                              (into {} <>))]
              (-<> collection
                   (apply dissoc <> count-keys)
                   (assoc <> :icon-bar-content counts))))
          collections)))

(defn- title-in-use? [title collections]
  (let [title (-> title str str/lower-case)
        titles (map #(-> % :title str/lower-case)
                    collections)]
    (boolean (some #(= % title) titles))))

(defn- get-title-validation-errors [title db]
  (-> []
      (?> (empty? title) (conj ,,, "The collection title can't be blank."))
      (?> (title-in-use? title (vals (:lookup db))) (conj ,,, "The title is already in use."))))

(defn- build-lookup [collections]
  (-<> collections
       (build-counts <>)
       (map (fn [c] [(:id c) c]) <>)
       (into {} <>)))

(defn- response-err [_ [event status data id]]
  (js/console.error (str "Error " (name event) ": ") (pr-str status) (pr-str data)))

(defn register-topics []
  (rf/topic :collections/db
    (fn [db _]
      (reaction (get-in @db collections-path))))

  (rf/topic :collections/is-selected-nav?
    (fn [db _]
      (let [selected-nav (rf/subscribe [:nav/selected])]
        (reaction
          (or (:collections-manager? @selected-nav)
              (utils/not-nil? (:collection-id @selected-nav)))))))

  (rf/topic :collections/lookup
    (fn [db _] (reaction (get-in @db (conj collections-path :lookup)))))

  (rf/topic :collections/list
    (let [collections (rf/subscribe [:collections/lookup])]
      (fn [db _]
        (reaction (-<> @collections
                       (vals <>)
                       (sort-by :title <>)
                       (into [] <>))))))

  (rf/topic :collections/new
    (fn [db _]
      (reaction (get-in @db (conj collections-path :new)))))

  (rf/topic :collections/selected
    (fn [db _]
      (let [collections (rf/subscribe [:collections/lookup])
            is-selected-nav? (rf/subscribe [:collections/is-selected-nav?])]
        (reaction
          (let [selected-id (get-in @db (into collections-path [:selected :id]))]
            (when (and @is-selected-nav?
                       (utils/not-nil? selected-id))
              (get @collections selected-id)))))))
          

  (rf/topic :collections/download
    (fn [db _]
      (reaction (get-in @db (conj collections-path :download)))))

  (rf/topic :collections/most-recent
    (let [collections (rf/subscribe [:collections/lookup])]
      (fn [db [_ v]]
        (reaction (-<> @collections
                       (vals <>)
                       (sort-by :updated-at <>)
                       (last <>)))))))

(defn register-handlers []
  (rf/handler :collections/initialize-db
    (mw/path collections-path)
    (fn [db _]
      (assoc db :lookup nil
                :selected {:id nil
                           :search nil})))

  (rf/handler :collections/populate-db
    (mw/path collections-path)
    (mw/after (fn [db _]
                (rf/dispatch [:collections/set-local-storage])
                (local-storage/watch local-storage-key #(rf/dispatch [:collections/update-from-local-storage]))))
    (fn [db [_ data]]
      (let [collections (if data
                          (build-lookup (:list data))
                          (local-storage/get-item local-storage-key))]
        (assoc db :lookup collections
                  :max-collections-for-user (:max-collections-for-user data)
                  :max-items-in-collection (:max-items-in-collection data)))))


  (rf/handler :collections/set-local-storage
    (mw/path collections-path)
    mw/side-effect
    (fn [db _]
      (local-storage/set-item! local-storage-key (:lookup db))))

  (rf/handler :collections/update-from-local-storage
    (mw/path collections-path)
    (mw/after #(rf/dispatch [:collections/update-nav]))
    (fn [db _]
      (assoc db :lookup (local-storage/get-item local-storage-key))))


  (rf/handler :collections/open-manager
    (mw/shim-last-sync :search :success)
    (mw/after #(rf/dispatch [:collections/get-list]))
    (fn [db _]
      (-<> db
           (assoc-in <> (conj collections-path :selected :search) (search/new-search {}))
           (assoc <> :current-search-path (conj collections-path :selected :search)))))


  (rf/handler :collections/get-list
    (mw/shim-last-sync :collections :loading)
    (mw/path collections-path)
    mw/side-effect
    (fn [db [event]]
      (service/fetch event #(collections-api/fetch))))

  (rf/handler :collections/get-list-ok
    (mw/shim-last-sync :collections :success)
    (mw/path collections-path)
    (mw/after (fn [db _]
                (rf/dispatch [:collections/update-nav])
                (rf/dispatch [:collections/set-local-storage])))
    (fn [db [_ data]]
      (assoc (merge db data) :lookup (build-lookup (:list data)))))

  (rf/handler :collections/get-list-err
    (mw/shim-last-sync :collections :error)
    mw/side-effect
    response-err)


  (rf/handler :collections/create-new
    (mw/path collections-path)
    (mw/after (fn [db _]
                (view/open-modal :new)))
    (fn [db [_ data]]
      (assoc db :new (-> {:title ""
                          :errors []
                          :saving? false}
                         (?> (utils/not-nil? data) (assoc :add-item data))))))

  (rf/handler :collections/update-new
    (mw/path collections-path)
    (fn [db [_ title]]
      (-<> db
           (assoc-in <> [:new :title] title)
           (assoc-in <> [:new :errors] []))))

  (rf/handler :collections/clear-new
    (mw/path collections-path)
    (mw/after (fn [db _]
                (rf/dispatch [:modal/close])))
    (fn [db _]
      (dissoc db :new)))


  (rf/handler :collections/save-new
    (mw/path collections-path)
    (mw/after (fn [db [event]]
                (let [errors (get-in db [:new :errors])
                      title (get-in db [:new :title])]
                  (when (empty? errors)
                    (service/fetch event #(collections-api/create (str/trim title)))))))
    (fn [db _]
      (let [errors (get-title-validation-errors (get-in db [:new :title]) db)]
        (-> db
            (assoc-in ,,, [:new :errors] errors)
            (?> (empty? errors) (assoc-in ,,, [:new :saving?] true))))))

  (rf/handler :collections/save-new-ok
    (mw/path collections-path)
    (mw/before (fn [db [_ data]]
                 (let [new-item (get-in db [:new :add-item])]
                   (rf/dispatch [:collections/update-nav])
                   (rf/dispatch [:collections/set-local-storage])
                   (when new-item
                     (rf/dispatch [:collections/add-item (:id data) (:guid new-item) (:type new-item)])))))
    (mw/after (fn [db _]
                (rf/dispatch [:modal/close])))
    (fn [db [_ data]]
      (let [collection (-<> data
                           (assoc <> :updated? true)
                           (build-counts <>))]
        (-<> db
             (dissoc <> :new)
             (assoc-in <> [:lookup (:id collection)] collection)))))

  (rf/handler :collections/save-new-err
    (mw/path collections-path)
    (fn [db [_ _ data]]
      (-<> db
           (assoc-in <> [:new :errors] [(-> data :title first)])
           (assoc-in <> [:new :saving?] false))))


  (rf/handler :collections/delete
    (mw/path collections-path)
    (mw/after (fn [db [event id]]
                (let [title (get-in db [:lookup id :title])]
                  (service/fetch event #(collections-api/delete id) id title))))
    (fn [db [_ id]]
      (assoc-in db [:lookup id :deleting?] true)))

  (rf/handler :collections/delete-ok
    (mw/after (fn [db [_ _ id title]]
                (let [selected-collection (get-in db (conj collections-path :selected :id))
                      nav-items (get-in db [:nav :items])
                      target-path (nav-utils/find-item nav-items :collections-manager?)]
                  (rf/dispatch [:collections/update-nav])
                  (rf/dispatch [:collections/set-local-storage])
                  (rf/dispatch [:toasts/add {:content [view/delete-ok-toast title]}])
                  (when (= selected-collection id)
                    (rf/dispatch [:router/collection (nav-utils/path-to-url nav-items target-path)])))))
    (mw/path collections-path)
    (fn [db [_ _ id _]]
      (utils/dissoc-in db [:lookup id])))

  (rf/handler :collections/delete-err
    (mw/path collections-path)
    (mw/after (fn [_ [_ _ error _ _]]
                (rf/dispatch [:toasts/add {:content [view/delete-err-toast error]
                                           :type :error}])))
    (fn [db [_ _ _ id _]]
      (assoc-in db [:lookup id :deleting?] false)))


  (rf/handler :collections/rename
    (mw/path collections-path)
    (mw/after (fn [db [event id title]]
                (if (empty? (:rename-errors db))
                  (service/fetch event #(collections-api/rename id title) id)
                  (rf/dispatch [:collections/rename-err nil nil id]))))
    (fn [db [_ id title]]
      (let [errors (get-title-validation-errors title db)]
        (-<> db
             (assoc <> :rename-errors errors)
             (assoc-in <> [:lookup id :renaming?] true)))))

  (rf/handler :collections/rename-ok
    (mw/path collections-path)
    (mw/after (fn [db _]
                (rf/dispatch [:collections/update-nav])
                (rf/dispatch [:collections/set-local-storage])))
    (fn [db [_ data id]]
      (let [collection (-> data
                           (assoc ,,, :updated? true)
                           (build-counts ,,,))]
        (-<> db
             (dissoc <> :rename-errors)
             (assoc-in <> [:lookup id] collection)))))

  (rf/handler :collections/rename-err
    (mw/path collections-path)
    (mw/after (fn [_ [_ _ data _]]
                (view/open-modal :errors {:title "Error Renaming Collection"
                                          :errors [(-> data :title first)]})))
    (fn [db [_ _ data id]]
      (assoc-in db [:lookup id :renaming?] false)))


  (rf/handler :collections/remove-updated
    (mw/path collections-path)
    (fn [db [_ id]]
      (-> db
          (?> (utils/not-nil? (get-in db [:lookup id]))
                (assoc-in ,,, [:lookup id :updated?] false)))))


  (rf/handler :collections/set-nav
    (mw/shim-last-sync :search :loading)
    mw/side-effect
    (fn [db [_ id]]
      (let [nav-items (get-in db [:nav :items])
            target-path (nav-utils/find-item nav-items #(= (:collection-id %) id))]
        (rf/dispatch [:nav/go-to target-path]))))

  (rf/handler :collections/update-nav
    (fn [db _]
      (let [current-nav-items (get-in db [:nav :items])
            sorted-collections (-<> (get-in db (conj collections-path :lookup))
                                    (vals <>)
                                    (sort-by :title <>)
                                    (into [] <>))
            collections-nav (-<> []
                                 (conj <> {:title "Manage Collections"
                                           :slug "manage-collections"
                                           :collections-manager? true})
                                 (apply conj <> (map (fn [item] {:title (:title item)
                                                                 :slug (-> item :title utils/slugify)
                                                                 :collection-id (:id item)})
                                                     sorted-collections))
                                 (service/build-nav-items <>))
            new-nav-items (mapv (fn [item]
                                  (if-not (:collection? item)
                                    item
                                    (assoc item :items collections-nav
                                                :slug "collections"
                                                :id "collections")))
                                current-nav-items)]
        (assoc-in db [:nav :items] new-nav-items))))


  (rf/handler :collections/get-items
    mw/side-effect
    (fn [db [event id next-event]]
      (service/fetch event #(collections-api/get id (:settings db)) next-event)))

  (rf/handler :collections/get-items-ok
    mw/side-effect
    (fn [_ [_ collection-items next-event]]
      (rf/dispatch (conj next-event collection-items))))

  (rf/handler :collections/get-items-err
    (mw/shim-last-sync :search :error)
    mw/side-effect
    response-err)


  (rf/handler :collections/open-from-slug
    (mw/path (conj collections-path :lookup))
    mw/side-effect
    (fn [db [_ slug]]
      (let [collection (utils/find-first #(= (-> % :title utils/slugify) slug)
                                         (vals db))]
        (rf/dispatch [:collections/open (:id collection)]))))

  (rf/handler :collections/open
    (mw/shim-last-sync :search :loading)
    (mw/after (fn [db [event id]]
                (rf/dispatch [:collections/get-items id [:collections/open-ok]])))
    (fn [db [_ id]]
      (-<> db
           (assoc <> :selected state/empty-selected-item)
           (assoc-in <> (conj collections-path :selected :id) id))))

  (rf/handler :collections/open-ok
    (mw/shim-last-sync :search :success)
    (mw/after dom-utils/scroll-screen-to-top!)
    (fn [db [_ data]]
      (let [results (-<> search/empty-results
                         (assoc <> :data (-<> data
                                              (sort-by #(get-in % [:date-gmt :date]) <>)
                                              (reverse <>)))
                         (assoc <> :count (count data)))
            new-search (assoc (search/new-search {}) :results results)]
        (-<> db
             (assoc-in <> (conj collections-path :selected :search) new-search)
             (assoc <> :current-search-path (conj collections-path :selected :search))))))

  (rf/handler :collections/open-err
    (mw/shim-last-sync :search :error)
    mw/side-effect
    response-err)


  (rf/handler :collections/add-item
    (mw/analytics-event {:action "Collection - Item Added"
                         :label (fn [_ [_ _ guid]] guid)})
    (mw/after (fn [_ [event id guid type]]
                (let [type (if (= type :early-access-script)
                             :video
                             type)]
                  (service/fetch event #(collections-api/add-item id {guid type}) id))))
    (fn [db _]
      (assoc-in db [:selected :adding-to-collection?] true)))

  (rf/handler :collections/add-item-ok
    (mw/after (fn [_ [_ collection _]]
                (rf/dispatch [:collections/set-local-storage])
                (rf/dispatch [:toasts/add {:content [view/add-item-ok-toast (:title collection)]
                                           :timeout 2000
                                           :close-button? true}])))
    (fn [db [_ collection id]]
      (-<> db
           (utils/dissoc-in <> [:selected :adding-to-collection?])
           (assoc-in <> (conj collections-path :lookup id) (build-counts collection)))))

  (rf/handler :collections/add-item-err
    (mw/after response-err)
    (fn [db _]
      (utils/dissoc-in db [:selected :adding-to-collection?])))


  (rf/handler :collections/remove-item
    (mw/path collections-path)
    (mw/analytics-event {:action "Collection - Item Removed"
                         :label (fn [_ [_ _ guid]] guid)})
    (mw/after (fn [_ [event id guid]]
                (service/fetch event #(collections-api/remove-item id [guid]) id)))
    (fn [db [_ id guid]]
      (assoc-in db [:lookup id :deleting?] true)))

  (rf/handler :collections/remove-item-ok
    (mw/path collections-path)
    (mw/after (fn [db [event _ id]]
                (rf/dispatch [:collections/open id])))
    (fn [db [_ collection id]]
      (assoc-in db [:lookup id] (build-counts collection))))

  (rf/handler :collections/remove-item-err
    mw/side-effect
    response-err)


  (rf/handler :collections/download
    (mw/path collections-path)
    (mw/after (fn [_ [_ id]]
                (rf/dispatch [:collections/get-items id [:collections/validate-download id]])))
    (fn [db [_ id]]
      (assoc-in db [:lookup id :downloading?] true)))

  (rf/handler :collections/validate-download
    (mw/path collections-path)
    mw/side-effect
    (fn [db [_ id collection-items]]
      (let [download {:id id
                      :type :collection
                      :title (get-in db [:lookup id :title])
                      :build-url-fn #(utils/build-url "/api/count-downloads" {:guids (str/join "|" %)})
                      :items collection-items}]
        (rf/dispatch [:download/validate download [:collections/download-validate-result]]))))

  (rf/handler :collections/download-validate-result
    (mw/after (fn [db [_ download]]
                (doseq [item (:items download)]
                  (analytics-utils/send-felytics 
                   (analytics-utils/build-felytics-url
                     {:item item
                      :user-id (get-in db [:user-data :id])
                      :media-type (:type item)
                      :collection? true
                      :user-action "download"})))))
    (mw/path collections-path)
    (mw/analytics-event {:report? (fn [_ [_ download approved?]] approved?)
                         :action "Download collection"
                         :label (fn [_ [_ download _]] (str (:title download) " - " (count (:items download))))})
    (mw/after (fn [_ [_ download approved?]]
                (when approved?
                  (let [items-ids (mapv :id (:items download))]
                    (rf/dispatch [:packages/create (:id download) :collection (:title download) items-ids])))))
    (fn [db [_ download approved?]]
      (if-not approved?
        (utils/dissoc-in db [:lookup (:id download) :downloading?])
        db)))
  
  (rf/handler :collections/download-done
    (mw/path collections-path)
    (fn [db [_ id]]
      (utils/dissoc-in db [:lookup id :downloading?]))))

(defn populate-db [collections]
  (rf/dispatch-sync [:collections/populate-db collections]))

(defn init []
  (defn reset []
    (register-topics)
    (register-handlers))

  (reset)

  (rf/dispatch-sync [:collections/initialize-db]))

(defn get-ns []
  (namespace ::x))
