// Compiled by ClojureScript 1.7.228 {}
goog.provide('pm3.controller.app');
goog.require('cljs.core');
cljs.core.enable_console_print_BANG_.call(null);
pm3.controller.app.init = (function pm3$controller$app$init(root_element_id){
pm3.controller.app.reset = (function pm3$controller$app$init_$_reset(){
return cljs.core.println.call(null,"Hello, World!");
});

return pm3.controller.app.reset.call(null);
});
goog.exportSymbol('pm3.controller.app.init', pm3.controller.app.init);
pm3.controller.app.reload = (function pm3$controller$app$reload(){
if(cljs.core.truth_(pm3.controller.app.reset)){
return pm3.controller.app.reset.call(null);
} else {
return null;
}
});

//# sourceMappingURL=app.js.map?rel=1458518954953