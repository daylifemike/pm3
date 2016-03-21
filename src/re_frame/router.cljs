(ns re-frame.router
  (:refer-clojure :exclude [flush])
  (:require-macros [cljs.core.async.macros :refer [go-loop go]])
  (:require [reagent.core        :refer [flush]]
            [re-frame.handlers   :refer [handle]]
            [re-frame.utils      :refer [log warn error]]
            [cljs.core.async     :refer [put! <! timeout]]))

(defn purge-chan
  "read all pending events from the channel and drop them on the floor"
  [event-chan]
  #_(loop []
    (when (go (poll! event-chan))
      (recur))))

;; -- router loop ---------------------------------------------------------------------------------
;;
;; In a perpetual loop, read events from "event-chan", and call the right handler.
;;
;; Because handlers occupy the CPU, before each event is handled, hand
;; back control to the browser, via a (<! (timeout 0)) call.
;;
;; In some cases, we need to pause for an entire animationFrame, to ensure that
;; the DOM is fully flushed, before then calling a handler known to hog the CPU
;; for an extended period.  In such a case, the event should be laballed with metadata
;; Example usage (notice the ":flush-dom" metadata):
;;   (dispatch ^:flush-dom  [:event-id other params])
;;

(defn router-loop
  [app-db handler-map event-chan]
  (go-loop []
           (let [event-v  (<! event-chan)                   ;; wait for an event
                 _        (if (:flush-dom (meta event-v))   ;; check the event for metadata
                            (do (flush) (<! (timeout 20)))  ;; wait just over one annimation frame (16ms), to rensure all pending GUI work is flushed to the DOM.
                            (<! (timeout 0)))]              ;; just in case we are handling one dispatch after an other, give the browser back control to do its stuff
             (try
               (handle app-db handler-map event-v)

               ;; Unhandled exceptions from event handlers must be managed as follows:
               ;;   - call the standard logging function "error"
               ;;   - allow them to continue to bubble up because the app, in production,
               ;;     may have hooked window.onerror and perform special processing.
               ;;   - But an exception which bubbles out will break the enclosing go-loop.
               ;;     So we'll need to start another one.
               (catch js/Object e
                 (do
                   ;; try to recover from this (probably uncaught) error as best we can
                   (purge-chan event-chan)  ;; get rid of any pending events
                   (router-loop event-chan) ;; Exception throw will cause termination of go-loop. So, start another.

                   (throw e)))))        ;; re-throw so the rest of the app's infrastructure (window.onerror?) gets told
           (recur)))


;; -- dispatch ------------------------------------------------------------------------------------

(defn dispatch
  "Send an event to be processed by the registered handler.

  Usage example:
     (dispatch [:delete-item 42])
  "
  [event-chan event-v]
  (if (nil? event-v)
    (error "re-frame: \"dispatch\" is ignoring a nil event.")     ;; nil would close the channel
    (put! event-chan event-v))
  nil)   ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False


(defn dispatch-sync
  "Send an event to be processed by the registered handler, but avoid the async-inducing
  use of core.async/chan.

  Usage example:
     (dispatch-sync [:delete-item 42])"
  [app-db handler-map event-v]
  (handle app-db handler-map event-v)
  nil)    ;; Ensure nil return. See https://github.com/Day8/re-frame/wiki/Beware-Returning-False


