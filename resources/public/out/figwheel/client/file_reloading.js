// Compiled by ClojureScript 1.7.228 {}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('goog.Uri');
goog.require('goog.net.jsloader');
goog.require('cljs.core.async');
goog.require('goog.object');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
if(typeof figwheel.client.file_reloading.figwheel_meta_pragmas !== 'undefined'){
} else {
figwheel.client.file_reloading.figwheel_meta_pragmas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__18298__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) == null)) || (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string')) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__18298__auto__){
return or__18298__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.name__GT_path = (function figwheel$client$file_reloading$name__GT_path(ns){

return (goog.dependencies_.nameToPath[ns]);
});
figwheel.client.file_reloading.provided_QMARK_ = (function figwheel$client$file_reloading$provided_QMARK_(ns){
return (goog.dependencies_.written[figwheel.client.file_reloading.name__GT_path.call(null,ns)]);
});
figwheel.client.file_reloading.fix_node_request_url = (function figwheel$client$file_reloading$fix_node_request_url(url){

if(cljs.core.truth_(goog.string.startsWith(url,"../"))){
return clojure.string.replace.call(null,url,"../","");
} else {
return [cljs.core.str("goog/"),cljs.core.str(url)].join('');
}
});
figwheel.client.file_reloading.immutable_ns_QMARK_ = (function figwheel$client$file_reloading$immutable_ns_QMARK_(name){
var or__18298__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, ["svgpan.SvgPan",null,"far.out",null,"testDep.bar",null,"someprotopackage.TestPackageTypes",null,"goog",null,"an.existing.path",null,"cljs.core",null,"ns",null,"dup.base",null], null), null).call(null,name);
if(cljs.core.truth_(or__18298__auto__)){
return or__18298__auto__;
} else {
return cljs.core.some.call(null,cljs.core.partial.call(null,goog.string.startsWith,name),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["goog.","cljs.","clojure.","fake.","proto2."], null));
}
});
figwheel.client.file_reloading.get_requires = (function figwheel$client$file_reloading$get_requires(ns){
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__33914_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__33914_SHARP_));
}),goog.object.getKeys((goog.dependencies_.requires[figwheel.client.file_reloading.name__GT_path.call(null,ns)]))));
});
if(typeof figwheel.client.file_reloading.dependency_data !== 'undefined'){
} else {
figwheel.client.file_reloading.dependency_data = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dependents","dependents",136812837),cljs.core.PersistentArrayMap.EMPTY], null));
}
figwheel.client.file_reloading.path_to_name_BANG_ = (function figwheel$client$file_reloading$path_to_name_BANG_(path,name){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.fromArray([name], true));
});
/**
 * Setup a path to name dependencies map.
 * That goes from path -> #{ ns-names }
 */
figwheel.client.file_reloading.setup_path__GT_name_BANG_ = (function figwheel$client$file_reloading$setup_path__GT_name_BANG_(){
var nameToPath = goog.object.filter(goog.dependencies_.nameToPath,(function (v,k,o){
return goog.string.startsWith(v,"../");
}));
return goog.object.forEach(nameToPath,((function (nameToPath){
return (function (v,k,o){
return figwheel.client.file_reloading.path_to_name_BANG_.call(null,v,k);
});})(nameToPath))
);
});
/**
 * returns a set of namespaces defined by a path
 */
figwheel.client.file_reloading.path__GT_name = (function figwheel$client$file_reloading$path__GT_name(path){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null));
});
figwheel.client.file_reloading.name_to_parent_BANG_ = (function figwheel$client$file_reloading$name_to_parent_BANG_(ns,parent_ns){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.fromArray([parent_ns], true));
});
/**
 * This reverses the goog.dependencies_.requires for looking up ns-dependents.
 */
figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_ = (function figwheel$client$file_reloading$setup_ns__GT_dependents_BANG_(){
var requires = goog.object.filter(goog.dependencies_.requires,(function (v,k,o){
return goog.string.startsWith(k,"../");
}));
return goog.object.forEach(requires,((function (requires){
return (function (v,k,_){
return goog.object.forEach(v,((function (requires){
return (function (v_SINGLEQUOTE_,k_SINGLEQUOTE_,___$1){
var seq__33919 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__33920 = null;
var count__33921 = (0);
var i__33922 = (0);
while(true){
if((i__33922 < count__33921)){
var n = cljs.core._nth.call(null,chunk__33920,i__33922);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__33923 = seq__33919;
var G__33924 = chunk__33920;
var G__33925 = count__33921;
var G__33926 = (i__33922 + (1));
seq__33919 = G__33923;
chunk__33920 = G__33924;
count__33921 = G__33925;
i__33922 = G__33926;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__33919);
if(temp__4425__auto__){
var seq__33919__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__33919__$1)){
var c__19101__auto__ = cljs.core.chunk_first.call(null,seq__33919__$1);
var G__33927 = cljs.core.chunk_rest.call(null,seq__33919__$1);
var G__33928 = c__19101__auto__;
var G__33929 = cljs.core.count.call(null,c__19101__auto__);
var G__33930 = (0);
seq__33919 = G__33927;
chunk__33920 = G__33928;
count__33921 = G__33929;
i__33922 = G__33930;
continue;
} else {
var n = cljs.core.first.call(null,seq__33919__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__33931 = cljs.core.next.call(null,seq__33919__$1);
var G__33932 = null;
var G__33933 = (0);
var G__33934 = (0);
seq__33919 = G__33931;
chunk__33920 = G__33932;
count__33921 = G__33933;
i__33922 = G__33934;
continue;
}
} else {
return null;
}
}
break;
}
});})(requires))
);
});})(requires))
);
});
figwheel.client.file_reloading.ns__GT_dependents = (function figwheel$client$file_reloading$ns__GT_dependents(ns){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null));
});
figwheel.client.file_reloading.build_topo_sort = (function figwheel$client$file_reloading$build_topo_sort(get_deps){
var get_deps__$1 = cljs.core.memoize.call(null,get_deps);
var topo_sort_helper_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_topo_sort_helper_STAR_(x,depth,state){
var deps = get_deps__$1.call(null,x);
if(cljs.core.empty_QMARK_.call(null,deps)){
return null;
} else {
return topo_sort_STAR_.call(null,deps,depth,state);
}
});})(get_deps__$1))
;
var topo_sort_STAR_ = ((function (get_deps__$1){
return (function() {
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = null;
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1 = (function (deps){
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.call(null,deps,(0),cljs.core.atom.call(null,cljs.core.sorted_map.call(null)));
});
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3 = (function (deps,depth,state){
cljs.core.swap_BANG_.call(null,state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.call(null,cljs.core.into,cljs.core.PersistentHashSet.EMPTY),deps);

var seq__33973_33980 = cljs.core.seq.call(null,deps);
var chunk__33974_33981 = null;
var count__33975_33982 = (0);
var i__33976_33983 = (0);
while(true){
if((i__33976_33983 < count__33975_33982)){
var dep_33984 = cljs.core._nth.call(null,chunk__33974_33981,i__33976_33983);
topo_sort_helper_STAR_.call(null,dep_33984,(depth + (1)),state);

var G__33985 = seq__33973_33980;
var G__33986 = chunk__33974_33981;
var G__33987 = count__33975_33982;
var G__33988 = (i__33976_33983 + (1));
seq__33973_33980 = G__33985;
chunk__33974_33981 = G__33986;
count__33975_33982 = G__33987;
i__33976_33983 = G__33988;
continue;
} else {
var temp__4425__auto___33989 = cljs.core.seq.call(null,seq__33973_33980);
if(temp__4425__auto___33989){
var seq__33973_33990__$1 = temp__4425__auto___33989;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__33973_33990__$1)){
var c__19101__auto___33991 = cljs.core.chunk_first.call(null,seq__33973_33990__$1);
var G__33992 = cljs.core.chunk_rest.call(null,seq__33973_33990__$1);
var G__33993 = c__19101__auto___33991;
var G__33994 = cljs.core.count.call(null,c__19101__auto___33991);
var G__33995 = (0);
seq__33973_33980 = G__33992;
chunk__33974_33981 = G__33993;
count__33975_33982 = G__33994;
i__33976_33983 = G__33995;
continue;
} else {
var dep_33996 = cljs.core.first.call(null,seq__33973_33990__$1);
topo_sort_helper_STAR_.call(null,dep_33996,(depth + (1)),state);

var G__33997 = cljs.core.next.call(null,seq__33973_33990__$1);
var G__33998 = null;
var G__33999 = (0);
var G__34000 = (0);
seq__33973_33980 = G__33997;
chunk__33974_33981 = G__33998;
count__33975_33982 = G__33999;
i__33976_33983 = G__34000;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,depth,(0))){
return elim_dups_STAR_.call(null,cljs.core.reverse.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,state))));
} else {
return null;
}
});
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = function(deps,depth,state){
switch(arguments.length){
case 1:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1.call(this,deps);
case 3:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3.call(this,deps,depth,state);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1;
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$3 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3;
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_;
})()
;})(get_deps__$1))
;
var elim_dups_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__33977){
var vec__33979 = p__33977;
var x = cljs.core.nth.call(null,vec__33979,(0),null);
var xs = cljs.core.nthnext.call(null,vec__33979,(1));
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__33979,x,xs,get_deps__$1){
return (function (p1__33935_SHARP_){
return clojure.set.difference.call(null,p1__33935_SHARP_,x);
});})(vec__33979,x,xs,get_deps__$1))
,xs)));
}
});})(get_deps__$1))
;
return topo_sort_STAR_;
});
figwheel.client.file_reloading.get_all_dependencies = (function figwheel$client$file_reloading$get_all_dependencies(ns){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.get_requires);
return cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns], null))));
});
figwheel.client.file_reloading.get_all_dependents = (function figwheel$client$file_reloading$get_all_dependents(nss){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.ns__GT_dependents);
return cljs.core.reverse.call(null,cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,nss))));
});
figwheel.client.file_reloading.unprovide_BANG_ = (function figwheel$client$file_reloading$unprovide_BANG_(ns){
var path = figwheel.client.file_reloading.name__GT_path.call(null,ns);
goog.object.remove(goog.dependencies_.visited,path);

goog.object.remove(goog.dependencies_.written,path);

return goog.object.remove(goog.dependencies_.written,[cljs.core.str(goog.basePath),cljs.core.str(path)].join(''));
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){
return [cljs.core.str(goog.basePath),cljs.core.str(figwheel.client.file_reloading.name__GT_path.call(null,ns))].join('');
});
figwheel.client.file_reloading.addDependency = (function figwheel$client$file_reloading$addDependency(path,provides,requires){
var seq__34013 = cljs.core.seq.call(null,provides);
var chunk__34014 = null;
var count__34015 = (0);
var i__34016 = (0);
while(true){
if((i__34016 < count__34015)){
var prov = cljs.core._nth.call(null,chunk__34014,i__34016);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__34017_34025 = cljs.core.seq.call(null,requires);
var chunk__34018_34026 = null;
var count__34019_34027 = (0);
var i__34020_34028 = (0);
while(true){
if((i__34020_34028 < count__34019_34027)){
var req_34029 = cljs.core._nth.call(null,chunk__34018_34026,i__34020_34028);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_34029,prov);

var G__34030 = seq__34017_34025;
var G__34031 = chunk__34018_34026;
var G__34032 = count__34019_34027;
var G__34033 = (i__34020_34028 + (1));
seq__34017_34025 = G__34030;
chunk__34018_34026 = G__34031;
count__34019_34027 = G__34032;
i__34020_34028 = G__34033;
continue;
} else {
var temp__4425__auto___34034 = cljs.core.seq.call(null,seq__34017_34025);
if(temp__4425__auto___34034){
var seq__34017_34035__$1 = temp__4425__auto___34034;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__34017_34035__$1)){
var c__19101__auto___34036 = cljs.core.chunk_first.call(null,seq__34017_34035__$1);
var G__34037 = cljs.core.chunk_rest.call(null,seq__34017_34035__$1);
var G__34038 = c__19101__auto___34036;
var G__34039 = cljs.core.count.call(null,c__19101__auto___34036);
var G__34040 = (0);
seq__34017_34025 = G__34037;
chunk__34018_34026 = G__34038;
count__34019_34027 = G__34039;
i__34020_34028 = G__34040;
continue;
} else {
var req_34041 = cljs.core.first.call(null,seq__34017_34035__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_34041,prov);

var G__34042 = cljs.core.next.call(null,seq__34017_34035__$1);
var G__34043 = null;
var G__34044 = (0);
var G__34045 = (0);
seq__34017_34025 = G__34042;
chunk__34018_34026 = G__34043;
count__34019_34027 = G__34044;
i__34020_34028 = G__34045;
continue;
}
} else {
}
}
break;
}

var G__34046 = seq__34013;
var G__34047 = chunk__34014;
var G__34048 = count__34015;
var G__34049 = (i__34016 + (1));
seq__34013 = G__34046;
chunk__34014 = G__34047;
count__34015 = G__34048;
i__34016 = G__34049;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__34013);
if(temp__4425__auto__){
var seq__34013__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__34013__$1)){
var c__19101__auto__ = cljs.core.chunk_first.call(null,seq__34013__$1);
var G__34050 = cljs.core.chunk_rest.call(null,seq__34013__$1);
var G__34051 = c__19101__auto__;
var G__34052 = cljs.core.count.call(null,c__19101__auto__);
var G__34053 = (0);
seq__34013 = G__34050;
chunk__34014 = G__34051;
count__34015 = G__34052;
i__34016 = G__34053;
continue;
} else {
var prov = cljs.core.first.call(null,seq__34013__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__34021_34054 = cljs.core.seq.call(null,requires);
var chunk__34022_34055 = null;
var count__34023_34056 = (0);
var i__34024_34057 = (0);
while(true){
if((i__34024_34057 < count__34023_34056)){
var req_34058 = cljs.core._nth.call(null,chunk__34022_34055,i__34024_34057);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_34058,prov);

var G__34059 = seq__34021_34054;
var G__34060 = chunk__34022_34055;
var G__34061 = count__34023_34056;
var G__34062 = (i__34024_34057 + (1));
seq__34021_34054 = G__34059;
chunk__34022_34055 = G__34060;
count__34023_34056 = G__34061;
i__34024_34057 = G__34062;
continue;
} else {
var temp__4425__auto___34063__$1 = cljs.core.seq.call(null,seq__34021_34054);
if(temp__4425__auto___34063__$1){
var seq__34021_34064__$1 = temp__4425__auto___34063__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__34021_34064__$1)){
var c__19101__auto___34065 = cljs.core.chunk_first.call(null,seq__34021_34064__$1);
var G__34066 = cljs.core.chunk_rest.call(null,seq__34021_34064__$1);
var G__34067 = c__19101__auto___34065;
var G__34068 = cljs.core.count.call(null,c__19101__auto___34065);
var G__34069 = (0);
seq__34021_34054 = G__34066;
chunk__34022_34055 = G__34067;
count__34023_34056 = G__34068;
i__34024_34057 = G__34069;
continue;
} else {
var req_34070 = cljs.core.first.call(null,seq__34021_34064__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_34070,prov);

var G__34071 = cljs.core.next.call(null,seq__34021_34064__$1);
var G__34072 = null;
var G__34073 = (0);
var G__34074 = (0);
seq__34021_34054 = G__34071;
chunk__34022_34055 = G__34072;
count__34023_34056 = G__34073;
i__34024_34057 = G__34074;
continue;
}
} else {
}
}
break;
}

var G__34075 = cljs.core.next.call(null,seq__34013__$1);
var G__34076 = null;
var G__34077 = (0);
var G__34078 = (0);
seq__34013 = G__34075;
chunk__34014 = G__34076;
count__34015 = G__34077;
i__34016 = G__34078;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.file_reloading.figwheel_require = (function figwheel$client$file_reloading$figwheel_require(src,reload){
goog.require = figwheel$client$file_reloading$figwheel_require;

if(cljs.core._EQ_.call(null,reload,"reload-all")){
var seq__34083_34087 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__34084_34088 = null;
var count__34085_34089 = (0);
var i__34086_34090 = (0);
while(true){
if((i__34086_34090 < count__34085_34089)){
var ns_34091 = cljs.core._nth.call(null,chunk__34084_34088,i__34086_34090);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_34091);

var G__34092 = seq__34083_34087;
var G__34093 = chunk__34084_34088;
var G__34094 = count__34085_34089;
var G__34095 = (i__34086_34090 + (1));
seq__34083_34087 = G__34092;
chunk__34084_34088 = G__34093;
count__34085_34089 = G__34094;
i__34086_34090 = G__34095;
continue;
} else {
var temp__4425__auto___34096 = cljs.core.seq.call(null,seq__34083_34087);
if(temp__4425__auto___34096){
var seq__34083_34097__$1 = temp__4425__auto___34096;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__34083_34097__$1)){
var c__19101__auto___34098 = cljs.core.chunk_first.call(null,seq__34083_34097__$1);
var G__34099 = cljs.core.chunk_rest.call(null,seq__34083_34097__$1);
var G__34100 = c__19101__auto___34098;
var G__34101 = cljs.core.count.call(null,c__19101__auto___34098);
var G__34102 = (0);
seq__34083_34087 = G__34099;
chunk__34084_34088 = G__34100;
count__34085_34089 = G__34101;
i__34086_34090 = G__34102;
continue;
} else {
var ns_34103 = cljs.core.first.call(null,seq__34083_34097__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_34103);

var G__34104 = cljs.core.next.call(null,seq__34083_34097__$1);
var G__34105 = null;
var G__34106 = (0);
var G__34107 = (0);
seq__34083_34087 = G__34104;
chunk__34084_34088 = G__34105;
count__34085_34089 = G__34106;
i__34086_34090 = G__34107;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(reload)){
figwheel.client.file_reloading.unprovide_BANG_.call(null,src);
} else {
}

return goog.require_figwheel_backup_(src);
});
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
figwheel.client.file_reloading.bootstrap_goog_base = (function figwheel$client$file_reloading$bootstrap_goog_base(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require_figwheel_backup_ = (function (){var or__18298__auto__ = goog.require__;
if(cljs.core.truth_(or__18298__auto__)){
return or__18298__auto__;
} else {
return goog.require;
}
})();

goog.isProvided_ = (function (name){
return false;
});

figwheel.client.file_reloading.setup_path__GT_name_BANG_.call(null);

figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_.call(null);

goog.addDependency_figwheel_backup_ = goog.addDependency;

goog.addDependency = (function() { 
var G__34108__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__34108 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__34109__i = 0, G__34109__a = new Array(arguments.length -  0);
while (G__34109__i < G__34109__a.length) {G__34109__a[G__34109__i] = arguments[G__34109__i + 0]; ++G__34109__i;}
  args = new cljs.core.IndexedSeq(G__34109__a,0);
} 
return G__34108__delegate.call(this,args);};
G__34108.cljs$lang$maxFixedArity = 0;
G__34108.cljs$lang$applyTo = (function (arglist__34110){
var args = cljs.core.seq(arglist__34110);
return G__34108__delegate(args);
});
G__34108.cljs$core$IFn$_invoke$arity$variadic = G__34108__delegate;
return G__34108;
})()
;

goog.constructNamespace_("cljs.user");

goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.queued_file_reload;

return goog.require = figwheel.client.file_reloading.figwheel_require;
}
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
if(typeof figwheel.client.file_reloading.bootstrapped_cljs !== 'undefined'){
return null;
} else {
figwheel.client.file_reloading.bootstrapped_cljs = (function (){
figwheel.client.file_reloading.bootstrap_goog_base.call(null);

return true;
})()
;
}
});
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__34112 = cljs.core._EQ_;
var expr__34113 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__34112.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__34113))){
var path_parts = ((function (pred__34112,expr__34113){
return (function (p1__34111_SHARP_){
return clojure.string.split.call(null,p1__34111_SHARP_,/[\/\\]/);
});})(pred__34112,expr__34113))
;
var sep = (cljs.core.truth_(cljs.core.re_matches.call(null,/win.*/,process.platform))?"\\":"/");
var root = clojure.string.join.call(null,sep,cljs.core.pop.call(null,cljs.core.pop.call(null,path_parts.call(null,__dirname))));
return ((function (path_parts,sep,root,pred__34112,expr__34113){
return (function (request_url,callback){

var cache_path = clojure.string.join.call(null,sep,cljs.core.cons.call(null,root,path_parts.call(null,figwheel.client.file_reloading.fix_node_request_url.call(null,request_url))));
(require.cache[cache_path] = null);

return callback.call(null,(function (){try{return require(cache_path);
}catch (e34115){if((e34115 instanceof Error)){
var e = e34115;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e34115;

}
}})());
});
;})(path_parts,sep,root,pred__34112,expr__34113))
} else {
if(cljs.core.truth_(pred__34112.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__34113))){
return ((function (pred__34112,expr__34113){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred,pred__34112,expr__34113){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__34112,expr__34113))
);

return deferred.addErrback(((function (deferred,pred__34112,expr__34113){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__34112,expr__34113))
);
});
;})(pred__34112,expr__34113))
} else {
return ((function (pred__34112,expr__34113){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__34112,expr__34113))
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__34116,callback){
var map__34119 = p__34116;
var map__34119__$1 = ((((!((map__34119 == null)))?((((map__34119.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34119.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34119):map__34119);
var file_msg = map__34119__$1;
var request_url = cljs.core.get.call(null,map__34119__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__34119,map__34119__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfully loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__34119,map__34119__$1,file_msg,request_url))
);
});
if(typeof figwheel.client.file_reloading.reload_chan !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_chan = cljs.core.async.chan.call(null);
}
if(typeof figwheel.client.file_reloading.on_load_callbacks !== 'undefined'){
} else {
figwheel.client.file_reloading.on_load_callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
if(typeof figwheel.client.file_reloading.dependencies_loaded !== 'undefined'){
} else {
figwheel.client.file_reloading.dependencies_loaded = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
figwheel.client.file_reloading.blocking_load = (function figwheel$client$file_reloading$blocking_load(url){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.reload_file.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-url","request-url",2100346596),url], null),((function (out){
return (function (file_msg){
cljs.core.async.put_BANG_.call(null,out,file_msg);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
if(typeof figwheel.client.file_reloading.reloader_loop !== 'undefined'){
} else {
figwheel.client.file_reloading.reloader_loop = (function (){var c__20323__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto__){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto__){
return (function (state_34143){
var state_val_34144 = (state_34143[(1)]);
if((state_val_34144 === (7))){
var inst_34139 = (state_34143[(2)]);
var state_34143__$1 = state_34143;
var statearr_34145_34165 = state_34143__$1;
(statearr_34145_34165[(2)] = inst_34139);

(statearr_34145_34165[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34144 === (1))){
var state_34143__$1 = state_34143;
var statearr_34146_34166 = state_34143__$1;
(statearr_34146_34166[(2)] = null);

(statearr_34146_34166[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34144 === (4))){
var inst_34123 = (state_34143[(7)]);
var inst_34123__$1 = (state_34143[(2)]);
var state_34143__$1 = (function (){var statearr_34147 = state_34143;
(statearr_34147[(7)] = inst_34123__$1);

return statearr_34147;
})();
if(cljs.core.truth_(inst_34123__$1)){
var statearr_34148_34167 = state_34143__$1;
(statearr_34148_34167[(1)] = (5));

} else {
var statearr_34149_34168 = state_34143__$1;
(statearr_34149_34168[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34144 === (6))){
var state_34143__$1 = state_34143;
var statearr_34150_34169 = state_34143__$1;
(statearr_34150_34169[(2)] = null);

(statearr_34150_34169[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34144 === (3))){
var inst_34141 = (state_34143[(2)]);
var state_34143__$1 = state_34143;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34143__$1,inst_34141);
} else {
if((state_val_34144 === (2))){
var state_34143__$1 = state_34143;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34143__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_34144 === (11))){
var inst_34135 = (state_34143[(2)]);
var state_34143__$1 = (function (){var statearr_34151 = state_34143;
(statearr_34151[(8)] = inst_34135);

return statearr_34151;
})();
var statearr_34152_34170 = state_34143__$1;
(statearr_34152_34170[(2)] = null);

(statearr_34152_34170[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34144 === (9))){
var inst_34127 = (state_34143[(9)]);
var inst_34129 = (state_34143[(10)]);
var inst_34131 = inst_34129.call(null,inst_34127);
var state_34143__$1 = state_34143;
var statearr_34153_34171 = state_34143__$1;
(statearr_34153_34171[(2)] = inst_34131);

(statearr_34153_34171[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34144 === (5))){
var inst_34123 = (state_34143[(7)]);
var inst_34125 = figwheel.client.file_reloading.blocking_load.call(null,inst_34123);
var state_34143__$1 = state_34143;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34143__$1,(8),inst_34125);
} else {
if((state_val_34144 === (10))){
var inst_34127 = (state_34143[(9)]);
var inst_34133 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_34127);
var state_34143__$1 = state_34143;
var statearr_34154_34172 = state_34143__$1;
(statearr_34154_34172[(2)] = inst_34133);

(statearr_34154_34172[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34144 === (8))){
var inst_34123 = (state_34143[(7)]);
var inst_34129 = (state_34143[(10)]);
var inst_34127 = (state_34143[(2)]);
var inst_34128 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_34129__$1 = cljs.core.get.call(null,inst_34128,inst_34123);
var state_34143__$1 = (function (){var statearr_34155 = state_34143;
(statearr_34155[(9)] = inst_34127);

(statearr_34155[(10)] = inst_34129__$1);

return statearr_34155;
})();
if(cljs.core.truth_(inst_34129__$1)){
var statearr_34156_34173 = state_34143__$1;
(statearr_34156_34173[(1)] = (9));

} else {
var statearr_34157_34174 = state_34143__$1;
(statearr_34157_34174[(1)] = (10));

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
});})(c__20323__auto__))
;
return ((function (switch__20302__auto__,c__20323__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__20303__auto__ = null;
var figwheel$client$file_reloading$state_machine__20303__auto____0 = (function (){
var statearr_34161 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_34161[(0)] = figwheel$client$file_reloading$state_machine__20303__auto__);

(statearr_34161[(1)] = (1));

return statearr_34161;
});
var figwheel$client$file_reloading$state_machine__20303__auto____1 = (function (state_34143){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_34143);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e34162){if((e34162 instanceof Object)){
var ex__20306__auto__ = e34162;
var statearr_34163_34175 = state_34143;
(statearr_34163_34175[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34143);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34162;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34176 = state_34143;
state_34143 = G__34176;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__20303__auto__ = function(state_34143){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__20303__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__20303__auto____1.call(this,state_34143);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__20303__auto____0;
figwheel$client$file_reloading$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__20303__auto____1;
return figwheel$client$file_reloading$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto__))
})();
var state__20325__auto__ = (function (){var statearr_34164 = f__20324__auto__.call(null);
(statearr_34164[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto__);

return statearr_34164;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto__))
);

return c__20323__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__34177,callback){
var map__34180 = p__34177;
var map__34180__$1 = ((((!((map__34180 == null)))?((((map__34180.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34180.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34180):map__34180);
var file_msg = map__34180__$1;
var namespace = cljs.core.get.call(null,map__34180__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__34180,map__34180__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__34180,map__34180__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__34182){
var map__34185 = p__34182;
var map__34185__$1 = ((((!((map__34185 == null)))?((((map__34185.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34185.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34185):map__34185);
var file_msg = map__34185__$1;
var namespace = cljs.core.get.call(null,map__34185__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
var and__18286__auto__ = cljs.core.not.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas));
if(and__18286__auto__){
var or__18298__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__18298__auto__)){
return or__18298__auto__;
} else {
var or__18298__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__18298__auto____$1)){
return or__18298__auto____$1;
} else {
return figwheel.client.file_reloading.provided_QMARK_.call(null,cljs.core.name.call(null,namespace));
}
}
} else {
return and__18286__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__34187,callback){
var map__34190 = p__34187;
var map__34190__$1 = ((((!((map__34190 == null)))?((((map__34190.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34190.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34190):map__34190);
var file_msg = map__34190__$1;
var request_url = cljs.core.get.call(null,map__34190__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__34190__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.require_with_callback.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Figwheel: Not trying to load file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__20323__auto___34278 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___34278,out){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___34278,out){
return (function (state_34260){
var state_val_34261 = (state_34260[(1)]);
if((state_val_34261 === (1))){
var inst_34238 = cljs.core.nth.call(null,files,(0),null);
var inst_34239 = cljs.core.nthnext.call(null,files,(1));
var inst_34240 = files;
var state_34260__$1 = (function (){var statearr_34262 = state_34260;
(statearr_34262[(7)] = inst_34240);

(statearr_34262[(8)] = inst_34238);

(statearr_34262[(9)] = inst_34239);

return statearr_34262;
})();
var statearr_34263_34279 = state_34260__$1;
(statearr_34263_34279[(2)] = null);

(statearr_34263_34279[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34261 === (2))){
var inst_34240 = (state_34260[(7)]);
var inst_34243 = (state_34260[(10)]);
var inst_34243__$1 = cljs.core.nth.call(null,inst_34240,(0),null);
var inst_34244 = cljs.core.nthnext.call(null,inst_34240,(1));
var inst_34245 = (inst_34243__$1 == null);
var inst_34246 = cljs.core.not.call(null,inst_34245);
var state_34260__$1 = (function (){var statearr_34264 = state_34260;
(statearr_34264[(11)] = inst_34244);

(statearr_34264[(10)] = inst_34243__$1);

return statearr_34264;
})();
if(inst_34246){
var statearr_34265_34280 = state_34260__$1;
(statearr_34265_34280[(1)] = (4));

} else {
var statearr_34266_34281 = state_34260__$1;
(statearr_34266_34281[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34261 === (3))){
var inst_34258 = (state_34260[(2)]);
var state_34260__$1 = state_34260;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34260__$1,inst_34258);
} else {
if((state_val_34261 === (4))){
var inst_34243 = (state_34260[(10)]);
var inst_34248 = figwheel.client.file_reloading.reload_js_file.call(null,inst_34243);
var state_34260__$1 = state_34260;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34260__$1,(7),inst_34248);
} else {
if((state_val_34261 === (5))){
var inst_34254 = cljs.core.async.close_BANG_.call(null,out);
var state_34260__$1 = state_34260;
var statearr_34267_34282 = state_34260__$1;
(statearr_34267_34282[(2)] = inst_34254);

(statearr_34267_34282[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34261 === (6))){
var inst_34256 = (state_34260[(2)]);
var state_34260__$1 = state_34260;
var statearr_34268_34283 = state_34260__$1;
(statearr_34268_34283[(2)] = inst_34256);

(statearr_34268_34283[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34261 === (7))){
var inst_34244 = (state_34260[(11)]);
var inst_34250 = (state_34260[(2)]);
var inst_34251 = cljs.core.async.put_BANG_.call(null,out,inst_34250);
var inst_34240 = inst_34244;
var state_34260__$1 = (function (){var statearr_34269 = state_34260;
(statearr_34269[(7)] = inst_34240);

(statearr_34269[(12)] = inst_34251);

return statearr_34269;
})();
var statearr_34270_34284 = state_34260__$1;
(statearr_34270_34284[(2)] = null);

(statearr_34270_34284[(1)] = (2));


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
});})(c__20323__auto___34278,out))
;
return ((function (switch__20302__auto__,c__20323__auto___34278,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto____0 = (function (){
var statearr_34274 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34274[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto__);

(statearr_34274[(1)] = (1));

return statearr_34274;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto____1 = (function (state_34260){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_34260);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e34275){if((e34275 instanceof Object)){
var ex__20306__auto__ = e34275;
var statearr_34276_34285 = state_34260;
(statearr_34276_34285[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34260);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34275;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34286 = state_34260;
state_34260 = G__34286;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto__ = function(state_34260){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto____1.call(this,state_34260);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___34278,out))
})();
var state__20325__auto__ = (function (){var statearr_34277 = f__20324__auto__.call(null);
(statearr_34277[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___34278);

return statearr_34277;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___34278,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__34287,opts){
var map__34291 = p__34287;
var map__34291__$1 = ((((!((map__34291 == null)))?((((map__34291.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34291.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34291):map__34291);
var eval_body__$1 = cljs.core.get.call(null,map__34291__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__34291__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__18286__auto__ = eval_body__$1;
if(cljs.core.truth_(and__18286__auto__)){
return typeof eval_body__$1 === 'string';
} else {
return and__18286__auto__;
}
})())){
var code = eval_body__$1;
try{figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Evaling file "),cljs.core.str(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e34293){var e = e34293;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Unable to evaluate "),cljs.core.str(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["figwheel.connect",null], null), null),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,((function (deps){
return (function (n){
var temp__4423__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (deps){
return (function (p1__34294_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__34294_SHARP_),n);
});})(deps))
,files));
if(cljs.core.truth_(temp__4423__auto__)){
var file_msg = temp__4423__auto__;
return file_msg;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372),new cljs.core.Keyword(null,"namespace","namespace",-377510372),n], null);
}
});})(deps))
,deps));
});
figwheel.client.file_reloading.sort_files = (function figwheel$client$file_reloading$sort_files(files){
if((cljs.core.count.call(null,files) <= (1))){
return files;
} else {
var keep_files = cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,keep_files,new cljs.core.Keyword(null,"namespace","namespace",-377510372)),figwheel.client.file_reloading.expand_files.call(null,files));
}
});
figwheel.client.file_reloading.get_figwheel_always = (function figwheel$client$file_reloading$get_figwheel_always(){
return cljs.core.map.call(null,(function (p__34299){
var vec__34300 = p__34299;
var k = cljs.core.nth.call(null,vec__34300,(0),null);
var v = cljs.core.nth.call(null,vec__34300,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__34301){
var vec__34302 = p__34301;
var k = cljs.core.nth.call(null,vec__34302,(0),null);
var v = cljs.core.nth.call(null,vec__34302,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__34306,p__34307){
var map__34554 = p__34306;
var map__34554__$1 = ((((!((map__34554 == null)))?((((map__34554.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34554.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34554):map__34554);
var opts = map__34554__$1;
var before_jsload = cljs.core.get.call(null,map__34554__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__34554__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__34554__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__34555 = p__34307;
var map__34555__$1 = ((((!((map__34555 == null)))?((((map__34555.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34555.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34555):map__34555);
var msg = map__34555__$1;
var files = cljs.core.get.call(null,map__34555__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__34555__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__34555__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__20323__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_34708){
var state_val_34709 = (state_34708[(1)]);
if((state_val_34709 === (7))){
var inst_34571 = (state_34708[(7)]);
var inst_34570 = (state_34708[(8)]);
var inst_34569 = (state_34708[(9)]);
var inst_34572 = (state_34708[(10)]);
var inst_34577 = cljs.core._nth.call(null,inst_34570,inst_34572);
var inst_34578 = figwheel.client.file_reloading.eval_body.call(null,inst_34577,opts);
var inst_34579 = (inst_34572 + (1));
var tmp34710 = inst_34571;
var tmp34711 = inst_34570;
var tmp34712 = inst_34569;
var inst_34569__$1 = tmp34712;
var inst_34570__$1 = tmp34711;
var inst_34571__$1 = tmp34710;
var inst_34572__$1 = inst_34579;
var state_34708__$1 = (function (){var statearr_34713 = state_34708;
(statearr_34713[(7)] = inst_34571__$1);

(statearr_34713[(8)] = inst_34570__$1);

(statearr_34713[(11)] = inst_34578);

(statearr_34713[(9)] = inst_34569__$1);

(statearr_34713[(10)] = inst_34572__$1);

return statearr_34713;
})();
var statearr_34714_34800 = state_34708__$1;
(statearr_34714_34800[(2)] = null);

(statearr_34714_34800[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (20))){
var inst_34612 = (state_34708[(12)]);
var inst_34620 = figwheel.client.file_reloading.sort_files.call(null,inst_34612);
var state_34708__$1 = state_34708;
var statearr_34715_34801 = state_34708__$1;
(statearr_34715_34801[(2)] = inst_34620);

(statearr_34715_34801[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (27))){
var state_34708__$1 = state_34708;
var statearr_34716_34802 = state_34708__$1;
(statearr_34716_34802[(2)] = null);

(statearr_34716_34802[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (1))){
var inst_34561 = (state_34708[(13)]);
var inst_34558 = before_jsload.call(null,files);
var inst_34559 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_34560 = (function (){return ((function (inst_34561,inst_34558,inst_34559,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__34303_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__34303_SHARP_);
});
;})(inst_34561,inst_34558,inst_34559,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_34561__$1 = cljs.core.filter.call(null,inst_34560,files);
var inst_34562 = cljs.core.not_empty.call(null,inst_34561__$1);
var state_34708__$1 = (function (){var statearr_34717 = state_34708;
(statearr_34717[(14)] = inst_34558);

(statearr_34717[(15)] = inst_34559);

(statearr_34717[(13)] = inst_34561__$1);

return statearr_34717;
})();
if(cljs.core.truth_(inst_34562)){
var statearr_34718_34803 = state_34708__$1;
(statearr_34718_34803[(1)] = (2));

} else {
var statearr_34719_34804 = state_34708__$1;
(statearr_34719_34804[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (24))){
var state_34708__$1 = state_34708;
var statearr_34720_34805 = state_34708__$1;
(statearr_34720_34805[(2)] = null);

(statearr_34720_34805[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (39))){
var inst_34662 = (state_34708[(16)]);
var state_34708__$1 = state_34708;
var statearr_34721_34806 = state_34708__$1;
(statearr_34721_34806[(2)] = inst_34662);

(statearr_34721_34806[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (46))){
var inst_34703 = (state_34708[(2)]);
var state_34708__$1 = state_34708;
var statearr_34722_34807 = state_34708__$1;
(statearr_34722_34807[(2)] = inst_34703);

(statearr_34722_34807[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (4))){
var inst_34606 = (state_34708[(2)]);
var inst_34607 = cljs.core.List.EMPTY;
var inst_34608 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_34607);
var inst_34609 = (function (){return ((function (inst_34606,inst_34607,inst_34608,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__34304_SHARP_){
var and__18286__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__34304_SHARP_);
if(cljs.core.truth_(and__18286__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__34304_SHARP_));
} else {
return and__18286__auto__;
}
});
;})(inst_34606,inst_34607,inst_34608,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_34610 = cljs.core.filter.call(null,inst_34609,files);
var inst_34611 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_34612 = cljs.core.concat.call(null,inst_34610,inst_34611);
var state_34708__$1 = (function (){var statearr_34723 = state_34708;
(statearr_34723[(17)] = inst_34608);

(statearr_34723[(18)] = inst_34606);

(statearr_34723[(12)] = inst_34612);

return statearr_34723;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_34724_34808 = state_34708__$1;
(statearr_34724_34808[(1)] = (16));

} else {
var statearr_34725_34809 = state_34708__$1;
(statearr_34725_34809[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (15))){
var inst_34596 = (state_34708[(2)]);
var state_34708__$1 = state_34708;
var statearr_34726_34810 = state_34708__$1;
(statearr_34726_34810[(2)] = inst_34596);

(statearr_34726_34810[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (21))){
var inst_34622 = (state_34708[(19)]);
var inst_34622__$1 = (state_34708[(2)]);
var inst_34623 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_34622__$1);
var state_34708__$1 = (function (){var statearr_34727 = state_34708;
(statearr_34727[(19)] = inst_34622__$1);

return statearr_34727;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34708__$1,(22),inst_34623);
} else {
if((state_val_34709 === (31))){
var inst_34706 = (state_34708[(2)]);
var state_34708__$1 = state_34708;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34708__$1,inst_34706);
} else {
if((state_val_34709 === (32))){
var inst_34662 = (state_34708[(16)]);
var inst_34667 = inst_34662.cljs$lang$protocol_mask$partition0$;
var inst_34668 = (inst_34667 & (64));
var inst_34669 = inst_34662.cljs$core$ISeq$;
var inst_34670 = (inst_34668) || (inst_34669);
var state_34708__$1 = state_34708;
if(cljs.core.truth_(inst_34670)){
var statearr_34728_34811 = state_34708__$1;
(statearr_34728_34811[(1)] = (35));

} else {
var statearr_34729_34812 = state_34708__$1;
(statearr_34729_34812[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (40))){
var inst_34683 = (state_34708[(20)]);
var inst_34682 = (state_34708[(2)]);
var inst_34683__$1 = cljs.core.get.call(null,inst_34682,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_34684 = cljs.core.get.call(null,inst_34682,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_34685 = cljs.core.not_empty.call(null,inst_34683__$1);
var state_34708__$1 = (function (){var statearr_34730 = state_34708;
(statearr_34730[(21)] = inst_34684);

(statearr_34730[(20)] = inst_34683__$1);

return statearr_34730;
})();
if(cljs.core.truth_(inst_34685)){
var statearr_34731_34813 = state_34708__$1;
(statearr_34731_34813[(1)] = (41));

} else {
var statearr_34732_34814 = state_34708__$1;
(statearr_34732_34814[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (33))){
var state_34708__$1 = state_34708;
var statearr_34733_34815 = state_34708__$1;
(statearr_34733_34815[(2)] = false);

(statearr_34733_34815[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (13))){
var inst_34582 = (state_34708[(22)]);
var inst_34586 = cljs.core.chunk_first.call(null,inst_34582);
var inst_34587 = cljs.core.chunk_rest.call(null,inst_34582);
var inst_34588 = cljs.core.count.call(null,inst_34586);
var inst_34569 = inst_34587;
var inst_34570 = inst_34586;
var inst_34571 = inst_34588;
var inst_34572 = (0);
var state_34708__$1 = (function (){var statearr_34734 = state_34708;
(statearr_34734[(7)] = inst_34571);

(statearr_34734[(8)] = inst_34570);

(statearr_34734[(9)] = inst_34569);

(statearr_34734[(10)] = inst_34572);

return statearr_34734;
})();
var statearr_34735_34816 = state_34708__$1;
(statearr_34735_34816[(2)] = null);

(statearr_34735_34816[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (22))){
var inst_34625 = (state_34708[(23)]);
var inst_34622 = (state_34708[(19)]);
var inst_34626 = (state_34708[(24)]);
var inst_34630 = (state_34708[(25)]);
var inst_34625__$1 = (state_34708[(2)]);
var inst_34626__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_34625__$1);
var inst_34627 = (function (){var all_files = inst_34622;
var res_SINGLEQUOTE_ = inst_34625__$1;
var res = inst_34626__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_34625,inst_34622,inst_34626,inst_34630,inst_34625__$1,inst_34626__$1,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__34305_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__34305_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_34625,inst_34622,inst_34626,inst_34630,inst_34625__$1,inst_34626__$1,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_34628 = cljs.core.filter.call(null,inst_34627,inst_34625__$1);
var inst_34629 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_34630__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_34629);
var inst_34631 = cljs.core.not_empty.call(null,inst_34630__$1);
var state_34708__$1 = (function (){var statearr_34736 = state_34708;
(statearr_34736[(23)] = inst_34625__$1);

(statearr_34736[(26)] = inst_34628);

(statearr_34736[(24)] = inst_34626__$1);

(statearr_34736[(25)] = inst_34630__$1);

return statearr_34736;
})();
if(cljs.core.truth_(inst_34631)){
var statearr_34737_34817 = state_34708__$1;
(statearr_34737_34817[(1)] = (23));

} else {
var statearr_34738_34818 = state_34708__$1;
(statearr_34738_34818[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (36))){
var state_34708__$1 = state_34708;
var statearr_34739_34819 = state_34708__$1;
(statearr_34739_34819[(2)] = false);

(statearr_34739_34819[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (41))){
var inst_34683 = (state_34708[(20)]);
var inst_34687 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_34688 = cljs.core.map.call(null,inst_34687,inst_34683);
var inst_34689 = cljs.core.pr_str.call(null,inst_34688);
var inst_34690 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_34689)].join('');
var inst_34691 = figwheel.client.utils.log.call(null,inst_34690);
var state_34708__$1 = state_34708;
var statearr_34740_34820 = state_34708__$1;
(statearr_34740_34820[(2)] = inst_34691);

(statearr_34740_34820[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (43))){
var inst_34684 = (state_34708[(21)]);
var inst_34694 = (state_34708[(2)]);
var inst_34695 = cljs.core.not_empty.call(null,inst_34684);
var state_34708__$1 = (function (){var statearr_34741 = state_34708;
(statearr_34741[(27)] = inst_34694);

return statearr_34741;
})();
if(cljs.core.truth_(inst_34695)){
var statearr_34742_34821 = state_34708__$1;
(statearr_34742_34821[(1)] = (44));

} else {
var statearr_34743_34822 = state_34708__$1;
(statearr_34743_34822[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (29))){
var inst_34625 = (state_34708[(23)]);
var inst_34628 = (state_34708[(26)]);
var inst_34622 = (state_34708[(19)]);
var inst_34626 = (state_34708[(24)]);
var inst_34630 = (state_34708[(25)]);
var inst_34662 = (state_34708[(16)]);
var inst_34658 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_34661 = (function (){var all_files = inst_34622;
var res_SINGLEQUOTE_ = inst_34625;
var res = inst_34626;
var files_not_loaded = inst_34628;
var dependencies_that_loaded = inst_34630;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_34625,inst_34628,inst_34622,inst_34626,inst_34630,inst_34662,inst_34658,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__34660){
var map__34744 = p__34660;
var map__34744__$1 = ((((!((map__34744 == null)))?((((map__34744.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34744.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34744):map__34744);
var namespace = cljs.core.get.call(null,map__34744__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.truth_(meta_data.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179)))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_34625,inst_34628,inst_34622,inst_34626,inst_34630,inst_34662,inst_34658,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_34662__$1 = cljs.core.group_by.call(null,inst_34661,inst_34628);
var inst_34664 = (inst_34662__$1 == null);
var inst_34665 = cljs.core.not.call(null,inst_34664);
var state_34708__$1 = (function (){var statearr_34746 = state_34708;
(statearr_34746[(28)] = inst_34658);

(statearr_34746[(16)] = inst_34662__$1);

return statearr_34746;
})();
if(inst_34665){
var statearr_34747_34823 = state_34708__$1;
(statearr_34747_34823[(1)] = (32));

} else {
var statearr_34748_34824 = state_34708__$1;
(statearr_34748_34824[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (44))){
var inst_34684 = (state_34708[(21)]);
var inst_34697 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_34684);
var inst_34698 = cljs.core.pr_str.call(null,inst_34697);
var inst_34699 = [cljs.core.str("not required: "),cljs.core.str(inst_34698)].join('');
var inst_34700 = figwheel.client.utils.log.call(null,inst_34699);
var state_34708__$1 = state_34708;
var statearr_34749_34825 = state_34708__$1;
(statearr_34749_34825[(2)] = inst_34700);

(statearr_34749_34825[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (6))){
var inst_34603 = (state_34708[(2)]);
var state_34708__$1 = state_34708;
var statearr_34750_34826 = state_34708__$1;
(statearr_34750_34826[(2)] = inst_34603);

(statearr_34750_34826[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (28))){
var inst_34628 = (state_34708[(26)]);
var inst_34655 = (state_34708[(2)]);
var inst_34656 = cljs.core.not_empty.call(null,inst_34628);
var state_34708__$1 = (function (){var statearr_34751 = state_34708;
(statearr_34751[(29)] = inst_34655);

return statearr_34751;
})();
if(cljs.core.truth_(inst_34656)){
var statearr_34752_34827 = state_34708__$1;
(statearr_34752_34827[(1)] = (29));

} else {
var statearr_34753_34828 = state_34708__$1;
(statearr_34753_34828[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (25))){
var inst_34626 = (state_34708[(24)]);
var inst_34642 = (state_34708[(2)]);
var inst_34643 = cljs.core.not_empty.call(null,inst_34626);
var state_34708__$1 = (function (){var statearr_34754 = state_34708;
(statearr_34754[(30)] = inst_34642);

return statearr_34754;
})();
if(cljs.core.truth_(inst_34643)){
var statearr_34755_34829 = state_34708__$1;
(statearr_34755_34829[(1)] = (26));

} else {
var statearr_34756_34830 = state_34708__$1;
(statearr_34756_34830[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (34))){
var inst_34677 = (state_34708[(2)]);
var state_34708__$1 = state_34708;
if(cljs.core.truth_(inst_34677)){
var statearr_34757_34831 = state_34708__$1;
(statearr_34757_34831[(1)] = (38));

} else {
var statearr_34758_34832 = state_34708__$1;
(statearr_34758_34832[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (17))){
var state_34708__$1 = state_34708;
var statearr_34759_34833 = state_34708__$1;
(statearr_34759_34833[(2)] = recompile_dependents);

(statearr_34759_34833[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (3))){
var state_34708__$1 = state_34708;
var statearr_34760_34834 = state_34708__$1;
(statearr_34760_34834[(2)] = null);

(statearr_34760_34834[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (12))){
var inst_34599 = (state_34708[(2)]);
var state_34708__$1 = state_34708;
var statearr_34761_34835 = state_34708__$1;
(statearr_34761_34835[(2)] = inst_34599);

(statearr_34761_34835[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (2))){
var inst_34561 = (state_34708[(13)]);
var inst_34568 = cljs.core.seq.call(null,inst_34561);
var inst_34569 = inst_34568;
var inst_34570 = null;
var inst_34571 = (0);
var inst_34572 = (0);
var state_34708__$1 = (function (){var statearr_34762 = state_34708;
(statearr_34762[(7)] = inst_34571);

(statearr_34762[(8)] = inst_34570);

(statearr_34762[(9)] = inst_34569);

(statearr_34762[(10)] = inst_34572);

return statearr_34762;
})();
var statearr_34763_34836 = state_34708__$1;
(statearr_34763_34836[(2)] = null);

(statearr_34763_34836[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (23))){
var inst_34625 = (state_34708[(23)]);
var inst_34628 = (state_34708[(26)]);
var inst_34622 = (state_34708[(19)]);
var inst_34626 = (state_34708[(24)]);
var inst_34630 = (state_34708[(25)]);
var inst_34633 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_34635 = (function (){var all_files = inst_34622;
var res_SINGLEQUOTE_ = inst_34625;
var res = inst_34626;
var files_not_loaded = inst_34628;
var dependencies_that_loaded = inst_34630;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_34625,inst_34628,inst_34622,inst_34626,inst_34630,inst_34633,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__34634){
var map__34764 = p__34634;
var map__34764__$1 = ((((!((map__34764 == null)))?((((map__34764.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34764.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34764):map__34764);
var request_url = cljs.core.get.call(null,map__34764__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_34625,inst_34628,inst_34622,inst_34626,inst_34630,inst_34633,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_34636 = cljs.core.reverse.call(null,inst_34630);
var inst_34637 = cljs.core.map.call(null,inst_34635,inst_34636);
var inst_34638 = cljs.core.pr_str.call(null,inst_34637);
var inst_34639 = figwheel.client.utils.log.call(null,inst_34638);
var state_34708__$1 = (function (){var statearr_34766 = state_34708;
(statearr_34766[(31)] = inst_34633);

return statearr_34766;
})();
var statearr_34767_34837 = state_34708__$1;
(statearr_34767_34837[(2)] = inst_34639);

(statearr_34767_34837[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (35))){
var state_34708__$1 = state_34708;
var statearr_34768_34838 = state_34708__$1;
(statearr_34768_34838[(2)] = true);

(statearr_34768_34838[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (19))){
var inst_34612 = (state_34708[(12)]);
var inst_34618 = figwheel.client.file_reloading.expand_files.call(null,inst_34612);
var state_34708__$1 = state_34708;
var statearr_34769_34839 = state_34708__$1;
(statearr_34769_34839[(2)] = inst_34618);

(statearr_34769_34839[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (11))){
var state_34708__$1 = state_34708;
var statearr_34770_34840 = state_34708__$1;
(statearr_34770_34840[(2)] = null);

(statearr_34770_34840[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (9))){
var inst_34601 = (state_34708[(2)]);
var state_34708__$1 = state_34708;
var statearr_34771_34841 = state_34708__$1;
(statearr_34771_34841[(2)] = inst_34601);

(statearr_34771_34841[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (5))){
var inst_34571 = (state_34708[(7)]);
var inst_34572 = (state_34708[(10)]);
var inst_34574 = (inst_34572 < inst_34571);
var inst_34575 = inst_34574;
var state_34708__$1 = state_34708;
if(cljs.core.truth_(inst_34575)){
var statearr_34772_34842 = state_34708__$1;
(statearr_34772_34842[(1)] = (7));

} else {
var statearr_34773_34843 = state_34708__$1;
(statearr_34773_34843[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (14))){
var inst_34582 = (state_34708[(22)]);
var inst_34591 = cljs.core.first.call(null,inst_34582);
var inst_34592 = figwheel.client.file_reloading.eval_body.call(null,inst_34591,opts);
var inst_34593 = cljs.core.next.call(null,inst_34582);
var inst_34569 = inst_34593;
var inst_34570 = null;
var inst_34571 = (0);
var inst_34572 = (0);
var state_34708__$1 = (function (){var statearr_34774 = state_34708;
(statearr_34774[(7)] = inst_34571);

(statearr_34774[(8)] = inst_34570);

(statearr_34774[(9)] = inst_34569);

(statearr_34774[(10)] = inst_34572);

(statearr_34774[(32)] = inst_34592);

return statearr_34774;
})();
var statearr_34775_34844 = state_34708__$1;
(statearr_34775_34844[(2)] = null);

(statearr_34775_34844[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (45))){
var state_34708__$1 = state_34708;
var statearr_34776_34845 = state_34708__$1;
(statearr_34776_34845[(2)] = null);

(statearr_34776_34845[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (26))){
var inst_34625 = (state_34708[(23)]);
var inst_34628 = (state_34708[(26)]);
var inst_34622 = (state_34708[(19)]);
var inst_34626 = (state_34708[(24)]);
var inst_34630 = (state_34708[(25)]);
var inst_34645 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_34647 = (function (){var all_files = inst_34622;
var res_SINGLEQUOTE_ = inst_34625;
var res = inst_34626;
var files_not_loaded = inst_34628;
var dependencies_that_loaded = inst_34630;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_34625,inst_34628,inst_34622,inst_34626,inst_34630,inst_34645,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__34646){
var map__34777 = p__34646;
var map__34777__$1 = ((((!((map__34777 == null)))?((((map__34777.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34777.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34777):map__34777);
var namespace = cljs.core.get.call(null,map__34777__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__34777__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_34625,inst_34628,inst_34622,inst_34626,inst_34630,inst_34645,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_34648 = cljs.core.map.call(null,inst_34647,inst_34626);
var inst_34649 = cljs.core.pr_str.call(null,inst_34648);
var inst_34650 = figwheel.client.utils.log.call(null,inst_34649);
var inst_34651 = (function (){var all_files = inst_34622;
var res_SINGLEQUOTE_ = inst_34625;
var res = inst_34626;
var files_not_loaded = inst_34628;
var dependencies_that_loaded = inst_34630;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_34625,inst_34628,inst_34622,inst_34626,inst_34630,inst_34645,inst_34647,inst_34648,inst_34649,inst_34650,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_34625,inst_34628,inst_34622,inst_34626,inst_34630,inst_34645,inst_34647,inst_34648,inst_34649,inst_34650,state_val_34709,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_34652 = setTimeout(inst_34651,(10));
var state_34708__$1 = (function (){var statearr_34779 = state_34708;
(statearr_34779[(33)] = inst_34650);

(statearr_34779[(34)] = inst_34645);

return statearr_34779;
})();
var statearr_34780_34846 = state_34708__$1;
(statearr_34780_34846[(2)] = inst_34652);

(statearr_34780_34846[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (16))){
var state_34708__$1 = state_34708;
var statearr_34781_34847 = state_34708__$1;
(statearr_34781_34847[(2)] = reload_dependents);

(statearr_34781_34847[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (38))){
var inst_34662 = (state_34708[(16)]);
var inst_34679 = cljs.core.apply.call(null,cljs.core.hash_map,inst_34662);
var state_34708__$1 = state_34708;
var statearr_34782_34848 = state_34708__$1;
(statearr_34782_34848[(2)] = inst_34679);

(statearr_34782_34848[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (30))){
var state_34708__$1 = state_34708;
var statearr_34783_34849 = state_34708__$1;
(statearr_34783_34849[(2)] = null);

(statearr_34783_34849[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (10))){
var inst_34582 = (state_34708[(22)]);
var inst_34584 = cljs.core.chunked_seq_QMARK_.call(null,inst_34582);
var state_34708__$1 = state_34708;
if(inst_34584){
var statearr_34784_34850 = state_34708__$1;
(statearr_34784_34850[(1)] = (13));

} else {
var statearr_34785_34851 = state_34708__$1;
(statearr_34785_34851[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (18))){
var inst_34616 = (state_34708[(2)]);
var state_34708__$1 = state_34708;
if(cljs.core.truth_(inst_34616)){
var statearr_34786_34852 = state_34708__$1;
(statearr_34786_34852[(1)] = (19));

} else {
var statearr_34787_34853 = state_34708__$1;
(statearr_34787_34853[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (42))){
var state_34708__$1 = state_34708;
var statearr_34788_34854 = state_34708__$1;
(statearr_34788_34854[(2)] = null);

(statearr_34788_34854[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (37))){
var inst_34674 = (state_34708[(2)]);
var state_34708__$1 = state_34708;
var statearr_34789_34855 = state_34708__$1;
(statearr_34789_34855[(2)] = inst_34674);

(statearr_34789_34855[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34709 === (8))){
var inst_34569 = (state_34708[(9)]);
var inst_34582 = (state_34708[(22)]);
var inst_34582__$1 = cljs.core.seq.call(null,inst_34569);
var state_34708__$1 = (function (){var statearr_34790 = state_34708;
(statearr_34790[(22)] = inst_34582__$1);

return statearr_34790;
})();
if(inst_34582__$1){
var statearr_34791_34856 = state_34708__$1;
(statearr_34791_34856[(1)] = (10));

} else {
var statearr_34792_34857 = state_34708__$1;
(statearr_34792_34857[(1)] = (11));

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
});})(c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__20302__auto__,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto____0 = (function (){
var statearr_34796 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34796[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto__);

(statearr_34796[(1)] = (1));

return statearr_34796;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto____1 = (function (state_34708){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_34708);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e34797){if((e34797 instanceof Object)){
var ex__20306__auto__ = e34797;
var statearr_34798_34858 = state_34708;
(statearr_34798_34858[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34708);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34797;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34859 = state_34708;
state_34708 = G__34859;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto__ = function(state_34708){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto____1.call(this,state_34708);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__20325__auto__ = (function (){var statearr_34799 = f__20324__auto__.call(null);
(statearr_34799[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto__);

return statearr_34799;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto__,map__34554,map__34554__$1,opts,before_jsload,on_jsload,reload_dependents,map__34555,map__34555__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__20323__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__34862,link){
var map__34865 = p__34862;
var map__34865__$1 = ((((!((map__34865 == null)))?((((map__34865.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34865.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34865):map__34865);
var file = cljs.core.get.call(null,map__34865__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = link.href;
if(cljs.core.truth_(temp__4425__auto__)){
var link_href = temp__4425__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4425__auto__,map__34865,map__34865__$1,file){
return (function (p1__34860_SHARP_,p2__34861_SHARP_){
if(cljs.core._EQ_.call(null,p1__34860_SHARP_,p2__34861_SHARP_)){
return p1__34860_SHARP_;
} else {
return false;
}
});})(link_href,temp__4425__auto__,map__34865,map__34865__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__4425__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__34871){
var map__34872 = p__34871;
var map__34872__$1 = ((((!((map__34872 == null)))?((((map__34872.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34872.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34872):map__34872);
var match_length = cljs.core.get.call(null,map__34872__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__34872__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__34867_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__34867_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__4425__auto__)){
var res = temp__4425__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.add_link_to_doc = (function figwheel$client$file_reloading$add_link_to_doc(var_args){
var args34874 = [];
var len__19356__auto___34877 = arguments.length;
var i__19357__auto___34878 = (0);
while(true){
if((i__19357__auto___34878 < len__19356__auto___34877)){
args34874.push((arguments[i__19357__auto___34878]));

var G__34879 = (i__19357__auto___34878 + (1));
i__19357__auto___34878 = G__34879;
continue;
} else {
}
break;
}

var G__34876 = args34874.length;
switch (G__34876) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args34874.length)].join('')));

}
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1 = (function (new_link){
return (document.getElementsByTagName("head")[(0)]).appendChild(new_link);
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2 = (function (orig_link,klone){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
return parent.removeChild(orig_link);
});})(parent))
,(300));
});

figwheel.client.file_reloading.add_link_to_doc.cljs$lang$maxFixedArity = 2;
figwheel.client.file_reloading.distictify = (function figwheel$client$file_reloading$distictify(key,seqq){
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__34881_SHARP_,p2__34882_SHARP_){
return cljs.core.assoc.call(null,p1__34881_SHARP_,cljs.core.get.call(null,p2__34882_SHARP_,key),p2__34882_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__34883){
var map__34886 = p__34883;
var map__34886__$1 = ((((!((map__34886 == null)))?((((map__34886.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34886.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34886):map__34886);
var f_data = map__34886__$1;
var file = cljs.core.get.call(null,map__34886__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4425__auto__)){
var link = temp__4425__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return null;
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__34888,files_msg){
var map__34895 = p__34888;
var map__34895__$1 = ((((!((map__34895 == null)))?((((map__34895.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34895.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34895):map__34895);
var opts = map__34895__$1;
var on_cssload = cljs.core.get.call(null,map__34895__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__34897_34901 = cljs.core.seq.call(null,figwheel.client.file_reloading.distictify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__34898_34902 = null;
var count__34899_34903 = (0);
var i__34900_34904 = (0);
while(true){
if((i__34900_34904 < count__34899_34903)){
var f_34905 = cljs.core._nth.call(null,chunk__34898_34902,i__34900_34904);
figwheel.client.file_reloading.reload_css_file.call(null,f_34905);

var G__34906 = seq__34897_34901;
var G__34907 = chunk__34898_34902;
var G__34908 = count__34899_34903;
var G__34909 = (i__34900_34904 + (1));
seq__34897_34901 = G__34906;
chunk__34898_34902 = G__34907;
count__34899_34903 = G__34908;
i__34900_34904 = G__34909;
continue;
} else {
var temp__4425__auto___34910 = cljs.core.seq.call(null,seq__34897_34901);
if(temp__4425__auto___34910){
var seq__34897_34911__$1 = temp__4425__auto___34910;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__34897_34911__$1)){
var c__19101__auto___34912 = cljs.core.chunk_first.call(null,seq__34897_34911__$1);
var G__34913 = cljs.core.chunk_rest.call(null,seq__34897_34911__$1);
var G__34914 = c__19101__auto___34912;
var G__34915 = cljs.core.count.call(null,c__19101__auto___34912);
var G__34916 = (0);
seq__34897_34901 = G__34913;
chunk__34898_34902 = G__34914;
count__34899_34903 = G__34915;
i__34900_34904 = G__34916;
continue;
} else {
var f_34917 = cljs.core.first.call(null,seq__34897_34911__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_34917);

var G__34918 = cljs.core.next.call(null,seq__34897_34911__$1);
var G__34919 = null;
var G__34920 = (0);
var G__34921 = (0);
seq__34897_34901 = G__34918;
chunk__34898_34902 = G__34919;
count__34899_34903 = G__34920;
i__34900_34904 = G__34921;
continue;
}
} else {
}
}
break;
}

return setTimeout(((function (map__34895,map__34895__$1,opts,on_cssload){
return (function (){
return on_cssload.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg));
});})(map__34895,map__34895__$1,opts,on_cssload))
,(100));
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1458518947379