(ns mex.service.connect
  (:require-macros [cljs.core.async.macros :refer [go]]
                   [mex.macros.core :refer [-<>]])
  (:require [cljs-time.core :as ct]
            [cljs-time.format :as ct-format]
            [cljs.core.async :as async :refer [<! alts! chan]]
            [clojure.string :as str]
            [clojure.set :as set]
            [mex.re-frame :as rf]
            [mex.state.core :as state]
            [mex.service.item-detail :as item-detail]
            [mex.service.item-overview :as item-overview]
            [mex.syntax.search :as search-syntax]
            [mex.types :as types]
            [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [mex.utils.http :as http-utils]
            [plumbing.core :refer-macros [defnk fnk letk ?>]])
  (:import goog.crypt.base64))

(defn- get-facet-query [facet]
  (when (utils/not-empty? facet)
    (let [facet (map name facet)]
      (if (> (count facet) 1)
          (str "(" (str/join " OR " facet) ")")
          (str/join "" facet)))))

(defn- get-facets-query [categories regions]
  (let [facets-query-parts (vector (get-facet-query categories) (get-facet-query regions))
        facets-query-parts (filter some? facets-query-parts)]
    (when (utils/not-empty? facets-query-parts)
      (str "+topic:" (str/join " AND " facets-query-parts)))))

(defn- is-exact-search? [keywords]
  (let [keywords (str/trim keywords)]
    (and (= (first keywords) \")
         (= (last keywords) \"))))

(let [anpa-regex (re-pattern "^[a-fikln-zA-FIKLN-Z]$")]
  (defn- is-anpa-code? [keywords]
    (re-find anpa-regex (str/trim keywords))))

(defn- get-keywords-query [keywords search-type]
  (let [search-field (utils/get-search-field search-type)]
    (when (and (not= search-type :channel)
               (utils/not-blank? keywords)
               (some? search-field))
      (if (is-anpa-code? keywords)
        (str "+topic:" "a1312cat\\:" (str/trim keywords) " OR MCC\\:" (str/trim keywords))
        (str "+" search-field ":" (-> keywords search-syntax/validator :keywords))))))

(defn- get-search-query [keywords search-type categories regions sports nav]
  (let [query-parts (vector (get-keywords-query keywords search-type)
                            (get-facets-query categories regions)
                            (when (utils/not-empty? sports)
                              (str "+slug:(" (str/join " OR " sports) ")"))
                            (get nav :search-query)
                            "-topic:OCC\\:OLRLNK")
        query-parts (filter some? query-parts)]
    (when (utils/not-empty? query-parts)
      (str/join "||" query-parts))))

(let [date-formatter (ct-format/formatter "yyyy.MM.dd.HH.mm")
      date-formatter-with-milliseconds (ct-format/formatter "yyyy.MM.dd.HH.mm.ss.SSS")]
  (defn- format-date-for-search [date use-index-timestamp-field?]
    (let [formatter (if use-index-timestamp-field? date-formatter-with-milliseconds date-formatter)]
      (ct-format/unparse formatter date))))

(defn- get-date-range [from-date to-date use-index-timestamp-field?]
  (when from-date
    (let [from (format-date-for-search from-date use-index-timestamp-field?)
          to (when to-date (format-date-for-search to-date use-index-timestamp-field?))]
      (str from (when to (str "-" to))))))

(defn- get-media-types [media-types user-media-types]
  (if (utils/not-empty? media-types)
    (str/join "," media-types)
    user-media-types))

(defn- get-channels [nav user-channels]
  (if-let [channels (get nav :channels)]
    channels
    user-channels))

(defnk build-search-url [keywords search-type media-types categories regions sports from-date to-date {cursor "*"}
                         page-size sort-key {nav nil} {only-id-fields? false} 
                         [:settings channels latest-version-only? [:media-types :as user-media-types]]]
  (let [reva? (state/has-features? :reva?)
        use-index-timestamp-field? (not reva?)
        date-range-field (if use-index-timestamp-field? :ts :dateRange)
        sort-field (if use-index-timestamp-field? "ts" "date")

        params {:channel (if (and (= search-type :channel)
                                  (utils/not-blank? keywords))
                           keywords
                           (get-channels nav channels))
                :facet (if reva? "true" "false")
                :mediaType (get-media-types (or (get nav :media-types) media-types)
                                            user-media-types)
                :sort ({:newest-first sort-field :oldest-first (str sort-field "_asc")} sort-key)
                :cursorMark cursor
                :fieldsRef (if only-id-fields? "id" "all")
                :newSolr true
                :token (utils/get-login-cookie)
                :removeDuplicates latest-version-only?
                :limit page-size}
        query (get-search-query keywords search-type categories regions sports nav)
        alert-query? (and (= keywords "ALERT")
                          (= search-type :slug))
        date-range (get-date-range from-date to-date use-index-timestamp-field?)
        params (-> params
                   (?> date-range) (assoc ,,, date-range-field date-range)
                   (?> (= "all" (params :fieldsRef)) (assoc ,,, :fragmentLength 300))
                   (?> alert-query? (assoc ,,, :priority 1
                                               :mediaType "T"))
                   (?> (and (not alert-query?)
                            (some? query)) (assoc ,,, :q query)))
        additional-params (when-let [additional (get nav :additional-search-params)]
                            (utils/query-params-str->map additional))]
    ; Notice: Returning a [url, params-map] pair
    [(utils/build-url "/search-api" {:token (utils/get-login-cookie)})
     (merge params additional-params)]))

(defn- get-years [years]
  ; for some reason, the  year "2" appears in the list
  (when-let [years (filter (fn [[k _]]
                             (= (count (name k)) 4))
                           years)]
    (-> years
        keys
        sort
        reverse)))

(defn- stringify-facets-keys [facets]
  (into {} (map (fn [[code count]]
                  [(utils/keyword->str code) count])
                facets)))

(defn- get-media-types-counts
  "Get the media types counts as a map. Since we get percentages from the API and those are rounded
   up since we don't care about exact number only if there is more than one"
  [media-types-percents num-of-results]
  (let [counts (map (fn [[media-type percent]]
                      [(utils/keyword->str media-type) (utils/get-num-by-percent percent num-of-results true)])
                    media-types-percents)]
    (into {} counts)))

(defn build-result-items [results settings]
  (mapv #(item-overview/build-item % settings) results))

(defn- build-search-result [results settings]
  (letk [[[:results {result []} numFound mediaTypeBreakdownPercent {facet nil} {nextCursorMark nil}]] results]
    {:data (build-result-items result settings)
     :count numFound
     :cursor nextCursorMark
     :years (get-years (get facet :year))
     :media-types (get-media-types-counts mediaTypeBreakdownPercent numFound)
     :categories (stringify-facets-keys (get facet :category))
     :regions (stringify-facets-keys (get facet :region))}))

(defnk build-item-ids-only [[:results result]]
  (map :id result))

(defn- build-paginate-result [results settings]
  (letk [[[:results {result nil} {nextCursorMark nil}]] results]
    {:data (when result 
             (build-result-items result settings))
     :cursor nextCursorMark}))

(defnk build-usage-result [total used downloaded-items]
  {:downloads-left (- total used)
   :downloaded (into #{} (keys downloaded-items))})

(defn remote-call-handler
  ([url format] (remote-call-handler url format identity))
  ([url format build-result-fn] (remote-call-handler url format build-result-fn nil))
  ([url format build-result-fn data] (remote-call-handler url format build-result-fn data nil))
  ([url format build-result-fn data content-type]
    (let [ch (chan 1)]
      (go
        (letk [[status data] (<! (if data 
                                   (http-utils/post url format data content-type)
                                   (http-utils/get url format)))]
          (if (= :success status)
            (utils/put-and-close! ch (types/->AsyncMsg :success (build-result-fn data)))
            (utils/put-and-close! ch (types/->AsyncMsg status data)))))
      ch)))

(defn get-text [url]
  (remote-call-handler url :text))

(defn- passed-pagination-limit []
  (let [ch (chan 1)]
    (utils/put-and-close! ch (types/->AsyncMsg :error :passed-pagination-limit))
    ch))

(defn sign-in [url data]
  (let [updated-data{:username (:email data)
                     :password (:password data)}
        url (utils/build-url url updated-data)
        parse-result #(second (re-find #"<token>([^<]+)</token>" %))]
    (remote-call-handler url :text parse-result)))

(defn registration [url data]
  (let [data {:email (:email data)
              :password (:password data)
              :g-recaptcha-response (:captcha data)}
        parse-result (fn [x]
                       {:email (:email data)
                        :status (if (= "0" (:value x))
                                  :success
                                  (get x :status "Unexpected error."))})]
    (remote-call-handler url :json parse-result data :form)))

(defn registration-final [url get-params data]
  (let [post-params (-> (select-keys data [:first-name :last-name :company
                                           :job :website :phone])
                        (set/rename-keys ,,, {:first-name :firstname
                                              :last-name :lastname
                                              :company :organisation
                                              :job :title})
                        (assoc ,,, :contentProfiles [(name (:interest data))]
                                   :websiteVisitorCount (name (:visit-count data))
                                   :countryId (js/parseInt (name (:country data)) 10)))
        parse-result (fn [response]
                       {:user-id (:user-id data)
                        :status (if (=  "0" (:value response)) :success :error)
                        :message (get response :status "Unexpected error.")})
        out-url (utils/build-url url get-params)]
    (remote-call-handler out-url :json parse-result post-params :form)))

(defn- parse-forgot-password-result [x]
  {:message (get x :status "Unexpected error.")
   :status (if (= "0" (:value x))
             :success
             (get x :status "Unexpected error."))})

(defn forgot-password [url data]
  (remote-call-handler (utils/build-url url data) :json parse-forgot-password-result {} :form))

(defnk raw-search [search-type keywords media-types categories regions from-date to-date page-size sort-key settings
                   {nav nil} :as params]
  (let [[url params] (build-search-url (assoc params :cursor "*"))] 
    (remote-call-handler url :json identity params :form)))

(defnk search [search-type keywords media-types categories regions from-date to-date page-size sort-key settings
               {nav nil} :as params]
  (let [[url params] (build-search-url (assoc params :cursor "*"))]
    (remote-call-handler url :json #(build-search-result % settings) params :form)))

(defnk paginate [search-type keywords media-types categories regions from-date to-date page-size sort-key settings
                 {nav nil} cursor :as params]
  (let [[url params] (build-search-url params)]
    (remote-call-handler url :json #(build-paginate-result % settings) params :form)))

(defnk get-new-items [search-type keywords media-types categories regions from-date to-date page-size sort-key
                      {nav nil} :as params]

  (let [[url params] (build-search-url (assoc params :only-id-fields? true
                                                     :cursor "*"))]
    (remote-call-handler url :json build-item-ids-only params :form)))

(defn get-item [id settings]
  (remote-call-handler (utils/build-url (str "/api/item/" id) {:hash (:hash settings)})
                       :transit
                       #(item-detail/build-item (:item %) settings)))

(defn get-items [channel ids-or-mediatype settings from-date to-date]
  (let [ids (when-not (string? ids-or-mediatype) ids-or-mediatype)
        media-type (when (string? ids-or-mediatype) ids-or-mediatype)
        query-params (-> {:channel channel
                          :newSolr true
                          :limit 10
                          :fieldsRef "all"
                          :fragmentLength 300
                          :ts (get-date-range from-date to-date true)}
                         (?> (utils/not-empty? ids) (assoc ,,, :q (-<> (mapv #(str "id:\"" % "\"") ids)
                                                                       (interpose "||" <>)
                                                                       (str/join "" <>))))
                         (?> (utils/not-empty? media-type) (assoc ,,, :mediaType media-type
                                                                      :removeDuplicates true)))]
    (remote-call-handler (utils/build-url "/search-api" {:token (utils/get-login-cookie)})
                         :json
                         #(build-search-result % settings)
                         query-params
                         :form)))

(defn delete-item [id]
  (remote-call-handler (str "/api/item/delete/" id) :transit identity {}))

(defn get-download-usage []
  (remote-call-handler "/api/usage" :transit build-usage-result))

(defn count-item-download [url]
  (remote-call-handler url
                       :transit
                       (fn [result]
                         (assoc result :usage (build-usage-result (:usage result))))))

(defn get-olr-top-10-ids [channel]
  (let [url (utils/build-url "/packages" {:useSNEP true
                                          :channel channel
                                          :token (utils/get-login-cookie)})]
    (remote-call-handler url :json (fn [data]
                                     (keep #(:id %)
                                           (:results data))))))

(defn get-olr-top-10 [channel settings]
  (let [ch (async/chan 1)]
    (go 
       (letk [[status [:data :as ids] :as result] (async/<! (get-olr-top-10-ids channel))]
         (if (not= status :success)
           (utils/put-and-close! ch result)
           (let [from-date (-> 30 ct/days ct/ago)
                 to-date (-> 1 ct/seconds ct/ago)
                 result (async/<! (get-items channel (if (empty? ids) "C" ids) settings from-date to-date))]
             (if (= (:status result) :success)
               (let [order (into {} (map-indexed #(vector %2 %1) ids))
                     sorted (update-in result [:data :data] #(sort-by (fn [item]
                                                                        (get order (:id item)))
                                                                      %))]
                 (utils/put-and-close! ch sorted)
                 (utils/put-and-close! ch result)))))))
    ch))

(defn build-saved-searches [saved-searches]
  (mapv (fnk [title query mediatype daterange]
          (utils/compact {:title title
                          :search query
                          :media-types (when mediatype (into #{} (str/split mediatype #",")))
                          :dates daterange
                          :anchor (when mediatype :media-types)}))
        saved-searches))

(defnk save-search [title media-types daterange query]
  (remote-call-handler "/api/saved-searches"
                       :transit 
                       build-saved-searches 
                       {:title title
                        :mediatype (when media-types (str/join "," media-types))
                        :daterange daterange
                        :query query}))

(defn delete-saved-search [saved-search]
  (remote-call-handler (str "/api/saved-searches/delete/" (js/encodeURI (:title saved-search)))
                       :transit 
                       identity
                       {}))

(defn undelete-saved-search [saved-search]
  (remote-call-handler (str "/api/saved-searches/undelete/" (js/encodeURI (:title saved-search)))
                       :transit 
                       identity
                       {}))

(defn- build-preferences [preferences reva?]
  (let [date-formats {"MM/DD/YY" "MM/dd/yyyy"
                      "DD/MM/YY" "dd/MM/yyyy"}
        time-formats {"12 HR(AM/PM)" "hh:mm A"
                      "24 HR" "HH:mm"}
        date-format (get date-formats (preferences :date-format))
        time-format (get time-formats (preferences :time-format))
        datetime-format (if reva? date-format (str date-format " " time-format))
        timezone-offset (if (get-in preferences [:timezone :local-time?])
                          (-> (new js/Date) .getTimezoneOffset (/ ,,, 60) (* ,,, -1))
                          (/ (get-in preferences [:timezone :offset]) 60 60 1000))]
    (-> preferences
        (?> reva? (merge (dissoc preferences :reva) (:reva preferences)))
        (assoc ,,,
               :reva? reva?
               :date-formatter (ct-format/formatter date-format)
               :datetime-formatter (ct-format/formatter datetime-format)
               :timezone-offset timezone-offset))))

(let [chat-params {:chatUrl (str (utils/get-page-base-url) "/ask/video/live")
                   :chatWindowParams "toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=610,height=600"}
      chat-params-str (utils/query-params-map->str chat-params)]
  (defn build-nav-items [items]
    (mapv (fn [item]
            (assoc (merge {:additional-search-params nil
                           :channels []
                           :children []
                           :mediatype nil
                           :new-window? false
                           :search-query nil
                           :title nil
                           :video? false}
                          (select-keys item [:channels :additional-search-params :search-query :video? :live-video? 
                                             :reva-video? :olr? :collection? :collections-manager? :collection-id
                                             :id :slug :action-images?]))
                   :title (str/trim (or (:title item) "All"))
                   :media-types (when (utils/not-empty? (:mediatype item))
                                  (str/split (:mediatype item) #","))
                   :url (cond
                          (:reva-video? item) (str (:url item) (utils/get-page-suffix))
                          (:live-video? item) (str (:url item) "&" chat-params-str)
                          :else (:url item))
                   :open-in-new-page? (:new-window? item)
                   :selected? (or (:selected? item) false)
                   :prevent-default? (if (some? (:prevent-default? item))
                                       (:prevent-default? item)
                                       (not (:new-window? item)))
                   :open? false
                   :items (build-nav-items (:children item))))
           items)))

(defn- add-sign-out-to-nav [nav-items]
  (when nav-items
    (into (vec nav-items) [{:prevent-default? false
                            :title "Sign Out"
                            :url "/logout"
                            :id "sign-out"}])))

(defn add-collections-to-nav [nav-items collections-items]
  (when nav-items
    (if-not collections-items
      nav-items
      (let [children (-<> []
                          (conj <> {:title "Manage Collections"
                                    :slug "manage-collections"
                                    :collections-manager? true})
                          (apply conj <> (map (fn [item] {:title (:title item)
                                                          :slug (-> item :title utils/slugify)
                                                          :collection-id (:id item)})
                                              collections-items)))]
        (map (fn [nav-item]
               (if-not (:collection? nav-item)
                 nav-item
                 (assoc nav-item :children children
                                 :slug "collections"
                                 :id "collections")))
             nav-items)))))

(defn get-settings* [reva? only-preferences?]
  (remote-call-handler (utils/build-url "/api/settings" {:reva reva?
                                                         :only_preferences only-preferences?})
                       :transit
                       (fn [settings]
                         {:preferences (build-preferences (:preferences settings) reva?)
                          :reva? reva?
                          :features (assoc (:features settings)
                                            :reva? reva?
                                            :lynx-drag-drop? (some #(= % :ROLE_MEX_DRAG_AND_DROP)
                                                                   (-> settings :preferences :user :roles)))
                          :nav-items (-<> (:nav-menu settings)
                                          (add-sign-out-to-nav <>)
                                          (add-collections-to-nav <> (get-in settings [:collections :list]))
                                          (build-nav-items <>))
                          :saved-searches (build-saved-searches (:saved-searches settings))
                          :fixed-positions (:fixed-positions settings)
                          :collections (:collections settings)
                          :vanity-urls (:vanity-urls settings)
                          :contributor-logos (:contributor-logos settings)
                          :labels (:labels settings)})))

(defn get-settings [reva? only-preferences?]
  (let [ch (chan 1)]
    (go
      (let [init-data-ch (get-settings* reva? only-preferences?)
            {:keys [status data]} (<! init-data-ch)]
        (let [channels (get-in data [:preferences :channels])
              no-channels? (and (some? channels)
                                (empty? channels))
              status (cond
                       (and reva? no-channels?) :forbidden
                       no-channels? :no-channels
                       :else status)]
          (utils/put-and-close! ch (types/->AsyncMsg status data)))))
    ch))

(defn get-notification []
  (remote-call-handler "/api/notifications/active" :transit))

(defn fetch [event service-fn & args]
  (go
    (let [success (utils/append-to-keyword event "-ok")
          error   (utils/append-to-keyword event "-err")
          {:keys [status data]} (async/<! (service-fn))]
      (if (= :success status)
        (rf/dispatch (into [success data] args))
        (rf/dispatch (into [error status data] args))))))
