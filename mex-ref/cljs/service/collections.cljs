(ns mex.service.collections
  (:refer-clojure :exclude [get])
  (:require [mex.service.connect :as service]))

(defn fetch []
  (service/remote-call-handler (str "/api/collections")
                               :transit))

(defn get [id settings]
  (service/remote-call-handler (str "/api/collections/" id "/items") 
                               :transit
                               #(service/build-result-items % settings)))

(defn create [title]
  (service/remote-call-handler "/api/collections"
                               :transit
                               identity
                               {:title title}))

(defn rename [id title]
  (service/remote-call-handler (str "/api/collections/" id)
                               :transit
                               identity
                               {:title title}))

(defn delete [id]
  (service/remote-call-handler (str "/api/collections/" id "/delete")
                               :transit
                               identity
                               {}))

(defn add-item [id items]
  (service/remote-call-handler (str "/api/collections/" id "/items")
                               :transit
                               identity
                               {:items items}))

(defn remove-item [id guids]
  (service/remote-call-handler (str "/api/collections/" id "/items/delete")
                               :transit
                               identity
                               {:guids guids}))
