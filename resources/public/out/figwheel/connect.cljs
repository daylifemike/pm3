(ns figwheel.connect (:require [figwheel.client] [pm3.controller.app] [figwheel.client.utils]))
(figwheel.client/start {:on-jsload (fn [& x] (if js/pm3.controller.app.reload (apply js/pm3.controller.app.reload x) (figwheel.client.utils/log :debug "Figwheel: :on-jsload hook 'pm3.controller.app/reload' is missing"))), :build-id "dev", :websocket-url "ws://localhost:3449/figwheel-ws"})

