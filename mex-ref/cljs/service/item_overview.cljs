(ns mex.service.item-overview
  (:require-macros [mex.macros.core :refer [-<>]])
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [mex.utils.core :as utils]
            [mex.state.core :as state]
            [plumbing.core :refer-macros [letk]]))

(let [media-type->type {:G :graphic
                        :P :picture
                        :T :text
                        :V :video
                        :C :package}]
  (defn- get-item-type [item]
    (let [media-type (-> item :mediaType keyword)]
      (cond
        (and (= media-type :V) (state/has-features? :schedules-only?)) :script
        (and (= media-type :V) (state/has-features? :reva?)) :reva-video
        (and (= media-type :V) (= (:remoteContentComplete item) false)) :early-access-script
        (and (= media-type :T) (= (:priority item) 1)) :alert
        :else (media-type media-type->type)))))

(defn- get-dimensions [item]
  (let [dimensions-str (or (:dimensions item) "1x1")
        dimensions (str/split dimensions-str #"x" 2)]
    (when (= (count dimensions) 2)
      (mapv utils/to-int dimensions))))

(defn- get-thumbnail-url [item media-type cdn-url]
  (if-let [preview-url (:previewUrl item)]
    (let [[id remote-content-id] (take-last 2 (str/split preview-url "/"))]
      (utils/build-url (str cdn-url "/thumbnail/" id "/" remote-content-id "/300x300")
                       {:token (str/replace (utils/get-login-cookie) "\"" "")}))
    ""))

(defn- zero-pad-2-digit-number [num]
  (if (> num 9) num (str "0" num)))

(defn- format-duration [duration]
  (let [hours (quot duration 3600)
        minutes (mod (quot duration 60) 60)
        seconds (mod duration 60)]
    (str (when (> hours 0) (str (zero-pad-2-digit-number hours) ":"))
         (zero-pad-2-digit-number minutes)
         ":"
         (zero-pad-2-digit-number seconds))))

(defn- count-download? [item download-counter]
  (and (:on? download-counter)
       (utils/not-empty? (set/intersection (-> item :channels set)
                                           (:channels download-counter)))))

(defn- get-package-counts [item]
  (-<> item
       (select-keys <> [:picNumber :sidebarNumber :videoNumber])
       (set/rename-keys <> {:picNumber :pictures
                            :sidebarNumber :sidebars
                            :videoNumber :videos})
       (utils/update-values <> utils/to-int)))

(defn- get-common-item-properties
  ([item paid-channels public-channels timezone-offset datetime-formatter]
    (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter :indexTimestamp))
  ([item paid-channels public-channels timezone-offset datetime-formatter date-key]
    (let [channels (-> item :channels set)]
      {:channels channels
       :date (-<> item
                  (date-key <>)
                  (utils/format-date <> timezone-offset datetime-formatter))
       :date-gmt (-> item date-key)
       :guid (:guid item)
       :headline (or (:headline item) "")
       :id (:id item)
       :slug (:slug item)
       :paid? (utils/not-empty? (set/intersection channels paid-channels))
       :public? (utils/not-empty? (set/intersection channels public-channels))
       :urgent? (and (= (:priority item) 2)
                     (= (:mediaType item) "T"))})))

(defmulti build-item* (fn [item _ _ _ _ _ _] (get-item-type item)))

(defmethod build-item* :alert [item paid-channels public-channels timezone-offset datetime-formatter cdn-url
                               download-counter]
  (merge (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter)
         {:count-download? false
          :slug "ALERT"
          :type :alert}))

(defmethod build-item* :text [item paid-channels public-channels timezone-offset datetime-formatter cdn-url
                              download-counter]
  (merge (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter)
         {:count-download? false
          :fragment (:fragment item)
          :type :text}))

(defmethod build-item* :picture [item paid-channels public-channels timezone-offset datetime-formatter cdn-url
                                 download-counter]
  (merge (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter)
         {:count-download? (count-download? item download-counter)
          :dimensions (get-dimensions item)
          :fragment (:fragment item)
          :thumbnail-url (get-thumbnail-url item "picture" cdn-url)
          :type :picture}))

(defmethod build-item* :graphic [item paid-channels public-channels timezone-offset datetime-formatter cdn-url
                                 download-counter]
  (merge (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter)
         {:count-download? (count-download? item download-counter)
          :dimensions (get-dimensions item)
          :thumbnail-url (get-thumbnail-url item "graphic" cdn-url)
          :type :graphic}))

(defmethod build-item* :script [item paid-channels public-channels timezone-offset datetime-formatter cdn-url
                                download-counter]
  (merge (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter)
         {:count-download? false
          :fragment (:fragment item)
          :type :script}))

(defmethod build-item* :early-access-script [item paid-channels public-channels timezone-offset datetime-formatter
                                             cdn-url download-counter]
  (merge (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter)
         {:count-download? false
          :edit-number (:editNumber item)
          :fragment (:fragment item)
          :type :early-access-script
          :version (:version item)}))

(defmethod build-item* :video [item paid-channels public-channels timezone-offset datetime-formatter cdn-url
                               download-counter]
  (merge (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter)
         {:count-download? (count-download? item download-counter)
          :dimensions (get-dimensions item)
          :duration (-> item :duration format-duration)
          :thumbnail-url (get-thumbnail-url item "still_image" cdn-url)
          :edit-number (:editNumber item)
          :version (:version item)
          :type :video}))

(defmethod build-item* :reva-video [item paid-channels public-channels timezone-offset datetime-formatter cdn-url
                                       download-counter]
  (merge (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter :dateCreated)
         {:count-download? (count-download? item download-counter)
          :duration (-> item :duration format-duration)
          :dimensions (get-dimensions item)
          :thumbnail-url (get-thumbnail-url item "still_image" cdn-url)
          :type :reva-video}))

(defmethod build-item* :package [item paid-channels public-channels timezone-offset datetime-formatter cdn-url
                                 download-counter]
  (let [package-counts (get-package-counts item)]
    (merge (get-common-item-properties item paid-channels public-channels timezone-offset datetime-formatter)
           {:counts package-counts
            :count-download? (count-download? item download-counter)
            :dimensions (get-dimensions item)
            :fragment (:fragment item)
            :thumbnail-url (get-thumbnail-url item "package" cdn-url)
            :type :package})))

(defn build-item [item settings]
  (letk [[paid-channels public-channels timezone-offset datetime-formatter cdn-url download-counter] settings]
    (build-item* item paid-channels public-channels timezone-offset datetime-formatter cdn-url
                 download-counter)))
