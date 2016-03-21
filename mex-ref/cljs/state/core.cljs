(ns mex.state.core
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [clojure.set :as set]
            [clojure.walk :as walk]
            [cljs-time.format :as ct-format]
            [mex.types :as types]
            [mex.utils.core :as utils]
            [mex.utils.local-storage :as local-storage]
            [mex.utils.session-storage :as session-storage]
            [plumbing.core :refer-macros [defnk]]
            [reagent.core :as reagent]))

(defonce app-state (reagent/atom {}))

(defonce empty-download {:approved? false
                         :data nil})

(defonce empty-selected-item {:id nil
                              :status :init ; loading status of the selected item
                              :set-on-close nil ; item to return to - for package items navigation on mobile only
                              :download empty-download})

(def features (reaction (:features @app-state)))

(defn has-features? [& args]
  (every? true? ((apply juxt args) @features)))

(defn get-setting
  ([k]   (get-setting k nil))
  ([k v] (get-in @app-state (into [:settings] (if (seq? k) k [k])) v)))

(defn get-user-data [preferences]
  (let [user (:user preferences)]
    (assoc (select-keys user [:first-name :last-name :email :from-the-us? :id :account-id :account-manager-email :roles])
           :name (str (:first-name user) " " (:last-name user))
           :rss? (:rss? preferences))))

(defn get-user-settings [preferences]
  (select-keys preferences [:channels :content-server-url :cdn-url :confirm-registration-url :date-format :date-formatter
                            :datetime-formatter :download-counter :finalize-registration-url :forgot-password-url
                            :hash :help-url :latest-version-only? :login-url :media-types :paid-channels
                            :public-channels :redirect? :redirect-url :registerartion-url :sponsored-channels
                            :timezone-offset :update-password-url :felytics-url]))

(defn get-nav-items [nav-items]
  (when (utils/not-empty? nav-items)
    (as-> nav-items <>
          (walk/postwalk (fn [item]
                           (if (:title item)
                             (assoc item :slug (utils/slugify (:title item)))
                             item)) <>)
          (update-in <> [0] assoc :selected? true :default? true))))

(defnk date-filter [{selected nil} {from-date nil} {to-date nil} {formatter nil} {timezone-offset nil}]
  (let [formatter (or formatter (get-setting :date-formatter))
        timezone-offset (or timezone-offset (get-setting :timezone-offset))]
    (if (has-features? :reva?)
      (types/->DateFilter [(types/->DateRange {:from from-date :to to-date} 
                                              formatter
                                              timezone-offset)
                           (types/->DateYear :all [:all])]
                          (or selected :year)
                          :year)
      (types/->DateFilter [(types/->DateKeyword "1 Hour" :last-hour)
                           (types/->DateKeyword "24 Hours" :last-day)
                           (types/->DateKeyword "7 Days" :last-week)
                           (types/->DateKeyword "30 Days" :thirty-days)
                           (types/->DateKeyword "All Available" :all-available)
                           (types/->DateRange {:from from-date :to to-date}
                                              formatter
                                              timezone-offset)]
                          (or selected :all-available)
                          :all-available))))

(defn get-view-type-key [reva?]
  ; store view type per page since we don't want to mix reva and all view type preferences
  (str (if reva? "reva" "mex") "-" "view-type"))

(defn- get-default-view-type [reva?]
  (if-let [view-type (local-storage/get-item (get-view-type-key reva?))]
    view-type
    :grid))

(defn- get-default-package-view-type []
  (if-let [view-type (local-storage/get-item "package-view-type")]
    view-type
    :grid))

(defn- get-common-state [reva? no-channels? page-size location-services-url settings]
  (let [features (:features settings)]
    (-> {:features features
         :sidebar-open? true
         :reva? reva?
         :mobile? false
         :location-services-url location-services-url
         :nav {:open? false :items []}
         :page-size page-size
         :last-sync {:search :loading
                     :item :init
                     :load-more :init
                     :save-search :init
                     :preferences (if no-channels? :no-channels :success)}
         :selected empty-selected-item
         :page-visible? true
         :view-type {:selected (get-default-view-type reva?)}
         :olr-view-type (if (:open-mex? features) :all :top-10)
         :package-view-type (get-default-package-view-type)
         :user-data (get-user-data (:preferences settings))
         :drawers {:nav-open? false
                   :search-open? false}
         :scrolling-enabled? true
         :collections nil
         :modal nil
         :visited-items (or (session-storage/get-item :visited) [])})))

(defn get-preferences [user-data features]
  (let [{:keys [first-name last-name roles rss?]} user-data
        params {:bodyClass "redesign-iframe"}
        available {:name {:title (:name user-data)
                          :url (utils/build-url "/settings/newsFeeds" params)
                          :open-in-modal? true
                          :reload-when-done? true}
                   :account-information {:title "Account Information"
                                         :url (utils/build-url "/settings/account" params)
                                         :open-in-modal? true
                                         :reload-when-done? false}
                   :applications {:title "Applications"
                                  :url (utils/build-url "/settings/applications" params)
                                  :open-in-modal? true
                                  :reload-when-done? false}
                   :display-information {:title "Display Information"
                                         :url (utils/build-url "/settings/display" params)
                                         :open-in-modal? true
                                         :reload-when-done? true}
                   :email-alerts {:title "Email Alerts"
                                  :url (utils/build-url "/settings/alerts" params)
                                  :open-in-modal? true
                                  :reload-when-done? false}
                   :email-schedules {:title "Email Schedules"
                                     :url (utils/build-url "/settings/schedules" params)
                                     :open-in-modal? true
                                     :reload-when-done? false}
                   :news-feeds {:title "News feeds"
                                :url (utils/build-url "/settings/newsFeeds" params)
                                :open-in-modal? true
                                :reload-when-done? true}
                   :rss {:title "RSS Configuration"
                         :url (utils/build-url "/settings/rss" params)
                         :open-in-modal? true
                         :reload-when-done? false}
                   :sign-out {:title "Sign out"
                              :url "/logout"
                              :open-in-modal? false
                              :local-logout? (:open-mex? features)
                              :reload-when-done? true}}
        permissioned (set/union #{:name :sign-out} (:preferences features))
        xform (comp (filter #(contains? permissioned %)) (map #(get available %)))
        order [:name :account-information :applications :display-information :email-alerts :email-schedules :news-feeds
               :rss :sign-out]]
    (into [] xform order)))

(defn get-init-state [reva? no-channels? page-size settings]
  (let [preferences (:preferences settings)
        common-state (get-common-state reva?
                                       no-channels?
                                       page-size
                                       (:location-services-url preferences)
                                       settings)
        user-settings (get-user-settings preferences)
        features (:features settings)]
    (if reva?
      (-> common-state
          (assoc ,,, :preferences nil
                     :clock? false
                     :help-url (:help-url user-settings)
                     :settings user-settings))
      (-> common-state
          (assoc ,,, :preferences (when-not (:sign-in-or-register? features)
                                    (get-preferences (:user-data common-state) features))
                     :clock? (not (:open-mex? features))
                     :help-url (:help-url user-settings)
                     :settings user-settings)))))
