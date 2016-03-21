(ns mex.controller.fixed-positions
  (:require-macros [mex.macros.core :refer [-<>]]
                   [reagent.ratom :refer [reaction]])
  (:require [cljs-time.coerce :as ct-coerce]
            [cljs-time.core :as ct]
            [clojure.string :as str]
            [mex.components.fixed-positions :as view]
            [mex.controller.search :as search]
            [mex.middleware :as mw]
            [mex.re-frame :as rf]
            [mex.router :as router]
            [mex.service.connect :as service]
            [mex.service.fixed-positions :as fixed-positions-api]
            [mex.service.item-overview :as item-overview]
            [mex.utils.analytics :as analytics-utils]
            [mex.utils.core :as utils]
            [mex.utils.nav :as nav-utils]
            [plumbing.core :refer-macros [?> fnk]]))

(defonce fixed-positions-path [:admin :fixed-positions])

(defonce empty-db {:working nil
                   :working-backup nil ; used to revert on close
                   :current nil ; currently woven into the items
                   :current-backup nil ; used to revert after preview
                   :errors []
                   :is-loading? false
                   :is-processing? false
                   :is-in-preview? false})

(defonce empty-item {:position ""
                     :type ""
                     :start-date nil
                     :end-date nil
                     :url-or-itemid ""
                     :description ""
                     :image-url nil
                     :pages "all"})

(defonce item-types [{:name "URL" :value "url"}
                     {:name "Relative Path" :value "path"}
                     {:name "Asset" :value "asset"}
                     {:name "Reuters TV" :value "reuters-tv"}
                     {:name "Search" :value "search"}
                     {:name "Static" :value "static"}])

(defn- remove-empty-items [items]
  (let [relevant (keys empty-item)]
    (-<> items
         (filter (fn [[k v]]
                   (let [item (select-keys v relevant)]
                     (not= item empty-item)))
                 <>)
         (into {} <>))))

(defn- build-lookup [data]
  (-<> data
       (map-indexed (fn [idx v]
                      (let [item (assoc v :id idx)]
                        [idx item]))
                    <>)
       (into {} <>)))

(defn- get-search-params [app-state keywords]
  (let [filters (search/search->filters {:search (get-in app-state (:current-search-path app-state))
                                         :with-empty? true
                                         :with-default? true
                                         :with-date-range? true
                                         :topic-codes? true})
        params {:search-type :reference-id
                :from-date (:from-date filters)
                :to-date (:to-date filters)
                :cursor "*"
                :page-size 24
                :categories []
                :media-types []
                :regions []
                :sports []
                :nav nil
                :sort-key :newest-first
                :settings (:settings app-state)}]
    (assoc params :keywords keywords)))

(defn- validate [form]
  (let [row-checks [{:message #(str "You have not selected a Position for Row #" % ". Select a Position to proceed.")
                     :test #(str/blank? (:position %))}
                    {:message #(str "You have not identified the behavior type for Row #" % ". Select a Behavior to proceed.")
                     :test #(-> (:type %) name str/blank?)}
                    {:message #(str "The \"URL / Asset ID\" field can't be blank.")
                     :test #(and (-> (:type %) name str/blank?)
                                 (str/blank? (:url-or-itemid %)))}
                    {:message #(str "You have entered an invalid asset ID for Row #" % ". IDs must have the format \"tag:reuters.com,2015:newsml_[ID]\"")
                     :test #(if (= (:type %) :asset)
                              (not (utils/valid-asset-id? (:url-or-itemid %)))
                              false)}
                    {:message #(str "You have entered an invalid url for Row #" % ". Enter a valid URL to proceed.")
                     :test #(if (or (= (:type %) :url)
                                    (= (:type %) :reuters-tv))
                              (not (re-matches #"^(https?://)?([-\w\.]+)+(:\d+)?(/([\w/_\-\.]*(\?\S+)?)?)?" (:url-or-itemid %)))
                              false)}
                    {:message #(str "You have entered an invalid url for Row #" % ". All external URLs must include a protocol (\"http://\" or \"https://\").")
                     :test #(if (or (= (:type %) :url)
                                    (= (:type %) :reuters-tv))
                              (not (re-find #"^https?://" (:url-or-itemid %)))
                              false)}
                    {:message #(str "You have not entered a url for Row #" % ". Enter a URL or Query Params to proceed.")
                     :test #(if (= (:type %) :search)
                              (str/blank? (:url-or-itemid %))
                              false)}
                    {:message #(str "You have entered an invalid url or query-string for Row #" % ". Query-strings must begin with a \"?\" and must be followed by at least one query parameter.")
                     :test #(if (= (:type %) :search)
                              (-> (:url-or-itemid %)
                                  (str/split ,,, #"\?" 2)
                                  (get ,,, 1)
                                  (empty? ,,,))
                              false)}
                    {:message #(str "The \"Path\" for Row #" % " is not formatted correctly.  It should not start with a \"/\"")
                     :test #(if (= (:type %) :path)
                              (utils/not-empty? (re-find #"^/" (:url-or-itemid %)))
                              false)}
                    {:message #(str "You have not entered a description for Row #" % ". Enter a Description to proceed.")
                     :test #(if (or (= (:type %) :url)
                                    (= (:type %) :reuters-tv)
                                    (= (:type %) :search)
                                    (= (:type %) :static))
                              (str/blank? (:description %))
                              false)}
                    {:message #(str "You have not entered a start date for Row #" % ". Select a start date to proceed.")
                     :test #(str/blank? (:start-date %))}
                    {:message #(str "You have not entered an end date for Row #" % ". Select an end date to proceed.")
                     :test #(str/blank? (:end-date %))}
                    {:message #(str "You have entered an end date which occurs prior to the start date for Row #" % ". Select an end date which follows the start date to proceed.")
                     :test #(let [start (-> % :start-date ct-coerce/from-long)
                                  end (-> % :end-date ct-coerce/from-long)]
                              (if (or (utils/not-blank? start)
                                      (utils/not-blank? end))
                                (ct/before? end start)
                                false))}
                    {:message #(str "You have not entered any Display Pages for Row #" % ". Display Pages can not be blank.")
                     :test #(str/blank? (:pages %))}]
        row-errors (map-indexed (fn [idx row]
                                  (keep (fnk [test message]
                                          (when (= (test row) true)
                                            (message (inc idx))))
                                        row-checks))
                                form)
        general-checks [{:message #(mapv (fn [id]
                                           (str "The asset ID \"" id "\" appears multiple times.  Each asset must be unique."))
                                         %)
                         :test (fn [form]
                                 (let [asset-ids (-<> form
                                                      (keep #(when (= (:type %) :asset)
                                                               (:url-or-itemid %))
                                                            <>)
                                                      (frequencies <>)
                                                      (keep (fn [[k v]]
                                                              (when (> v 1)
                                                                k))
                                                            <>))]
                                   [(utils/not-empty? asset-ids) asset-ids]))}]
        general-errors (keep (fnk [test message]
                               (let [[result ids] (test form)]
                                 (when (= result true)
                                   (message ids))))
                             general-checks)]
    (into [] (flatten (conj row-errors general-errors)))))

(defn- make-analytics-data [item]
  {:analytics-data {:position (:position item)
                    :type (:type item)
                    :image-url (:image-url item)
                    :url-or-itemid (:url-or-itemid item)}})

(defn- make-non-asset-props
  ([item] (make-non-asset-props item :fixed-positions-item))
  ([item type] {:id (str "fp-" (:position item))
                :type type}))

(defn- make-pages-list [item]
  {:pages (-<> (:pages item)
               (str/split <> #",")
               (mapv #(str/trim %) <>))})

(defmulti make-item* (fn [item _ _] (:type item)))

(defmethod make-item* :asset [item settings _]
  (merge (:data item)
         (item-overview/build-item (:data item) settings)
         {:fp-data (merge item
                          (make-pages-list item)
                          (make-analytics-data item))}))

(defmethod make-item* :path [item _ _]
  (merge item
         (make-non-asset-props item)
         {:fp-data (merge item
                          (make-pages-list item)
                          (make-analytics-data item))}))

(defmethod make-item* :reuters-tv [item _ account-id]
  (merge item
         (make-non-asset-props item)
         {:fp-data (merge item
                          (make-pages-list item)
                          (make-analytics-data item)
                          {:url-or-itemid (utils/build-url (:url-or-itemid item) {:id account-id})})}))

(defmethod make-item* :search [item _ _]
  (merge item
         (make-non-asset-props item)
         {:fp-data (merge item
                          (make-pages-list item)
                          (make-analytics-data item))}))

(defmethod make-item* :url [item _ _]
  (merge item
         (make-non-asset-props item)
         {:fp-data (merge item
                          (make-pages-list item)
                          (make-analytics-data item))}))

(defmethod make-item* :static [item _ _]
  (merge item
         (make-non-asset-props item :fixed-positions-static)
         {:fp-data (merge item
                          (make-pages-list item)
                          (make-analytics-data item))}))

(defn register-topics []
  (rf/topic :fixed-positions/db
    (fn [db _] (reaction (get-in @db fixed-positions-path))))

  (rf/topic :fixed-positions/to-show
    (fn [db _]
      (let [fp (rf/subscribe [:fixed-positions/db])
            features (rf/subscribe [:preferences/features])
            settings (rf/subscribe [:preferences/settings])
            user-data (rf/subscribe [:preferences/user-data])
            account-id (reaction (:account-id @user-data))]
        (reaction
          (when (:fixed-positions? @features)
            (-<> (:current @fp)
                 (sort-by :position <>)
                 (reduce (fn [carry item]
                           (if (and (= (:type item) :asset)
                                    (nil? (:data item)))
                             carry
                             (conj carry (make-item* item @settings @account-id))))
                         []
                         <>)))))))

  (rf/topic :fixed-positions/working
    (fn [db _]
      (let [fp (rf/subscribe [:fixed-positions/db])]
        (reaction (:working @fp)))))

  (rf/topic :fixed-positions/working-backup
    (fn [db _]
      (let [fp (rf/subscribe [:fixed-positions/db])]
        (reaction (:working-backup @fp)))))
  
  (rf/topic :fixed-positions/rows
    (fn [db _]
      (let [working (rf/subscribe [:fixed-positions/working])]
        (reaction (vals @working)))))

  (rf/topic :fixed-positions/errors
    (fn [db _]
      (let [fp (rf/subscribe [:fixed-positions/db])]
        (reaction (:errors @fp)))))

  (rf/topic :fixed-positions/available-positions
    (fn [_ _]
      (let [rows (rf/subscribe [:fixed-positions/rows])]
        (reaction
          (let [used (mapv #(:position %) @rows)]
            (filter #(not (some #{%} used)) (range 24)))))))

  (rf/topic :fixed-positions/available-types
    (fn [_ _]
      (reaction item-types)))

  (rf/topic :fixed-positions/is-loading?
    (fn [db _]
      (let [fp (rf/subscribe [:fixed-positions/db])]
        (reaction (:is-loading? @fp)))))

  (rf/topic :fixed-positions/is-processing?
    (fn [db _]
      (let [fp (rf/subscribe [:fixed-positions/db])]
        (reaction (:is-processing? @fp)))))

  (rf/topic :fixed-positions/has-edits?
    (fn [_ _]
      (let [working (rf/subscribe [:fixed-positions/working])
            working-backup (rf/subscribe [:fixed-positions/working-backup])]
        (reaction (not= (remove-empty-items @working) @working-backup)))))

  (rf/topic :fixed-positions/is-uploading?
    (fn [_ _]
      (let [rows (rf/subscribe [:fixed-positions/rows])]
        (reaction (utils/not-nil? (some #(= (:image-url %) :loading) @rows))))))

  (rf/topic :fixed-positions/is-in-preview?
    (fn [db _]
      (let [fp (rf/subscribe [:fixed-positions/db])]
        (reaction (:is-in-preview? @fp))))))

(defn register-handlers []
  (rf/handler :fixed-positions/initialize-db
    (mw/path fixed-positions-path)
    (mw/after (fn [db _]
                (rf/dispatch [:admin/register-component {:db fixed-positions-path
                                                         :label "Fixed Positions"
                                                         :view view/manager
                                                         :open [:fixed-positions/open]
                                                         :close [:fixed-positions/close]}])))
    (fn [_ [_ fixed-positions]]
      (merge empty-db {:current fixed-positions
                       :current-backup fixed-positions})))

  (rf/handler :fixed-positions/open
    (mw/path fixed-positions-path)
    (mw/after (fn [db [event]]
                (when (empty? (:errors db))
                  (service/fetch event #(fixed-positions-api/fetch)))))
    (fn [db _]
      (assoc db :is-loading? true)))

  (rf/handler :fixed-positions/open-ok
    (mw/path fixed-positions-path)
    (mw/after (fn [db _]
                (when (empty? (:working db))
                  (rf/dispatch [:fixed-positions/new]))))
    (fn [db [_ data]]
      (let [fixed-positions (build-lookup data)]
        (assoc db :working fixed-positions
                  :working-backup fixed-positions
                  :is-loading? false))))

  (rf/handler :fixed-positions/open-err
    (mw/path fixed-positions-path)
    (fn [db _]
      (assoc db :is-loading? false)))

  (rf/handler :fixed-positions/close
    (mw/path fixed-positions-path)
    (mw/after (fn [db _]
                (cond
                  (:is-processing? db) (view/open-modal :is-processing)
                  (not= (:working db) (:working-backup db)) (view/open-modal :has-unsaved-changes)
                  (:is-in-preview? db) (view/open-modal :is-in-preview)
                  :else (rf/dispatch [:admin/unset-selected]))))
    (fn [db _]
      (let [working (remove-empty-items (:working db))
            working-backup (:working-backup db)]
        (cond ; order matters - unsaved changes applies both in an out of preview
          (:is-processing? db) db
          (not= working working-backup) db
          (:is-in-preview? db) db
          :else (assoc db :working working-backup
                          :errors [])))))

  (rf/handler :fixed-positions/reset-and-close
    (mw/path fixed-positions-path)
    (mw/after (fn [_ _]
                (rf/dispatch [:fixed-positions/close])
                (rf/dispatch [:modal/close])))
    (fn [db _]
      (merge empty-db {:working (:working-backup db)
                                 :working-backup (:working-backup db)
                                 :current (:current-backup db)
                                 :current-backup (:current-backup db)})))

  (rf/handler :fixed-positions/new
    (mw/path fixed-positions-path)
    (fn [db _]
      (let [id (-> (:working db) keys last inc)
            new-item (assoc empty-item :id id)]
        (-> db
            (assoc-in ,,, [:working id] new-item)
            (?> (nil? (:working-backup db)) (assoc ,,, :working-backup {}))))))

  (rf/handler :fixed-positions/update
    (mw/path fixed-positions-path)
    (fn [db [_ id field value]]
      (assoc-in db [:working id field] value)))
  
  (rf/handler :fixed-positions/update-date
    (mw/path fixed-positions-path)
    (fn [db [_ id field value]]
      (let [current-timestamp (get-in db [:working id field])
            current-datetime (when (utils/not-nil? current-timestamp)
                               (ct-coerce/from-long current-timestamp))
            new-timestamp (-> value
                              (ct-coerce/from-long ,,,)
                              (?> (utils/not-nil? current-datetime) (doto ,,,
                                                                      (.setHours ,,, (ct/hour current-datetime))
                                                                      (.setMinutes ,,, (ct/minute current-datetime))))
                              (ct-coerce/to-long ,,,))]
        (assoc-in db [:working id field] new-timestamp))))

  (rf/handler :fixed-positions/update-time
    (mw/path fixed-positions-path)
    (fn [db [_ id field value]]
      (let [current-timestamp (or (get-in db [:working id field])
                                  (ct-coerce/to-long (ct/now)))
            new-timestamp (-<> current-timestamp
                               (ct-coerce/from-long <>)
                               (ct/at-midnight <>)
                               (ct/plus <> (ct/period :minutes value))
                               (ct-coerce/to-long <>))]
        (assoc-in db [:working id field] new-timestamp))))
  
  (rf/handler :fixed-positions/delete
    (mw/path fixed-positions-path)
    (fn [db [_ id]]
      (-<> db
           (assoc <> :errors [])
           (utils/dissoc-in <> [:working id]))))

  (rf/handler :fixed-positions/upload
    (mw/path fixed-positions-path)
    (mw/after (fn [db [event id file]]
                (when (empty? (:errors db))
                  (service/fetch event #(fixed-positions-api/upload file) id))))
    (fn [db [_ id file]]
      (if (not= (js/encodeURIComponent (.-name file)) (.-name file))
          (assoc db :errors [(str "The filename (\"" (.-name file) "\") contains unescaped characters (e.g \"+\", \"\\\", \"@\").")])
          (-<> db
               (assoc-in <> [:working id :image-url] :loading)
               (assoc <> :errors [])))))

  (rf/handler :fixed-positions/upload-ok
    (mw/path fixed-positions-path)
    (fn [db [_ data id]]
      (assoc-in db [:working id :image-url] (js/encodeURI (:url data)))))

  (rf/handler :fixed-positions/upload-err
    (mw/path fixed-positions-path)
    (fn [db [_ status data id]]
      (-<> db
           (assoc-in <> [:working id :image-url] nil)
           (assoc <> :errors ["There was a problem uploading your image.  See the browser console for details."]))))

  (rf/handler :fixed-positions/url-or-id-blur
    (mw/path fixed-positions-path)
    mw/side-effect
    (fn [db [_ id]]
      (let [item (get-in db [:working id])
            url-or-itemid (:url-or-itemid item)
            should-fetch-asset? (and (= (:type item) :asset)
                                     (utils/not-empty? (str/trim url-or-itemid))
                                     (or (empty? (:data item))
                                         (not= (get-in item [:data :id]) url-or-itemid)))
            should-trim-url? (and (= (:type item) :search)
                                  (utils/not-empty? (str/trim url-or-itemid)))]
        (cond
          should-fetch-asset? (rf/dispatch [:fixed-positions/fetch-asset-data id])
          should-trim-url? (rf/dispatch [:fixed-positions/trim-search-url id])
          :else nil))))

  (rf/handler :fixed-positions/fetch-asset-data
    (mw/after (fn [db [event id]]
                (let [fp-db (get-in db fixed-positions-path)]
                  (when (= (get-in fp-db [:working id :data :is-loading?]) true)
                    (let [url-or-itemid (get-in fp-db [:working id :url-or-itemid])
                          search-params (get-search-params db url-or-itemid)]
                      (service/fetch event #(service/raw-search search-params) id url-or-itemid))))))
    (fn [db [_ id]]
      (let [url-or-itemid (get-in db (conj fixed-positions-path :working id :url-or-itemid))]
        (if (not (utils/valid-asset-id? url-or-itemid))
            (assoc-in db (conj fixed-positions-path :errors) [(str "\"" url-or-itemid "\" does not appear to be a valid asset-id")])
            (-<> db
                 (assoc-in <> (conj fixed-positions-path :working id :data) {:is-loading? true})
                 (assoc-in <> (conj fixed-positions-path :is-processing?) true))))))

  (rf/handler :fixed-positions/fetch-asset-data-ok
    (mw/path fixed-positions-path)
    (fn [db [_ data id asset-id]]
      (let [result (get-in data [:results :result 0])]
        (if (nil? result)
          (-<> db
               (assoc <> :errors [(str "No asset found with the ID \"" asset-id "\"")]
                         :is-processing? false)
               (assoc-in <> [:working id :is-loading?] false))
          (let [end-date (get-in db [:working id :end-date])
                new-end-date (-> result
                                 (:dateCreated ,,,)
                                 (ct-coerce/from-long ,,,)
                                 (ct/plus ,,, (ct/days 30))
                                 (ct-coerce/to-long ,,,))]
            (-> db
                (assoc ,,, :errors []
                           :is-processing? false)
                (assoc-in ,,, [:working id :data] result)
                (?> (nil? end-date) (assoc-in ,,, [:working id :end-date] new-end-date))))))))

  (rf/handler :fixed-positions/fetch-asset-data-err
    (mw/path fixed-positions-path)
    (fn [db [_ data id]]
      (-<> db
           (assoc <> :errors ["There was a problem connecting to the server. Please try again."]
                     :is-processing? false)
           (assoc-in <> [:working id :data :is-loading?] false))))

  (rf/handler :fixed-positions/trim-search-url
    (mw/path fixed-positions-path)
    (fn [db [_ id]]
      (let [url-or-itemid (get-in db [:working id :url-or-itemid])
            [_ query-str] (str/split url-or-itemid #"\?" 2)
            query (str "?" query-str)]
        (if (and (utils/not-empty? query-str)
                 (not= query url-or-itemid))
          (assoc-in db [:working id :url-or-itemid] query)
          db))))

  (rf/handler :fixed-positions/submit-confirm
    mw/side-effect
    (fn [_ _]
      (view/open-modal :submit-comfirmation)))

  (rf/handler :fixed-positions/submit
    (mw/path fixed-positions-path)
    (mw/after (fn [db [event]]
                (rf/dispatch [:modal/close])
                (when (empty? (:errors db))
                  (service/fetch event #(fixed-positions-api/save (vals (:working db)))))))
    (fn [db _]
      (let [working (remove-empty-items (:working db))
            errors (-> working vals validate)]
        (if (utils/not-empty? errors)
          (assoc db :errors errors)
          (assoc db :errors nil
                    :is-processing? true
                    :working working)))))

  (rf/handler :fixed-positions/submit-ok
    (mw/path fixed-positions-path)
    (mw/after (fn [_ _]
                (view/open-modal :submit-success)))
    (fn [db _]
      (assoc db :is-processing? false
                :working-backup (:working db))))

  (rf/handler :fixed-positions/submit-err
    (mw/path fixed-positions-path)
    (mw/after (fn [_ _]
                (rf/dispatch [:modal/close])))
    (fn [db [_ status data]]
      (assoc db :is-processing? false
                :errors [(str "the server returned the following message: " data)])))

  (rf/handler :fixed-positions/preview
    (mw/path fixed-positions-path)
    (fn [db _]
      (let [working (remove-empty-items (:working db))
            errors (-> working vals validate)]
        (if (utils/not-empty? errors)
          (assoc db :errors errors)
          (assoc db :is-in-preview? true
                    :errors []
                    :current (vals working))))))

  (rf/handler :fixed-positions/exit-preview
    (mw/path fixed-positions-path)
    (fn [db _]
      (assoc db :is-in-preview? false
                :current (:current-backup db))))

  (rf/handler :fixed-positions/click
    (mw/after (fn [_ [_ item]]
                (rf/dispatch [:fixed-positions/analytics-event item])))
    mw/side-effect
    (fn [db [_ item]]
      (let [url (:url-or-itemid item)]
        (case (:type item)
          :search (router/set-query-str url)
          :path (rf/dispatch [:nav/go-to (nav-utils/url-to-path (get-in db [:nav :items]) url)])
          nil))))

  (rf/handler :fixed-positions/analytics-event
    mw/side-effect
    (fn [db [_ item]]
      (let [view (get-in db [:view-type :selected])
            analytics-data (:analytics-data item)
            type (:type analytics-data)
            image-url (:image-url analytics-data)
            labels [(str "position = " (-> analytics-data :position inc))
                    (str "type = " (name type))
                    (str "view = " (name view))
                    (cond
                      (and (not (= type :url))
                           (not (= type :reuters-tv))) "image = n/a"
                      (and (= view :grid)
                           (utils/not-nil? image-url)) (str "image = " (utils/get-file-name image-url))
                      (and (= view :list)
                           (utils/not-nil? image-url)) (str "image = not shown")
                      :else "image = empty")]]
        (doseq [label labels]
          (analytics-utils/report-event {:category "Fixed Positions"
                                         :action (:url-or-itemid analytics-data)
                                         :label label
                                         :options nil}))))))

(defn init [fixed-positions]
  (defn reset []
    (register-topics)
    (register-handlers))

  (reset)

  (rf/dispatch-sync [:fixed-positions/initialize-db fixed-positions]))

(defn get-ns []
  (namespace ::x))
