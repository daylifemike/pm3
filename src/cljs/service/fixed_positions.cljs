(ns mex.service.fixed-positions
  (:require [mex.service.connect :as service]))

(defn fetch []
  (service/remote-call-handler "/api/fixed-positions"
                               :transit))

(defn save [data]
  (service/remote-call-handler "/api/fixed-positions"
                               :transit
                               identity
                               {:data data}))

(defn upload [data]
  (service/remote-call-handler "/api/fixed-positions/upload"
                               :transit
                               identity
                               data
                               :upload))