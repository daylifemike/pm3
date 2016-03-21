(ns re-frame.utils
  (:require [clojure.set   :refer [difference]]
            [cljs.pprint :refer [pprint]]))

;; -- Logging -----------------------------------------------------------------
;;
;; re-frame internally uses a set of logging functions which, by default,
;; print to js/console.
;; Use set-loggers! if you want to change this default behaviour.
;; In production environment, you may want to capture exceptions and POST
;; them somewhere.  to , you might want to override the way that exceptions are
;; handled by overridding "error"
;;
(def default-loggers
  {:log       #(.log js/console %)
   :warn      #(.warn js/console %)
   :error     #(.error js/console %)
   :info      #(.info js/console %)
   :group     #(if (.-group js/console) (.groupCollapsed js/console %) (.log js/console %))  ;; group does not exist  < IE 11
   :groupEnd  #(when (.groupEnd js/console) (.groupEnd js/console))})              ;; groupEnd does not exist  < IE 11

;; holds the current set of loggers.
(def loggers (atom default-loggers))

(defn set-loggers!
  "Change the set (subset?) of logging functions used by re-frame.
  'new-loggers' should be a map which looks like default-loggers"
  [new-loggers]
  (assert  (empty? (difference (set (keys new-loggers)) (set (keys default-loggers)))) "Unknown keys in new-loggers")
  (swap! loggers merge new-loggers))

(defn get-dwim [coll k & [default]]
  (get-in coll (if (seq? k) k [k]) default))

(defn format [x]
  (cond
    (string? x)        x
    (keyword? x)       (pr-str x)
    (associative? x)   (clj->js x)
    (satisfies? IFn x) (clj->js x)
    :else (pr-str x)))

(defn log      [& args] (apply (:log @loggers)      (map format args)))
(defn info     [& args] ((:info @loggers)    (subs (apply str args) 0 100)))
(defn warn     [& args] (apply (:warn @loggers)     (map format args)))
(defn error    [& args] ((:error @loggers)    (apply str args)))
(defn group    [& args] ((:group @loggers)    (subs (apply str args) 0 100)))
(defn groupEnd [& args] ((:groupEnd @loggers) (apply str args)))

;; -- Misc --------------------------------------------------------------------

(defn first-in-vector
  [v]
  (if (vector? v)
    (first v)
    (error "re-frame: expected a vector event, but got: " v)))

