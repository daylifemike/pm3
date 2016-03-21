(ns mex.components.story
  (:require [mex.utils.core :as utils]
            [mex.utils.dom :as dom-utils]
            [reagent.core :as r]))

(defn- mount-update-handler [component]
  ; some articles contain markup that we need to honor and might still be invalid. Since React clears invalid markup,
  ; we manually set it (the end-result of highlight-search-keywords) and just let the browser handle it as it sees best.
  ; element.innerHTML chokes when setting a <html> doc (the end-result of highlight-search-keywords) so, when necessary,
  ; we strip everything but the <body> content
  (let [[item text-key force-markup?] (-> component r/argv rest)]
    (when-let [text (text-key item)]
      (let [node (r/dom-node component)
            text (if-let [body-html (re-find #"<body[^>]*>([\s\S]*)</body>" (text-key item))]
                   (second body-html)
                   (text-key item))]
        (when (and text force-markup?)
          (dom-utils/highlight-search-keywords node text))))))

(defn story
  ([item] [story :story])
  ([item text-key] [story item text-key false])
  ([item text-key force-markup?]
    (r/create-class
      {:component-did-mount (fn [this] (mount-update-handler this))
       :component-did-update (fn [this _] (mount-update-handler this))
       :reagent-render (fn [item text-key force-markup?]
                         (when-let [text (text-key item)]
                           (let [is-arabic? (utils/is-arabic? text)
                                 is-rtl? (or is-arabic? (utils/is-hebrew? text))]
                             [:div {:class (utils/map->classes {:story true
                                                                :table (:table? item)
                                                                :intro-text (= text-key :intro-text)})
                                    :dir (if is-rtl? "rtl" "auto")}
                               (when-not force-markup? text)])))})))