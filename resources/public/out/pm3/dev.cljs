(ns pm3.dev
  (:require [pm3.controller.app :as app]))

(enable-console-print!)

(defn reload []
  (app/reload))
