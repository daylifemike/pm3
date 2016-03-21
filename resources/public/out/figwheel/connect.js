// Compiled by ClojureScript 1.7.228 {}
goog.provide('figwheel.connect');
goog.require('cljs.core');
goog.require('figwheel.client');
goog.require('pm3.controller.app');
goog.require('figwheel.client.utils');
figwheel.client.start.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),(function() { 
var G__36094__delegate = function (x){
if(cljs.core.truth_(pm3.controller.app.reload)){
return cljs.core.apply.call(null,pm3.controller.app.reload,x);
} else {
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: :on-jsload hook 'pm3.controller.app/reload' is missing");
}
};
var G__36094 = function (var_args){
var x = null;
if (arguments.length > 0) {
var G__36095__i = 0, G__36095__a = new Array(arguments.length -  0);
while (G__36095__i < G__36095__a.length) {G__36095__a[G__36095__i] = arguments[G__36095__i + 0]; ++G__36095__i;}
  x = new cljs.core.IndexedSeq(G__36095__a,0);
} 
return G__36094__delegate.call(this,x);};
G__36094.cljs$lang$maxFixedArity = 0;
G__36094.cljs$lang$applyTo = (function (arglist__36096){
var x = cljs.core.seq(arglist__36096);
return G__36094__delegate(x);
});
G__36094.cljs$core$IFn$_invoke$arity$variadic = G__36094__delegate;
return G__36094;
})()
,new cljs.core.Keyword(null,"build-id","build-id",1642831089),"dev",new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),"ws://localhost:3449/figwheel-ws"], null));

//# sourceMappingURL=connect.js.map?rel=1458518954960