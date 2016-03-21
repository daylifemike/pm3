(ns mex.utils.http
  (:refer-clojure :exclude [get])
  (:require-macros [cljs.core.async.macros]
                   [mex.macros.core :refer [-<>]])
  (:require [cljs.core.async :refer [chan]]
            [cognitect.transit :as transit]
            [goog.events :as events]
            [mex.types :as types]
            [mex.utils.core :as utils])
  (:import goog.net.EventType
           [goog.net XhrIo]))

(let [format->handler {:text (fn [xhr] (.getResponseText xhr))
                       :xml (fn [xhr] (.getResponseXml xhr))
                       :json (fn [xhr]
                               ;; NOTE: We're not using js->clj's implicit JSON.parse because
                               ;; google's JSON library mysteriously fails on some responses that
                               ;; are valid JSON.
                               (as-> (.getResponseText xhr) <>
                                    (js/JSON.parse <>)
                                    (js->clj <> :keywordize-keys true)))
                       :transit (fn [xhr]
                                  (let [reader (transit/reader :json)]
                                    (transit/read reader (.getResponseText xhr))))}
      format->mime {:text "text/plain"
                    :xml "text/xml"
                    :json "application/json"
                    :transit "application/transit+json,application/json"}
      success? #(contains? #{200 201 202 204 205 206} %)
      get-status #(let [status (.getStatus %)]
                    (cond
                      (success? status) :success
                      (= 403 status) :forbidden
                      :else :error))
      build-headers (fn [content-type accept-format]
                      (clj->js {"Content-Type" content-type
                                "Accept" (clojure.core/get format->mime accept-format "*/*")}))]
  (defn- call [url format data type]
    (let [ch (chan 1)
          xhr (XhrIo.)
          handler (format->handler format)]
      (events/listen xhr 
                     goog.net.EventType.COMPLETE
                     #(let [status (get-status xhr)]
                       ; We can get 302'd by xpress access at any time, which redirects our XHR to an
                       ; HTML endpoint that returns 200, the only other time we can get html is on errors
                       ; when ths happens, force a refresh
                        (when (and (= :success status)
                                   (= "text/html" (subs (or (.getResponseHeader xhr "Content-Type") "") 0 9)))
                          (aset js/window "location" (-> js/window .-location)))
                        (try
                          (let [response (handler xhr)]
                            (utils/put-and-close! ch (types/->AsyncMsg status response)))
                        (catch js/Object e
                          (utils/put-and-close! ch (types/->AsyncMsg (if (not= status :success) status :error)
                                                                     (.getResponseText xhr)))))))
      (if data
        (case type
          :form (let [headers (build-headers "application/x-www-form-urlencoded" format)]
                  (.send xhr url "POST" (utils/query-params-map->str data) headers))
          :upload (let [headers (clj->js {"Accept" (clojure.core/get format->mime format "*/*")})
                        form-data (js/FormData.)]
                    (. form-data append (.-name data) data)
                    (.send xhr url "POST" form-data headers))
          (let [data (js/JSON.stringify (clj->js data))
                headers (build-headers "application/json" format)]
            (.send xhr url "POST" data headers)))
        (.send xhr url))
      ch)))

(defn get [url format]
  (call url format nil nil))

(defn post
  ([url format data] (post url format data nil))
  ([url format data type] (call url format data type)))
