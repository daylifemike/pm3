(defproject media-express "4.73.0-SNAPSHOT"
  :description "media-express: web based tool to view, search, share and download reuters content"
  :url "http://mediaexpress.reuters.com"
  :dependencies [[cljsjs/jquery "1.9.1-0"]
                 [cljsjs/react-with-addons "0.13.3-0"]
                 [com.andrewmcveigh/cljs-time "0.3.14"]
                 [com.cognitect/transit-cljs "0.8.232"]
                 [markdown-clj "0.9.74"]
                 [org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.228"]
                 [org.clojure/core.async "0.2.374"]
                 [org.clojure/core.match "0.2.2"]
                 [reagent "0.5.1" :exclusions [cljsjs/react]]
                 [prismatic/plumbing "0.5.0"]
                 [prismatic/schema "1.0.1"]
                 [the/parsatron "0.0.7"]
                 [bidi "2.0.3"]
                 [com.cemerick/piggieback "0.1.5"]] ; Note from Karl: please don't upgrade piggieback
  :plugins [[lein-cljsbuild "1.1.1" :exclusions [org.clojure/clojurescript]]
            [lein-figwheel "0.5.0-2"]
            [cider/cider-nrepl "0.9.1"]]
  :source-paths ["src/main/clj"]
  :clean-targets ["target/generated" "target/cljsbuild-compiler-2" "src/main/webapp/assets/javascript"]
  :jvm-opts ^:replace ["-Xmx1g" "-server"]
  :cljsbuild {:builds [{:id "dev"
                        :source-paths ["src/main/cljs" "devsrc"]
                        :resource-paths ["src/main/webapp/js/lib"]
                        :compiler {:output-to "src/main/webapp/assets/javascript/debug/main.js"
                                   :output-dir "src/main/webapp/assets/javascript/debug"
                                   :compiler-stats true
                                   :optimizations :none
                                   ; :recompile-dependents false
                                   :source-map true
                                   :source-map-timestamp true
                                   :cache-analysis true
                                   :warnings {:redef false
                                              :fn-var false}}
                        :figwheel {:on-jsload "mex.dev/reload"}}
                       {:id "prod"
                        :source-paths ["src/main/cljs"]
                        :compiler {:output-to "src/main/webapp/assets/javascript/main.js"
                                   ; Uncomment these two for prod source maps
                                   ; :output-dir "src/main/webapp/assets/javascript"
                                   ; :source-map "src/main/webapp/assets/javascript/main.js.map"
                                   :optimizations :advanced
                                   :static-fns false
                                   :compiler-stats true
                                   :pretty-print false
                                   :externs ["src/main/externs/flowplayer.js",
                                             "src/main/externs/pickadate.js",
                                             "src/main/externs/modernizr.js",
                                             "src/main/externs/enquire.js",
                                             "src/main/externs/sha.js",
                                             "src/main/externs/browserkeymap.js",
                                             "src/main/externs/ga.js"]
                                   :closure-defines {"goog.DEBUG" false}
                                   :closure-warnings {:non-standard-jsdoc :off}}}]}
  :figwheel {:css-dirs ["src/main/webapp/assets/stylesheets"]
             :nrepl-port 7888
             :nrepl-middleware ["cider.nrepl/cider-middleware"
                                "cemerick.piggieback/wrap-cljs-repl"]})
