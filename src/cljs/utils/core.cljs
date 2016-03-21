(ns mex.utils.core
  (:require-macros [mex.macros.core :refer [-<>]])
  (:require [cljs.core.async :as async]
            [cljs-time.core :as ct]
            [cljs-time.coerce :as ct-coerce]
            [cljs-time.format :as ct-format]
            [clojure.string :as str]
            [goog.net.cookies :as cookies]
            [mex.types :as types]
            [schema.core :as s :include-macros true])
  (:import goog.history.Html5History
           goog.Uri.QueryData))

(defonce not-empty? (complement empty?))

(defonce not-blank? (complement str/blank?))

(defonce not-fn? (complement fn?))

(defn ceil [num] (. js/Math ceil num))

(defn floor [num] (. js/Math floor num))

(defn abs [num] (max num (- num)))

(let [nnil? (complement nil?)]
  (defn not-nil? 
    ([x] (nnil? x))
    ([x & r] (every? nnil? (cons x r)))))

(defn all-nil? [& args]
  (every? nil? args))

(defn print-kvs [m]
  (doseq [[k v] (sort m)]
    (println k (if (map? v)
                 (print-kvs v)
                 v))))

(defn index-of [f coll]
  (first (if (ifn? f)
           (keep-indexed #(when (f %2) %1) coll)
           (keep-indexed #(when (= f %2) %1) coll))))

(defn take-last-while
  "Takes the last x items in a vector that match predicate (like take while but starting from the end)
   Starts checking from the last item and going backwards. Returns the last items in their original order"
  [pred v]
  (when (not-empty? v)
    (loop [i (-> v count dec)
           result '()]
      (if (and (>= i 0)
               (pred (nth v i)))
        (recur (dec i)
               (cons (nth v i) result))
        result))))

(defn is-prefix?
  "checks if one sequence is a prefix of another"
  [maybe-prefix coll]
  (when (and (sequential? maybe-prefix) (sequential? coll))
    (loop [maybe-prefix maybe-prefix
           coll coll]
       (cond
         (empty? maybe-prefix) true
         (or (empty? coll)
             (not= (first maybe-prefix) (first coll))) false
         :else (recur (rest maybe-prefix)
                      (rest coll))))))

(defn append-to-keyword [kw s]
  (apply keyword ((juxt namespace #(str (name kw) s)) kw)))

(defn pluralize
  ([number single-form] (pluralize number single-form (str single-form "s")))
  ([number single-form plural-form] (if (= 1 number) single-form plural-form)))

(defn is-japanese-or-chinese? [text]
  (when (not-empty? text)
    (not-nil? (re-seq
                #"[\u4E00-\u9FFF]|[\u3400-\u4DBF]|[\u3300-\u33FF]|[\u3200-\u32FF]|[\u30A0-\u30FF]|[\u3040-\u309F]"
                text))))

(defn is-arabic? [text]
  (when (not-empty? text)
    (not-nil? (re-seq
                #"[\u0600-\u06FF]|[\u0750-\u077F]|[\u08A0-\u08FF]|[\uFB50-\uFDFF]|[\uFE70-\uFEFF]"
                text))))

(defn is-hebrew? [text]
  (when (not-empty? text)
    (not-nil? (re-seq
                #"[\u0590-\u05FF]"
                text))))

(defn keyword->str [kw]
  (str/join "/" (filter not-nil? [(namespace kw) (name kw)])))

(defn upper-limit
  ([count max] (upper-limit count max ""))
  ([count max suffix] (if (> count max) (str max suffix) count)))

(defn find-first [pred coll]
  (first (filter pred coll)))

(defn get-num-by-percent [percent total-num round-up?]
  (let [rounding-fn (if round-up? ceil floor)]
    (rounding-fn (* total-num (/ percent 100)))))

(defn- copy-map [m]
  (when m (merge {} m)))

(def select-values 
  (comp vals select-keys))

(defn update-values
  "updates all values in a map - m, by applying the given function - f, on each value - (f v args)"
  [m f & args]
  (reduce (fn [result [k v]]
            (assoc result k (apply f v args)))
            {} m))

(defn compact
  "Removes all map entries where value is nil or false"
  [m]
  (reduce (fn [m k]
            (if (get m k)
              m
              (dissoc m k)))
          m (keys m)))

(s/defn map->classes :- s/Str
  "Converts a map of CSS classes to a string containing the classes where input.
   Similar to React classSet utility"
  [m :- types/ClassesMap]
  (->> m
       compact
       keys
       (map name ,,,)
       (str/join " " ,,,)))

(defn apply-in-map
  "Applies a given function to all map values in certain nesting depth"
  [m depth func]
  (if (= depth 0)
    (func m)
    (reduce (fn [out [k v]]
              (assoc out k (apply-in-map v (dec depth) func)))
            {} m)))

(s/defn map&format :- {s/Keyword s/Any}
  [data :- {s/Keyword s/Any}
   formatters :- types/Formatters]
  (reduce (fn [out [key formatter]]
            (assoc out key (formatter data)))
          {} formatters))

(s/defn create-formatters :- types/Formatters
  "Generates a new map of formatters from the input map of formatters according to type of the values"
  [formatters :- {:s/Keyword (s/cond-pre s/Keyword [s/Keyword] types/Function s/Str)}]
    (reduce (fn [out [key formatter]]
              (let [f (condp types/matches-schema? formatter
                        s/Keyword #(% formatter)
                        [s/Keyword] #(get-in % formatter)
                        types/Function formatter
                        s/Str (constantly formatter)
                        key)]
                (assoc out key f)))
            {} formatters))

(defn put-and-close! [ch msg]
  (async/put! ch msg)
  (async/close! ch))

(defn slugify [str]
  (-> str str/lower-case (str/replace #" " "-") js/encodeURIComponent))

(defn get-query-param [query-key query-data]
  (->> query-key
       (.getValues query-data ,,,)
       js->clj
       first))

(defn query-params-str->map [query-params-str]
  ; ?key=val --> ["key-val"]
  ; /all/?key=val --> ["/all/" "key=val"]
  (let [query-str-split (str/split query-params-str "?")
        query-str (if (= (count query-str-split) 1)
                    (first query-str-split)
                    (second query-str-split))
        query-data (QueryData. query-str)
        query-keys (-> query-data .getKeys js->clj)]
    (into {} (map #(vector (keyword %) (get-query-param % query-data)) query-keys))))

(defn has-query-param-with-value? [param value]
  (let [url (-> js/window .-location .-href)
        query-str (-> url
                      (str/split ,,, "?")
                      last)
        query-params (query-params-str->map query-str)]
    (= (get query-params param) value)))

(defn url-encode [string]
  (-> string str (js/encodeURIComponent) (.replace ,,, "+" "%20")))

(defn encode-param [k v]
  (let [k (-> k name url-encode)
        encode #(str k "=" (url-encode %))]
    (if (coll? v)
      (str k "=" (str/join "," (map #(url-encode %) v)))
      (encode v))))

(defn query-params-map->str [m]
  (->> (seq m)
       (map (fn [[k v]] (encode-param k v)) ,,,)
       sort ; sorting makes testing a lot easier
       flatten
       (interpose "&" ,,,)
       (apply str ,,,)))

(defn build-url
  "Given a url and params map, build the query url"
  [url params]
  (let [[non-query-url src-query] (str/split url #"\?" 2)
        src-params (query-params-str->map (or src-query ""))
        out-params (merge src-params params)]
    (str non-query-url "?" (query-params-map->str out-params))))

(defonce is-history-api-supported? (Html5History.isSupported))

(defn to-int [string]
  (js/parseInt string 10))

(defn now-as-long []
  (ct-coerce/to-long (ct/now)))

(defn parse-date [string date-formatter]
  (when (not-blank? string)
    ; cljs-time throws an Exception when the date string is unparsable
    ; the try/catch returns a nil we handle ourselves
    (try
      (ct-format/parse date-formatter string)
      (catch js/Object e
      nil))))

(defn format-date [date-as-long timezone-offset datetime-formatter]
  (when date-as-long
    (-<> date-as-long
         (ct-coerce/from-long <>)
         (ct/plus <> (ct/hours timezone-offset))
         (ct-format/unparse datetime-formatter <>))))

(defn end-of-day [date]
  (let [beginning-of-day (ct/at-midnight date)
        next-day (ct/plus beginning-of-day (ct/days 1))]
    (ct/minus next-day (ct/millis 1))))

(defn get-base-slug [slug]
  (first (str/split slug #"/")))

(defonce debug-page?
  (let [path (-> js/window .-location .-pathname)]
    (= (-> path
           (str/split ,,, #"/")
           last)
       "index-debug.htm")))

(defn get-page-suffix []
  (if debug-page? "/index-debug.htm" ""))

(defn get-page-path [path-only?]
  (let [path (-> js/window .-location .-pathname)]
    (if-not path-only?
      path
      (let [parts (str/split path #"/")
            path-only (if debug-page? (drop-last parts) parts)]
        (str/join "/" path-only)))))

(defn get-page-base-url []
  (str (-> js/window .-location .-protocol)
       "//"
       (-> js/window .-location .-hostname)))

(defn get-url [path]
  (str (get-page-base-url) path (get-page-suffix)))

(defn get-pop-out-url [id reva?]
  (let [base-url (str (get-page-base-url) "/detail" (get-page-suffix))
        params (if reva?
                 {:id id
                  :reva true}
                 {:id id})]
    (build-url base-url params)))

(let [search-type->search-field {:all "main"
                                 :headline "headline"
                                 :full-text "fulltext"
                                 :slug "slug"
                                 :topic-code "topic"
                                 :reference-id "id"
                                 :channel "channel"}]
  (defn get-search-field [type]
    (search-type->search-field type)))

(defn generate-search-url [keywords type]
  (str (if is-history-api-supported? "?" "#") "search=" (name type) ":" keywords))

(defn redirect-to-forbidden []
  (let [url (str (get-page-base-url) "/403")]
    (set! (-> js/window .-location .-href) url)))

(defn is-enter-key? [keycode]
  (let [enter-key 13]
    (== keycode enter-key)))

(defn is-esc-key? [keycode]
  (let [esc-key 27]
    (== keycode esc-key)))

(defn hours-in-milliseconds [hours]
  (* hours 1000 60 60))

(defn get-cookie [cookie-name]
  (cookies/get cookie-name))

(defn set-cookie!
  ([cookie-name val]
   (set-cookie! cookie-name val -1))
  ([cookie-name val expires]
   (cookies/set cookie-name val expires "/" ".reuters.com")))

(let [login-cookie-name "mexlogin"]
  (defn get-login-cookie []
    (get-cookie login-cookie-name))

  (defn set-login-cookie! [val]
    (set-cookie! login-cookie-name val))

  (defn remove-login-cookie! []
    (cookies/remove login-cookie-name "/" ".reuters.com")))

(defn make-unique-id []
  (let [s4 #(-<> (js/Math.random)
                 (+ <> 1)
                 (* <> 0x10000)
                 (js/Math.floor <>)
                 (.toString <> 16)
                 (.substring <> 1))]
    (str (s4) (s4) (s4))))

(defn render-icon-bar? [item]
  (or (and (:count-download? item)
           (not (:count-all? item)))
      (:item-downloaded? item)
      (:counts item)))

; http://stackoverflow.com/questions/14488150/how-to-write-a-dissoc-in-command-for-clojure
(defn dissoc-in
  "Dissociates an entry from a nested associative structure returning a new
  nested structure. keys is a sequence of keys. Any empty maps that result
  will not be present in the new structure."
  [m [k & ks]]
  (if ks
    (if-let [nextmap (get m k)]
      (let [newmap (dissoc-in nextmap ks)]
        (if (seq newmap)
          (assoc m k newmap)
          (dissoc m k)))
      m)
    (dissoc m k)))

(defn insert [v item pos]
  (let [pos (if (nil? (get v pos))
              (count v)
              pos)]
    (apply conj (subvec v 0 pos) item (subvec v pos))))

(defn valid-asset-id? [id]
  (re-matches #"^tag:reuters\.com\,[\d]{4}:newsml_[\w]+(:\d+)?$" id))

(defn round-to-hundreths [number]
  (-> number
      (* ,,, 100)
      (js/Math.ceil ,,,)
      (/ ,,, 100)))

(defn- should-constrain-image-by-height? [[width height] [ratio-width ratio-height]]
  (let [container-aspect (round-to-hundreths (/ ratio-width ratio-height))
        image-aspect (round-to-hundreths (/ width height))]
    (< image-aspect container-aspect)))

(defn get-file-name [url]
  ; filename is the substring after the last slash
  (last (str/split url #"/")))
