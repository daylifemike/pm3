(ns mex.service.labels
  (:refer-clojure :exclude [get])
  (:require [mex.service.connect :as service]))

(defn fetch []
  (service/remote-call-handler "/api/labels"
                               :transit))

(defn save [data]
  (service/remote-call-handler "/api/labels"
                               :transit
                               identity
                               {:data data}))
