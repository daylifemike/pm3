(ns mex.middleware
  (:require-macros [mex.macros.core :refer [-<>]]
                   [cljs.core.async.macros :refer [go]])
  (:require [cljs.core.async :as async]
            [mex.configuration :as configuration]
            [mex.re-frame :as rf]
            [mex.utils.analytics :as analytics-utils]
            [mex.utils.nav :as nav-utils]
            [plumbing.core :refer-macros [?> defnk]]
            [re-frame.middleware]))

(def pure re-frame.middleware/pure)
(def debug re-frame.middleware/debug)
(def debug-monitor re-frame.middleware/debug-monitor)
(def trim-v re-frame.middleware/trim-v)
(def path re-frame.middleware/path)
(def after re-frame.middleware/after)
(def after-changed re-frame.middleware/after-changed)
(def enrich re-frame.middleware/enrich)
(def side-effect re-frame.middleware/side-effect)
(def on-changes re-frame.middleware/on-changes)

(defn dynamic-path
  "Looks up `indirect-path` and uses the resulting value in the path middleware."
  [indirect-path]
  {:pre [(vector? indirect-path)]}
  (fn dynamic-path-middleware [handler]
    (fn scope-handler [db v]
      (let [path (get-in db indirect-path)]
        (assoc-in db path (handler (get-in db path) v))))))

(defn before
  "Middleware factory which runs a function \"f\" in the \"before handler\"
  position presumably for side effects before db is changed by the handler.
  \"f\" is given the current value of \"db\". It's return value is ignored."
  [f]
  (fn before-middleware
    [handler]
    (fn before-handler
      [db v]
      (f db v)
      (handler db v))))

(defn enrich-before
  "Update the db before the handler sees it."
  [f]
  (fn enrich-before-middleware
    [handler]
    (fn enrich-before-handler
      [db v]
      (handler (f db v) v))))

(defn- shim-last-sync
  "The sync.cljs handlers update the contents of :last-sync with their
  progress. This middleware allows replacement handlers to match the
  previous behavior."
  [type status]
  (fn loading-middleware [handler]
    (fn loading-handler [db v]
      (-> (handler db v)
          (assoc-in [:last-sync type] status)
          (?> (= :item type) (assoc-in [:selected :status] status))))))

(def current-search-path (dynamic-path [:current-search-path]))

(def clear-saved-search (enrich (fn [db _]
                                  (assoc-in db [:saved-searches :selected] nil))))

(def clear-navigation (enrich-before (fn [db _]
                                       (if (get-in db [:features :nav?])
                                         (update db :nav assoc :nav-path [] :selected-path [0])
                                         db))))

(def clear-selected-collection (enrich-before (fn [db _]
                                                (if (nil? (get-in db [:collections :selected :id]))
                                                  db
                                                  (-> db
                                                      (assoc-in ,,, [:collections :selected] {:id nil
                                                                                              :search nil})
                                                      #_(?> (get-in db [:features :nav?])
                                                          (update-in ,,, [:nav :selected-path] [])))))))

(def clear-route (enrich-before (fn [db _] (dissoc db :route))))

(def set-search-path-to-default (enrich-before (fn [db _]
                                                 (let [default-search-path [:search]
                                                       current-search-path (:current-search-path db)
                                                       search (get-in db current-search-path)]
                                                   (-<> db
                                                        (assoc <> :current-search-path default-search-path)
                                                        (assoc-in <> default-search-path search))))))

(def set-url (after (fn [_ _] (rf/dispatch [:router/set-url]))))

(def analytics-pageview (after #(analytics-utils/report-pageview)))

(defn- report-callback-event [category action label callback]
  (let [cb-ch (async/chan 1)]
    (analytics-utils/report-event {:category category
                                   :action action
                                   :label label
                                   :options (clj->js {:hitCallback #(async/put! cb-ch true)})})
    (go
      (async/alts! [(async/timeout (:max-wait-for-ga-callback configuration/params)) cb-ch])
      (callback))))

(defn- get-value [value-or-fn db event-data]
  (if (fn? value-or-fn)
    (value-or-fn db event-data)
    value-or-fn))

(defnk analytics-event [{report? true} 
                        {category (fn [db _]
                                    (if (get-in db [:features :reva?])
                                      "Video Archive"
                                      "Media Express"))} 
                        {action ""}
                        {label ""}
                        {callback nil}]
  (after (fn [db event-data]
           (let [report? (get-value report? db event-data)
                 action (get-value action db event-data)
                 category (get-value category db event-data)
                 label (get-value label db event-data)
                 callback (when callback (callback db event-data))]
             (when report?
               (if callback
                 (report-callback-event category action label callback)
                 (analytics-utils/report-event {:category category
                                                :action action
                                                :label label
                                                :options nil})))))))


(defnk felytics-event [item
                       {media-type nil}
                       {newsml? false}
                       {user-action "full_preview"}]
  (after (fn [db event-data]
           (let [item-val (get-value item db event-data)
                 user-id (get-in db [:user-data :id])
                 media-type (or (get-value media-type db event-data) (:type item-val))
                 url (analytics-utils/build-felytics-url
                      {:item item-val
                       :rendition-id (when (= user-action "download")
                                       (analytics-utils/download-url->rendition-id (get-in item-val [:download :content-url] "")))
                       :user-id user-id
                       :newsml? (get-value newsml? db event-data)
                       :media-type (if (= media-type :video)
                                     (if (= :raw-video (:video-type item-val)) "raw_video" "packaged_video")
                                     media-type)
                       :user-action user-action})]
             (when-not user-id
               (js/console.warn "felytics-event middleware needs to see the full state db, move it out of the path."))
             (analytics-utils/send-felytics url)))))
