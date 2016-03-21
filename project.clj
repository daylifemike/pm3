; https://github.com/clojure/clojurescript/wiki/Compiler-Options

(defproject photomosaic "0.3.0-SNAPSHOT"
  :description "Gallery layouts - available as a JS plugin and for WordPress."
  :url "https://github.com/daylifemike/photomosaic"
  :dependencies [
                 ; [bidi "2.0.3"]
                 ; [cljsjs/jquery "1.9.1-0"]
                 [cljsjs/react-with-addons "0.13.3-0"]
                 ; [com.andrewmcveigh/cljs-time "0.3.14"]
                 ; [com.cemerick/piggieback "0.1.5"] ; Note from Karl: please don't upgrade piggieback
                 ; [com.cognitect/transit-cljs "0.8.232"]
                 ; [markdown-clj "0.9.74"]
                 [org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.228"]
                 [org.clojure/core.async "0.2.374"]
                 [org.clojure/core.match "0.2.2"]
                 [prismatic/plumbing "0.5.0"]
                 ; [prismatic/schema "1.0.1"]
                 [reagent "0.5.1" :exclusions [cljsjs/react]]
                 ; [the/parsatron "0.0.7"]
                 ]
  :plugins [
            [lein-cljsbuild "1.1.1" :exclusions [org.clojure/clojurescript]]
            [lein-figwheel "0.5.0-2"]
            [cider/cider-nrepl "0.9.1"]
            ]
  :source-paths ["src"]
  ; :clean-targets ["dist"]
  ; :jvm-opts ^:replace ["-Xmx1g" "-server"]
  :cljsbuild {:builds [{:id "dev"
                        :source-paths ["src/cljs"]
                        ; :source-paths ["src/main/cljs" "devsrc"]
                        ; :resource-paths ["src/main/webapp/js/lib"]
                        :compiler {
                                   ; :output-to "resources/public/main.js"
                                   :output-to "main.js"
                                   ; :output-dir "resources/public/out"
                                   ; :output-dir "out"
                                   :output-wrapper true
                                   :compiler-stats true
                                   :optimizations :none
                                   ; :recompile-dependents false
                                   :source-map true
                                   :source-map-timestamp true
                                   :cache-analysis true
                                   :warnings {:redef false
                                              :fn-var false}}
                        :figwheel {:on-jsload "pm3.controller.app/reload"}
                        }
                       {:id "test"
                        :source-paths ["src/cljs"]
                        :compiler {:output-to "main.js"
                                   ; Uncomment these two for prod source maps
                                   ; :output-dir "src/main/webapp/assets/javascript"
                                   ; :source-map "src/main/webapp/assets/javascript/main.js.map"
                                   :optimizations :none
                                   :static-fns false
                                   :compiler-stats true
                                   :pretty-print false
                                   :closure-defines {"goog.DEBUG" false}
                                   :closure-warnings {:non-standard-jsdoc :off}}
                        :figwheel {:on-jsload "pm3.controller.app/reload"}}
                       ; {:id "prod"
                       ;  :source-paths ["src/main/cljs"]
                       ;  :compiler {:output-to "src/main/webapp/assets/javascript/main.js"
                       ;             ; Uncomment these two for prod source maps
                       ;             ; :output-dir "src/main/webapp/assets/javascript"
                       ;             ; :source-map "src/main/webapp/assets/javascript/main.js.map"
                       ;             :optimizations :advanced
                       ;             :static-fns false
                       ;             :compiler-stats true
                       ;             :pretty-print false
                       ;             :externs ["src/main/externs/flowplayer.js",
                       ;                       "src/main/externs/pickadate.js",
                       ;                       "src/main/externs/modernizr.js",
                       ;                       "src/main/externs/enquire.js",
                       ;                       "src/main/externs/sha.js",
                       ;                       "src/main/externs/browserkeymap.js",
                       ;                       "src/main/externs/ga.js"]
                       ;             :closure-defines {"goog.DEBUG" false}
                       ;             :closure-warnings {:non-standard-jsdoc :off}}}
                       ]}
  ; :figwheel {:css-dirs ["src/main/webapp/assets/stylesheets"]
  ;            :nrepl-port 7888
  ;            :nrepl-middleware ["cider.nrepl/cider-middleware"
  ;                               "cemerick.piggieback/wrap-cljs-repl"]}
)
