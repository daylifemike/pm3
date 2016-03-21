(ns mex.utils.dom
  (:require [cljsjs.jquery]
            [clojure.string :as str]
            [mex.re-frame :as rf]
            [mex.utils.core :as utils]
            [plumbing.core :refer-macros [letk ?>]]
            [reagent.core :as reagent]))

(defn- scaffold [el]
  (let [cookie-el (js/document.createElement "div")
        app-el (js/document.createElement "div")]
    (aset cookie-el "id" "refresh-cookie")
    (aset app-el "id" "app")
    (.appendChild el cookie-el)
    (.appendChild el app-el)))

(def transition-group
  (reagent/adapt-react-class js/React.addons.CSSTransitionGroup))

(let [scrolled-class "scrolled"
      no-scroll-class "no-scroll"
      no-scroll-class-desktop "-desktop"
      $window (js/jQuery js/window)
      $document (js/jQuery js/document)
      $body (js/jQuery "body")
      document-scroll-position (atom 0)
      get-touch-event-ids (fn [selector]
                            (let [id (str ".no-scroll" selector)]
                              [(str "touchstart" id) (str "touchmove" id)]))]
  (defn add-body-class [class]
    (. $body addClass class))

  (defn watch-page-scrolled [scroll-threshold]
    (. $window on "scroll.page-watch" (fn [_]
                                        (if (> (. $window scrollTop) scroll-threshold)
                                          (. $body addClass scrolled-class)
                                          (. $body removeClass scrolled-class)))))

  (defn stop-watching-page-scrolled []
    (. $window off "scroll.page-watch"))

  (defn is-page-scrolled? []
    (js->clj (. $body hasClass scrolled-class)))

  (defn- reset-document-scroll-position!
    ([] (reset! document-scroll-position 0))
    ([scroll-top] (reset! document-scroll-position scroll-top)))

  (defn scroll-screen-to! [position]
    (reset-document-scroll-position! position)
    (. $document scrollTop position))

  (defn- desktop? []
    (-> (js/jQuery "#container")
        (. ,,, is ".desktop")))

  (defn- kill-selection [e]
    ;; kill selection but always allow selection in inputs
    (let [selection (.getSelection js/window)
          ;; The dom selection API in Chrome returns the selection as
          ;; beginning in the parent div when a subset of a text input
          ;; is selected. I have no idea. This bit of jQuery magic
          ;; ensures we wind up with $target pointing at an input.
          $target (-> (js/jQuery #js [(.-anchorNode selection) (.-focusNode selection)])
                      (.find ,,, "input, textarea")
                      (.addBack ,,, "input, textarea"))]
      (when (and (> (.-rangeCount selection) 0)
                 (= (-> $target (.closest ,,, "input, textarea") .-length) 0))
        (.removeAllRanges selection))))

  (defn enable-prevent-selection []
    (when-not (.hasClass $body "prevent-selection") ;; make idempotent
      (.addClass $body "prevent-selection")
      (.on $window "mouseup.preventSelection, contextmenu.preventSelection"
           (fn [e]
             (when (> (-> (.getSelection js/window) .-rangeCount) 0)
               (kill-selection e))
             (when (and (= "img" (-> e .-target .-tagName .toLowerCase))
                        (> (-> e .-button) 1))
               (.preventDefault e))))))

  (defn disable-prevent-selection []
    (.removeClass $body "prevent-selection")
    (.off $window "mouseup.preventSelection, contextmenu.preventSelection"))

  (defn enable-body-scrolling
    ([]
       (-> $body
           (. ,,, removeClass no-scroll-class)
           (?> (desktop?) (. ,,, removeClass (str no-scroll-class no-scroll-class-desktop))))
       (scroll-screen-to! @document-scroll-position))
    ([scroll-to]
       (reset-document-scroll-position! scroll-to)
       (enable-body-scrolling)))

  (defn disable-body-scrolling []
    (let [scroll-position (. $document scrollTop)
          $scroll-lock-wrapper (js/jQuery ".mobile-scroll-lock-wrapper")]
      (reset-document-scroll-position! scroll-position)
      (-> $body
          (. ,,, addClass no-scroll-class)
          (?> (desktop?) (. ,,, addClass (str no-scroll-class no-scroll-class-desktop))))
      (-> $document
          (?> (not (desktop?)) (. ,,, scrollTop 0)))
      (. $scroll-lock-wrapper scrollTop scroll-position))))

(defn set-document-location! [url]
  (aset js/document "location" url))

(defn set-document-title! [text]
  (aset js/document "title" text))

(defn get-node-text [node]
  (.-textContent node))

(defn set-node-text! [node text]
  (set! (.-textContent node) text))

(defn set-node-html! [node html]
  (set! (.-innerHTML node) html))

(def get-node-data
  (if (-> js/Element .-prototype (. hasOwnProperty "dataset"))
    (fn [node attr] (aget node "dataset" attr))
    (fn [node attr] (. node getAttribute (str "data-" attr)))))

(def set-node-data!
  (if (-> js/Element .-prototype (. hasOwnProperty "dataset"))
    (fn [node attr value] (aset node "dataset" attr value))
    (fn [node attr value] (. node setAttribute (str "data-" attr) value))))

(defn node-matches [node selector]
  ; all IEs and some older mobile browsers still require prefixing.  the rest is for completeness' sake.
  (cond
    (utils/not-nil? (-> js/Element .-prototype .-matches)) (. node matches selector)
    (utils/not-nil? (-> js/Element .-prototype .-matchesSelector)) (. node matchesSelector selector)
    (utils/not-nil? (-> js/Element .-prototype .-mozMatchesSelector)) (. node mozMatchesSelector selector)
    (utils/not-nil? (-> js/Element .-prototype .-msMatchesSelector)) (. node msMatchesSelector selector)
    (utils/not-nil? (-> js/Element .-prototype .-oMatchesSelector)) (. node oMatchesSelector selector)
    (utils/not-nil? (-> js/Element .-prototype .-webkitMatchesSelector)) (. node webkitMatchesSelector selector)))

(defn prevent-default [f]
  (fn [e & r]
    (. e preventDefault)
    (if (utils/not-empty? r)
      (apply f (cons e r))
      (f e))
    nil)) ; Return a non-false value to prevent React dev tools warning

(defn pop-out
  ([url] (pop-out url 944 670))
  ([url width height]
    (let [id (utils/now-as-long)
          options (str "toolbar=0,scrollbars=1,location=0,statusbar=1,menubar=0,resizable=1"
                       ",width=" width ",height=" height)]
      (.open js/window url id options))))

(defn node-within-height [node height]
  ; browsers vary whether they round scrollHeight up or down
  ; adding 1px to the height prevents 99% of false positives
  (<= (-> node .-scrollHeight) (+ height 1)))

; http://stackoverflow.com/questions/18735665
(defn re-pos [re s]
  (let [re (js/RegExp. (if (string? re) re (.-source re)) "g")]
    (loop [res {}]
      (if-let [m (.exec re s)]
        (recur (assoc res (.-index m) (aget m 0)))
        res))))

(defn- word-ends [text]
  (conj (->> (str/trimr text) (re-pos "[\\s,]+") keys sort vec) (.-length text)))

(defn- get-last-rect [rects]
  (aget rects (-> rects .-length dec)))

(defn em->px [node]
  (->> (.getComputedStyle js/window node "")
       .-fontSize
       js/parseFloat))

; Ellipsifies a node. Not re-entrant, reset the text before
; re-running. This logic will fail if the node contains anything other
; than a single text node (comments, inline elements, etc).
(defn setup-search-highlighting []
  (let [highlight-fn (rf/subscribe [:search/highlight-keywords-fn])]
    (defn ellipsify!
      ([node] (ellipsify! node true))
      ([node set-text?]
        (when node
          (if (> (-> node .-childNodes .-length) 1)
            (do
              ; can't ellipsify multiple childern
              (set-node-html! node (get-node-text node))
              (js/setTimeout #(ellipsify! node set-text?) 0))
            (let [search-highlight-fn @highlight-fn
                  text-range (.createRange js/document)
                  bound (-> node .getBoundingClientRect)
                  ; abs, +1 account for iOS ranging off-screen nodes as negative
                  height (-> (.-bottom bound) js/Math.ceil js/Math.abs (+ 1))
                  text (get-node-text node)
                  text-node (aget (.-childNodes node) 0)
                  positions (if (utils/is-japanese-or-chinese? text)
                              (range (.-length text) 0 -1)
                              (reverse (word-ends text)))
                  ellipsis-width (* (em->px node) 1.3)]
              (when (and text-node (= 3 (.-nodeType text-node)))
                (.setStart text-range text-node 0)
                (loop [[guess & more] positions]
                  (when (utils/not-nil? guess) ; prevents iOS from running away
                    (.setEnd text-range text-node guess)
                    (when-let [last-rect (-> text-range .getClientRects get-last-rect)]
                      (if (> (js/Math.abs (.-bottom last-rect)) height)
                        (recur more)
                        (let [end (if (> ellipsis-width (- (.-right bound) (.-right last-rect)))
                                    (or (first more) 0)
                                    guess)
                              ellipsified-text (if (< guess (.-length text))
                                                 (str (subs text 0 end) "\u2026")
                                                 text)
                              final-text (if search-highlight-fn
                                           (search-highlight-fn node ellipsified-text text)
                                           ellipsified-text)]
                          (if set-text?
                            (set-node-html! node final-text)
                            (set-node-data! node "ellipsified" final-text)))))))))))))

    (defn highlight-search-keywords
      ([node] (when node (highlight-search-keywords node (get-node-text node))))
      ([node text] (when node
                     (let [highlight-fn @highlight-fn
                           highlighted-text (highlight-fn node text)]
                       (set-node-html! node highlighted-text)))))))

(defn scroll-screen-to-top! []
  (scroll-screen-to! 0))

(defn get-fixed-header-compensation []
  (utils/to-int (-> (js/jQuery "#body")
                    (. ,,, css "padding-top"))))

(defn scroll-node-to-top! [node]
  (let [node-offset-from-window (-> node js/jQuery .offset .-top)
        scroll-position (utils/floor (- node-offset-from-window (get-fixed-header-compensation)))]
    (scroll-screen-to! scroll-position)))

(defn set-node-height-to-fill-screen! [node subtraction]
  (let [window-height (-> js/window js/jQuery .height)
        subtraction-height (-> subtraction .-offsetHeight)
        height (- window-height subtraction-height (get-fixed-header-compensation))]
    (set! (-> node .-style .-height) (str height "px"))))

(defn node-in-viewport? [node]
  (let [$window (js/jQuery js/window)
        rect (. node getBoundingClientRect)]
    (and (>= (. rect -top) 0)
         (>= (. rect -left) 0)
         (<= (. rect -bottom) (. $window height))
         (<= (. rect -right) (. $window width)))))

(defn set-transform [node x y]
  (let [transform (. js/Modernizr prefixed "transform")
        value (str "translate(" x ", " y ")")]
    (aset (-> node .-style) transform value)))

; a modified version of https://gist.github.com/jhickner/2363070
(defn debounce [func wait]
  (let [timeout (atom nil)]
    (fn [& args]
      (this-as context
        (let [later (fn []
                      (reset! timeout nil)
                      (.apply func context (clj->js args)))]
          (js/clearTimeout @timeout)
          (reset! timeout (js/setTimeout later wait)))))))

(defn key-name [e]
  (let [key-name (js/browserKeymap.keyName e)]
    (when key-name
      (str/lower-case key-name))))
