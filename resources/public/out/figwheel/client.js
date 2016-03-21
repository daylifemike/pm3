// Compiled by ClojureScript 1.7.228 {}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.userAgent.product');
goog.require('goog.Uri');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
goog.require('cljs.repl');
goog.require('figwheel.client.heads_up');
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),args], null));

return args;
});
figwheel.client.autoload_QMARK_ = (cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?(function (){
var pred__35357 = cljs.core._EQ_;
var expr__35358 = (function (){var or__18298__auto__ = localStorage.getItem("figwheel_autoload");
if(cljs.core.truth_(or__18298__auto__)){
return or__18298__auto__;
} else {
return "true";
}
})();
if(cljs.core.truth_(pred__35357.call(null,"true",expr__35358))){
return true;
} else {
if(cljs.core.truth_(pred__35357.call(null,"false",expr__35358))){
return false;
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__35358)].join('')));
}
}
}):(function (){
return true;
}));
figwheel.client.toggle_autoload = (function figwheel$client$toggle_autoload(){
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
localStorage.setItem("figwheel_autoload",cljs.core.not.call(null,figwheel.client.autoload_QMARK_.call(null)));

return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Figwheel autoloading "),cljs.core.str((cljs.core.truth_(figwheel.client.autoload_QMARK_.call(null))?"ON":"OFF"))].join(''));
} else {
return null;
}
});
goog.exportSymbol('figwheel.client.toggle_autoload', figwheel.client.toggle_autoload);
figwheel.client.console_print = (function figwheel$client$console_print(args){
console.log.apply(console,cljs.core.into_array.call(null,args));

return args;
});
figwheel.client.repl_print_fn = (function figwheel$client$repl_print_fn(var_args){
var args__19363__auto__ = [];
var len__19356__auto___35361 = arguments.length;
var i__19357__auto___35362 = (0);
while(true){
if((i__19357__auto___35362 < len__19356__auto___35361)){
args__19363__auto__.push((arguments[i__19357__auto___35362]));

var G__35363 = (i__19357__auto___35362 + (1));
i__19357__auto___35362 = G__35363;
continue;
} else {
}
break;
}

var argseq__19364__auto__ = ((((0) < args__19363__auto__.length))?(new cljs.core.IndexedSeq(args__19363__auto__.slice((0)),(0))):null);
return figwheel.client.repl_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__19364__auto__);
});

figwheel.client.repl_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));

return null;
});

figwheel.client.repl_print_fn.cljs$lang$maxFixedArity = (0);

figwheel.client.repl_print_fn.cljs$lang$applyTo = (function (seq35360){
return figwheel.client.repl_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq35360));
});
figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

return cljs.core._STAR_print_fn_STAR_ = figwheel.client.repl_print_fn;
});
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel$client$get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__35364){
var map__35367 = p__35364;
var map__35367__$1 = ((((!((map__35367 == null)))?((((map__35367.cljs$lang$protocol_mask$partition0$ & (64))) || (map__35367.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__35367):map__35367);
var message = cljs.core.get.call(null,map__35367__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__35367__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str(class$),cljs.core.str(" : "),cljs.core.str(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__18298__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__18298__auto__)){
return or__18298__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__18286__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__18286__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__18286__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__20323__auto___35529 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___35529,ch){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___35529,ch){
return (function (state_35498){
var state_val_35499 = (state_35498[(1)]);
if((state_val_35499 === (7))){
var inst_35494 = (state_35498[(2)]);
var state_35498__$1 = state_35498;
var statearr_35500_35530 = state_35498__$1;
(statearr_35500_35530[(2)] = inst_35494);

(statearr_35500_35530[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (1))){
var state_35498__$1 = state_35498;
var statearr_35501_35531 = state_35498__$1;
(statearr_35501_35531[(2)] = null);

(statearr_35501_35531[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (4))){
var inst_35451 = (state_35498[(7)]);
var inst_35451__$1 = (state_35498[(2)]);
var state_35498__$1 = (function (){var statearr_35502 = state_35498;
(statearr_35502[(7)] = inst_35451__$1);

return statearr_35502;
})();
if(cljs.core.truth_(inst_35451__$1)){
var statearr_35503_35532 = state_35498__$1;
(statearr_35503_35532[(1)] = (5));

} else {
var statearr_35504_35533 = state_35498__$1;
(statearr_35504_35533[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (15))){
var inst_35458 = (state_35498[(8)]);
var inst_35473 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_35458);
var inst_35474 = cljs.core.first.call(null,inst_35473);
var inst_35475 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_35474);
var inst_35476 = [cljs.core.str("Figwheel: Not loading code with warnings - "),cljs.core.str(inst_35475)].join('');
var inst_35477 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),inst_35476);
var state_35498__$1 = state_35498;
var statearr_35505_35534 = state_35498__$1;
(statearr_35505_35534[(2)] = inst_35477);

(statearr_35505_35534[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (13))){
var inst_35482 = (state_35498[(2)]);
var state_35498__$1 = state_35498;
var statearr_35506_35535 = state_35498__$1;
(statearr_35506_35535[(2)] = inst_35482);

(statearr_35506_35535[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (6))){
var state_35498__$1 = state_35498;
var statearr_35507_35536 = state_35498__$1;
(statearr_35507_35536[(2)] = null);

(statearr_35507_35536[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (17))){
var inst_35480 = (state_35498[(2)]);
var state_35498__$1 = state_35498;
var statearr_35508_35537 = state_35498__$1;
(statearr_35508_35537[(2)] = inst_35480);

(statearr_35508_35537[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (3))){
var inst_35496 = (state_35498[(2)]);
var state_35498__$1 = state_35498;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35498__$1,inst_35496);
} else {
if((state_val_35499 === (12))){
var inst_35457 = (state_35498[(9)]);
var inst_35471 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_35457,opts);
var state_35498__$1 = state_35498;
if(cljs.core.truth_(inst_35471)){
var statearr_35509_35538 = state_35498__$1;
(statearr_35509_35538[(1)] = (15));

} else {
var statearr_35510_35539 = state_35498__$1;
(statearr_35510_35539[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (2))){
var state_35498__$1 = state_35498;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35498__$1,(4),ch);
} else {
if((state_val_35499 === (11))){
var inst_35458 = (state_35498[(8)]);
var inst_35463 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_35464 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_35458);
var inst_35465 = cljs.core.async.timeout.call(null,(1000));
var inst_35466 = [inst_35464,inst_35465];
var inst_35467 = (new cljs.core.PersistentVector(null,2,(5),inst_35463,inst_35466,null));
var state_35498__$1 = state_35498;
return cljs.core.async.ioc_alts_BANG_.call(null,state_35498__$1,(14),inst_35467);
} else {
if((state_val_35499 === (9))){
var inst_35458 = (state_35498[(8)]);
var inst_35484 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),"Figwheel: code autoloading is OFF");
var inst_35485 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_35458);
var inst_35486 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_35485);
var inst_35487 = [cljs.core.str("Not loading: "),cljs.core.str(inst_35486)].join('');
var inst_35488 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),inst_35487);
var state_35498__$1 = (function (){var statearr_35511 = state_35498;
(statearr_35511[(10)] = inst_35484);

return statearr_35511;
})();
var statearr_35512_35540 = state_35498__$1;
(statearr_35512_35540[(2)] = inst_35488);

(statearr_35512_35540[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (5))){
var inst_35451 = (state_35498[(7)]);
var inst_35453 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_35454 = (new cljs.core.PersistentArrayMap(null,2,inst_35453,null));
var inst_35455 = (new cljs.core.PersistentHashSet(null,inst_35454,null));
var inst_35456 = figwheel.client.focus_msgs.call(null,inst_35455,inst_35451);
var inst_35457 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_35456);
var inst_35458 = cljs.core.first.call(null,inst_35456);
var inst_35459 = figwheel.client.autoload_QMARK_.call(null);
var state_35498__$1 = (function (){var statearr_35513 = state_35498;
(statearr_35513[(8)] = inst_35458);

(statearr_35513[(9)] = inst_35457);

return statearr_35513;
})();
if(cljs.core.truth_(inst_35459)){
var statearr_35514_35541 = state_35498__$1;
(statearr_35514_35541[(1)] = (8));

} else {
var statearr_35515_35542 = state_35498__$1;
(statearr_35515_35542[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (14))){
var inst_35469 = (state_35498[(2)]);
var state_35498__$1 = state_35498;
var statearr_35516_35543 = state_35498__$1;
(statearr_35516_35543[(2)] = inst_35469);

(statearr_35516_35543[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (16))){
var state_35498__$1 = state_35498;
var statearr_35517_35544 = state_35498__$1;
(statearr_35517_35544[(2)] = null);

(statearr_35517_35544[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (10))){
var inst_35490 = (state_35498[(2)]);
var state_35498__$1 = (function (){var statearr_35518 = state_35498;
(statearr_35518[(11)] = inst_35490);

return statearr_35518;
})();
var statearr_35519_35545 = state_35498__$1;
(statearr_35519_35545[(2)] = null);

(statearr_35519_35545[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35499 === (8))){
var inst_35457 = (state_35498[(9)]);
var inst_35461 = figwheel.client.reload_file_state_QMARK_.call(null,inst_35457,opts);
var state_35498__$1 = state_35498;
if(cljs.core.truth_(inst_35461)){
var statearr_35520_35546 = state_35498__$1;
(statearr_35520_35546[(1)] = (11));

} else {
var statearr_35521_35547 = state_35498__$1;
(statearr_35521_35547[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20323__auto___35529,ch))
;
return ((function (switch__20302__auto__,c__20323__auto___35529,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__20303__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__20303__auto____0 = (function (){
var statearr_35525 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35525[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__20303__auto__);

(statearr_35525[(1)] = (1));

return statearr_35525;
});
var figwheel$client$file_reloader_plugin_$_state_machine__20303__auto____1 = (function (state_35498){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_35498);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e35526){if((e35526 instanceof Object)){
var ex__20306__auto__ = e35526;
var statearr_35527_35548 = state_35498;
(statearr_35527_35548[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35498);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35526;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35549 = state_35498;
state_35498 = G__35549;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__20303__auto__ = function(state_35498){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__20303__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__20303__auto____1.call(this,state_35498);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__20303__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__20303__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___35529,ch))
})();
var state__20325__auto__ = (function (){var statearr_35528 = f__20324__auto__.call(null);
(statearr_35528[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___35529);

return statearr_35528;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___35529,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__35550_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__35550_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
figwheel.client.get_ua_product = (function figwheel$client$get_ua_product(){
if(cljs.core.truth_(figwheel.client.utils.node_env_QMARK_.call(null))){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.SAFARI)){
return new cljs.core.Keyword(null,"safari","safari",497115653);
} else {
if(cljs.core.truth_(goog.userAgent.product.CHROME)){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.FIREFOX)){
return new cljs.core.Keyword(null,"firefox","firefox",1283768880);
} else {
if(cljs.core.truth_(goog.userAgent.product.IE)){
return new cljs.core.Keyword(null,"ie","ie",2038473780);
} else {
return null;
}
}
}
}
}
});
var base_path_35557 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_35557){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{var _STAR_print_fn_STAR_35555 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR_35556 = cljs.core._STAR_print_newline_STAR_;
cljs.core._STAR_print_fn_STAR_ = figwheel.client.repl_print_fn;

cljs.core._STAR_print_newline_STAR_ = false;

try{return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),figwheel.client.utils.eval_helper.call(null,code,opts)], null));
}finally {cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_35556;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_35555;
}}catch (e35554){if((e35554 instanceof Error)){
var e = e35554;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_35557], null));
} else {
var e = e35554;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_35557))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = {};
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__35558){
var map__35565 = p__35558;
var map__35565__$1 = ((((!((map__35565 == null)))?((((map__35565.cljs$lang$protocol_mask$partition0$ & (64))) || (map__35565.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__35565):map__35565);
var opts = map__35565__$1;
var build_id = cljs.core.get.call(null,map__35565__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__35565,map__35565__$1,opts,build_id){
return (function (p__35567){
var vec__35568 = p__35567;
var map__35569 = cljs.core.nth.call(null,vec__35568,(0),null);
var map__35569__$1 = ((((!((map__35569 == null)))?((((map__35569.cljs$lang$protocol_mask$partition0$ & (64))) || (map__35569.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__35569):map__35569);
var msg = map__35569__$1;
var msg_name = cljs.core.get.call(null,map__35569__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__35568,(1));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__35568,map__35569,map__35569__$1,msg,msg_name,_,map__35565,map__35565__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__35568,map__35569,map__35569__$1,msg,msg_name,_,map__35565,map__35565__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__35565,map__35565__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__35575){
var vec__35576 = p__35575;
var map__35577 = cljs.core.nth.call(null,vec__35576,(0),null);
var map__35577__$1 = ((((!((map__35577 == null)))?((((map__35577.cljs$lang$protocol_mask$partition0$ & (64))) || (map__35577.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__35577):map__35577);
var msg = map__35577__$1;
var msg_name = cljs.core.get.call(null,map__35577__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__35576,(1));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__35579){
var map__35589 = p__35579;
var map__35589__$1 = ((((!((map__35589 == null)))?((((map__35589.cljs$lang$protocol_mask$partition0$ & (64))) || (map__35589.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__35589):map__35589);
var on_compile_warning = cljs.core.get.call(null,map__35589__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__35589__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__35589,map__35589__$1,on_compile_warning,on_compile_fail){
return (function (p__35591){
var vec__35592 = p__35591;
var map__35593 = cljs.core.nth.call(null,vec__35592,(0),null);
var map__35593__$1 = ((((!((map__35593 == null)))?((((map__35593.cljs$lang$protocol_mask$partition0$ & (64))) || (map__35593.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__35593):map__35593);
var msg = map__35593__$1;
var msg_name = cljs.core.get.call(null,map__35593__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__35592,(1));
var pred__35595 = cljs.core._EQ_;
var expr__35596 = msg_name;
if(cljs.core.truth_(pred__35595.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__35596))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__35595.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__35596))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__35589,map__35589__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__20323__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto__,msg_hist,msg_names,msg){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto__,msg_hist,msg_names,msg){
return (function (state_35812){
var state_val_35813 = (state_35812[(1)]);
if((state_val_35813 === (7))){
var inst_35736 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
if(cljs.core.truth_(inst_35736)){
var statearr_35814_35860 = state_35812__$1;
(statearr_35814_35860[(1)] = (8));

} else {
var statearr_35815_35861 = state_35812__$1;
(statearr_35815_35861[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (20))){
var inst_35806 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35816_35862 = state_35812__$1;
(statearr_35816_35862[(2)] = inst_35806);

(statearr_35816_35862[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (27))){
var inst_35802 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35817_35863 = state_35812__$1;
(statearr_35817_35863[(2)] = inst_35802);

(statearr_35817_35863[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (1))){
var inst_35729 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_35812__$1 = state_35812;
if(cljs.core.truth_(inst_35729)){
var statearr_35818_35864 = state_35812__$1;
(statearr_35818_35864[(1)] = (2));

} else {
var statearr_35819_35865 = state_35812__$1;
(statearr_35819_35865[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (24))){
var inst_35804 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35820_35866 = state_35812__$1;
(statearr_35820_35866[(2)] = inst_35804);

(statearr_35820_35866[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (4))){
var inst_35810 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35812__$1,inst_35810);
} else {
if((state_val_35813 === (15))){
var inst_35808 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35821_35867 = state_35812__$1;
(statearr_35821_35867[(2)] = inst_35808);

(statearr_35821_35867[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (21))){
var inst_35767 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35822_35868 = state_35812__$1;
(statearr_35822_35868[(2)] = inst_35767);

(statearr_35822_35868[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (31))){
var inst_35791 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_35812__$1 = state_35812;
if(cljs.core.truth_(inst_35791)){
var statearr_35823_35869 = state_35812__$1;
(statearr_35823_35869[(1)] = (34));

} else {
var statearr_35824_35870 = state_35812__$1;
(statearr_35824_35870[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (32))){
var inst_35800 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35825_35871 = state_35812__$1;
(statearr_35825_35871[(2)] = inst_35800);

(statearr_35825_35871[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (33))){
var inst_35789 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35826_35872 = state_35812__$1;
(statearr_35826_35872[(2)] = inst_35789);

(statearr_35826_35872[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (13))){
var inst_35750 = figwheel.client.heads_up.clear.call(null);
var state_35812__$1 = state_35812;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35812__$1,(16),inst_35750);
} else {
if((state_val_35813 === (22))){
var inst_35771 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_35772 = figwheel.client.heads_up.append_message.call(null,inst_35771);
var state_35812__$1 = state_35812;
var statearr_35827_35873 = state_35812__$1;
(statearr_35827_35873[(2)] = inst_35772);

(statearr_35827_35873[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (36))){
var inst_35798 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35828_35874 = state_35812__$1;
(statearr_35828_35874[(2)] = inst_35798);

(statearr_35828_35874[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (29))){
var inst_35782 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35829_35875 = state_35812__$1;
(statearr_35829_35875[(2)] = inst_35782);

(statearr_35829_35875[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (6))){
var inst_35731 = (state_35812[(7)]);
var state_35812__$1 = state_35812;
var statearr_35830_35876 = state_35812__$1;
(statearr_35830_35876[(2)] = inst_35731);

(statearr_35830_35876[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (28))){
var inst_35778 = (state_35812[(2)]);
var inst_35779 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_35780 = figwheel.client.heads_up.display_warning.call(null,inst_35779);
var state_35812__$1 = (function (){var statearr_35831 = state_35812;
(statearr_35831[(8)] = inst_35778);

return statearr_35831;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35812__$1,(29),inst_35780);
} else {
if((state_val_35813 === (25))){
var inst_35776 = figwheel.client.heads_up.clear.call(null);
var state_35812__$1 = state_35812;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35812__$1,(28),inst_35776);
} else {
if((state_val_35813 === (34))){
var inst_35793 = figwheel.client.heads_up.flash_loaded.call(null);
var state_35812__$1 = state_35812;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35812__$1,(37),inst_35793);
} else {
if((state_val_35813 === (17))){
var inst_35758 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35832_35877 = state_35812__$1;
(statearr_35832_35877[(2)] = inst_35758);

(statearr_35832_35877[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (3))){
var inst_35748 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_35812__$1 = state_35812;
if(cljs.core.truth_(inst_35748)){
var statearr_35833_35878 = state_35812__$1;
(statearr_35833_35878[(1)] = (13));

} else {
var statearr_35834_35879 = state_35812__$1;
(statearr_35834_35879[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (12))){
var inst_35744 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35835_35880 = state_35812__$1;
(statearr_35835_35880[(2)] = inst_35744);

(statearr_35835_35880[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (2))){
var inst_35731 = (state_35812[(7)]);
var inst_35731__$1 = figwheel.client.autoload_QMARK_.call(null);
var state_35812__$1 = (function (){var statearr_35836 = state_35812;
(statearr_35836[(7)] = inst_35731__$1);

return statearr_35836;
})();
if(cljs.core.truth_(inst_35731__$1)){
var statearr_35837_35881 = state_35812__$1;
(statearr_35837_35881[(1)] = (5));

} else {
var statearr_35838_35882 = state_35812__$1;
(statearr_35838_35882[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (23))){
var inst_35774 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_35812__$1 = state_35812;
if(cljs.core.truth_(inst_35774)){
var statearr_35839_35883 = state_35812__$1;
(statearr_35839_35883[(1)] = (25));

} else {
var statearr_35840_35884 = state_35812__$1;
(statearr_35840_35884[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (35))){
var state_35812__$1 = state_35812;
var statearr_35841_35885 = state_35812__$1;
(statearr_35841_35885[(2)] = null);

(statearr_35841_35885[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (19))){
var inst_35769 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_35812__$1 = state_35812;
if(cljs.core.truth_(inst_35769)){
var statearr_35842_35886 = state_35812__$1;
(statearr_35842_35886[(1)] = (22));

} else {
var statearr_35843_35887 = state_35812__$1;
(statearr_35843_35887[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (11))){
var inst_35740 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35844_35888 = state_35812__$1;
(statearr_35844_35888[(2)] = inst_35740);

(statearr_35844_35888[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (9))){
var inst_35742 = figwheel.client.heads_up.clear.call(null);
var state_35812__$1 = state_35812;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35812__$1,(12),inst_35742);
} else {
if((state_val_35813 === (5))){
var inst_35733 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_35812__$1 = state_35812;
var statearr_35845_35889 = state_35812__$1;
(statearr_35845_35889[(2)] = inst_35733);

(statearr_35845_35889[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (14))){
var inst_35760 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_35812__$1 = state_35812;
if(cljs.core.truth_(inst_35760)){
var statearr_35846_35890 = state_35812__$1;
(statearr_35846_35890[(1)] = (18));

} else {
var statearr_35847_35891 = state_35812__$1;
(statearr_35847_35891[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (26))){
var inst_35784 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_35812__$1 = state_35812;
if(cljs.core.truth_(inst_35784)){
var statearr_35848_35892 = state_35812__$1;
(statearr_35848_35892[(1)] = (30));

} else {
var statearr_35849_35893 = state_35812__$1;
(statearr_35849_35893[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (16))){
var inst_35752 = (state_35812[(2)]);
var inst_35753 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_35754 = figwheel.client.format_messages.call(null,inst_35753);
var inst_35755 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_35756 = figwheel.client.heads_up.display_error.call(null,inst_35754,inst_35755);
var state_35812__$1 = (function (){var statearr_35850 = state_35812;
(statearr_35850[(9)] = inst_35752);

return statearr_35850;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35812__$1,(17),inst_35756);
} else {
if((state_val_35813 === (30))){
var inst_35786 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_35787 = figwheel.client.heads_up.display_warning.call(null,inst_35786);
var state_35812__$1 = state_35812;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35812__$1,(33),inst_35787);
} else {
if((state_val_35813 === (10))){
var inst_35746 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35851_35894 = state_35812__$1;
(statearr_35851_35894[(2)] = inst_35746);

(statearr_35851_35894[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (18))){
var inst_35762 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_35763 = figwheel.client.format_messages.call(null,inst_35762);
var inst_35764 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_35765 = figwheel.client.heads_up.display_error.call(null,inst_35763,inst_35764);
var state_35812__$1 = state_35812;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35812__$1,(21),inst_35765);
} else {
if((state_val_35813 === (37))){
var inst_35795 = (state_35812[(2)]);
var state_35812__$1 = state_35812;
var statearr_35852_35895 = state_35812__$1;
(statearr_35852_35895[(2)] = inst_35795);

(statearr_35852_35895[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35813 === (8))){
var inst_35738 = figwheel.client.heads_up.flash_loaded.call(null);
var state_35812__$1 = state_35812;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35812__$1,(11),inst_35738);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20323__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__20302__auto__,c__20323__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto____0 = (function (){
var statearr_35856 = [null,null,null,null,null,null,null,null,null,null];
(statearr_35856[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto__);

(statearr_35856[(1)] = (1));

return statearr_35856;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto____1 = (function (state_35812){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_35812);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e35857){if((e35857 instanceof Object)){
var ex__20306__auto__ = e35857;
var statearr_35858_35896 = state_35812;
(statearr_35858_35896[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35812);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35857;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35897 = state_35812;
state_35812 = G__35897;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto__ = function(state_35812){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto____1.call(this,state_35812);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto__,msg_hist,msg_names,msg))
})();
var state__20325__auto__ = (function (){var statearr_35859 = f__20324__auto__.call(null);
(statearr_35859[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto__);

return statearr_35859;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto__,msg_hist,msg_names,msg))
);

return c__20323__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__20323__auto___35960 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___35960,ch){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___35960,ch){
return (function (state_35943){
var state_val_35944 = (state_35943[(1)]);
if((state_val_35944 === (1))){
var state_35943__$1 = state_35943;
var statearr_35945_35961 = state_35943__$1;
(statearr_35945_35961[(2)] = null);

(statearr_35945_35961[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35944 === (2))){
var state_35943__$1 = state_35943;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35943__$1,(4),ch);
} else {
if((state_val_35944 === (3))){
var inst_35941 = (state_35943[(2)]);
var state_35943__$1 = state_35943;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35943__$1,inst_35941);
} else {
if((state_val_35944 === (4))){
var inst_35931 = (state_35943[(7)]);
var inst_35931__$1 = (state_35943[(2)]);
var state_35943__$1 = (function (){var statearr_35946 = state_35943;
(statearr_35946[(7)] = inst_35931__$1);

return statearr_35946;
})();
if(cljs.core.truth_(inst_35931__$1)){
var statearr_35947_35962 = state_35943__$1;
(statearr_35947_35962[(1)] = (5));

} else {
var statearr_35948_35963 = state_35943__$1;
(statearr_35948_35963[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35944 === (5))){
var inst_35931 = (state_35943[(7)]);
var inst_35933 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_35931);
var state_35943__$1 = state_35943;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35943__$1,(8),inst_35933);
} else {
if((state_val_35944 === (6))){
var state_35943__$1 = state_35943;
var statearr_35949_35964 = state_35943__$1;
(statearr_35949_35964[(2)] = null);

(statearr_35949_35964[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35944 === (7))){
var inst_35939 = (state_35943[(2)]);
var state_35943__$1 = state_35943;
var statearr_35950_35965 = state_35943__$1;
(statearr_35950_35965[(2)] = inst_35939);

(statearr_35950_35965[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35944 === (8))){
var inst_35935 = (state_35943[(2)]);
var state_35943__$1 = (function (){var statearr_35951 = state_35943;
(statearr_35951[(8)] = inst_35935);

return statearr_35951;
})();
var statearr_35952_35966 = state_35943__$1;
(statearr_35952_35966[(2)] = null);

(statearr_35952_35966[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
});})(c__20323__auto___35960,ch))
;
return ((function (switch__20302__auto__,c__20323__auto___35960,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__20303__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__20303__auto____0 = (function (){
var statearr_35956 = [null,null,null,null,null,null,null,null,null];
(statearr_35956[(0)] = figwheel$client$heads_up_plugin_$_state_machine__20303__auto__);

(statearr_35956[(1)] = (1));

return statearr_35956;
});
var figwheel$client$heads_up_plugin_$_state_machine__20303__auto____1 = (function (state_35943){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_35943);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e35957){if((e35957 instanceof Object)){
var ex__20306__auto__ = e35957;
var statearr_35958_35967 = state_35943;
(statearr_35958_35967[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35943);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35957;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35968 = state_35943;
state_35943 = G__35968;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__20303__auto__ = function(state_35943){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__20303__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__20303__auto____1.call(this,state_35943);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__20303__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__20303__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___35960,ch))
})();
var state__20325__auto__ = (function (){var statearr_35959 = f__20324__auto__.call(null);
(statearr_35959[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___35960);

return statearr_35959;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___35960,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__20323__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto__){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto__){
return (function (state_35989){
var state_val_35990 = (state_35989[(1)]);
if((state_val_35990 === (1))){
var inst_35984 = cljs.core.async.timeout.call(null,(3000));
var state_35989__$1 = state_35989;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35989__$1,(2),inst_35984);
} else {
if((state_val_35990 === (2))){
var inst_35986 = (state_35989[(2)]);
var inst_35987 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_35989__$1 = (function (){var statearr_35991 = state_35989;
(statearr_35991[(7)] = inst_35986);

return statearr_35991;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35989__$1,inst_35987);
} else {
return null;
}
}
});})(c__20323__auto__))
;
return ((function (switch__20302__auto__,c__20323__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__20303__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__20303__auto____0 = (function (){
var statearr_35995 = [null,null,null,null,null,null,null,null];
(statearr_35995[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__20303__auto__);

(statearr_35995[(1)] = (1));

return statearr_35995;
});
var figwheel$client$enforce_project_plugin_$_state_machine__20303__auto____1 = (function (state_35989){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_35989);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e35996){if((e35996 instanceof Object)){
var ex__20306__auto__ = e35996;
var statearr_35997_35999 = state_35989;
(statearr_35997_35999[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35989);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35996;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36000 = state_35989;
state_35989 = G__36000;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__20303__auto__ = function(state_35989){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__20303__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__20303__auto____1.call(this,state_35989);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__20303__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__20303__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto__))
})();
var state__20325__auto__ = (function (){var statearr_35998 = f__20324__auto__.call(null);
(statearr_35998[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto__);

return statearr_35998;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto__))
);

return c__20323__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__36001){
var map__36008 = p__36001;
var map__36008__$1 = ((((!((map__36008 == null)))?((((map__36008.cljs$lang$protocol_mask$partition0$ & (64))) || (map__36008.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__36008):map__36008);
var ed = map__36008__$1;
var formatted_exception = cljs.core.get.call(null,map__36008__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__36008__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__36008__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__36010_36014 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__36011_36015 = null;
var count__36012_36016 = (0);
var i__36013_36017 = (0);
while(true){
if((i__36013_36017 < count__36012_36016)){
var msg_36018 = cljs.core._nth.call(null,chunk__36011_36015,i__36013_36017);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_36018);

var G__36019 = seq__36010_36014;
var G__36020 = chunk__36011_36015;
var G__36021 = count__36012_36016;
var G__36022 = (i__36013_36017 + (1));
seq__36010_36014 = G__36019;
chunk__36011_36015 = G__36020;
count__36012_36016 = G__36021;
i__36013_36017 = G__36022;
continue;
} else {
var temp__4425__auto___36023 = cljs.core.seq.call(null,seq__36010_36014);
if(temp__4425__auto___36023){
var seq__36010_36024__$1 = temp__4425__auto___36023;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__36010_36024__$1)){
var c__19101__auto___36025 = cljs.core.chunk_first.call(null,seq__36010_36024__$1);
var G__36026 = cljs.core.chunk_rest.call(null,seq__36010_36024__$1);
var G__36027 = c__19101__auto___36025;
var G__36028 = cljs.core.count.call(null,c__19101__auto___36025);
var G__36029 = (0);
seq__36010_36014 = G__36026;
chunk__36011_36015 = G__36027;
count__36012_36016 = G__36028;
i__36013_36017 = G__36029;
continue;
} else {
var msg_36030 = cljs.core.first.call(null,seq__36010_36024__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_36030);

var G__36031 = cljs.core.next.call(null,seq__36010_36024__$1);
var G__36032 = null;
var G__36033 = (0);
var G__36034 = (0);
seq__36010_36014 = G__36031;
chunk__36011_36015 = G__36032;
count__36012_36016 = G__36033;
i__36013_36017 = G__36034;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cause)){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Error on file "),cljs.core.str(new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", line "),cljs.core.str(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", column "),cljs.core.str(new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause))].join(''));
} else {
}

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__36035){
var map__36038 = p__36035;
var map__36038__$1 = ((((!((map__36038 == null)))?((((map__36038.cljs$lang$protocol_mask$partition0$ & (64))) || (map__36038.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__36038):map__36038);
var w = map__36038__$1;
var message = cljs.core.get.call(null,map__36038__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),[cljs.core.str("Figwheel: Compile Warning - "),cljs.core.str(message)].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined'){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"eval-fn","eval-fn",-1111644294),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[figwheel.client.default_on_compile_warning,figwheel.client.default_on_jsload,true,figwheel.client.default_on_compile_fail,false,true,[cljs.core.str("ws://"),cljs.core.str((cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),cljs.core.str("/figwheel-ws")].join(''),figwheel.client.default_before_load,false,false,(100),true,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = ((cljs.core.not.call(null,figwheel.client.utils.html_env_QMARK_.call(null)))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__18286__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__18286__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__18286__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_message_watch = (function figwheel$client$add_message_watch(key,callback){
return cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,key,(function (_,___$1,___$2,msg_hist){
return callback.call(null,cljs.core.first.call(null,msg_hist));
}));
});
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__36046 = cljs.core.seq.call(null,plugins);
var chunk__36047 = null;
var count__36048 = (0);
var i__36049 = (0);
while(true){
if((i__36049 < count__36048)){
var vec__36050 = cljs.core._nth.call(null,chunk__36047,i__36049);
var k = cljs.core.nth.call(null,vec__36050,(0),null);
var plugin = cljs.core.nth.call(null,vec__36050,(1),null);
if(cljs.core.truth_(plugin)){
var pl_36052 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__36046,chunk__36047,count__36048,i__36049,pl_36052,vec__36050,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_36052.call(null,msg_hist);
});})(seq__36046,chunk__36047,count__36048,i__36049,pl_36052,vec__36050,k,plugin))
);
} else {
}

var G__36053 = seq__36046;
var G__36054 = chunk__36047;
var G__36055 = count__36048;
var G__36056 = (i__36049 + (1));
seq__36046 = G__36053;
chunk__36047 = G__36054;
count__36048 = G__36055;
i__36049 = G__36056;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__36046);
if(temp__4425__auto__){
var seq__36046__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__36046__$1)){
var c__19101__auto__ = cljs.core.chunk_first.call(null,seq__36046__$1);
var G__36057 = cljs.core.chunk_rest.call(null,seq__36046__$1);
var G__36058 = c__19101__auto__;
var G__36059 = cljs.core.count.call(null,c__19101__auto__);
var G__36060 = (0);
seq__36046 = G__36057;
chunk__36047 = G__36058;
count__36048 = G__36059;
i__36049 = G__36060;
continue;
} else {
var vec__36051 = cljs.core.first.call(null,seq__36046__$1);
var k = cljs.core.nth.call(null,vec__36051,(0),null);
var plugin = cljs.core.nth.call(null,vec__36051,(1),null);
if(cljs.core.truth_(plugin)){
var pl_36061 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__36046,chunk__36047,count__36048,i__36049,pl_36061,vec__36051,k,plugin,seq__36046__$1,temp__4425__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_36061.call(null,msg_hist);
});})(seq__36046,chunk__36047,count__36048,i__36049,pl_36061,vec__36051,k,plugin,seq__36046__$1,temp__4425__auto__))
);
} else {
}

var G__36062 = cljs.core.next.call(null,seq__36046__$1);
var G__36063 = null;
var G__36064 = (0);
var G__36065 = (0);
seq__36046 = G__36062;
chunk__36047 = G__36063;
count__36048 = G__36064;
i__36049 = G__36065;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(var_args){
var args36066 = [];
var len__19356__auto___36069 = arguments.length;
var i__19357__auto___36070 = (0);
while(true){
if((i__19357__auto___36070 < len__19356__auto___36069)){
args36066.push((arguments[i__19357__auto___36070]));

var G__36071 = (i__19357__auto___36070 + (1));
i__19357__auto___36070 = G__36071;
continue;
} else {
}
break;
}

var G__36068 = args36066.length;
switch (G__36068) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args36066.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined'){
return null;
} else {
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

return figwheel.client.socket.open.call(null,system_options);
}));
}
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;
figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(var_args){
var args__19363__auto__ = [];
var len__19356__auto___36077 = arguments.length;
var i__19357__auto___36078 = (0);
while(true){
if((i__19357__auto___36078 < len__19356__auto___36077)){
args__19363__auto__.push((arguments[i__19357__auto___36078]));

var G__36079 = (i__19357__auto___36078 + (1));
i__19357__auto___36078 = G__36079;
continue;
} else {
}
break;
}

var argseq__19364__auto__ = ((((0) < args__19363__auto__.length))?(new cljs.core.IndexedSeq(args__19363__auto__.slice((0)),(0))):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__19364__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__36074){
var map__36075 = p__36074;
var map__36075__$1 = ((((!((map__36075 == null)))?((((map__36075.cljs$lang$protocol_mask$partition0$ & (64))) || (map__36075.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__36075):map__36075);
var opts = map__36075__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq36073){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq36073));
});

//# sourceMappingURL=client.js.map?rel=1458518948447