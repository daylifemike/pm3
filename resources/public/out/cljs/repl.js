// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4425__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4425__auto__)){
var ns = temp__4425__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__34938_34952 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__34939_34953 = null;
var count__34940_34954 = (0);
var i__34941_34955 = (0);
while(true){
if((i__34941_34955 < count__34940_34954)){
var f_34956 = cljs.core._nth.call(null,chunk__34939_34953,i__34941_34955);
cljs.core.println.call(null,"  ",f_34956);

var G__34957 = seq__34938_34952;
var G__34958 = chunk__34939_34953;
var G__34959 = count__34940_34954;
var G__34960 = (i__34941_34955 + (1));
seq__34938_34952 = G__34957;
chunk__34939_34953 = G__34958;
count__34940_34954 = G__34959;
i__34941_34955 = G__34960;
continue;
} else {
var temp__4425__auto___34961 = cljs.core.seq.call(null,seq__34938_34952);
if(temp__4425__auto___34961){
var seq__34938_34962__$1 = temp__4425__auto___34961;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__34938_34962__$1)){
var c__19101__auto___34963 = cljs.core.chunk_first.call(null,seq__34938_34962__$1);
var G__34964 = cljs.core.chunk_rest.call(null,seq__34938_34962__$1);
var G__34965 = c__19101__auto___34963;
var G__34966 = cljs.core.count.call(null,c__19101__auto___34963);
var G__34967 = (0);
seq__34938_34952 = G__34964;
chunk__34939_34953 = G__34965;
count__34940_34954 = G__34966;
i__34941_34955 = G__34967;
continue;
} else {
var f_34968 = cljs.core.first.call(null,seq__34938_34962__$1);
cljs.core.println.call(null,"  ",f_34968);

var G__34969 = cljs.core.next.call(null,seq__34938_34962__$1);
var G__34970 = null;
var G__34971 = (0);
var G__34972 = (0);
seq__34938_34952 = G__34969;
chunk__34939_34953 = G__34970;
count__34940_34954 = G__34971;
i__34941_34955 = G__34972;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_34973 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__18298__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__18298__auto__)){
return or__18298__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_34973);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_34973)))?cljs.core.second.call(null,arglists_34973):arglists_34973));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__34942 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__34943 = null;
var count__34944 = (0);
var i__34945 = (0);
while(true){
if((i__34945 < count__34944)){
var vec__34946 = cljs.core._nth.call(null,chunk__34943,i__34945);
var name = cljs.core.nth.call(null,vec__34946,(0),null);
var map__34947 = cljs.core.nth.call(null,vec__34946,(1),null);
var map__34947__$1 = ((((!((map__34947 == null)))?((((map__34947.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34947.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34947):map__34947);
var doc = cljs.core.get.call(null,map__34947__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__34947__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__34974 = seq__34942;
var G__34975 = chunk__34943;
var G__34976 = count__34944;
var G__34977 = (i__34945 + (1));
seq__34942 = G__34974;
chunk__34943 = G__34975;
count__34944 = G__34976;
i__34945 = G__34977;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__34942);
if(temp__4425__auto__){
var seq__34942__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__34942__$1)){
var c__19101__auto__ = cljs.core.chunk_first.call(null,seq__34942__$1);
var G__34978 = cljs.core.chunk_rest.call(null,seq__34942__$1);
var G__34979 = c__19101__auto__;
var G__34980 = cljs.core.count.call(null,c__19101__auto__);
var G__34981 = (0);
seq__34942 = G__34978;
chunk__34943 = G__34979;
count__34944 = G__34980;
i__34945 = G__34981;
continue;
} else {
var vec__34949 = cljs.core.first.call(null,seq__34942__$1);
var name = cljs.core.nth.call(null,vec__34949,(0),null);
var map__34950 = cljs.core.nth.call(null,vec__34949,(1),null);
var map__34950__$1 = ((((!((map__34950 == null)))?((((map__34950.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34950.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34950):map__34950);
var doc = cljs.core.get.call(null,map__34950__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__34950__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__34982 = cljs.core.next.call(null,seq__34942__$1);
var G__34983 = null;
var G__34984 = (0);
var G__34985 = (0);
seq__34942 = G__34982;
chunk__34943 = G__34983;
count__34944 = G__34984;
i__34945 = G__34985;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map?rel=1458518947484