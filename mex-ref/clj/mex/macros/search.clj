(ns mex.macros.search
  (:refer-clojure :exclude [char])
  (:require [clojure.string :as str]
            [the.parsatron :as p :refer :all]))

(defmacro case-insensitive-string [string]
  `(>> ~@(map (fn [c]
                `(p/either (p/char ~(-> c str/upper-case first))
                           (p/char ~(-> c str/lower-case first))))
              string)))