(ns mex.controller.experiments
  (:require-macros [mex.macros.core :refer [for-eager -<>]]
                   [reagent.ratom :refer [reaction]])
  (:require [clojure.set :as set]
            [mex.components.experiments :as view]
            [mex.middleware :as mw]
            [mex.re-frame :as rf]
            [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [mex.utils.local-storage :as local-storage]))

(defonce experiments-path [:experiments])

(defonce local-storage-key "experiments")

(defonce default-experiments-settings {:package-views? false
                                       :alt-large-preview? false})

(defn- get-otp []
  ;; Google Authenticator QA Code
  ;; https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=200x200&chld=M|0&cht=qr&chl=otpauth://totp/mex@thomsonreuters.com%3Fsecret%3DNVSXQ4DFOJUW2ZLOORZQU%26type%3Dtotp%26period%3D300
  ;; mexperiments >> base32 / 300sec = 5min
  (js/OTP "NVSXQ4DFOJUW2ZLOORZQU" 300))

(defonce key-buffer (atom []))

(defn- initialize-key-listener []
  (. js/window addEventListener "keyup" #(rf/dispatch [:experiments/key-handler %])))

(defn- key-pattern-handler [patterns key-name]
  (let [longest-pattern (->> patterns
                             (mapv #(count (:pattern %)) ,,,)
                             (apply max ,,,))]
    (swap! key-buffer conj key-name)
    (when (> (count @key-buffer) longest-pattern)
      (swap! key-buffer #(vec (take-last longest-pattern %))))
    (doall (map (fn [{:keys [handler pattern]}]
                  (let [pattern-length (count pattern)
                        buffer (vec (take-last pattern-length @key-buffer))]
                    (when (= buffer pattern)
                      (handler))))
                patterns))))

(defn register-topics []
  (rf/topic :experiments
    (fn [db _]
      (reaction (get-in @db experiments-path))))

  (rf/topic :experiments/user-settings
    (fn [db _]
      (let [experiments (rf/subscribe [:experiments])]
        (reaction
          (:user-settings @experiments))))))

(defn register-handlers []
  (rf/handler :experiments/initialize-db
    (mw/after #(rf/dispatch [:experiments/update-features {}]))
    (mw/after #(initialize-key-listener))
    (fn [db _]
      (let [from-storage (local-storage/get-item local-storage-key)
            ; remove any old/unused experiments
            scrubbed-storage (apply dissoc from-storage (set/difference (into #{} (keys from-storage))
                                                                        (into #{} (keys default-experiments-settings))))]
        (assoc-in db experiments-path {:password-attempt ""
                                       :errors []
                                       :user-settings (merge default-experiments-settings scrubbed-storage)}))))

  (rf/handler :experiments/key-handler
    mw/side-effect
    (fn [db [_ event]]
      (let [key-handlers {"shift-/" #(when goog.DEBUG (->> @key-buffer clj->js js/console.log))}
            key-patterns [{:handler #(rf/dispatch [:experiments/open-modal (get-otp)])
                           :pattern ["up" "up" "down" "down" "left" "right" "left" "right" "b" "a" "enter"]}
                          {:handler #(rf/dispatch [:experiments/open-modal (get-otp)])
                           :pattern ["shift-m", "shift-.", "shift-e", "shift-.", "shift-x", "shift-."]}]
            key-name (dom-utils/key-name event)
            handler (get key-handlers key-name)]
        (key-pattern-handler key-patterns key-name)
        (when handler (handler)))))

  (rf/handler :experiments/open-modal
    (mw/path experiments-path)
    (mw/after (fn [db [_ current]]
                (let [saved (local-storage/get-item (str local-storage-key "-otp"))]
                  (if (= current saved)
                    (view/open-modal :experiments)
                    (view/open-modal :password)))))
    (fn [db [_ otp]]
      (if goog.DEBUG
        (assoc db :password-attempt otp)
        db)))

  (rf/handler :experiments/update-features
    (mw/after (fn [db _]
                (let [user-settings (get-in db (conj experiments-path :user-settings))]
                  (local-storage/set-item! local-storage-key user-settings))))
    (fn [db [_ updates]]
      (let [user-settings (get-in db (conj experiments-path :user-settings))]
        (assoc-in db (conj experiments-path :user-settings) (merge user-settings updates)))))

  (rf/handler :experiments/update-password-attempt
    (mw/path experiments-path)
    (fn [db [_ password]]
      (assoc db :password-attempt password
                :errors [])))

  (rf/handler :experiments/password-submit
    (mw/path experiments-path)
    mw/side-effect
    (fn [db _]
      (let [otp (get-otp)
            attempt (:password-attempt db)]
        (if (not= attempt otp)
          (rf/dispatch [:experiments/password-error])
          (do
            (local-storage/set-item! (str local-storage-key "-otp") otp)
            (rf/dispatch [:experiments/update-password-attempt ""])
            (view/open-modal :experiments))))))

  (rf/handler :experiments/password-cancel
    (mw/after #(rf/dispatch [:experiments/update-password-attempt ""]))
    (mw/after #(rf/dispatch [:modal/close]))
    rf/no-op)

  (rf/handler :experiments/password-error
    (mw/path experiments-path)
    (fn [db _]
      (assoc db :errors ["Invalid Password"]))))

(defn init []
  (defn reset []
    (register-topics)
    (register-handlers))

  (reset)

  (rf/dispatch-sync [:experiments/initialize-db]))

(defn get-ns []
  (namespace ::x))
