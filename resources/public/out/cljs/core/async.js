// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var args31048 = [];
var len__19356__auto___31054 = arguments.length;
var i__19357__auto___31055 = (0);
while(true){
if((i__19357__auto___31055 < len__19356__auto___31054)){
args31048.push((arguments[i__19357__auto___31055]));

var G__31056 = (i__19357__auto___31055 + (1));
i__19357__auto___31055 = G__31056;
continue;
} else {
}
break;
}

var G__31050 = args31048.length;
switch (G__31050) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31048.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.call(null,f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async31051 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async31051 = (function (f,blockable,meta31052){
this.f = f;
this.blockable = blockable;
this.meta31052 = meta31052;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async31051.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_31053,meta31052__$1){
var self__ = this;
var _31053__$1 = this;
return (new cljs.core.async.t_cljs$core$async31051(self__.f,self__.blockable,meta31052__$1));
});

cljs.core.async.t_cljs$core$async31051.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_31053){
var self__ = this;
var _31053__$1 = this;
return self__.meta31052;
});

cljs.core.async.t_cljs$core$async31051.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async31051.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async31051.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async31051.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async31051.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta31052","meta31052",-1612376374,null)], null);
});

cljs.core.async.t_cljs$core$async31051.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async31051.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async31051";

cljs.core.async.t_cljs$core$async31051.cljs$lang$ctorPrWriter = (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async31051");
});

cljs.core.async.__GT_t_cljs$core$async31051 = (function cljs$core$async$__GT_t_cljs$core$async31051(f__$1,blockable__$1,meta31052){
return (new cljs.core.async.t_cljs$core$async31051(f__$1,blockable__$1,meta31052));
});

}

return (new cljs.core.async.t_cljs$core$async31051(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args31060 = [];
var len__19356__auto___31063 = arguments.length;
var i__19357__auto___31064 = (0);
while(true){
if((i__19357__auto___31064 < len__19356__auto___31063)){
args31060.push((arguments[i__19357__auto___31064]));

var G__31065 = (i__19357__auto___31064 + (1));
i__19357__auto___31064 = G__31065;
continue;
} else {
}
break;
}

var G__31062 = args31060.length;
switch (G__31062) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31060.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var args31067 = [];
var len__19356__auto___31070 = arguments.length;
var i__19357__auto___31071 = (0);
while(true){
if((i__19357__auto___31071 < len__19356__auto___31070)){
args31067.push((arguments[i__19357__auto___31071]));

var G__31072 = (i__19357__auto___31071 + (1));
i__19357__auto___31071 = G__31072;
continue;
} else {
}
break;
}

var G__31069 = args31067.length;
switch (G__31069) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31067.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.call(null,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.call(null,xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.call(null,cljs.core.async.impl.buffers.promise_buffer.call(null),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args31074 = [];
var len__19356__auto___31077 = arguments.length;
var i__19357__auto___31078 = (0);
while(true){
if((i__19357__auto___31078 < len__19356__auto___31077)){
args31074.push((arguments[i__19357__auto___31078]));

var G__31079 = (i__19357__auto___31078 + (1));
i__19357__auto___31078 = G__31079;
continue;
} else {
}
break;
}

var G__31076 = args31074.length;
switch (G__31076) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31074.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_31081 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_31081);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_31081,ret){
return (function (){
return fn1.call(null,val_31081);
});})(val_31081,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;
cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args31082 = [];
var len__19356__auto___31085 = arguments.length;
var i__19357__auto___31086 = (0);
while(true){
if((i__19357__auto___31086 < len__19356__auto___31085)){
args31082.push((arguments[i__19357__auto___31086]));

var G__31087 = (i__19357__auto___31086 + (1));
i__19357__auto___31086 = G__31087;
continue;
} else {
}
break;
}

var G__31084 = args31082.length;
switch (G__31084) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31082.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4423__auto__)){
var ret = temp__4423__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4423__auto__)){
var retb = temp__4423__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4423__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4423__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;
cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__19201__auto___31089 = n;
var x_31090 = (0);
while(true){
if((x_31090 < n__19201__auto___31089)){
(a[x_31090] = (0));

var G__31091 = (x_31090 + (1));
x_31090 = G__31091;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__31092 = (i + (1));
i = G__31092;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async31096 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async31096 = (function (alt_flag,flag,meta31097){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta31097 = meta31097;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async31096.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_31098,meta31097__$1){
var self__ = this;
var _31098__$1 = this;
return (new cljs.core.async.t_cljs$core$async31096(self__.alt_flag,self__.flag,meta31097__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async31096.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_31098){
var self__ = this;
var _31098__$1 = this;
return self__.meta31097;
});})(flag))
;

cljs.core.async.t_cljs$core$async31096.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async31096.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async31096.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async31096.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async31096.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta31097","meta31097",1697226956,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async31096.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async31096.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async31096";

cljs.core.async.t_cljs$core$async31096.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async31096");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async31096 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async31096(alt_flag__$1,flag__$1,meta31097){
return (new cljs.core.async.t_cljs$core$async31096(alt_flag__$1,flag__$1,meta31097));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async31096(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async31102 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async31102 = (function (alt_handler,flag,cb,meta31103){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta31103 = meta31103;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async31102.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_31104,meta31103__$1){
var self__ = this;
var _31104__$1 = this;
return (new cljs.core.async.t_cljs$core$async31102(self__.alt_handler,self__.flag,self__.cb,meta31103__$1));
});

cljs.core.async.t_cljs$core$async31102.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_31104){
var self__ = this;
var _31104__$1 = this;
return self__.meta31103;
});

cljs.core.async.t_cljs$core$async31102.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async31102.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async31102.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async31102.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async31102.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta31103","meta31103",1541326561,null)], null);
});

cljs.core.async.t_cljs$core$async31102.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async31102.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async31102";

cljs.core.async.t_cljs$core$async31102.cljs$lang$ctorPrWriter = (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async31102");
});

cljs.core.async.__GT_t_cljs$core$async31102 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async31102(alt_handler__$1,flag__$1,cb__$1,meta31103){
return (new cljs.core.async.t_cljs$core$async31102(alt_handler__$1,flag__$1,cb__$1,meta31103));
});

}

return (new cljs.core.async.t_cljs$core$async31102(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__31105_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__31105_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__31106_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__31106_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__18298__auto__ = wport;
if(cljs.core.truth_(or__18298__auto__)){
return or__18298__auto__;
} else {
return port;
}
})()], null));
} else {
var G__31107 = (i + (1));
i = G__31107;
continue;
}
} else {
return null;
}
break;
}
})();
var or__18298__auto__ = ret;
if(cljs.core.truth_(or__18298__auto__)){
return or__18298__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4425__auto__ = (function (){var and__18286__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__18286__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__18286__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto__)){
var got = temp__4425__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__19363__auto__ = [];
var len__19356__auto___31113 = arguments.length;
var i__19357__auto___31114 = (0);
while(true){
if((i__19357__auto___31114 < len__19356__auto___31113)){
args__19363__auto__.push((arguments[i__19357__auto___31114]));

var G__31115 = (i__19357__auto___31114 + (1));
i__19357__auto___31114 = G__31115;
continue;
} else {
}
break;
}

var argseq__19364__auto__ = ((((1) < args__19363__auto__.length))?(new cljs.core.IndexedSeq(args__19363__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__19364__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__31110){
var map__31111 = p__31110;
var map__31111__$1 = ((((!((map__31111 == null)))?((((map__31111.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31111.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31111):map__31111);
var opts = map__31111__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq31108){
var G__31109 = cljs.core.first.call(null,seq31108);
var seq31108__$1 = cljs.core.next.call(null,seq31108);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__31109,seq31108__$1);
});
/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args31116 = [];
var len__19356__auto___31166 = arguments.length;
var i__19357__auto___31167 = (0);
while(true){
if((i__19357__auto___31167 < len__19356__auto___31166)){
args31116.push((arguments[i__19357__auto___31167]));

var G__31168 = (i__19357__auto___31167 + (1));
i__19357__auto___31167 = G__31168;
continue;
} else {
}
break;
}

var G__31118 = args31116.length;
switch (G__31118) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31116.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__20323__auto___31170 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___31170){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___31170){
return (function (state_31142){
var state_val_31143 = (state_31142[(1)]);
if((state_val_31143 === (7))){
var inst_31138 = (state_31142[(2)]);
var state_31142__$1 = state_31142;
var statearr_31144_31171 = state_31142__$1;
(statearr_31144_31171[(2)] = inst_31138);

(statearr_31144_31171[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (1))){
var state_31142__$1 = state_31142;
var statearr_31145_31172 = state_31142__$1;
(statearr_31145_31172[(2)] = null);

(statearr_31145_31172[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (4))){
var inst_31121 = (state_31142[(7)]);
var inst_31121__$1 = (state_31142[(2)]);
var inst_31122 = (inst_31121__$1 == null);
var state_31142__$1 = (function (){var statearr_31146 = state_31142;
(statearr_31146[(7)] = inst_31121__$1);

return statearr_31146;
})();
if(cljs.core.truth_(inst_31122)){
var statearr_31147_31173 = state_31142__$1;
(statearr_31147_31173[(1)] = (5));

} else {
var statearr_31148_31174 = state_31142__$1;
(statearr_31148_31174[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (13))){
var state_31142__$1 = state_31142;
var statearr_31149_31175 = state_31142__$1;
(statearr_31149_31175[(2)] = null);

(statearr_31149_31175[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (6))){
var inst_31121 = (state_31142[(7)]);
var state_31142__$1 = state_31142;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_31142__$1,(11),to,inst_31121);
} else {
if((state_val_31143 === (3))){
var inst_31140 = (state_31142[(2)]);
var state_31142__$1 = state_31142;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31142__$1,inst_31140);
} else {
if((state_val_31143 === (12))){
var state_31142__$1 = state_31142;
var statearr_31150_31176 = state_31142__$1;
(statearr_31150_31176[(2)] = null);

(statearr_31150_31176[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (2))){
var state_31142__$1 = state_31142;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31142__$1,(4),from);
} else {
if((state_val_31143 === (11))){
var inst_31131 = (state_31142[(2)]);
var state_31142__$1 = state_31142;
if(cljs.core.truth_(inst_31131)){
var statearr_31151_31177 = state_31142__$1;
(statearr_31151_31177[(1)] = (12));

} else {
var statearr_31152_31178 = state_31142__$1;
(statearr_31152_31178[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (9))){
var state_31142__$1 = state_31142;
var statearr_31153_31179 = state_31142__$1;
(statearr_31153_31179[(2)] = null);

(statearr_31153_31179[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (5))){
var state_31142__$1 = state_31142;
if(cljs.core.truth_(close_QMARK_)){
var statearr_31154_31180 = state_31142__$1;
(statearr_31154_31180[(1)] = (8));

} else {
var statearr_31155_31181 = state_31142__$1;
(statearr_31155_31181[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (14))){
var inst_31136 = (state_31142[(2)]);
var state_31142__$1 = state_31142;
var statearr_31156_31182 = state_31142__$1;
(statearr_31156_31182[(2)] = inst_31136);

(statearr_31156_31182[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (10))){
var inst_31128 = (state_31142[(2)]);
var state_31142__$1 = state_31142;
var statearr_31157_31183 = state_31142__$1;
(statearr_31157_31183[(2)] = inst_31128);

(statearr_31157_31183[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31143 === (8))){
var inst_31125 = cljs.core.async.close_BANG_.call(null,to);
var state_31142__$1 = state_31142;
var statearr_31158_31184 = state_31142__$1;
(statearr_31158_31184[(2)] = inst_31125);

(statearr_31158_31184[(1)] = (10));


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
});})(c__20323__auto___31170))
;
return ((function (switch__20302__auto__,c__20323__auto___31170){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_31162 = [null,null,null,null,null,null,null,null];
(statearr_31162[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_31162[(1)] = (1));

return statearr_31162;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_31142){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_31142);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e31163){if((e31163 instanceof Object)){
var ex__20306__auto__ = e31163;
var statearr_31164_31185 = state_31142;
(statearr_31164_31185[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31142);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31163;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31186 = state_31142;
state_31142 = G__31186;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_31142){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_31142);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___31170))
})();
var state__20325__auto__ = (function (){var statearr_31165 = f__20324__auto__.call(null);
(statearr_31165[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___31170);

return statearr_31165;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___31170))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null))))].join('')));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__31370){
var vec__31371 = p__31370;
var v = cljs.core.nth.call(null,vec__31371,(0),null);
var p = cljs.core.nth.call(null,vec__31371,(1),null);
var job = vec__31371;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__20323__auto___31553 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___31553,res,vec__31371,v,p,job,jobs,results){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___31553,res,vec__31371,v,p,job,jobs,results){
return (function (state_31376){
var state_val_31377 = (state_31376[(1)]);
if((state_val_31377 === (1))){
var state_31376__$1 = state_31376;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_31376__$1,(2),res,v);
} else {
if((state_val_31377 === (2))){
var inst_31373 = (state_31376[(2)]);
var inst_31374 = cljs.core.async.close_BANG_.call(null,res);
var state_31376__$1 = (function (){var statearr_31378 = state_31376;
(statearr_31378[(7)] = inst_31373);

return statearr_31378;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31376__$1,inst_31374);
} else {
return null;
}
}
});})(c__20323__auto___31553,res,vec__31371,v,p,job,jobs,results))
;
return ((function (switch__20302__auto__,c__20323__auto___31553,res,vec__31371,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0 = (function (){
var statearr_31382 = [null,null,null,null,null,null,null,null];
(statearr_31382[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__);

(statearr_31382[(1)] = (1));

return statearr_31382;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1 = (function (state_31376){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_31376);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e31383){if((e31383 instanceof Object)){
var ex__20306__auto__ = e31383;
var statearr_31384_31554 = state_31376;
(statearr_31384_31554[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31376);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31383;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31555 = state_31376;
state_31376 = G__31555;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = function(state_31376){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1.call(this,state_31376);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___31553,res,vec__31371,v,p,job,jobs,results))
})();
var state__20325__auto__ = (function (){var statearr_31385 = f__20324__auto__.call(null);
(statearr_31385[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___31553);

return statearr_31385;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___31553,res,vec__31371,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__31386){
var vec__31387 = p__31386;
var v = cljs.core.nth.call(null,vec__31387,(0),null);
var p = cljs.core.nth.call(null,vec__31387,(1),null);
var job = vec__31387;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__19201__auto___31556 = n;
var __31557 = (0);
while(true){
if((__31557 < n__19201__auto___31556)){
var G__31388_31558 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__31388_31558) {
case "compute":
var c__20323__auto___31560 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__31557,c__20323__auto___31560,G__31388_31558,n__19201__auto___31556,jobs,results,process,async){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (__31557,c__20323__auto___31560,G__31388_31558,n__19201__auto___31556,jobs,results,process,async){
return (function (state_31401){
var state_val_31402 = (state_31401[(1)]);
if((state_val_31402 === (1))){
var state_31401__$1 = state_31401;
var statearr_31403_31561 = state_31401__$1;
(statearr_31403_31561[(2)] = null);

(statearr_31403_31561[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31402 === (2))){
var state_31401__$1 = state_31401;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31401__$1,(4),jobs);
} else {
if((state_val_31402 === (3))){
var inst_31399 = (state_31401[(2)]);
var state_31401__$1 = state_31401;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31401__$1,inst_31399);
} else {
if((state_val_31402 === (4))){
var inst_31391 = (state_31401[(2)]);
var inst_31392 = process.call(null,inst_31391);
var state_31401__$1 = state_31401;
if(cljs.core.truth_(inst_31392)){
var statearr_31404_31562 = state_31401__$1;
(statearr_31404_31562[(1)] = (5));

} else {
var statearr_31405_31563 = state_31401__$1;
(statearr_31405_31563[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31402 === (5))){
var state_31401__$1 = state_31401;
var statearr_31406_31564 = state_31401__$1;
(statearr_31406_31564[(2)] = null);

(statearr_31406_31564[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31402 === (6))){
var state_31401__$1 = state_31401;
var statearr_31407_31565 = state_31401__$1;
(statearr_31407_31565[(2)] = null);

(statearr_31407_31565[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31402 === (7))){
var inst_31397 = (state_31401[(2)]);
var state_31401__$1 = state_31401;
var statearr_31408_31566 = state_31401__$1;
(statearr_31408_31566[(2)] = inst_31397);

(statearr_31408_31566[(1)] = (3));


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
});})(__31557,c__20323__auto___31560,G__31388_31558,n__19201__auto___31556,jobs,results,process,async))
;
return ((function (__31557,switch__20302__auto__,c__20323__auto___31560,G__31388_31558,n__19201__auto___31556,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0 = (function (){
var statearr_31412 = [null,null,null,null,null,null,null];
(statearr_31412[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__);

(statearr_31412[(1)] = (1));

return statearr_31412;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1 = (function (state_31401){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_31401);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e31413){if((e31413 instanceof Object)){
var ex__20306__auto__ = e31413;
var statearr_31414_31567 = state_31401;
(statearr_31414_31567[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31401);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31413;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31568 = state_31401;
state_31401 = G__31568;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = function(state_31401){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1.call(this,state_31401);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__;
})()
;})(__31557,switch__20302__auto__,c__20323__auto___31560,G__31388_31558,n__19201__auto___31556,jobs,results,process,async))
})();
var state__20325__auto__ = (function (){var statearr_31415 = f__20324__auto__.call(null);
(statearr_31415[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___31560);

return statearr_31415;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(__31557,c__20323__auto___31560,G__31388_31558,n__19201__auto___31556,jobs,results,process,async))
);


break;
case "async":
var c__20323__auto___31569 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__31557,c__20323__auto___31569,G__31388_31558,n__19201__auto___31556,jobs,results,process,async){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (__31557,c__20323__auto___31569,G__31388_31558,n__19201__auto___31556,jobs,results,process,async){
return (function (state_31428){
var state_val_31429 = (state_31428[(1)]);
if((state_val_31429 === (1))){
var state_31428__$1 = state_31428;
var statearr_31430_31570 = state_31428__$1;
(statearr_31430_31570[(2)] = null);

(statearr_31430_31570[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31429 === (2))){
var state_31428__$1 = state_31428;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31428__$1,(4),jobs);
} else {
if((state_val_31429 === (3))){
var inst_31426 = (state_31428[(2)]);
var state_31428__$1 = state_31428;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31428__$1,inst_31426);
} else {
if((state_val_31429 === (4))){
var inst_31418 = (state_31428[(2)]);
var inst_31419 = async.call(null,inst_31418);
var state_31428__$1 = state_31428;
if(cljs.core.truth_(inst_31419)){
var statearr_31431_31571 = state_31428__$1;
(statearr_31431_31571[(1)] = (5));

} else {
var statearr_31432_31572 = state_31428__$1;
(statearr_31432_31572[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31429 === (5))){
var state_31428__$1 = state_31428;
var statearr_31433_31573 = state_31428__$1;
(statearr_31433_31573[(2)] = null);

(statearr_31433_31573[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31429 === (6))){
var state_31428__$1 = state_31428;
var statearr_31434_31574 = state_31428__$1;
(statearr_31434_31574[(2)] = null);

(statearr_31434_31574[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31429 === (7))){
var inst_31424 = (state_31428[(2)]);
var state_31428__$1 = state_31428;
var statearr_31435_31575 = state_31428__$1;
(statearr_31435_31575[(2)] = inst_31424);

(statearr_31435_31575[(1)] = (3));


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
});})(__31557,c__20323__auto___31569,G__31388_31558,n__19201__auto___31556,jobs,results,process,async))
;
return ((function (__31557,switch__20302__auto__,c__20323__auto___31569,G__31388_31558,n__19201__auto___31556,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0 = (function (){
var statearr_31439 = [null,null,null,null,null,null,null];
(statearr_31439[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__);

(statearr_31439[(1)] = (1));

return statearr_31439;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1 = (function (state_31428){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_31428);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e31440){if((e31440 instanceof Object)){
var ex__20306__auto__ = e31440;
var statearr_31441_31576 = state_31428;
(statearr_31441_31576[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31428);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31440;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31577 = state_31428;
state_31428 = G__31577;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = function(state_31428){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1.call(this,state_31428);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__;
})()
;})(__31557,switch__20302__auto__,c__20323__auto___31569,G__31388_31558,n__19201__auto___31556,jobs,results,process,async))
})();
var state__20325__auto__ = (function (){var statearr_31442 = f__20324__auto__.call(null);
(statearr_31442[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___31569);

return statearr_31442;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(__31557,c__20323__auto___31569,G__31388_31558,n__19201__auto___31556,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__31578 = (__31557 + (1));
__31557 = G__31578;
continue;
} else {
}
break;
}

var c__20323__auto___31579 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___31579,jobs,results,process,async){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___31579,jobs,results,process,async){
return (function (state_31464){
var state_val_31465 = (state_31464[(1)]);
if((state_val_31465 === (1))){
var state_31464__$1 = state_31464;
var statearr_31466_31580 = state_31464__$1;
(statearr_31466_31580[(2)] = null);

(statearr_31466_31580[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31465 === (2))){
var state_31464__$1 = state_31464;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31464__$1,(4),from);
} else {
if((state_val_31465 === (3))){
var inst_31462 = (state_31464[(2)]);
var state_31464__$1 = state_31464;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31464__$1,inst_31462);
} else {
if((state_val_31465 === (4))){
var inst_31445 = (state_31464[(7)]);
var inst_31445__$1 = (state_31464[(2)]);
var inst_31446 = (inst_31445__$1 == null);
var state_31464__$1 = (function (){var statearr_31467 = state_31464;
(statearr_31467[(7)] = inst_31445__$1);

return statearr_31467;
})();
if(cljs.core.truth_(inst_31446)){
var statearr_31468_31581 = state_31464__$1;
(statearr_31468_31581[(1)] = (5));

} else {
var statearr_31469_31582 = state_31464__$1;
(statearr_31469_31582[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31465 === (5))){
var inst_31448 = cljs.core.async.close_BANG_.call(null,jobs);
var state_31464__$1 = state_31464;
var statearr_31470_31583 = state_31464__$1;
(statearr_31470_31583[(2)] = inst_31448);

(statearr_31470_31583[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31465 === (6))){
var inst_31450 = (state_31464[(8)]);
var inst_31445 = (state_31464[(7)]);
var inst_31450__$1 = cljs.core.async.chan.call(null,(1));
var inst_31451 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_31452 = [inst_31445,inst_31450__$1];
var inst_31453 = (new cljs.core.PersistentVector(null,2,(5),inst_31451,inst_31452,null));
var state_31464__$1 = (function (){var statearr_31471 = state_31464;
(statearr_31471[(8)] = inst_31450__$1);

return statearr_31471;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_31464__$1,(8),jobs,inst_31453);
} else {
if((state_val_31465 === (7))){
var inst_31460 = (state_31464[(2)]);
var state_31464__$1 = state_31464;
var statearr_31472_31584 = state_31464__$1;
(statearr_31472_31584[(2)] = inst_31460);

(statearr_31472_31584[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31465 === (8))){
var inst_31450 = (state_31464[(8)]);
var inst_31455 = (state_31464[(2)]);
var state_31464__$1 = (function (){var statearr_31473 = state_31464;
(statearr_31473[(9)] = inst_31455);

return statearr_31473;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_31464__$1,(9),results,inst_31450);
} else {
if((state_val_31465 === (9))){
var inst_31457 = (state_31464[(2)]);
var state_31464__$1 = (function (){var statearr_31474 = state_31464;
(statearr_31474[(10)] = inst_31457);

return statearr_31474;
})();
var statearr_31475_31585 = state_31464__$1;
(statearr_31475_31585[(2)] = null);

(statearr_31475_31585[(1)] = (2));


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
});})(c__20323__auto___31579,jobs,results,process,async))
;
return ((function (switch__20302__auto__,c__20323__auto___31579,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0 = (function (){
var statearr_31479 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_31479[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__);

(statearr_31479[(1)] = (1));

return statearr_31479;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1 = (function (state_31464){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_31464);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e31480){if((e31480 instanceof Object)){
var ex__20306__auto__ = e31480;
var statearr_31481_31586 = state_31464;
(statearr_31481_31586[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31464);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31480;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31587 = state_31464;
state_31464 = G__31587;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = function(state_31464){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1.call(this,state_31464);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___31579,jobs,results,process,async))
})();
var state__20325__auto__ = (function (){var statearr_31482 = f__20324__auto__.call(null);
(statearr_31482[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___31579);

return statearr_31482;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___31579,jobs,results,process,async))
);


var c__20323__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto__,jobs,results,process,async){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto__,jobs,results,process,async){
return (function (state_31520){
var state_val_31521 = (state_31520[(1)]);
if((state_val_31521 === (7))){
var inst_31516 = (state_31520[(2)]);
var state_31520__$1 = state_31520;
var statearr_31522_31588 = state_31520__$1;
(statearr_31522_31588[(2)] = inst_31516);

(statearr_31522_31588[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (20))){
var state_31520__$1 = state_31520;
var statearr_31523_31589 = state_31520__$1;
(statearr_31523_31589[(2)] = null);

(statearr_31523_31589[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (1))){
var state_31520__$1 = state_31520;
var statearr_31524_31590 = state_31520__$1;
(statearr_31524_31590[(2)] = null);

(statearr_31524_31590[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (4))){
var inst_31485 = (state_31520[(7)]);
var inst_31485__$1 = (state_31520[(2)]);
var inst_31486 = (inst_31485__$1 == null);
var state_31520__$1 = (function (){var statearr_31525 = state_31520;
(statearr_31525[(7)] = inst_31485__$1);

return statearr_31525;
})();
if(cljs.core.truth_(inst_31486)){
var statearr_31526_31591 = state_31520__$1;
(statearr_31526_31591[(1)] = (5));

} else {
var statearr_31527_31592 = state_31520__$1;
(statearr_31527_31592[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (15))){
var inst_31498 = (state_31520[(8)]);
var state_31520__$1 = state_31520;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_31520__$1,(18),to,inst_31498);
} else {
if((state_val_31521 === (21))){
var inst_31511 = (state_31520[(2)]);
var state_31520__$1 = state_31520;
var statearr_31528_31593 = state_31520__$1;
(statearr_31528_31593[(2)] = inst_31511);

(statearr_31528_31593[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (13))){
var inst_31513 = (state_31520[(2)]);
var state_31520__$1 = (function (){var statearr_31529 = state_31520;
(statearr_31529[(9)] = inst_31513);

return statearr_31529;
})();
var statearr_31530_31594 = state_31520__$1;
(statearr_31530_31594[(2)] = null);

(statearr_31530_31594[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (6))){
var inst_31485 = (state_31520[(7)]);
var state_31520__$1 = state_31520;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31520__$1,(11),inst_31485);
} else {
if((state_val_31521 === (17))){
var inst_31506 = (state_31520[(2)]);
var state_31520__$1 = state_31520;
if(cljs.core.truth_(inst_31506)){
var statearr_31531_31595 = state_31520__$1;
(statearr_31531_31595[(1)] = (19));

} else {
var statearr_31532_31596 = state_31520__$1;
(statearr_31532_31596[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (3))){
var inst_31518 = (state_31520[(2)]);
var state_31520__$1 = state_31520;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31520__$1,inst_31518);
} else {
if((state_val_31521 === (12))){
var inst_31495 = (state_31520[(10)]);
var state_31520__$1 = state_31520;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31520__$1,(14),inst_31495);
} else {
if((state_val_31521 === (2))){
var state_31520__$1 = state_31520;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31520__$1,(4),results);
} else {
if((state_val_31521 === (19))){
var state_31520__$1 = state_31520;
var statearr_31533_31597 = state_31520__$1;
(statearr_31533_31597[(2)] = null);

(statearr_31533_31597[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (11))){
var inst_31495 = (state_31520[(2)]);
var state_31520__$1 = (function (){var statearr_31534 = state_31520;
(statearr_31534[(10)] = inst_31495);

return statearr_31534;
})();
var statearr_31535_31598 = state_31520__$1;
(statearr_31535_31598[(2)] = null);

(statearr_31535_31598[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (9))){
var state_31520__$1 = state_31520;
var statearr_31536_31599 = state_31520__$1;
(statearr_31536_31599[(2)] = null);

(statearr_31536_31599[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (5))){
var state_31520__$1 = state_31520;
if(cljs.core.truth_(close_QMARK_)){
var statearr_31537_31600 = state_31520__$1;
(statearr_31537_31600[(1)] = (8));

} else {
var statearr_31538_31601 = state_31520__$1;
(statearr_31538_31601[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (14))){
var inst_31500 = (state_31520[(11)]);
var inst_31498 = (state_31520[(8)]);
var inst_31498__$1 = (state_31520[(2)]);
var inst_31499 = (inst_31498__$1 == null);
var inst_31500__$1 = cljs.core.not.call(null,inst_31499);
var state_31520__$1 = (function (){var statearr_31539 = state_31520;
(statearr_31539[(11)] = inst_31500__$1);

(statearr_31539[(8)] = inst_31498__$1);

return statearr_31539;
})();
if(inst_31500__$1){
var statearr_31540_31602 = state_31520__$1;
(statearr_31540_31602[(1)] = (15));

} else {
var statearr_31541_31603 = state_31520__$1;
(statearr_31541_31603[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (16))){
var inst_31500 = (state_31520[(11)]);
var state_31520__$1 = state_31520;
var statearr_31542_31604 = state_31520__$1;
(statearr_31542_31604[(2)] = inst_31500);

(statearr_31542_31604[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (10))){
var inst_31492 = (state_31520[(2)]);
var state_31520__$1 = state_31520;
var statearr_31543_31605 = state_31520__$1;
(statearr_31543_31605[(2)] = inst_31492);

(statearr_31543_31605[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (18))){
var inst_31503 = (state_31520[(2)]);
var state_31520__$1 = state_31520;
var statearr_31544_31606 = state_31520__$1;
(statearr_31544_31606[(2)] = inst_31503);

(statearr_31544_31606[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31521 === (8))){
var inst_31489 = cljs.core.async.close_BANG_.call(null,to);
var state_31520__$1 = state_31520;
var statearr_31545_31607 = state_31520__$1;
(statearr_31545_31607[(2)] = inst_31489);

(statearr_31545_31607[(1)] = (10));


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
});})(c__20323__auto__,jobs,results,process,async))
;
return ((function (switch__20302__auto__,c__20323__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0 = (function (){
var statearr_31549 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_31549[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__);

(statearr_31549[(1)] = (1));

return statearr_31549;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1 = (function (state_31520){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_31520);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e31550){if((e31550 instanceof Object)){
var ex__20306__auto__ = e31550;
var statearr_31551_31608 = state_31520;
(statearr_31551_31608[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31520);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31550;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31609 = state_31520;
state_31520 = G__31609;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__ = function(state_31520){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1.call(this,state_31520);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20303__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto__,jobs,results,process,async))
})();
var state__20325__auto__ = (function (){var statearr_31552 = f__20324__auto__.call(null);
(statearr_31552[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto__);

return statearr_31552;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto__,jobs,results,process,async))
);

return c__20323__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args31610 = [];
var len__19356__auto___31613 = arguments.length;
var i__19357__auto___31614 = (0);
while(true){
if((i__19357__auto___31614 < len__19356__auto___31613)){
args31610.push((arguments[i__19357__auto___31614]));

var G__31615 = (i__19357__auto___31614 + (1));
i__19357__auto___31614 = G__31615;
continue;
} else {
}
break;
}

var G__31612 = args31610.length;
switch (G__31612) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31610.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args31617 = [];
var len__19356__auto___31620 = arguments.length;
var i__19357__auto___31621 = (0);
while(true){
if((i__19357__auto___31621 < len__19356__auto___31620)){
args31617.push((arguments[i__19357__auto___31621]));

var G__31622 = (i__19357__auto___31621 + (1));
i__19357__auto___31621 = G__31622;
continue;
} else {
}
break;
}

var G__31619 = args31617.length;
switch (G__31619) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31617.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;
/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args31624 = [];
var len__19356__auto___31677 = arguments.length;
var i__19357__auto___31678 = (0);
while(true){
if((i__19357__auto___31678 < len__19356__auto___31677)){
args31624.push((arguments[i__19357__auto___31678]));

var G__31679 = (i__19357__auto___31678 + (1));
i__19357__auto___31678 = G__31679;
continue;
} else {
}
break;
}

var G__31626 = args31624.length;
switch (G__31626) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31624.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__20323__auto___31681 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___31681,tc,fc){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___31681,tc,fc){
return (function (state_31652){
var state_val_31653 = (state_31652[(1)]);
if((state_val_31653 === (7))){
var inst_31648 = (state_31652[(2)]);
var state_31652__$1 = state_31652;
var statearr_31654_31682 = state_31652__$1;
(statearr_31654_31682[(2)] = inst_31648);

(statearr_31654_31682[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (1))){
var state_31652__$1 = state_31652;
var statearr_31655_31683 = state_31652__$1;
(statearr_31655_31683[(2)] = null);

(statearr_31655_31683[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (4))){
var inst_31629 = (state_31652[(7)]);
var inst_31629__$1 = (state_31652[(2)]);
var inst_31630 = (inst_31629__$1 == null);
var state_31652__$1 = (function (){var statearr_31656 = state_31652;
(statearr_31656[(7)] = inst_31629__$1);

return statearr_31656;
})();
if(cljs.core.truth_(inst_31630)){
var statearr_31657_31684 = state_31652__$1;
(statearr_31657_31684[(1)] = (5));

} else {
var statearr_31658_31685 = state_31652__$1;
(statearr_31658_31685[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (13))){
var state_31652__$1 = state_31652;
var statearr_31659_31686 = state_31652__$1;
(statearr_31659_31686[(2)] = null);

(statearr_31659_31686[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (6))){
var inst_31629 = (state_31652[(7)]);
var inst_31635 = p.call(null,inst_31629);
var state_31652__$1 = state_31652;
if(cljs.core.truth_(inst_31635)){
var statearr_31660_31687 = state_31652__$1;
(statearr_31660_31687[(1)] = (9));

} else {
var statearr_31661_31688 = state_31652__$1;
(statearr_31661_31688[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (3))){
var inst_31650 = (state_31652[(2)]);
var state_31652__$1 = state_31652;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31652__$1,inst_31650);
} else {
if((state_val_31653 === (12))){
var state_31652__$1 = state_31652;
var statearr_31662_31689 = state_31652__$1;
(statearr_31662_31689[(2)] = null);

(statearr_31662_31689[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (2))){
var state_31652__$1 = state_31652;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31652__$1,(4),ch);
} else {
if((state_val_31653 === (11))){
var inst_31629 = (state_31652[(7)]);
var inst_31639 = (state_31652[(2)]);
var state_31652__$1 = state_31652;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_31652__$1,(8),inst_31639,inst_31629);
} else {
if((state_val_31653 === (9))){
var state_31652__$1 = state_31652;
var statearr_31663_31690 = state_31652__$1;
(statearr_31663_31690[(2)] = tc);

(statearr_31663_31690[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (5))){
var inst_31632 = cljs.core.async.close_BANG_.call(null,tc);
var inst_31633 = cljs.core.async.close_BANG_.call(null,fc);
var state_31652__$1 = (function (){var statearr_31664 = state_31652;
(statearr_31664[(8)] = inst_31632);

return statearr_31664;
})();
var statearr_31665_31691 = state_31652__$1;
(statearr_31665_31691[(2)] = inst_31633);

(statearr_31665_31691[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (14))){
var inst_31646 = (state_31652[(2)]);
var state_31652__$1 = state_31652;
var statearr_31666_31692 = state_31652__$1;
(statearr_31666_31692[(2)] = inst_31646);

(statearr_31666_31692[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (10))){
var state_31652__$1 = state_31652;
var statearr_31667_31693 = state_31652__$1;
(statearr_31667_31693[(2)] = fc);

(statearr_31667_31693[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31653 === (8))){
var inst_31641 = (state_31652[(2)]);
var state_31652__$1 = state_31652;
if(cljs.core.truth_(inst_31641)){
var statearr_31668_31694 = state_31652__$1;
(statearr_31668_31694[(1)] = (12));

} else {
var statearr_31669_31695 = state_31652__$1;
(statearr_31669_31695[(1)] = (13));

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
});})(c__20323__auto___31681,tc,fc))
;
return ((function (switch__20302__auto__,c__20323__auto___31681,tc,fc){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_31673 = [null,null,null,null,null,null,null,null,null];
(statearr_31673[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_31673[(1)] = (1));

return statearr_31673;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_31652){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_31652);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e31674){if((e31674 instanceof Object)){
var ex__20306__auto__ = e31674;
var statearr_31675_31696 = state_31652;
(statearr_31675_31696[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31652);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31674;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31697 = state_31652;
state_31652 = G__31697;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_31652){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_31652);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___31681,tc,fc))
})();
var state__20325__auto__ = (function (){var statearr_31676 = f__20324__auto__.call(null);
(statearr_31676[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___31681);

return statearr_31676;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___31681,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__20323__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto__){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto__){
return (function (state_31761){
var state_val_31762 = (state_31761[(1)]);
if((state_val_31762 === (7))){
var inst_31757 = (state_31761[(2)]);
var state_31761__$1 = state_31761;
var statearr_31763_31784 = state_31761__$1;
(statearr_31763_31784[(2)] = inst_31757);

(statearr_31763_31784[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31762 === (1))){
var inst_31741 = init;
var state_31761__$1 = (function (){var statearr_31764 = state_31761;
(statearr_31764[(7)] = inst_31741);

return statearr_31764;
})();
var statearr_31765_31785 = state_31761__$1;
(statearr_31765_31785[(2)] = null);

(statearr_31765_31785[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31762 === (4))){
var inst_31744 = (state_31761[(8)]);
var inst_31744__$1 = (state_31761[(2)]);
var inst_31745 = (inst_31744__$1 == null);
var state_31761__$1 = (function (){var statearr_31766 = state_31761;
(statearr_31766[(8)] = inst_31744__$1);

return statearr_31766;
})();
if(cljs.core.truth_(inst_31745)){
var statearr_31767_31786 = state_31761__$1;
(statearr_31767_31786[(1)] = (5));

} else {
var statearr_31768_31787 = state_31761__$1;
(statearr_31768_31787[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31762 === (6))){
var inst_31741 = (state_31761[(7)]);
var inst_31748 = (state_31761[(9)]);
var inst_31744 = (state_31761[(8)]);
var inst_31748__$1 = f.call(null,inst_31741,inst_31744);
var inst_31749 = cljs.core.reduced_QMARK_.call(null,inst_31748__$1);
var state_31761__$1 = (function (){var statearr_31769 = state_31761;
(statearr_31769[(9)] = inst_31748__$1);

return statearr_31769;
})();
if(inst_31749){
var statearr_31770_31788 = state_31761__$1;
(statearr_31770_31788[(1)] = (8));

} else {
var statearr_31771_31789 = state_31761__$1;
(statearr_31771_31789[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31762 === (3))){
var inst_31759 = (state_31761[(2)]);
var state_31761__$1 = state_31761;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31761__$1,inst_31759);
} else {
if((state_val_31762 === (2))){
var state_31761__$1 = state_31761;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31761__$1,(4),ch);
} else {
if((state_val_31762 === (9))){
var inst_31748 = (state_31761[(9)]);
var inst_31741 = inst_31748;
var state_31761__$1 = (function (){var statearr_31772 = state_31761;
(statearr_31772[(7)] = inst_31741);

return statearr_31772;
})();
var statearr_31773_31790 = state_31761__$1;
(statearr_31773_31790[(2)] = null);

(statearr_31773_31790[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31762 === (5))){
var inst_31741 = (state_31761[(7)]);
var state_31761__$1 = state_31761;
var statearr_31774_31791 = state_31761__$1;
(statearr_31774_31791[(2)] = inst_31741);

(statearr_31774_31791[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31762 === (10))){
var inst_31755 = (state_31761[(2)]);
var state_31761__$1 = state_31761;
var statearr_31775_31792 = state_31761__$1;
(statearr_31775_31792[(2)] = inst_31755);

(statearr_31775_31792[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31762 === (8))){
var inst_31748 = (state_31761[(9)]);
var inst_31751 = cljs.core.deref.call(null,inst_31748);
var state_31761__$1 = state_31761;
var statearr_31776_31793 = state_31761__$1;
(statearr_31776_31793[(2)] = inst_31751);

(statearr_31776_31793[(1)] = (10));


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
});})(c__20323__auto__))
;
return ((function (switch__20302__auto__,c__20323__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__20303__auto__ = null;
var cljs$core$async$reduce_$_state_machine__20303__auto____0 = (function (){
var statearr_31780 = [null,null,null,null,null,null,null,null,null,null];
(statearr_31780[(0)] = cljs$core$async$reduce_$_state_machine__20303__auto__);

(statearr_31780[(1)] = (1));

return statearr_31780;
});
var cljs$core$async$reduce_$_state_machine__20303__auto____1 = (function (state_31761){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_31761);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e31781){if((e31781 instanceof Object)){
var ex__20306__auto__ = e31781;
var statearr_31782_31794 = state_31761;
(statearr_31782_31794[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31761);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31781;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31795 = state_31761;
state_31761 = G__31795;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__20303__auto__ = function(state_31761){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__20303__auto____1.call(this,state_31761);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__20303__auto____0;
cljs$core$async$reduce_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__20303__auto____1;
return cljs$core$async$reduce_$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto__))
})();
var state__20325__auto__ = (function (){var statearr_31783 = f__20324__auto__.call(null);
(statearr_31783[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto__);

return statearr_31783;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto__))
);

return c__20323__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args31796 = [];
var len__19356__auto___31848 = arguments.length;
var i__19357__auto___31849 = (0);
while(true){
if((i__19357__auto___31849 < len__19356__auto___31848)){
args31796.push((arguments[i__19357__auto___31849]));

var G__31850 = (i__19357__auto___31849 + (1));
i__19357__auto___31849 = G__31850;
continue;
} else {
}
break;
}

var G__31798 = args31796.length;
switch (G__31798) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args31796.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__20323__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto__){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto__){
return (function (state_31823){
var state_val_31824 = (state_31823[(1)]);
if((state_val_31824 === (7))){
var inst_31805 = (state_31823[(2)]);
var state_31823__$1 = state_31823;
var statearr_31825_31852 = state_31823__$1;
(statearr_31825_31852[(2)] = inst_31805);

(statearr_31825_31852[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (1))){
var inst_31799 = cljs.core.seq.call(null,coll);
var inst_31800 = inst_31799;
var state_31823__$1 = (function (){var statearr_31826 = state_31823;
(statearr_31826[(7)] = inst_31800);

return statearr_31826;
})();
var statearr_31827_31853 = state_31823__$1;
(statearr_31827_31853[(2)] = null);

(statearr_31827_31853[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (4))){
var inst_31800 = (state_31823[(7)]);
var inst_31803 = cljs.core.first.call(null,inst_31800);
var state_31823__$1 = state_31823;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_31823__$1,(7),ch,inst_31803);
} else {
if((state_val_31824 === (13))){
var inst_31817 = (state_31823[(2)]);
var state_31823__$1 = state_31823;
var statearr_31828_31854 = state_31823__$1;
(statearr_31828_31854[(2)] = inst_31817);

(statearr_31828_31854[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (6))){
var inst_31808 = (state_31823[(2)]);
var state_31823__$1 = state_31823;
if(cljs.core.truth_(inst_31808)){
var statearr_31829_31855 = state_31823__$1;
(statearr_31829_31855[(1)] = (8));

} else {
var statearr_31830_31856 = state_31823__$1;
(statearr_31830_31856[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (3))){
var inst_31821 = (state_31823[(2)]);
var state_31823__$1 = state_31823;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31823__$1,inst_31821);
} else {
if((state_val_31824 === (12))){
var state_31823__$1 = state_31823;
var statearr_31831_31857 = state_31823__$1;
(statearr_31831_31857[(2)] = null);

(statearr_31831_31857[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (2))){
var inst_31800 = (state_31823[(7)]);
var state_31823__$1 = state_31823;
if(cljs.core.truth_(inst_31800)){
var statearr_31832_31858 = state_31823__$1;
(statearr_31832_31858[(1)] = (4));

} else {
var statearr_31833_31859 = state_31823__$1;
(statearr_31833_31859[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (11))){
var inst_31814 = cljs.core.async.close_BANG_.call(null,ch);
var state_31823__$1 = state_31823;
var statearr_31834_31860 = state_31823__$1;
(statearr_31834_31860[(2)] = inst_31814);

(statearr_31834_31860[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (9))){
var state_31823__$1 = state_31823;
if(cljs.core.truth_(close_QMARK_)){
var statearr_31835_31861 = state_31823__$1;
(statearr_31835_31861[(1)] = (11));

} else {
var statearr_31836_31862 = state_31823__$1;
(statearr_31836_31862[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (5))){
var inst_31800 = (state_31823[(7)]);
var state_31823__$1 = state_31823;
var statearr_31837_31863 = state_31823__$1;
(statearr_31837_31863[(2)] = inst_31800);

(statearr_31837_31863[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (10))){
var inst_31819 = (state_31823[(2)]);
var state_31823__$1 = state_31823;
var statearr_31838_31864 = state_31823__$1;
(statearr_31838_31864[(2)] = inst_31819);

(statearr_31838_31864[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31824 === (8))){
var inst_31800 = (state_31823[(7)]);
var inst_31810 = cljs.core.next.call(null,inst_31800);
var inst_31800__$1 = inst_31810;
var state_31823__$1 = (function (){var statearr_31839 = state_31823;
(statearr_31839[(7)] = inst_31800__$1);

return statearr_31839;
})();
var statearr_31840_31865 = state_31823__$1;
(statearr_31840_31865[(2)] = null);

(statearr_31840_31865[(1)] = (2));


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
});})(c__20323__auto__))
;
return ((function (switch__20302__auto__,c__20323__auto__){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_31844 = [null,null,null,null,null,null,null,null];
(statearr_31844[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_31844[(1)] = (1));

return statearr_31844;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_31823){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_31823);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e31845){if((e31845 instanceof Object)){
var ex__20306__auto__ = e31845;
var statearr_31846_31866 = state_31823;
(statearr_31846_31866[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31823);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31845;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31867 = state_31823;
state_31823 = G__31867;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_31823){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_31823);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto__))
})();
var state__20325__auto__ = (function (){var statearr_31847 = f__20324__auto__.call(null);
(statearr_31847[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto__);

return statearr_31847;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto__))
);

return c__20323__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__18953__auto__ = (((_ == null))?null:_);
var m__18954__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,_);
} else {
var m__18954__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__18953__auto__ = (((m == null))?null:m);
var m__18954__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__18954__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__18953__auto__ = (((m == null))?null:m);
var m__18954__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,m,ch);
} else {
var m__18954__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__18953__auto__ = (((m == null))?null:m);
var m__18954__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,m);
} else {
var m__18954__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async32089 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async32089 = (function (mult,ch,cs,meta32090){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta32090 = meta32090;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async32089.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_32091,meta32090__$1){
var self__ = this;
var _32091__$1 = this;
return (new cljs.core.async.t_cljs$core$async32089(self__.mult,self__.ch,self__.cs,meta32090__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async32089.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_32091){
var self__ = this;
var _32091__$1 = this;
return self__.meta32090;
});})(cs))
;

cljs.core.async.t_cljs$core$async32089.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async32089.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async32089.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async32089.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async32089.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async32089.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async32089.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta32090","meta32090",-2036955512,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async32089.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async32089.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async32089";

cljs.core.async.t_cljs$core$async32089.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async32089");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async32089 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async32089(mult__$1,ch__$1,cs__$1,meta32090){
return (new cljs.core.async.t_cljs$core$async32089(mult__$1,ch__$1,cs__$1,meta32090));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async32089(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__20323__auto___32310 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___32310,cs,m,dchan,dctr,done){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___32310,cs,m,dchan,dctr,done){
return (function (state_32222){
var state_val_32223 = (state_32222[(1)]);
if((state_val_32223 === (7))){
var inst_32218 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
var statearr_32224_32311 = state_32222__$1;
(statearr_32224_32311[(2)] = inst_32218);

(statearr_32224_32311[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (20))){
var inst_32123 = (state_32222[(7)]);
var inst_32133 = cljs.core.first.call(null,inst_32123);
var inst_32134 = cljs.core.nth.call(null,inst_32133,(0),null);
var inst_32135 = cljs.core.nth.call(null,inst_32133,(1),null);
var state_32222__$1 = (function (){var statearr_32225 = state_32222;
(statearr_32225[(8)] = inst_32134);

return statearr_32225;
})();
if(cljs.core.truth_(inst_32135)){
var statearr_32226_32312 = state_32222__$1;
(statearr_32226_32312[(1)] = (22));

} else {
var statearr_32227_32313 = state_32222__$1;
(statearr_32227_32313[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (27))){
var inst_32094 = (state_32222[(9)]);
var inst_32170 = (state_32222[(10)]);
var inst_32163 = (state_32222[(11)]);
var inst_32165 = (state_32222[(12)]);
var inst_32170__$1 = cljs.core._nth.call(null,inst_32163,inst_32165);
var inst_32171 = cljs.core.async.put_BANG_.call(null,inst_32170__$1,inst_32094,done);
var state_32222__$1 = (function (){var statearr_32228 = state_32222;
(statearr_32228[(10)] = inst_32170__$1);

return statearr_32228;
})();
if(cljs.core.truth_(inst_32171)){
var statearr_32229_32314 = state_32222__$1;
(statearr_32229_32314[(1)] = (30));

} else {
var statearr_32230_32315 = state_32222__$1;
(statearr_32230_32315[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (1))){
var state_32222__$1 = state_32222;
var statearr_32231_32316 = state_32222__$1;
(statearr_32231_32316[(2)] = null);

(statearr_32231_32316[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (24))){
var inst_32123 = (state_32222[(7)]);
var inst_32140 = (state_32222[(2)]);
var inst_32141 = cljs.core.next.call(null,inst_32123);
var inst_32103 = inst_32141;
var inst_32104 = null;
var inst_32105 = (0);
var inst_32106 = (0);
var state_32222__$1 = (function (){var statearr_32232 = state_32222;
(statearr_32232[(13)] = inst_32140);

(statearr_32232[(14)] = inst_32105);

(statearr_32232[(15)] = inst_32104);

(statearr_32232[(16)] = inst_32106);

(statearr_32232[(17)] = inst_32103);

return statearr_32232;
})();
var statearr_32233_32317 = state_32222__$1;
(statearr_32233_32317[(2)] = null);

(statearr_32233_32317[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (39))){
var state_32222__$1 = state_32222;
var statearr_32237_32318 = state_32222__$1;
(statearr_32237_32318[(2)] = null);

(statearr_32237_32318[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (4))){
var inst_32094 = (state_32222[(9)]);
var inst_32094__$1 = (state_32222[(2)]);
var inst_32095 = (inst_32094__$1 == null);
var state_32222__$1 = (function (){var statearr_32238 = state_32222;
(statearr_32238[(9)] = inst_32094__$1);

return statearr_32238;
})();
if(cljs.core.truth_(inst_32095)){
var statearr_32239_32319 = state_32222__$1;
(statearr_32239_32319[(1)] = (5));

} else {
var statearr_32240_32320 = state_32222__$1;
(statearr_32240_32320[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (15))){
var inst_32105 = (state_32222[(14)]);
var inst_32104 = (state_32222[(15)]);
var inst_32106 = (state_32222[(16)]);
var inst_32103 = (state_32222[(17)]);
var inst_32119 = (state_32222[(2)]);
var inst_32120 = (inst_32106 + (1));
var tmp32234 = inst_32105;
var tmp32235 = inst_32104;
var tmp32236 = inst_32103;
var inst_32103__$1 = tmp32236;
var inst_32104__$1 = tmp32235;
var inst_32105__$1 = tmp32234;
var inst_32106__$1 = inst_32120;
var state_32222__$1 = (function (){var statearr_32241 = state_32222;
(statearr_32241[(14)] = inst_32105__$1);

(statearr_32241[(15)] = inst_32104__$1);

(statearr_32241[(16)] = inst_32106__$1);

(statearr_32241[(18)] = inst_32119);

(statearr_32241[(17)] = inst_32103__$1);

return statearr_32241;
})();
var statearr_32242_32321 = state_32222__$1;
(statearr_32242_32321[(2)] = null);

(statearr_32242_32321[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (21))){
var inst_32144 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
var statearr_32246_32322 = state_32222__$1;
(statearr_32246_32322[(2)] = inst_32144);

(statearr_32246_32322[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (31))){
var inst_32170 = (state_32222[(10)]);
var inst_32174 = done.call(null,null);
var inst_32175 = cljs.core.async.untap_STAR_.call(null,m,inst_32170);
var state_32222__$1 = (function (){var statearr_32247 = state_32222;
(statearr_32247[(19)] = inst_32174);

return statearr_32247;
})();
var statearr_32248_32323 = state_32222__$1;
(statearr_32248_32323[(2)] = inst_32175);

(statearr_32248_32323[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (32))){
var inst_32164 = (state_32222[(20)]);
var inst_32162 = (state_32222[(21)]);
var inst_32163 = (state_32222[(11)]);
var inst_32165 = (state_32222[(12)]);
var inst_32177 = (state_32222[(2)]);
var inst_32178 = (inst_32165 + (1));
var tmp32243 = inst_32164;
var tmp32244 = inst_32162;
var tmp32245 = inst_32163;
var inst_32162__$1 = tmp32244;
var inst_32163__$1 = tmp32245;
var inst_32164__$1 = tmp32243;
var inst_32165__$1 = inst_32178;
var state_32222__$1 = (function (){var statearr_32249 = state_32222;
(statearr_32249[(22)] = inst_32177);

(statearr_32249[(20)] = inst_32164__$1);

(statearr_32249[(21)] = inst_32162__$1);

(statearr_32249[(11)] = inst_32163__$1);

(statearr_32249[(12)] = inst_32165__$1);

return statearr_32249;
})();
var statearr_32250_32324 = state_32222__$1;
(statearr_32250_32324[(2)] = null);

(statearr_32250_32324[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (40))){
var inst_32190 = (state_32222[(23)]);
var inst_32194 = done.call(null,null);
var inst_32195 = cljs.core.async.untap_STAR_.call(null,m,inst_32190);
var state_32222__$1 = (function (){var statearr_32251 = state_32222;
(statearr_32251[(24)] = inst_32194);

return statearr_32251;
})();
var statearr_32252_32325 = state_32222__$1;
(statearr_32252_32325[(2)] = inst_32195);

(statearr_32252_32325[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (33))){
var inst_32181 = (state_32222[(25)]);
var inst_32183 = cljs.core.chunked_seq_QMARK_.call(null,inst_32181);
var state_32222__$1 = state_32222;
if(inst_32183){
var statearr_32253_32326 = state_32222__$1;
(statearr_32253_32326[(1)] = (36));

} else {
var statearr_32254_32327 = state_32222__$1;
(statearr_32254_32327[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (13))){
var inst_32113 = (state_32222[(26)]);
var inst_32116 = cljs.core.async.close_BANG_.call(null,inst_32113);
var state_32222__$1 = state_32222;
var statearr_32255_32328 = state_32222__$1;
(statearr_32255_32328[(2)] = inst_32116);

(statearr_32255_32328[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (22))){
var inst_32134 = (state_32222[(8)]);
var inst_32137 = cljs.core.async.close_BANG_.call(null,inst_32134);
var state_32222__$1 = state_32222;
var statearr_32256_32329 = state_32222__$1;
(statearr_32256_32329[(2)] = inst_32137);

(statearr_32256_32329[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (36))){
var inst_32181 = (state_32222[(25)]);
var inst_32185 = cljs.core.chunk_first.call(null,inst_32181);
var inst_32186 = cljs.core.chunk_rest.call(null,inst_32181);
var inst_32187 = cljs.core.count.call(null,inst_32185);
var inst_32162 = inst_32186;
var inst_32163 = inst_32185;
var inst_32164 = inst_32187;
var inst_32165 = (0);
var state_32222__$1 = (function (){var statearr_32257 = state_32222;
(statearr_32257[(20)] = inst_32164);

(statearr_32257[(21)] = inst_32162);

(statearr_32257[(11)] = inst_32163);

(statearr_32257[(12)] = inst_32165);

return statearr_32257;
})();
var statearr_32258_32330 = state_32222__$1;
(statearr_32258_32330[(2)] = null);

(statearr_32258_32330[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (41))){
var inst_32181 = (state_32222[(25)]);
var inst_32197 = (state_32222[(2)]);
var inst_32198 = cljs.core.next.call(null,inst_32181);
var inst_32162 = inst_32198;
var inst_32163 = null;
var inst_32164 = (0);
var inst_32165 = (0);
var state_32222__$1 = (function (){var statearr_32259 = state_32222;
(statearr_32259[(20)] = inst_32164);

(statearr_32259[(27)] = inst_32197);

(statearr_32259[(21)] = inst_32162);

(statearr_32259[(11)] = inst_32163);

(statearr_32259[(12)] = inst_32165);

return statearr_32259;
})();
var statearr_32260_32331 = state_32222__$1;
(statearr_32260_32331[(2)] = null);

(statearr_32260_32331[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (43))){
var state_32222__$1 = state_32222;
var statearr_32261_32332 = state_32222__$1;
(statearr_32261_32332[(2)] = null);

(statearr_32261_32332[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (29))){
var inst_32206 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
var statearr_32262_32333 = state_32222__$1;
(statearr_32262_32333[(2)] = inst_32206);

(statearr_32262_32333[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (44))){
var inst_32215 = (state_32222[(2)]);
var state_32222__$1 = (function (){var statearr_32263 = state_32222;
(statearr_32263[(28)] = inst_32215);

return statearr_32263;
})();
var statearr_32264_32334 = state_32222__$1;
(statearr_32264_32334[(2)] = null);

(statearr_32264_32334[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (6))){
var inst_32154 = (state_32222[(29)]);
var inst_32153 = cljs.core.deref.call(null,cs);
var inst_32154__$1 = cljs.core.keys.call(null,inst_32153);
var inst_32155 = cljs.core.count.call(null,inst_32154__$1);
var inst_32156 = cljs.core.reset_BANG_.call(null,dctr,inst_32155);
var inst_32161 = cljs.core.seq.call(null,inst_32154__$1);
var inst_32162 = inst_32161;
var inst_32163 = null;
var inst_32164 = (0);
var inst_32165 = (0);
var state_32222__$1 = (function (){var statearr_32265 = state_32222;
(statearr_32265[(20)] = inst_32164);

(statearr_32265[(21)] = inst_32162);

(statearr_32265[(30)] = inst_32156);

(statearr_32265[(11)] = inst_32163);

(statearr_32265[(29)] = inst_32154__$1);

(statearr_32265[(12)] = inst_32165);

return statearr_32265;
})();
var statearr_32266_32335 = state_32222__$1;
(statearr_32266_32335[(2)] = null);

(statearr_32266_32335[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (28))){
var inst_32181 = (state_32222[(25)]);
var inst_32162 = (state_32222[(21)]);
var inst_32181__$1 = cljs.core.seq.call(null,inst_32162);
var state_32222__$1 = (function (){var statearr_32267 = state_32222;
(statearr_32267[(25)] = inst_32181__$1);

return statearr_32267;
})();
if(inst_32181__$1){
var statearr_32268_32336 = state_32222__$1;
(statearr_32268_32336[(1)] = (33));

} else {
var statearr_32269_32337 = state_32222__$1;
(statearr_32269_32337[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (25))){
var inst_32164 = (state_32222[(20)]);
var inst_32165 = (state_32222[(12)]);
var inst_32167 = (inst_32165 < inst_32164);
var inst_32168 = inst_32167;
var state_32222__$1 = state_32222;
if(cljs.core.truth_(inst_32168)){
var statearr_32270_32338 = state_32222__$1;
(statearr_32270_32338[(1)] = (27));

} else {
var statearr_32271_32339 = state_32222__$1;
(statearr_32271_32339[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (34))){
var state_32222__$1 = state_32222;
var statearr_32272_32340 = state_32222__$1;
(statearr_32272_32340[(2)] = null);

(statearr_32272_32340[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (17))){
var state_32222__$1 = state_32222;
var statearr_32273_32341 = state_32222__$1;
(statearr_32273_32341[(2)] = null);

(statearr_32273_32341[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (3))){
var inst_32220 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_32222__$1,inst_32220);
} else {
if((state_val_32223 === (12))){
var inst_32149 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
var statearr_32274_32342 = state_32222__$1;
(statearr_32274_32342[(2)] = inst_32149);

(statearr_32274_32342[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (2))){
var state_32222__$1 = state_32222;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32222__$1,(4),ch);
} else {
if((state_val_32223 === (23))){
var state_32222__$1 = state_32222;
var statearr_32275_32343 = state_32222__$1;
(statearr_32275_32343[(2)] = null);

(statearr_32275_32343[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (35))){
var inst_32204 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
var statearr_32276_32344 = state_32222__$1;
(statearr_32276_32344[(2)] = inst_32204);

(statearr_32276_32344[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (19))){
var inst_32123 = (state_32222[(7)]);
var inst_32127 = cljs.core.chunk_first.call(null,inst_32123);
var inst_32128 = cljs.core.chunk_rest.call(null,inst_32123);
var inst_32129 = cljs.core.count.call(null,inst_32127);
var inst_32103 = inst_32128;
var inst_32104 = inst_32127;
var inst_32105 = inst_32129;
var inst_32106 = (0);
var state_32222__$1 = (function (){var statearr_32277 = state_32222;
(statearr_32277[(14)] = inst_32105);

(statearr_32277[(15)] = inst_32104);

(statearr_32277[(16)] = inst_32106);

(statearr_32277[(17)] = inst_32103);

return statearr_32277;
})();
var statearr_32278_32345 = state_32222__$1;
(statearr_32278_32345[(2)] = null);

(statearr_32278_32345[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (11))){
var inst_32123 = (state_32222[(7)]);
var inst_32103 = (state_32222[(17)]);
var inst_32123__$1 = cljs.core.seq.call(null,inst_32103);
var state_32222__$1 = (function (){var statearr_32279 = state_32222;
(statearr_32279[(7)] = inst_32123__$1);

return statearr_32279;
})();
if(inst_32123__$1){
var statearr_32280_32346 = state_32222__$1;
(statearr_32280_32346[(1)] = (16));

} else {
var statearr_32281_32347 = state_32222__$1;
(statearr_32281_32347[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (9))){
var inst_32151 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
var statearr_32282_32348 = state_32222__$1;
(statearr_32282_32348[(2)] = inst_32151);

(statearr_32282_32348[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (5))){
var inst_32101 = cljs.core.deref.call(null,cs);
var inst_32102 = cljs.core.seq.call(null,inst_32101);
var inst_32103 = inst_32102;
var inst_32104 = null;
var inst_32105 = (0);
var inst_32106 = (0);
var state_32222__$1 = (function (){var statearr_32283 = state_32222;
(statearr_32283[(14)] = inst_32105);

(statearr_32283[(15)] = inst_32104);

(statearr_32283[(16)] = inst_32106);

(statearr_32283[(17)] = inst_32103);

return statearr_32283;
})();
var statearr_32284_32349 = state_32222__$1;
(statearr_32284_32349[(2)] = null);

(statearr_32284_32349[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (14))){
var state_32222__$1 = state_32222;
var statearr_32285_32350 = state_32222__$1;
(statearr_32285_32350[(2)] = null);

(statearr_32285_32350[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (45))){
var inst_32212 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
var statearr_32286_32351 = state_32222__$1;
(statearr_32286_32351[(2)] = inst_32212);

(statearr_32286_32351[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (26))){
var inst_32154 = (state_32222[(29)]);
var inst_32208 = (state_32222[(2)]);
var inst_32209 = cljs.core.seq.call(null,inst_32154);
var state_32222__$1 = (function (){var statearr_32287 = state_32222;
(statearr_32287[(31)] = inst_32208);

return statearr_32287;
})();
if(inst_32209){
var statearr_32288_32352 = state_32222__$1;
(statearr_32288_32352[(1)] = (42));

} else {
var statearr_32289_32353 = state_32222__$1;
(statearr_32289_32353[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (16))){
var inst_32123 = (state_32222[(7)]);
var inst_32125 = cljs.core.chunked_seq_QMARK_.call(null,inst_32123);
var state_32222__$1 = state_32222;
if(inst_32125){
var statearr_32290_32354 = state_32222__$1;
(statearr_32290_32354[(1)] = (19));

} else {
var statearr_32291_32355 = state_32222__$1;
(statearr_32291_32355[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (38))){
var inst_32201 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
var statearr_32292_32356 = state_32222__$1;
(statearr_32292_32356[(2)] = inst_32201);

(statearr_32292_32356[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (30))){
var state_32222__$1 = state_32222;
var statearr_32293_32357 = state_32222__$1;
(statearr_32293_32357[(2)] = null);

(statearr_32293_32357[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (10))){
var inst_32104 = (state_32222[(15)]);
var inst_32106 = (state_32222[(16)]);
var inst_32112 = cljs.core._nth.call(null,inst_32104,inst_32106);
var inst_32113 = cljs.core.nth.call(null,inst_32112,(0),null);
var inst_32114 = cljs.core.nth.call(null,inst_32112,(1),null);
var state_32222__$1 = (function (){var statearr_32294 = state_32222;
(statearr_32294[(26)] = inst_32113);

return statearr_32294;
})();
if(cljs.core.truth_(inst_32114)){
var statearr_32295_32358 = state_32222__$1;
(statearr_32295_32358[(1)] = (13));

} else {
var statearr_32296_32359 = state_32222__$1;
(statearr_32296_32359[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (18))){
var inst_32147 = (state_32222[(2)]);
var state_32222__$1 = state_32222;
var statearr_32297_32360 = state_32222__$1;
(statearr_32297_32360[(2)] = inst_32147);

(statearr_32297_32360[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (42))){
var state_32222__$1 = state_32222;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32222__$1,(45),dchan);
} else {
if((state_val_32223 === (37))){
var inst_32181 = (state_32222[(25)]);
var inst_32094 = (state_32222[(9)]);
var inst_32190 = (state_32222[(23)]);
var inst_32190__$1 = cljs.core.first.call(null,inst_32181);
var inst_32191 = cljs.core.async.put_BANG_.call(null,inst_32190__$1,inst_32094,done);
var state_32222__$1 = (function (){var statearr_32298 = state_32222;
(statearr_32298[(23)] = inst_32190__$1);

return statearr_32298;
})();
if(cljs.core.truth_(inst_32191)){
var statearr_32299_32361 = state_32222__$1;
(statearr_32299_32361[(1)] = (39));

} else {
var statearr_32300_32362 = state_32222__$1;
(statearr_32300_32362[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32223 === (8))){
var inst_32105 = (state_32222[(14)]);
var inst_32106 = (state_32222[(16)]);
var inst_32108 = (inst_32106 < inst_32105);
var inst_32109 = inst_32108;
var state_32222__$1 = state_32222;
if(cljs.core.truth_(inst_32109)){
var statearr_32301_32363 = state_32222__$1;
(statearr_32301_32363[(1)] = (10));

} else {
var statearr_32302_32364 = state_32222__$1;
(statearr_32302_32364[(1)] = (11));

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
});})(c__20323__auto___32310,cs,m,dchan,dctr,done))
;
return ((function (switch__20302__auto__,c__20323__auto___32310,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__20303__auto__ = null;
var cljs$core$async$mult_$_state_machine__20303__auto____0 = (function (){
var statearr_32306 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_32306[(0)] = cljs$core$async$mult_$_state_machine__20303__auto__);

(statearr_32306[(1)] = (1));

return statearr_32306;
});
var cljs$core$async$mult_$_state_machine__20303__auto____1 = (function (state_32222){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_32222);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e32307){if((e32307 instanceof Object)){
var ex__20306__auto__ = e32307;
var statearr_32308_32365 = state_32222;
(statearr_32308_32365[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32222);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e32307;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__32366 = state_32222;
state_32222 = G__32366;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__20303__auto__ = function(state_32222){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__20303__auto____1.call(this,state_32222);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__20303__auto____0;
cljs$core$async$mult_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__20303__auto____1;
return cljs$core$async$mult_$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___32310,cs,m,dchan,dctr,done))
})();
var state__20325__auto__ = (function (){var statearr_32309 = f__20324__auto__.call(null);
(statearr_32309[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___32310);

return statearr_32309;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___32310,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args32367 = [];
var len__19356__auto___32370 = arguments.length;
var i__19357__auto___32371 = (0);
while(true){
if((i__19357__auto___32371 < len__19356__auto___32370)){
args32367.push((arguments[i__19357__auto___32371]));

var G__32372 = (i__19357__auto___32371 + (1));
i__19357__auto___32371 = G__32372;
continue;
} else {
}
break;
}

var G__32369 = args32367.length;
switch (G__32369) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args32367.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__18953__auto__ = (((m == null))?null:m);
var m__18954__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,m,ch);
} else {
var m__18954__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__18953__auto__ = (((m == null))?null:m);
var m__18954__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,m,ch);
} else {
var m__18954__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__18953__auto__ = (((m == null))?null:m);
var m__18954__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,m);
} else {
var m__18954__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__18953__auto__ = (((m == null))?null:m);
var m__18954__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,m,state_map);
} else {
var m__18954__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__18953__auto__ = (((m == null))?null:m);
var m__18954__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,m,mode);
} else {
var m__18954__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__19363__auto__ = [];
var len__19356__auto___32384 = arguments.length;
var i__19357__auto___32385 = (0);
while(true){
if((i__19357__auto___32385 < len__19356__auto___32384)){
args__19363__auto__.push((arguments[i__19357__auto___32385]));

var G__32386 = (i__19357__auto___32385 + (1));
i__19357__auto___32385 = G__32386;
continue;
} else {
}
break;
}

var argseq__19364__auto__ = ((((3) < args__19363__auto__.length))?(new cljs.core.IndexedSeq(args__19363__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__19364__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__32378){
var map__32379 = p__32378;
var map__32379__$1 = ((((!((map__32379 == null)))?((((map__32379.cljs$lang$protocol_mask$partition0$ & (64))) || (map__32379.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32379):map__32379);
var opts = map__32379__$1;
var statearr_32381_32387 = state;
(statearr_32381_32387[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts.call(null,((function (map__32379,map__32379__$1,opts){
return (function (val){
var statearr_32382_32388 = state;
(statearr_32382_32388[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__32379,map__32379__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_32383_32389 = state;
(statearr_32383_32389[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq32374){
var G__32375 = cljs.core.first.call(null,seq32374);
var seq32374__$1 = cljs.core.next.call(null,seq32374);
var G__32376 = cljs.core.first.call(null,seq32374__$1);
var seq32374__$2 = cljs.core.next.call(null,seq32374__$1);
var G__32377 = cljs.core.first.call(null,seq32374__$2);
var seq32374__$3 = cljs.core.next.call(null,seq32374__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__32375,G__32376,G__32377,seq32374__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async32553 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async32553 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta32554){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta32554 = meta32554;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_32555,meta32554__$1){
var self__ = this;
var _32555__$1 = this;
return (new cljs.core.async.t_cljs$core$async32553(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta32554__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_32555){
var self__ = this;
var _32555__$1 = this;
return self__.meta32554;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async32553.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null))))].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async32553.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta32554","meta32554",1807359183,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async32553.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async32553.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async32553";

cljs.core.async.t_cljs$core$async32553.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async32553");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async32553 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async32553(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta32554){
return (new cljs.core.async.t_cljs$core$async32553(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta32554));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async32553(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__20323__auto___32716 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___32716,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___32716,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_32653){
var state_val_32654 = (state_32653[(1)]);
if((state_val_32654 === (7))){
var inst_32571 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
var statearr_32655_32717 = state_32653__$1;
(statearr_32655_32717[(2)] = inst_32571);

(statearr_32655_32717[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (20))){
var inst_32583 = (state_32653[(7)]);
var state_32653__$1 = state_32653;
var statearr_32656_32718 = state_32653__$1;
(statearr_32656_32718[(2)] = inst_32583);

(statearr_32656_32718[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (27))){
var state_32653__$1 = state_32653;
var statearr_32657_32719 = state_32653__$1;
(statearr_32657_32719[(2)] = null);

(statearr_32657_32719[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (1))){
var inst_32559 = (state_32653[(8)]);
var inst_32559__$1 = calc_state.call(null);
var inst_32561 = (inst_32559__$1 == null);
var inst_32562 = cljs.core.not.call(null,inst_32561);
var state_32653__$1 = (function (){var statearr_32658 = state_32653;
(statearr_32658[(8)] = inst_32559__$1);

return statearr_32658;
})();
if(inst_32562){
var statearr_32659_32720 = state_32653__$1;
(statearr_32659_32720[(1)] = (2));

} else {
var statearr_32660_32721 = state_32653__$1;
(statearr_32660_32721[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (24))){
var inst_32613 = (state_32653[(9)]);
var inst_32627 = (state_32653[(10)]);
var inst_32606 = (state_32653[(11)]);
var inst_32627__$1 = inst_32606.call(null,inst_32613);
var state_32653__$1 = (function (){var statearr_32661 = state_32653;
(statearr_32661[(10)] = inst_32627__$1);

return statearr_32661;
})();
if(cljs.core.truth_(inst_32627__$1)){
var statearr_32662_32722 = state_32653__$1;
(statearr_32662_32722[(1)] = (29));

} else {
var statearr_32663_32723 = state_32653__$1;
(statearr_32663_32723[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (4))){
var inst_32574 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
if(cljs.core.truth_(inst_32574)){
var statearr_32664_32724 = state_32653__$1;
(statearr_32664_32724[(1)] = (8));

} else {
var statearr_32665_32725 = state_32653__$1;
(statearr_32665_32725[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (15))){
var inst_32600 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
if(cljs.core.truth_(inst_32600)){
var statearr_32666_32726 = state_32653__$1;
(statearr_32666_32726[(1)] = (19));

} else {
var statearr_32667_32727 = state_32653__$1;
(statearr_32667_32727[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (21))){
var inst_32605 = (state_32653[(12)]);
var inst_32605__$1 = (state_32653[(2)]);
var inst_32606 = cljs.core.get.call(null,inst_32605__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_32607 = cljs.core.get.call(null,inst_32605__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_32608 = cljs.core.get.call(null,inst_32605__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_32653__$1 = (function (){var statearr_32668 = state_32653;
(statearr_32668[(12)] = inst_32605__$1);

(statearr_32668[(13)] = inst_32607);

(statearr_32668[(11)] = inst_32606);

return statearr_32668;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_32653__$1,(22),inst_32608);
} else {
if((state_val_32654 === (31))){
var inst_32635 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
if(cljs.core.truth_(inst_32635)){
var statearr_32669_32728 = state_32653__$1;
(statearr_32669_32728[(1)] = (32));

} else {
var statearr_32670_32729 = state_32653__$1;
(statearr_32670_32729[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (32))){
var inst_32612 = (state_32653[(14)]);
var state_32653__$1 = state_32653;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_32653__$1,(35),out,inst_32612);
} else {
if((state_val_32654 === (33))){
var inst_32605 = (state_32653[(12)]);
var inst_32583 = inst_32605;
var state_32653__$1 = (function (){var statearr_32671 = state_32653;
(statearr_32671[(7)] = inst_32583);

return statearr_32671;
})();
var statearr_32672_32730 = state_32653__$1;
(statearr_32672_32730[(2)] = null);

(statearr_32672_32730[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (13))){
var inst_32583 = (state_32653[(7)]);
var inst_32590 = inst_32583.cljs$lang$protocol_mask$partition0$;
var inst_32591 = (inst_32590 & (64));
var inst_32592 = inst_32583.cljs$core$ISeq$;
var inst_32593 = (inst_32591) || (inst_32592);
var state_32653__$1 = state_32653;
if(cljs.core.truth_(inst_32593)){
var statearr_32673_32731 = state_32653__$1;
(statearr_32673_32731[(1)] = (16));

} else {
var statearr_32674_32732 = state_32653__$1;
(statearr_32674_32732[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (22))){
var inst_32613 = (state_32653[(9)]);
var inst_32612 = (state_32653[(14)]);
var inst_32611 = (state_32653[(2)]);
var inst_32612__$1 = cljs.core.nth.call(null,inst_32611,(0),null);
var inst_32613__$1 = cljs.core.nth.call(null,inst_32611,(1),null);
var inst_32614 = (inst_32612__$1 == null);
var inst_32615 = cljs.core._EQ_.call(null,inst_32613__$1,change);
var inst_32616 = (inst_32614) || (inst_32615);
var state_32653__$1 = (function (){var statearr_32675 = state_32653;
(statearr_32675[(9)] = inst_32613__$1);

(statearr_32675[(14)] = inst_32612__$1);

return statearr_32675;
})();
if(cljs.core.truth_(inst_32616)){
var statearr_32676_32733 = state_32653__$1;
(statearr_32676_32733[(1)] = (23));

} else {
var statearr_32677_32734 = state_32653__$1;
(statearr_32677_32734[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (36))){
var inst_32605 = (state_32653[(12)]);
var inst_32583 = inst_32605;
var state_32653__$1 = (function (){var statearr_32678 = state_32653;
(statearr_32678[(7)] = inst_32583);

return statearr_32678;
})();
var statearr_32679_32735 = state_32653__$1;
(statearr_32679_32735[(2)] = null);

(statearr_32679_32735[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (29))){
var inst_32627 = (state_32653[(10)]);
var state_32653__$1 = state_32653;
var statearr_32680_32736 = state_32653__$1;
(statearr_32680_32736[(2)] = inst_32627);

(statearr_32680_32736[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (6))){
var state_32653__$1 = state_32653;
var statearr_32681_32737 = state_32653__$1;
(statearr_32681_32737[(2)] = false);

(statearr_32681_32737[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (28))){
var inst_32623 = (state_32653[(2)]);
var inst_32624 = calc_state.call(null);
var inst_32583 = inst_32624;
var state_32653__$1 = (function (){var statearr_32682 = state_32653;
(statearr_32682[(7)] = inst_32583);

(statearr_32682[(15)] = inst_32623);

return statearr_32682;
})();
var statearr_32683_32738 = state_32653__$1;
(statearr_32683_32738[(2)] = null);

(statearr_32683_32738[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (25))){
var inst_32649 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
var statearr_32684_32739 = state_32653__$1;
(statearr_32684_32739[(2)] = inst_32649);

(statearr_32684_32739[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (34))){
var inst_32647 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
var statearr_32685_32740 = state_32653__$1;
(statearr_32685_32740[(2)] = inst_32647);

(statearr_32685_32740[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (17))){
var state_32653__$1 = state_32653;
var statearr_32686_32741 = state_32653__$1;
(statearr_32686_32741[(2)] = false);

(statearr_32686_32741[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (3))){
var state_32653__$1 = state_32653;
var statearr_32687_32742 = state_32653__$1;
(statearr_32687_32742[(2)] = false);

(statearr_32687_32742[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (12))){
var inst_32651 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_32653__$1,inst_32651);
} else {
if((state_val_32654 === (2))){
var inst_32559 = (state_32653[(8)]);
var inst_32564 = inst_32559.cljs$lang$protocol_mask$partition0$;
var inst_32565 = (inst_32564 & (64));
var inst_32566 = inst_32559.cljs$core$ISeq$;
var inst_32567 = (inst_32565) || (inst_32566);
var state_32653__$1 = state_32653;
if(cljs.core.truth_(inst_32567)){
var statearr_32688_32743 = state_32653__$1;
(statearr_32688_32743[(1)] = (5));

} else {
var statearr_32689_32744 = state_32653__$1;
(statearr_32689_32744[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (23))){
var inst_32612 = (state_32653[(14)]);
var inst_32618 = (inst_32612 == null);
var state_32653__$1 = state_32653;
if(cljs.core.truth_(inst_32618)){
var statearr_32690_32745 = state_32653__$1;
(statearr_32690_32745[(1)] = (26));

} else {
var statearr_32691_32746 = state_32653__$1;
(statearr_32691_32746[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (35))){
var inst_32638 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
if(cljs.core.truth_(inst_32638)){
var statearr_32692_32747 = state_32653__$1;
(statearr_32692_32747[(1)] = (36));

} else {
var statearr_32693_32748 = state_32653__$1;
(statearr_32693_32748[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (19))){
var inst_32583 = (state_32653[(7)]);
var inst_32602 = cljs.core.apply.call(null,cljs.core.hash_map,inst_32583);
var state_32653__$1 = state_32653;
var statearr_32694_32749 = state_32653__$1;
(statearr_32694_32749[(2)] = inst_32602);

(statearr_32694_32749[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (11))){
var inst_32583 = (state_32653[(7)]);
var inst_32587 = (inst_32583 == null);
var inst_32588 = cljs.core.not.call(null,inst_32587);
var state_32653__$1 = state_32653;
if(inst_32588){
var statearr_32695_32750 = state_32653__$1;
(statearr_32695_32750[(1)] = (13));

} else {
var statearr_32696_32751 = state_32653__$1;
(statearr_32696_32751[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (9))){
var inst_32559 = (state_32653[(8)]);
var state_32653__$1 = state_32653;
var statearr_32697_32752 = state_32653__$1;
(statearr_32697_32752[(2)] = inst_32559);

(statearr_32697_32752[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (5))){
var state_32653__$1 = state_32653;
var statearr_32698_32753 = state_32653__$1;
(statearr_32698_32753[(2)] = true);

(statearr_32698_32753[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (14))){
var state_32653__$1 = state_32653;
var statearr_32699_32754 = state_32653__$1;
(statearr_32699_32754[(2)] = false);

(statearr_32699_32754[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (26))){
var inst_32613 = (state_32653[(9)]);
var inst_32620 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_32613);
var state_32653__$1 = state_32653;
var statearr_32700_32755 = state_32653__$1;
(statearr_32700_32755[(2)] = inst_32620);

(statearr_32700_32755[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (16))){
var state_32653__$1 = state_32653;
var statearr_32701_32756 = state_32653__$1;
(statearr_32701_32756[(2)] = true);

(statearr_32701_32756[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (38))){
var inst_32643 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
var statearr_32702_32757 = state_32653__$1;
(statearr_32702_32757[(2)] = inst_32643);

(statearr_32702_32757[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (30))){
var inst_32613 = (state_32653[(9)]);
var inst_32607 = (state_32653[(13)]);
var inst_32606 = (state_32653[(11)]);
var inst_32630 = cljs.core.empty_QMARK_.call(null,inst_32606);
var inst_32631 = inst_32607.call(null,inst_32613);
var inst_32632 = cljs.core.not.call(null,inst_32631);
var inst_32633 = (inst_32630) && (inst_32632);
var state_32653__$1 = state_32653;
var statearr_32703_32758 = state_32653__$1;
(statearr_32703_32758[(2)] = inst_32633);

(statearr_32703_32758[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (10))){
var inst_32559 = (state_32653[(8)]);
var inst_32579 = (state_32653[(2)]);
var inst_32580 = cljs.core.get.call(null,inst_32579,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_32581 = cljs.core.get.call(null,inst_32579,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_32582 = cljs.core.get.call(null,inst_32579,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_32583 = inst_32559;
var state_32653__$1 = (function (){var statearr_32704 = state_32653;
(statearr_32704[(7)] = inst_32583);

(statearr_32704[(16)] = inst_32581);

(statearr_32704[(17)] = inst_32580);

(statearr_32704[(18)] = inst_32582);

return statearr_32704;
})();
var statearr_32705_32759 = state_32653__$1;
(statearr_32705_32759[(2)] = null);

(statearr_32705_32759[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (18))){
var inst_32597 = (state_32653[(2)]);
var state_32653__$1 = state_32653;
var statearr_32706_32760 = state_32653__$1;
(statearr_32706_32760[(2)] = inst_32597);

(statearr_32706_32760[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (37))){
var state_32653__$1 = state_32653;
var statearr_32707_32761 = state_32653__$1;
(statearr_32707_32761[(2)] = null);

(statearr_32707_32761[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32654 === (8))){
var inst_32559 = (state_32653[(8)]);
var inst_32576 = cljs.core.apply.call(null,cljs.core.hash_map,inst_32559);
var state_32653__$1 = state_32653;
var statearr_32708_32762 = state_32653__$1;
(statearr_32708_32762[(2)] = inst_32576);

(statearr_32708_32762[(1)] = (10));


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
});})(c__20323__auto___32716,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__20302__auto__,c__20323__auto___32716,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__20303__auto__ = null;
var cljs$core$async$mix_$_state_machine__20303__auto____0 = (function (){
var statearr_32712 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_32712[(0)] = cljs$core$async$mix_$_state_machine__20303__auto__);

(statearr_32712[(1)] = (1));

return statearr_32712;
});
var cljs$core$async$mix_$_state_machine__20303__auto____1 = (function (state_32653){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_32653);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e32713){if((e32713 instanceof Object)){
var ex__20306__auto__ = e32713;
var statearr_32714_32763 = state_32653;
(statearr_32714_32763[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32653);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e32713;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__32764 = state_32653;
state_32653 = G__32764;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__20303__auto__ = function(state_32653){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__20303__auto____1.call(this,state_32653);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__20303__auto____0;
cljs$core$async$mix_$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__20303__auto____1;
return cljs$core$async$mix_$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___32716,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__20325__auto__ = (function (){var statearr_32715 = f__20324__auto__.call(null);
(statearr_32715[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___32716);

return statearr_32715;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___32716,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__18953__auto__ = (((p == null))?null:p);
var m__18954__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__18954__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__18953__auto__ = (((p == null))?null:p);
var m__18954__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,p,v,ch);
} else {
var m__18954__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args32765 = [];
var len__19356__auto___32768 = arguments.length;
var i__19357__auto___32769 = (0);
while(true){
if((i__19357__auto___32769 < len__19356__auto___32768)){
args32765.push((arguments[i__19357__auto___32769]));

var G__32770 = (i__19357__auto___32769 + (1));
i__19357__auto___32769 = G__32770;
continue;
} else {
}
break;
}

var G__32767 = args32765.length;
switch (G__32767) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args32765.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__18953__auto__ = (((p == null))?null:p);
var m__18954__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,p);
} else {
var m__18954__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__18953__auto__ = (((p == null))?null:p);
var m__18954__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__18953__auto__)]);
if(!((m__18954__auto__ == null))){
return m__18954__auto__.call(null,p,v);
} else {
var m__18954__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__18954__auto____$1 == null))){
return m__18954__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args32773 = [];
var len__19356__auto___32898 = arguments.length;
var i__19357__auto___32899 = (0);
while(true){
if((i__19357__auto___32899 < len__19356__auto___32898)){
args32773.push((arguments[i__19357__auto___32899]));

var G__32900 = (i__19357__auto___32899 + (1));
i__19357__auto___32899 = G__32900;
continue;
} else {
}
break;
}

var G__32775 = args32773.length;
switch (G__32775) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args32773.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__18298__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__18298__auto__)){
return or__18298__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__18298__auto__,mults){
return (function (p1__32772_SHARP_){
if(cljs.core.truth_(p1__32772_SHARP_.call(null,topic))){
return p1__32772_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__32772_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__18298__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async32776 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async32776 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta32777){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta32777 = meta32777;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async32776.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_32778,meta32777__$1){
var self__ = this;
var _32778__$1 = this;
return (new cljs.core.async.t_cljs$core$async32776(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta32777__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async32776.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_32778){
var self__ = this;
var _32778__$1 = this;
return self__.meta32777;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async32776.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async32776.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async32776.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async32776.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async32776.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4425__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4425__auto__)){
var m = temp__4425__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async32776.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async32776.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async32776.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta32777","meta32777",-1018460784,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async32776.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async32776.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async32776";

cljs.core.async.t_cljs$core$async32776.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async32776");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async32776 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async32776(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta32777){
return (new cljs.core.async.t_cljs$core$async32776(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta32777));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async32776(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__20323__auto___32902 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___32902,mults,ensure_mult,p){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___32902,mults,ensure_mult,p){
return (function (state_32850){
var state_val_32851 = (state_32850[(1)]);
if((state_val_32851 === (7))){
var inst_32846 = (state_32850[(2)]);
var state_32850__$1 = state_32850;
var statearr_32852_32903 = state_32850__$1;
(statearr_32852_32903[(2)] = inst_32846);

(statearr_32852_32903[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (20))){
var state_32850__$1 = state_32850;
var statearr_32853_32904 = state_32850__$1;
(statearr_32853_32904[(2)] = null);

(statearr_32853_32904[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (1))){
var state_32850__$1 = state_32850;
var statearr_32854_32905 = state_32850__$1;
(statearr_32854_32905[(2)] = null);

(statearr_32854_32905[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (24))){
var inst_32829 = (state_32850[(7)]);
var inst_32838 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_32829);
var state_32850__$1 = state_32850;
var statearr_32855_32906 = state_32850__$1;
(statearr_32855_32906[(2)] = inst_32838);

(statearr_32855_32906[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (4))){
var inst_32781 = (state_32850[(8)]);
var inst_32781__$1 = (state_32850[(2)]);
var inst_32782 = (inst_32781__$1 == null);
var state_32850__$1 = (function (){var statearr_32856 = state_32850;
(statearr_32856[(8)] = inst_32781__$1);

return statearr_32856;
})();
if(cljs.core.truth_(inst_32782)){
var statearr_32857_32907 = state_32850__$1;
(statearr_32857_32907[(1)] = (5));

} else {
var statearr_32858_32908 = state_32850__$1;
(statearr_32858_32908[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (15))){
var inst_32823 = (state_32850[(2)]);
var state_32850__$1 = state_32850;
var statearr_32859_32909 = state_32850__$1;
(statearr_32859_32909[(2)] = inst_32823);

(statearr_32859_32909[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (21))){
var inst_32843 = (state_32850[(2)]);
var state_32850__$1 = (function (){var statearr_32860 = state_32850;
(statearr_32860[(9)] = inst_32843);

return statearr_32860;
})();
var statearr_32861_32910 = state_32850__$1;
(statearr_32861_32910[(2)] = null);

(statearr_32861_32910[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (13))){
var inst_32805 = (state_32850[(10)]);
var inst_32807 = cljs.core.chunked_seq_QMARK_.call(null,inst_32805);
var state_32850__$1 = state_32850;
if(inst_32807){
var statearr_32862_32911 = state_32850__$1;
(statearr_32862_32911[(1)] = (16));

} else {
var statearr_32863_32912 = state_32850__$1;
(statearr_32863_32912[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (22))){
var inst_32835 = (state_32850[(2)]);
var state_32850__$1 = state_32850;
if(cljs.core.truth_(inst_32835)){
var statearr_32864_32913 = state_32850__$1;
(statearr_32864_32913[(1)] = (23));

} else {
var statearr_32865_32914 = state_32850__$1;
(statearr_32865_32914[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (6))){
var inst_32831 = (state_32850[(11)]);
var inst_32781 = (state_32850[(8)]);
var inst_32829 = (state_32850[(7)]);
var inst_32829__$1 = topic_fn.call(null,inst_32781);
var inst_32830 = cljs.core.deref.call(null,mults);
var inst_32831__$1 = cljs.core.get.call(null,inst_32830,inst_32829__$1);
var state_32850__$1 = (function (){var statearr_32866 = state_32850;
(statearr_32866[(11)] = inst_32831__$1);

(statearr_32866[(7)] = inst_32829__$1);

return statearr_32866;
})();
if(cljs.core.truth_(inst_32831__$1)){
var statearr_32867_32915 = state_32850__$1;
(statearr_32867_32915[(1)] = (19));

} else {
var statearr_32868_32916 = state_32850__$1;
(statearr_32868_32916[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (25))){
var inst_32840 = (state_32850[(2)]);
var state_32850__$1 = state_32850;
var statearr_32869_32917 = state_32850__$1;
(statearr_32869_32917[(2)] = inst_32840);

(statearr_32869_32917[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (17))){
var inst_32805 = (state_32850[(10)]);
var inst_32814 = cljs.core.first.call(null,inst_32805);
var inst_32815 = cljs.core.async.muxch_STAR_.call(null,inst_32814);
var inst_32816 = cljs.core.async.close_BANG_.call(null,inst_32815);
var inst_32817 = cljs.core.next.call(null,inst_32805);
var inst_32791 = inst_32817;
var inst_32792 = null;
var inst_32793 = (0);
var inst_32794 = (0);
var state_32850__$1 = (function (){var statearr_32870 = state_32850;
(statearr_32870[(12)] = inst_32793);

(statearr_32870[(13)] = inst_32791);

(statearr_32870[(14)] = inst_32794);

(statearr_32870[(15)] = inst_32816);

(statearr_32870[(16)] = inst_32792);

return statearr_32870;
})();
var statearr_32871_32918 = state_32850__$1;
(statearr_32871_32918[(2)] = null);

(statearr_32871_32918[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (3))){
var inst_32848 = (state_32850[(2)]);
var state_32850__$1 = state_32850;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_32850__$1,inst_32848);
} else {
if((state_val_32851 === (12))){
var inst_32825 = (state_32850[(2)]);
var state_32850__$1 = state_32850;
var statearr_32872_32919 = state_32850__$1;
(statearr_32872_32919[(2)] = inst_32825);

(statearr_32872_32919[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (2))){
var state_32850__$1 = state_32850;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32850__$1,(4),ch);
} else {
if((state_val_32851 === (23))){
var state_32850__$1 = state_32850;
var statearr_32873_32920 = state_32850__$1;
(statearr_32873_32920[(2)] = null);

(statearr_32873_32920[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (19))){
var inst_32831 = (state_32850[(11)]);
var inst_32781 = (state_32850[(8)]);
var inst_32833 = cljs.core.async.muxch_STAR_.call(null,inst_32831);
var state_32850__$1 = state_32850;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_32850__$1,(22),inst_32833,inst_32781);
} else {
if((state_val_32851 === (11))){
var inst_32791 = (state_32850[(13)]);
var inst_32805 = (state_32850[(10)]);
var inst_32805__$1 = cljs.core.seq.call(null,inst_32791);
var state_32850__$1 = (function (){var statearr_32874 = state_32850;
(statearr_32874[(10)] = inst_32805__$1);

return statearr_32874;
})();
if(inst_32805__$1){
var statearr_32875_32921 = state_32850__$1;
(statearr_32875_32921[(1)] = (13));

} else {
var statearr_32876_32922 = state_32850__$1;
(statearr_32876_32922[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (9))){
var inst_32827 = (state_32850[(2)]);
var state_32850__$1 = state_32850;
var statearr_32877_32923 = state_32850__$1;
(statearr_32877_32923[(2)] = inst_32827);

(statearr_32877_32923[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (5))){
var inst_32788 = cljs.core.deref.call(null,mults);
var inst_32789 = cljs.core.vals.call(null,inst_32788);
var inst_32790 = cljs.core.seq.call(null,inst_32789);
var inst_32791 = inst_32790;
var inst_32792 = null;
var inst_32793 = (0);
var inst_32794 = (0);
var state_32850__$1 = (function (){var statearr_32878 = state_32850;
(statearr_32878[(12)] = inst_32793);

(statearr_32878[(13)] = inst_32791);

(statearr_32878[(14)] = inst_32794);

(statearr_32878[(16)] = inst_32792);

return statearr_32878;
})();
var statearr_32879_32924 = state_32850__$1;
(statearr_32879_32924[(2)] = null);

(statearr_32879_32924[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (14))){
var state_32850__$1 = state_32850;
var statearr_32883_32925 = state_32850__$1;
(statearr_32883_32925[(2)] = null);

(statearr_32883_32925[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (16))){
var inst_32805 = (state_32850[(10)]);
var inst_32809 = cljs.core.chunk_first.call(null,inst_32805);
var inst_32810 = cljs.core.chunk_rest.call(null,inst_32805);
var inst_32811 = cljs.core.count.call(null,inst_32809);
var inst_32791 = inst_32810;
var inst_32792 = inst_32809;
var inst_32793 = inst_32811;
var inst_32794 = (0);
var state_32850__$1 = (function (){var statearr_32884 = state_32850;
(statearr_32884[(12)] = inst_32793);

(statearr_32884[(13)] = inst_32791);

(statearr_32884[(14)] = inst_32794);

(statearr_32884[(16)] = inst_32792);

return statearr_32884;
})();
var statearr_32885_32926 = state_32850__$1;
(statearr_32885_32926[(2)] = null);

(statearr_32885_32926[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (10))){
var inst_32793 = (state_32850[(12)]);
var inst_32791 = (state_32850[(13)]);
var inst_32794 = (state_32850[(14)]);
var inst_32792 = (state_32850[(16)]);
var inst_32799 = cljs.core._nth.call(null,inst_32792,inst_32794);
var inst_32800 = cljs.core.async.muxch_STAR_.call(null,inst_32799);
var inst_32801 = cljs.core.async.close_BANG_.call(null,inst_32800);
var inst_32802 = (inst_32794 + (1));
var tmp32880 = inst_32793;
var tmp32881 = inst_32791;
var tmp32882 = inst_32792;
var inst_32791__$1 = tmp32881;
var inst_32792__$1 = tmp32882;
var inst_32793__$1 = tmp32880;
var inst_32794__$1 = inst_32802;
var state_32850__$1 = (function (){var statearr_32886 = state_32850;
(statearr_32886[(12)] = inst_32793__$1);

(statearr_32886[(13)] = inst_32791__$1);

(statearr_32886[(14)] = inst_32794__$1);

(statearr_32886[(17)] = inst_32801);

(statearr_32886[(16)] = inst_32792__$1);

return statearr_32886;
})();
var statearr_32887_32927 = state_32850__$1;
(statearr_32887_32927[(2)] = null);

(statearr_32887_32927[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (18))){
var inst_32820 = (state_32850[(2)]);
var state_32850__$1 = state_32850;
var statearr_32888_32928 = state_32850__$1;
(statearr_32888_32928[(2)] = inst_32820);

(statearr_32888_32928[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32851 === (8))){
var inst_32793 = (state_32850[(12)]);
var inst_32794 = (state_32850[(14)]);
var inst_32796 = (inst_32794 < inst_32793);
var inst_32797 = inst_32796;
var state_32850__$1 = state_32850;
if(cljs.core.truth_(inst_32797)){
var statearr_32889_32929 = state_32850__$1;
(statearr_32889_32929[(1)] = (10));

} else {
var statearr_32890_32930 = state_32850__$1;
(statearr_32890_32930[(1)] = (11));

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
});})(c__20323__auto___32902,mults,ensure_mult,p))
;
return ((function (switch__20302__auto__,c__20323__auto___32902,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_32894 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_32894[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_32894[(1)] = (1));

return statearr_32894;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_32850){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_32850);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e32895){if((e32895 instanceof Object)){
var ex__20306__auto__ = e32895;
var statearr_32896_32931 = state_32850;
(statearr_32896_32931[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32850);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e32895;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__32932 = state_32850;
state_32850 = G__32932;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_32850){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_32850);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___32902,mults,ensure_mult,p))
})();
var state__20325__auto__ = (function (){var statearr_32897 = f__20324__auto__.call(null);
(statearr_32897[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___32902);

return statearr_32897;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___32902,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args32933 = [];
var len__19356__auto___32936 = arguments.length;
var i__19357__auto___32937 = (0);
while(true){
if((i__19357__auto___32937 < len__19356__auto___32936)){
args32933.push((arguments[i__19357__auto___32937]));

var G__32938 = (i__19357__auto___32937 + (1));
i__19357__auto___32937 = G__32938;
continue;
} else {
}
break;
}

var G__32935 = args32933.length;
switch (G__32935) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args32933.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args32940 = [];
var len__19356__auto___32943 = arguments.length;
var i__19357__auto___32944 = (0);
while(true){
if((i__19357__auto___32944 < len__19356__auto___32943)){
args32940.push((arguments[i__19357__auto___32944]));

var G__32945 = (i__19357__auto___32944 + (1));
i__19357__auto___32944 = G__32945;
continue;
} else {
}
break;
}

var G__32942 = args32940.length;
switch (G__32942) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args32940.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;
/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args32947 = [];
var len__19356__auto___33018 = arguments.length;
var i__19357__auto___33019 = (0);
while(true){
if((i__19357__auto___33019 < len__19356__auto___33018)){
args32947.push((arguments[i__19357__auto___33019]));

var G__33020 = (i__19357__auto___33019 + (1));
i__19357__auto___33019 = G__33020;
continue;
} else {
}
break;
}

var G__32949 = args32947.length;
switch (G__32949) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args32947.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__20323__auto___33022 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___33022,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___33022,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_32988){
var state_val_32989 = (state_32988[(1)]);
if((state_val_32989 === (7))){
var state_32988__$1 = state_32988;
var statearr_32990_33023 = state_32988__$1;
(statearr_32990_33023[(2)] = null);

(statearr_32990_33023[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (1))){
var state_32988__$1 = state_32988;
var statearr_32991_33024 = state_32988__$1;
(statearr_32991_33024[(2)] = null);

(statearr_32991_33024[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (4))){
var inst_32952 = (state_32988[(7)]);
var inst_32954 = (inst_32952 < cnt);
var state_32988__$1 = state_32988;
if(cljs.core.truth_(inst_32954)){
var statearr_32992_33025 = state_32988__$1;
(statearr_32992_33025[(1)] = (6));

} else {
var statearr_32993_33026 = state_32988__$1;
(statearr_32993_33026[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (15))){
var inst_32984 = (state_32988[(2)]);
var state_32988__$1 = state_32988;
var statearr_32994_33027 = state_32988__$1;
(statearr_32994_33027[(2)] = inst_32984);

(statearr_32994_33027[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (13))){
var inst_32977 = cljs.core.async.close_BANG_.call(null,out);
var state_32988__$1 = state_32988;
var statearr_32995_33028 = state_32988__$1;
(statearr_32995_33028[(2)] = inst_32977);

(statearr_32995_33028[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (6))){
var state_32988__$1 = state_32988;
var statearr_32996_33029 = state_32988__$1;
(statearr_32996_33029[(2)] = null);

(statearr_32996_33029[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (3))){
var inst_32986 = (state_32988[(2)]);
var state_32988__$1 = state_32988;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_32988__$1,inst_32986);
} else {
if((state_val_32989 === (12))){
var inst_32974 = (state_32988[(8)]);
var inst_32974__$1 = (state_32988[(2)]);
var inst_32975 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_32974__$1);
var state_32988__$1 = (function (){var statearr_32997 = state_32988;
(statearr_32997[(8)] = inst_32974__$1);

return statearr_32997;
})();
if(cljs.core.truth_(inst_32975)){
var statearr_32998_33030 = state_32988__$1;
(statearr_32998_33030[(1)] = (13));

} else {
var statearr_32999_33031 = state_32988__$1;
(statearr_32999_33031[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (2))){
var inst_32951 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_32952 = (0);
var state_32988__$1 = (function (){var statearr_33000 = state_32988;
(statearr_33000[(9)] = inst_32951);

(statearr_33000[(7)] = inst_32952);

return statearr_33000;
})();
var statearr_33001_33032 = state_32988__$1;
(statearr_33001_33032[(2)] = null);

(statearr_33001_33032[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (11))){
var inst_32952 = (state_32988[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_32988,(10),Object,null,(9));
var inst_32961 = chs__$1.call(null,inst_32952);
var inst_32962 = done.call(null,inst_32952);
var inst_32963 = cljs.core.async.take_BANG_.call(null,inst_32961,inst_32962);
var state_32988__$1 = state_32988;
var statearr_33002_33033 = state_32988__$1;
(statearr_33002_33033[(2)] = inst_32963);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32988__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (9))){
var inst_32952 = (state_32988[(7)]);
var inst_32965 = (state_32988[(2)]);
var inst_32966 = (inst_32952 + (1));
var inst_32952__$1 = inst_32966;
var state_32988__$1 = (function (){var statearr_33003 = state_32988;
(statearr_33003[(10)] = inst_32965);

(statearr_33003[(7)] = inst_32952__$1);

return statearr_33003;
})();
var statearr_33004_33034 = state_32988__$1;
(statearr_33004_33034[(2)] = null);

(statearr_33004_33034[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (5))){
var inst_32972 = (state_32988[(2)]);
var state_32988__$1 = (function (){var statearr_33005 = state_32988;
(statearr_33005[(11)] = inst_32972);

return statearr_33005;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_32988__$1,(12),dchan);
} else {
if((state_val_32989 === (14))){
var inst_32974 = (state_32988[(8)]);
var inst_32979 = cljs.core.apply.call(null,f,inst_32974);
var state_32988__$1 = state_32988;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_32988__$1,(16),out,inst_32979);
} else {
if((state_val_32989 === (16))){
var inst_32981 = (state_32988[(2)]);
var state_32988__$1 = (function (){var statearr_33006 = state_32988;
(statearr_33006[(12)] = inst_32981);

return statearr_33006;
})();
var statearr_33007_33035 = state_32988__$1;
(statearr_33007_33035[(2)] = null);

(statearr_33007_33035[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (10))){
var inst_32956 = (state_32988[(2)]);
var inst_32957 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_32988__$1 = (function (){var statearr_33008 = state_32988;
(statearr_33008[(13)] = inst_32956);

return statearr_33008;
})();
var statearr_33009_33036 = state_32988__$1;
(statearr_33009_33036[(2)] = inst_32957);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32988__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32989 === (8))){
var inst_32970 = (state_32988[(2)]);
var state_32988__$1 = state_32988;
var statearr_33010_33037 = state_32988__$1;
(statearr_33010_33037[(2)] = inst_32970);

(statearr_33010_33037[(1)] = (5));


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
});})(c__20323__auto___33022,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__20302__auto__,c__20323__auto___33022,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_33014 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33014[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_33014[(1)] = (1));

return statearr_33014;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_32988){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_32988);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e33015){if((e33015 instanceof Object)){
var ex__20306__auto__ = e33015;
var statearr_33016_33038 = state_32988;
(statearr_33016_33038[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_32988);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33015;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33039 = state_32988;
state_32988 = G__33039;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_32988){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_32988);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___33022,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__20325__auto__ = (function (){var statearr_33017 = f__20324__auto__.call(null);
(statearr_33017[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___33022);

return statearr_33017;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___33022,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args33041 = [];
var len__19356__auto___33097 = arguments.length;
var i__19357__auto___33098 = (0);
while(true){
if((i__19357__auto___33098 < len__19356__auto___33097)){
args33041.push((arguments[i__19357__auto___33098]));

var G__33099 = (i__19357__auto___33098 + (1));
i__19357__auto___33098 = G__33099;
continue;
} else {
}
break;
}

var G__33043 = args33041.length;
switch (G__33043) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args33041.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20323__auto___33101 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___33101,out){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___33101,out){
return (function (state_33073){
var state_val_33074 = (state_33073[(1)]);
if((state_val_33074 === (7))){
var inst_33053 = (state_33073[(7)]);
var inst_33052 = (state_33073[(8)]);
var inst_33052__$1 = (state_33073[(2)]);
var inst_33053__$1 = cljs.core.nth.call(null,inst_33052__$1,(0),null);
var inst_33054 = cljs.core.nth.call(null,inst_33052__$1,(1),null);
var inst_33055 = (inst_33053__$1 == null);
var state_33073__$1 = (function (){var statearr_33075 = state_33073;
(statearr_33075[(9)] = inst_33054);

(statearr_33075[(7)] = inst_33053__$1);

(statearr_33075[(8)] = inst_33052__$1);

return statearr_33075;
})();
if(cljs.core.truth_(inst_33055)){
var statearr_33076_33102 = state_33073__$1;
(statearr_33076_33102[(1)] = (8));

} else {
var statearr_33077_33103 = state_33073__$1;
(statearr_33077_33103[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33074 === (1))){
var inst_33044 = cljs.core.vec.call(null,chs);
var inst_33045 = inst_33044;
var state_33073__$1 = (function (){var statearr_33078 = state_33073;
(statearr_33078[(10)] = inst_33045);

return statearr_33078;
})();
var statearr_33079_33104 = state_33073__$1;
(statearr_33079_33104[(2)] = null);

(statearr_33079_33104[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33074 === (4))){
var inst_33045 = (state_33073[(10)]);
var state_33073__$1 = state_33073;
return cljs.core.async.ioc_alts_BANG_.call(null,state_33073__$1,(7),inst_33045);
} else {
if((state_val_33074 === (6))){
var inst_33069 = (state_33073[(2)]);
var state_33073__$1 = state_33073;
var statearr_33080_33105 = state_33073__$1;
(statearr_33080_33105[(2)] = inst_33069);

(statearr_33080_33105[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33074 === (3))){
var inst_33071 = (state_33073[(2)]);
var state_33073__$1 = state_33073;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33073__$1,inst_33071);
} else {
if((state_val_33074 === (2))){
var inst_33045 = (state_33073[(10)]);
var inst_33047 = cljs.core.count.call(null,inst_33045);
var inst_33048 = (inst_33047 > (0));
var state_33073__$1 = state_33073;
if(cljs.core.truth_(inst_33048)){
var statearr_33082_33106 = state_33073__$1;
(statearr_33082_33106[(1)] = (4));

} else {
var statearr_33083_33107 = state_33073__$1;
(statearr_33083_33107[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33074 === (11))){
var inst_33045 = (state_33073[(10)]);
var inst_33062 = (state_33073[(2)]);
var tmp33081 = inst_33045;
var inst_33045__$1 = tmp33081;
var state_33073__$1 = (function (){var statearr_33084 = state_33073;
(statearr_33084[(10)] = inst_33045__$1);

(statearr_33084[(11)] = inst_33062);

return statearr_33084;
})();
var statearr_33085_33108 = state_33073__$1;
(statearr_33085_33108[(2)] = null);

(statearr_33085_33108[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33074 === (9))){
var inst_33053 = (state_33073[(7)]);
var state_33073__$1 = state_33073;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33073__$1,(11),out,inst_33053);
} else {
if((state_val_33074 === (5))){
var inst_33067 = cljs.core.async.close_BANG_.call(null,out);
var state_33073__$1 = state_33073;
var statearr_33086_33109 = state_33073__$1;
(statearr_33086_33109[(2)] = inst_33067);

(statearr_33086_33109[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33074 === (10))){
var inst_33065 = (state_33073[(2)]);
var state_33073__$1 = state_33073;
var statearr_33087_33110 = state_33073__$1;
(statearr_33087_33110[(2)] = inst_33065);

(statearr_33087_33110[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33074 === (8))){
var inst_33054 = (state_33073[(9)]);
var inst_33053 = (state_33073[(7)]);
var inst_33045 = (state_33073[(10)]);
var inst_33052 = (state_33073[(8)]);
var inst_33057 = (function (){var cs = inst_33045;
var vec__33050 = inst_33052;
var v = inst_33053;
var c = inst_33054;
return ((function (cs,vec__33050,v,c,inst_33054,inst_33053,inst_33045,inst_33052,state_val_33074,c__20323__auto___33101,out){
return (function (p1__33040_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__33040_SHARP_);
});
;})(cs,vec__33050,v,c,inst_33054,inst_33053,inst_33045,inst_33052,state_val_33074,c__20323__auto___33101,out))
})();
var inst_33058 = cljs.core.filterv.call(null,inst_33057,inst_33045);
var inst_33045__$1 = inst_33058;
var state_33073__$1 = (function (){var statearr_33088 = state_33073;
(statearr_33088[(10)] = inst_33045__$1);

return statearr_33088;
})();
var statearr_33089_33111 = state_33073__$1;
(statearr_33089_33111[(2)] = null);

(statearr_33089_33111[(1)] = (2));


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
});})(c__20323__auto___33101,out))
;
return ((function (switch__20302__auto__,c__20323__auto___33101,out){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_33093 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33093[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_33093[(1)] = (1));

return statearr_33093;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_33073){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_33073);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e33094){if((e33094 instanceof Object)){
var ex__20306__auto__ = e33094;
var statearr_33095_33112 = state_33073;
(statearr_33095_33112[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33073);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33094;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33113 = state_33073;
state_33073 = G__33113;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_33073){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_33073);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___33101,out))
})();
var state__20325__auto__ = (function (){var statearr_33096 = f__20324__auto__.call(null);
(statearr_33096[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___33101);

return statearr_33096;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___33101,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args33114 = [];
var len__19356__auto___33163 = arguments.length;
var i__19357__auto___33164 = (0);
while(true){
if((i__19357__auto___33164 < len__19356__auto___33163)){
args33114.push((arguments[i__19357__auto___33164]));

var G__33165 = (i__19357__auto___33164 + (1));
i__19357__auto___33164 = G__33165;
continue;
} else {
}
break;
}

var G__33116 = args33114.length;
switch (G__33116) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args33114.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20323__auto___33167 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___33167,out){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___33167,out){
return (function (state_33140){
var state_val_33141 = (state_33140[(1)]);
if((state_val_33141 === (7))){
var inst_33122 = (state_33140[(7)]);
var inst_33122__$1 = (state_33140[(2)]);
var inst_33123 = (inst_33122__$1 == null);
var inst_33124 = cljs.core.not.call(null,inst_33123);
var state_33140__$1 = (function (){var statearr_33142 = state_33140;
(statearr_33142[(7)] = inst_33122__$1);

return statearr_33142;
})();
if(inst_33124){
var statearr_33143_33168 = state_33140__$1;
(statearr_33143_33168[(1)] = (8));

} else {
var statearr_33144_33169 = state_33140__$1;
(statearr_33144_33169[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33141 === (1))){
var inst_33117 = (0);
var state_33140__$1 = (function (){var statearr_33145 = state_33140;
(statearr_33145[(8)] = inst_33117);

return statearr_33145;
})();
var statearr_33146_33170 = state_33140__$1;
(statearr_33146_33170[(2)] = null);

(statearr_33146_33170[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33141 === (4))){
var state_33140__$1 = state_33140;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33140__$1,(7),ch);
} else {
if((state_val_33141 === (6))){
var inst_33135 = (state_33140[(2)]);
var state_33140__$1 = state_33140;
var statearr_33147_33171 = state_33140__$1;
(statearr_33147_33171[(2)] = inst_33135);

(statearr_33147_33171[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33141 === (3))){
var inst_33137 = (state_33140[(2)]);
var inst_33138 = cljs.core.async.close_BANG_.call(null,out);
var state_33140__$1 = (function (){var statearr_33148 = state_33140;
(statearr_33148[(9)] = inst_33137);

return statearr_33148;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33140__$1,inst_33138);
} else {
if((state_val_33141 === (2))){
var inst_33117 = (state_33140[(8)]);
var inst_33119 = (inst_33117 < n);
var state_33140__$1 = state_33140;
if(cljs.core.truth_(inst_33119)){
var statearr_33149_33172 = state_33140__$1;
(statearr_33149_33172[(1)] = (4));

} else {
var statearr_33150_33173 = state_33140__$1;
(statearr_33150_33173[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33141 === (11))){
var inst_33117 = (state_33140[(8)]);
var inst_33127 = (state_33140[(2)]);
var inst_33128 = (inst_33117 + (1));
var inst_33117__$1 = inst_33128;
var state_33140__$1 = (function (){var statearr_33151 = state_33140;
(statearr_33151[(8)] = inst_33117__$1);

(statearr_33151[(10)] = inst_33127);

return statearr_33151;
})();
var statearr_33152_33174 = state_33140__$1;
(statearr_33152_33174[(2)] = null);

(statearr_33152_33174[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33141 === (9))){
var state_33140__$1 = state_33140;
var statearr_33153_33175 = state_33140__$1;
(statearr_33153_33175[(2)] = null);

(statearr_33153_33175[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33141 === (5))){
var state_33140__$1 = state_33140;
var statearr_33154_33176 = state_33140__$1;
(statearr_33154_33176[(2)] = null);

(statearr_33154_33176[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33141 === (10))){
var inst_33132 = (state_33140[(2)]);
var state_33140__$1 = state_33140;
var statearr_33155_33177 = state_33140__$1;
(statearr_33155_33177[(2)] = inst_33132);

(statearr_33155_33177[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33141 === (8))){
var inst_33122 = (state_33140[(7)]);
var state_33140__$1 = state_33140;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33140__$1,(11),out,inst_33122);
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
});})(c__20323__auto___33167,out))
;
return ((function (switch__20302__auto__,c__20323__auto___33167,out){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_33159 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_33159[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_33159[(1)] = (1));

return statearr_33159;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_33140){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_33140);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e33160){if((e33160 instanceof Object)){
var ex__20306__auto__ = e33160;
var statearr_33161_33178 = state_33140;
(statearr_33161_33178[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33140);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33160;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33179 = state_33140;
state_33140 = G__33179;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_33140){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_33140);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___33167,out))
})();
var state__20325__auto__ = (function (){var statearr_33162 = f__20324__auto__.call(null);
(statearr_33162[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___33167);

return statearr_33162;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___33167,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async33187 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33187 = (function (map_LT_,f,ch,meta33188){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta33188 = meta33188;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async33187.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33189,meta33188__$1){
var self__ = this;
var _33189__$1 = this;
return (new cljs.core.async.t_cljs$core$async33187(self__.map_LT_,self__.f,self__.ch,meta33188__$1));
});

cljs.core.async.t_cljs$core$async33187.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33189){
var self__ = this;
var _33189__$1 = this;
return self__.meta33188;
});

cljs.core.async.t_cljs$core$async33187.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async33187.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async33187.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async33187.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async33187.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async33190 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33190 = (function (map_LT_,f,ch,meta33188,_,fn1,meta33191){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta33188 = meta33188;
this._ = _;
this.fn1 = fn1;
this.meta33191 = meta33191;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async33190.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_33192,meta33191__$1){
var self__ = this;
var _33192__$1 = this;
return (new cljs.core.async.t_cljs$core$async33190(self__.map_LT_,self__.f,self__.ch,self__.meta33188,self__._,self__.fn1,meta33191__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async33190.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_33192){
var self__ = this;
var _33192__$1 = this;
return self__.meta33191;
});})(___$1))
;

cljs.core.async.t_cljs$core$async33190.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async33190.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async33190.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async33190.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__33180_SHARP_){
return f1.call(null,(((p1__33180_SHARP_ == null))?null:self__.f.call(null,p1__33180_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async33190.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta33188","meta33188",-906149714,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async33187","cljs.core.async/t_cljs$core$async33187",-1913227325,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta33191","meta33191",1997397260,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async33190.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async33190.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33190";

cljs.core.async.t_cljs$core$async33190.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async33190");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async33190 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async33190(map_LT___$1,f__$1,ch__$1,meta33188__$1,___$2,fn1__$1,meta33191){
return (new cljs.core.async.t_cljs$core$async33190(map_LT___$1,f__$1,ch__$1,meta33188__$1,___$2,fn1__$1,meta33191));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async33190(self__.map_LT_,self__.f,self__.ch,self__.meta33188,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__18286__auto__ = ret;
if(cljs.core.truth_(and__18286__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__18286__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async33187.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async33187.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async33187.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta33188","meta33188",-906149714,null)], null);
});

cljs.core.async.t_cljs$core$async33187.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async33187.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33187";

cljs.core.async.t_cljs$core$async33187.cljs$lang$ctorPrWriter = (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async33187");
});

cljs.core.async.__GT_t_cljs$core$async33187 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async33187(map_LT___$1,f__$1,ch__$1,meta33188){
return (new cljs.core.async.t_cljs$core$async33187(map_LT___$1,f__$1,ch__$1,meta33188));
});

}

return (new cljs.core.async.t_cljs$core$async33187(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async33196 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33196 = (function (map_GT_,f,ch,meta33197){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta33197 = meta33197;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async33196.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33198,meta33197__$1){
var self__ = this;
var _33198__$1 = this;
return (new cljs.core.async.t_cljs$core$async33196(self__.map_GT_,self__.f,self__.ch,meta33197__$1));
});

cljs.core.async.t_cljs$core$async33196.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33198){
var self__ = this;
var _33198__$1 = this;
return self__.meta33197;
});

cljs.core.async.t_cljs$core$async33196.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async33196.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async33196.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async33196.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async33196.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async33196.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async33196.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta33197","meta33197",-780914017,null)], null);
});

cljs.core.async.t_cljs$core$async33196.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async33196.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33196";

cljs.core.async.t_cljs$core$async33196.cljs$lang$ctorPrWriter = (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async33196");
});

cljs.core.async.__GT_t_cljs$core$async33196 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async33196(map_GT___$1,f__$1,ch__$1,meta33197){
return (new cljs.core.async.t_cljs$core$async33196(map_GT___$1,f__$1,ch__$1,meta33197));
});

}

return (new cljs.core.async.t_cljs$core$async33196(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async33202 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33202 = (function (filter_GT_,p,ch,meta33203){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta33203 = meta33203;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async33202.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33204,meta33203__$1){
var self__ = this;
var _33204__$1 = this;
return (new cljs.core.async.t_cljs$core$async33202(self__.filter_GT_,self__.p,self__.ch,meta33203__$1));
});

cljs.core.async.t_cljs$core$async33202.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33204){
var self__ = this;
var _33204__$1 = this;
return self__.meta33203;
});

cljs.core.async.t_cljs$core$async33202.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async33202.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async33202.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async33202.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async33202.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async33202.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async33202.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async33202.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta33203","meta33203",-1612390109,null)], null);
});

cljs.core.async.t_cljs$core$async33202.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async33202.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33202";

cljs.core.async.t_cljs$core$async33202.cljs$lang$ctorPrWriter = (function (this__18896__auto__,writer__18897__auto__,opt__18898__auto__){
return cljs.core._write.call(null,writer__18897__auto__,"cljs.core.async/t_cljs$core$async33202");
});

cljs.core.async.__GT_t_cljs$core$async33202 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async33202(filter_GT___$1,p__$1,ch__$1,meta33203){
return (new cljs.core.async.t_cljs$core$async33202(filter_GT___$1,p__$1,ch__$1,meta33203));
});

}

return (new cljs.core.async.t_cljs$core$async33202(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args33205 = [];
var len__19356__auto___33249 = arguments.length;
var i__19357__auto___33250 = (0);
while(true){
if((i__19357__auto___33250 < len__19356__auto___33249)){
args33205.push((arguments[i__19357__auto___33250]));

var G__33251 = (i__19357__auto___33250 + (1));
i__19357__auto___33250 = G__33251;
continue;
} else {
}
break;
}

var G__33207 = args33205.length;
switch (G__33207) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args33205.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20323__auto___33253 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___33253,out){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___33253,out){
return (function (state_33228){
var state_val_33229 = (state_33228[(1)]);
if((state_val_33229 === (7))){
var inst_33224 = (state_33228[(2)]);
var state_33228__$1 = state_33228;
var statearr_33230_33254 = state_33228__$1;
(statearr_33230_33254[(2)] = inst_33224);

(statearr_33230_33254[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33229 === (1))){
var state_33228__$1 = state_33228;
var statearr_33231_33255 = state_33228__$1;
(statearr_33231_33255[(2)] = null);

(statearr_33231_33255[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33229 === (4))){
var inst_33210 = (state_33228[(7)]);
var inst_33210__$1 = (state_33228[(2)]);
var inst_33211 = (inst_33210__$1 == null);
var state_33228__$1 = (function (){var statearr_33232 = state_33228;
(statearr_33232[(7)] = inst_33210__$1);

return statearr_33232;
})();
if(cljs.core.truth_(inst_33211)){
var statearr_33233_33256 = state_33228__$1;
(statearr_33233_33256[(1)] = (5));

} else {
var statearr_33234_33257 = state_33228__$1;
(statearr_33234_33257[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33229 === (6))){
var inst_33210 = (state_33228[(7)]);
var inst_33215 = p.call(null,inst_33210);
var state_33228__$1 = state_33228;
if(cljs.core.truth_(inst_33215)){
var statearr_33235_33258 = state_33228__$1;
(statearr_33235_33258[(1)] = (8));

} else {
var statearr_33236_33259 = state_33228__$1;
(statearr_33236_33259[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33229 === (3))){
var inst_33226 = (state_33228[(2)]);
var state_33228__$1 = state_33228;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33228__$1,inst_33226);
} else {
if((state_val_33229 === (2))){
var state_33228__$1 = state_33228;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33228__$1,(4),ch);
} else {
if((state_val_33229 === (11))){
var inst_33218 = (state_33228[(2)]);
var state_33228__$1 = state_33228;
var statearr_33237_33260 = state_33228__$1;
(statearr_33237_33260[(2)] = inst_33218);

(statearr_33237_33260[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33229 === (9))){
var state_33228__$1 = state_33228;
var statearr_33238_33261 = state_33228__$1;
(statearr_33238_33261[(2)] = null);

(statearr_33238_33261[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33229 === (5))){
var inst_33213 = cljs.core.async.close_BANG_.call(null,out);
var state_33228__$1 = state_33228;
var statearr_33239_33262 = state_33228__$1;
(statearr_33239_33262[(2)] = inst_33213);

(statearr_33239_33262[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33229 === (10))){
var inst_33221 = (state_33228[(2)]);
var state_33228__$1 = (function (){var statearr_33240 = state_33228;
(statearr_33240[(8)] = inst_33221);

return statearr_33240;
})();
var statearr_33241_33263 = state_33228__$1;
(statearr_33241_33263[(2)] = null);

(statearr_33241_33263[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33229 === (8))){
var inst_33210 = (state_33228[(7)]);
var state_33228__$1 = state_33228;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33228__$1,(11),out,inst_33210);
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
});})(c__20323__auto___33253,out))
;
return ((function (switch__20302__auto__,c__20323__auto___33253,out){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_33245 = [null,null,null,null,null,null,null,null,null];
(statearr_33245[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_33245[(1)] = (1));

return statearr_33245;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_33228){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_33228);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e33246){if((e33246 instanceof Object)){
var ex__20306__auto__ = e33246;
var statearr_33247_33264 = state_33228;
(statearr_33247_33264[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33228);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33246;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33265 = state_33228;
state_33228 = G__33265;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_33228){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_33228);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___33253,out))
})();
var state__20325__auto__ = (function (){var statearr_33248 = f__20324__auto__.call(null);
(statearr_33248[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___33253);

return statearr_33248;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___33253,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args33266 = [];
var len__19356__auto___33269 = arguments.length;
var i__19357__auto___33270 = (0);
while(true){
if((i__19357__auto___33270 < len__19356__auto___33269)){
args33266.push((arguments[i__19357__auto___33270]));

var G__33271 = (i__19357__auto___33270 + (1));
i__19357__auto___33270 = G__33271;
continue;
} else {
}
break;
}

var G__33268 = args33266.length;
switch (G__33268) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args33266.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__20323__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto__){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto__){
return (function (state_33438){
var state_val_33439 = (state_33438[(1)]);
if((state_val_33439 === (7))){
var inst_33434 = (state_33438[(2)]);
var state_33438__$1 = state_33438;
var statearr_33440_33481 = state_33438__$1;
(statearr_33440_33481[(2)] = inst_33434);

(statearr_33440_33481[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (20))){
var inst_33404 = (state_33438[(7)]);
var inst_33415 = (state_33438[(2)]);
var inst_33416 = cljs.core.next.call(null,inst_33404);
var inst_33390 = inst_33416;
var inst_33391 = null;
var inst_33392 = (0);
var inst_33393 = (0);
var state_33438__$1 = (function (){var statearr_33441 = state_33438;
(statearr_33441[(8)] = inst_33392);

(statearr_33441[(9)] = inst_33391);

(statearr_33441[(10)] = inst_33390);

(statearr_33441[(11)] = inst_33415);

(statearr_33441[(12)] = inst_33393);

return statearr_33441;
})();
var statearr_33442_33482 = state_33438__$1;
(statearr_33442_33482[(2)] = null);

(statearr_33442_33482[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (1))){
var state_33438__$1 = state_33438;
var statearr_33443_33483 = state_33438__$1;
(statearr_33443_33483[(2)] = null);

(statearr_33443_33483[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (4))){
var inst_33379 = (state_33438[(13)]);
var inst_33379__$1 = (state_33438[(2)]);
var inst_33380 = (inst_33379__$1 == null);
var state_33438__$1 = (function (){var statearr_33444 = state_33438;
(statearr_33444[(13)] = inst_33379__$1);

return statearr_33444;
})();
if(cljs.core.truth_(inst_33380)){
var statearr_33445_33484 = state_33438__$1;
(statearr_33445_33484[(1)] = (5));

} else {
var statearr_33446_33485 = state_33438__$1;
(statearr_33446_33485[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (15))){
var state_33438__$1 = state_33438;
var statearr_33450_33486 = state_33438__$1;
(statearr_33450_33486[(2)] = null);

(statearr_33450_33486[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (21))){
var state_33438__$1 = state_33438;
var statearr_33451_33487 = state_33438__$1;
(statearr_33451_33487[(2)] = null);

(statearr_33451_33487[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (13))){
var inst_33392 = (state_33438[(8)]);
var inst_33391 = (state_33438[(9)]);
var inst_33390 = (state_33438[(10)]);
var inst_33393 = (state_33438[(12)]);
var inst_33400 = (state_33438[(2)]);
var inst_33401 = (inst_33393 + (1));
var tmp33447 = inst_33392;
var tmp33448 = inst_33391;
var tmp33449 = inst_33390;
var inst_33390__$1 = tmp33449;
var inst_33391__$1 = tmp33448;
var inst_33392__$1 = tmp33447;
var inst_33393__$1 = inst_33401;
var state_33438__$1 = (function (){var statearr_33452 = state_33438;
(statearr_33452[(8)] = inst_33392__$1);

(statearr_33452[(9)] = inst_33391__$1);

(statearr_33452[(14)] = inst_33400);

(statearr_33452[(10)] = inst_33390__$1);

(statearr_33452[(12)] = inst_33393__$1);

return statearr_33452;
})();
var statearr_33453_33488 = state_33438__$1;
(statearr_33453_33488[(2)] = null);

(statearr_33453_33488[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (22))){
var state_33438__$1 = state_33438;
var statearr_33454_33489 = state_33438__$1;
(statearr_33454_33489[(2)] = null);

(statearr_33454_33489[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (6))){
var inst_33379 = (state_33438[(13)]);
var inst_33388 = f.call(null,inst_33379);
var inst_33389 = cljs.core.seq.call(null,inst_33388);
var inst_33390 = inst_33389;
var inst_33391 = null;
var inst_33392 = (0);
var inst_33393 = (0);
var state_33438__$1 = (function (){var statearr_33455 = state_33438;
(statearr_33455[(8)] = inst_33392);

(statearr_33455[(9)] = inst_33391);

(statearr_33455[(10)] = inst_33390);

(statearr_33455[(12)] = inst_33393);

return statearr_33455;
})();
var statearr_33456_33490 = state_33438__$1;
(statearr_33456_33490[(2)] = null);

(statearr_33456_33490[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (17))){
var inst_33404 = (state_33438[(7)]);
var inst_33408 = cljs.core.chunk_first.call(null,inst_33404);
var inst_33409 = cljs.core.chunk_rest.call(null,inst_33404);
var inst_33410 = cljs.core.count.call(null,inst_33408);
var inst_33390 = inst_33409;
var inst_33391 = inst_33408;
var inst_33392 = inst_33410;
var inst_33393 = (0);
var state_33438__$1 = (function (){var statearr_33457 = state_33438;
(statearr_33457[(8)] = inst_33392);

(statearr_33457[(9)] = inst_33391);

(statearr_33457[(10)] = inst_33390);

(statearr_33457[(12)] = inst_33393);

return statearr_33457;
})();
var statearr_33458_33491 = state_33438__$1;
(statearr_33458_33491[(2)] = null);

(statearr_33458_33491[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (3))){
var inst_33436 = (state_33438[(2)]);
var state_33438__$1 = state_33438;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33438__$1,inst_33436);
} else {
if((state_val_33439 === (12))){
var inst_33424 = (state_33438[(2)]);
var state_33438__$1 = state_33438;
var statearr_33459_33492 = state_33438__$1;
(statearr_33459_33492[(2)] = inst_33424);

(statearr_33459_33492[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (2))){
var state_33438__$1 = state_33438;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33438__$1,(4),in$);
} else {
if((state_val_33439 === (23))){
var inst_33432 = (state_33438[(2)]);
var state_33438__$1 = state_33438;
var statearr_33460_33493 = state_33438__$1;
(statearr_33460_33493[(2)] = inst_33432);

(statearr_33460_33493[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (19))){
var inst_33419 = (state_33438[(2)]);
var state_33438__$1 = state_33438;
var statearr_33461_33494 = state_33438__$1;
(statearr_33461_33494[(2)] = inst_33419);

(statearr_33461_33494[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (11))){
var inst_33404 = (state_33438[(7)]);
var inst_33390 = (state_33438[(10)]);
var inst_33404__$1 = cljs.core.seq.call(null,inst_33390);
var state_33438__$1 = (function (){var statearr_33462 = state_33438;
(statearr_33462[(7)] = inst_33404__$1);

return statearr_33462;
})();
if(inst_33404__$1){
var statearr_33463_33495 = state_33438__$1;
(statearr_33463_33495[(1)] = (14));

} else {
var statearr_33464_33496 = state_33438__$1;
(statearr_33464_33496[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (9))){
var inst_33426 = (state_33438[(2)]);
var inst_33427 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_33438__$1 = (function (){var statearr_33465 = state_33438;
(statearr_33465[(15)] = inst_33426);

return statearr_33465;
})();
if(cljs.core.truth_(inst_33427)){
var statearr_33466_33497 = state_33438__$1;
(statearr_33466_33497[(1)] = (21));

} else {
var statearr_33467_33498 = state_33438__$1;
(statearr_33467_33498[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (5))){
var inst_33382 = cljs.core.async.close_BANG_.call(null,out);
var state_33438__$1 = state_33438;
var statearr_33468_33499 = state_33438__$1;
(statearr_33468_33499[(2)] = inst_33382);

(statearr_33468_33499[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (14))){
var inst_33404 = (state_33438[(7)]);
var inst_33406 = cljs.core.chunked_seq_QMARK_.call(null,inst_33404);
var state_33438__$1 = state_33438;
if(inst_33406){
var statearr_33469_33500 = state_33438__$1;
(statearr_33469_33500[(1)] = (17));

} else {
var statearr_33470_33501 = state_33438__$1;
(statearr_33470_33501[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (16))){
var inst_33422 = (state_33438[(2)]);
var state_33438__$1 = state_33438;
var statearr_33471_33502 = state_33438__$1;
(statearr_33471_33502[(2)] = inst_33422);

(statearr_33471_33502[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33439 === (10))){
var inst_33391 = (state_33438[(9)]);
var inst_33393 = (state_33438[(12)]);
var inst_33398 = cljs.core._nth.call(null,inst_33391,inst_33393);
var state_33438__$1 = state_33438;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33438__$1,(13),out,inst_33398);
} else {
if((state_val_33439 === (18))){
var inst_33404 = (state_33438[(7)]);
var inst_33413 = cljs.core.first.call(null,inst_33404);
var state_33438__$1 = state_33438;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33438__$1,(20),out,inst_33413);
} else {
if((state_val_33439 === (8))){
var inst_33392 = (state_33438[(8)]);
var inst_33393 = (state_33438[(12)]);
var inst_33395 = (inst_33393 < inst_33392);
var inst_33396 = inst_33395;
var state_33438__$1 = state_33438;
if(cljs.core.truth_(inst_33396)){
var statearr_33472_33503 = state_33438__$1;
(statearr_33472_33503[(1)] = (10));

} else {
var statearr_33473_33504 = state_33438__$1;
(statearr_33473_33504[(1)] = (11));

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
});})(c__20323__auto__))
;
return ((function (switch__20302__auto__,c__20323__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__20303__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__20303__auto____0 = (function (){
var statearr_33477 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33477[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__20303__auto__);

(statearr_33477[(1)] = (1));

return statearr_33477;
});
var cljs$core$async$mapcat_STAR__$_state_machine__20303__auto____1 = (function (state_33438){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_33438);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e33478){if((e33478 instanceof Object)){
var ex__20306__auto__ = e33478;
var statearr_33479_33505 = state_33438;
(statearr_33479_33505[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33438);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33478;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33506 = state_33438;
state_33438 = G__33506;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__20303__auto__ = function(state_33438){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__20303__auto____1.call(this,state_33438);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__20303__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__20303__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto__))
})();
var state__20325__auto__ = (function (){var statearr_33480 = f__20324__auto__.call(null);
(statearr_33480[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto__);

return statearr_33480;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto__))
);

return c__20323__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args33507 = [];
var len__19356__auto___33510 = arguments.length;
var i__19357__auto___33511 = (0);
while(true){
if((i__19357__auto___33511 < len__19356__auto___33510)){
args33507.push((arguments[i__19357__auto___33511]));

var G__33512 = (i__19357__auto___33511 + (1));
i__19357__auto___33511 = G__33512;
continue;
} else {
}
break;
}

var G__33509 = args33507.length;
switch (G__33509) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args33507.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args33514 = [];
var len__19356__auto___33517 = arguments.length;
var i__19357__auto___33518 = (0);
while(true){
if((i__19357__auto___33518 < len__19356__auto___33517)){
args33514.push((arguments[i__19357__auto___33518]));

var G__33519 = (i__19357__auto___33518 + (1));
i__19357__auto___33518 = G__33519;
continue;
} else {
}
break;
}

var G__33516 = args33514.length;
switch (G__33516) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args33514.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args33521 = [];
var len__19356__auto___33572 = arguments.length;
var i__19357__auto___33573 = (0);
while(true){
if((i__19357__auto___33573 < len__19356__auto___33572)){
args33521.push((arguments[i__19357__auto___33573]));

var G__33574 = (i__19357__auto___33573 + (1));
i__19357__auto___33573 = G__33574;
continue;
} else {
}
break;
}

var G__33523 = args33521.length;
switch (G__33523) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args33521.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20323__auto___33576 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___33576,out){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___33576,out){
return (function (state_33547){
var state_val_33548 = (state_33547[(1)]);
if((state_val_33548 === (7))){
var inst_33542 = (state_33547[(2)]);
var state_33547__$1 = state_33547;
var statearr_33549_33577 = state_33547__$1;
(statearr_33549_33577[(2)] = inst_33542);

(statearr_33549_33577[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33548 === (1))){
var inst_33524 = null;
var state_33547__$1 = (function (){var statearr_33550 = state_33547;
(statearr_33550[(7)] = inst_33524);

return statearr_33550;
})();
var statearr_33551_33578 = state_33547__$1;
(statearr_33551_33578[(2)] = null);

(statearr_33551_33578[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33548 === (4))){
var inst_33527 = (state_33547[(8)]);
var inst_33527__$1 = (state_33547[(2)]);
var inst_33528 = (inst_33527__$1 == null);
var inst_33529 = cljs.core.not.call(null,inst_33528);
var state_33547__$1 = (function (){var statearr_33552 = state_33547;
(statearr_33552[(8)] = inst_33527__$1);

return statearr_33552;
})();
if(inst_33529){
var statearr_33553_33579 = state_33547__$1;
(statearr_33553_33579[(1)] = (5));

} else {
var statearr_33554_33580 = state_33547__$1;
(statearr_33554_33580[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33548 === (6))){
var state_33547__$1 = state_33547;
var statearr_33555_33581 = state_33547__$1;
(statearr_33555_33581[(2)] = null);

(statearr_33555_33581[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33548 === (3))){
var inst_33544 = (state_33547[(2)]);
var inst_33545 = cljs.core.async.close_BANG_.call(null,out);
var state_33547__$1 = (function (){var statearr_33556 = state_33547;
(statearr_33556[(9)] = inst_33544);

return statearr_33556;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33547__$1,inst_33545);
} else {
if((state_val_33548 === (2))){
var state_33547__$1 = state_33547;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33547__$1,(4),ch);
} else {
if((state_val_33548 === (11))){
var inst_33527 = (state_33547[(8)]);
var inst_33536 = (state_33547[(2)]);
var inst_33524 = inst_33527;
var state_33547__$1 = (function (){var statearr_33557 = state_33547;
(statearr_33557[(7)] = inst_33524);

(statearr_33557[(10)] = inst_33536);

return statearr_33557;
})();
var statearr_33558_33582 = state_33547__$1;
(statearr_33558_33582[(2)] = null);

(statearr_33558_33582[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33548 === (9))){
var inst_33527 = (state_33547[(8)]);
var state_33547__$1 = state_33547;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33547__$1,(11),out,inst_33527);
} else {
if((state_val_33548 === (5))){
var inst_33524 = (state_33547[(7)]);
var inst_33527 = (state_33547[(8)]);
var inst_33531 = cljs.core._EQ_.call(null,inst_33527,inst_33524);
var state_33547__$1 = state_33547;
if(inst_33531){
var statearr_33560_33583 = state_33547__$1;
(statearr_33560_33583[(1)] = (8));

} else {
var statearr_33561_33584 = state_33547__$1;
(statearr_33561_33584[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33548 === (10))){
var inst_33539 = (state_33547[(2)]);
var state_33547__$1 = state_33547;
var statearr_33562_33585 = state_33547__$1;
(statearr_33562_33585[(2)] = inst_33539);

(statearr_33562_33585[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33548 === (8))){
var inst_33524 = (state_33547[(7)]);
var tmp33559 = inst_33524;
var inst_33524__$1 = tmp33559;
var state_33547__$1 = (function (){var statearr_33563 = state_33547;
(statearr_33563[(7)] = inst_33524__$1);

return statearr_33563;
})();
var statearr_33564_33586 = state_33547__$1;
(statearr_33564_33586[(2)] = null);

(statearr_33564_33586[(1)] = (2));


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
});})(c__20323__auto___33576,out))
;
return ((function (switch__20302__auto__,c__20323__auto___33576,out){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_33568 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_33568[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_33568[(1)] = (1));

return statearr_33568;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_33547){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_33547);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e33569){if((e33569 instanceof Object)){
var ex__20306__auto__ = e33569;
var statearr_33570_33587 = state_33547;
(statearr_33570_33587[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33547);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33569;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33588 = state_33547;
state_33547 = G__33588;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_33547){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_33547);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___33576,out))
})();
var state__20325__auto__ = (function (){var statearr_33571 = f__20324__auto__.call(null);
(statearr_33571[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___33576);

return statearr_33571;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___33576,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args33589 = [];
var len__19356__auto___33659 = arguments.length;
var i__19357__auto___33660 = (0);
while(true){
if((i__19357__auto___33660 < len__19356__auto___33659)){
args33589.push((arguments[i__19357__auto___33660]));

var G__33661 = (i__19357__auto___33660 + (1));
i__19357__auto___33660 = G__33661;
continue;
} else {
}
break;
}

var G__33591 = args33589.length;
switch (G__33591) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args33589.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20323__auto___33663 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___33663,out){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___33663,out){
return (function (state_33629){
var state_val_33630 = (state_33629[(1)]);
if((state_val_33630 === (7))){
var inst_33625 = (state_33629[(2)]);
var state_33629__$1 = state_33629;
var statearr_33631_33664 = state_33629__$1;
(statearr_33631_33664[(2)] = inst_33625);

(statearr_33631_33664[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (1))){
var inst_33592 = (new Array(n));
var inst_33593 = inst_33592;
var inst_33594 = (0);
var state_33629__$1 = (function (){var statearr_33632 = state_33629;
(statearr_33632[(7)] = inst_33593);

(statearr_33632[(8)] = inst_33594);

return statearr_33632;
})();
var statearr_33633_33665 = state_33629__$1;
(statearr_33633_33665[(2)] = null);

(statearr_33633_33665[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (4))){
var inst_33597 = (state_33629[(9)]);
var inst_33597__$1 = (state_33629[(2)]);
var inst_33598 = (inst_33597__$1 == null);
var inst_33599 = cljs.core.not.call(null,inst_33598);
var state_33629__$1 = (function (){var statearr_33634 = state_33629;
(statearr_33634[(9)] = inst_33597__$1);

return statearr_33634;
})();
if(inst_33599){
var statearr_33635_33666 = state_33629__$1;
(statearr_33635_33666[(1)] = (5));

} else {
var statearr_33636_33667 = state_33629__$1;
(statearr_33636_33667[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (15))){
var inst_33619 = (state_33629[(2)]);
var state_33629__$1 = state_33629;
var statearr_33637_33668 = state_33629__$1;
(statearr_33637_33668[(2)] = inst_33619);

(statearr_33637_33668[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (13))){
var state_33629__$1 = state_33629;
var statearr_33638_33669 = state_33629__$1;
(statearr_33638_33669[(2)] = null);

(statearr_33638_33669[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (6))){
var inst_33594 = (state_33629[(8)]);
var inst_33615 = (inst_33594 > (0));
var state_33629__$1 = state_33629;
if(cljs.core.truth_(inst_33615)){
var statearr_33639_33670 = state_33629__$1;
(statearr_33639_33670[(1)] = (12));

} else {
var statearr_33640_33671 = state_33629__$1;
(statearr_33640_33671[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (3))){
var inst_33627 = (state_33629[(2)]);
var state_33629__$1 = state_33629;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33629__$1,inst_33627);
} else {
if((state_val_33630 === (12))){
var inst_33593 = (state_33629[(7)]);
var inst_33617 = cljs.core.vec.call(null,inst_33593);
var state_33629__$1 = state_33629;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33629__$1,(15),out,inst_33617);
} else {
if((state_val_33630 === (2))){
var state_33629__$1 = state_33629;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33629__$1,(4),ch);
} else {
if((state_val_33630 === (11))){
var inst_33609 = (state_33629[(2)]);
var inst_33610 = (new Array(n));
var inst_33593 = inst_33610;
var inst_33594 = (0);
var state_33629__$1 = (function (){var statearr_33641 = state_33629;
(statearr_33641[(7)] = inst_33593);

(statearr_33641[(8)] = inst_33594);

(statearr_33641[(10)] = inst_33609);

return statearr_33641;
})();
var statearr_33642_33672 = state_33629__$1;
(statearr_33642_33672[(2)] = null);

(statearr_33642_33672[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (9))){
var inst_33593 = (state_33629[(7)]);
var inst_33607 = cljs.core.vec.call(null,inst_33593);
var state_33629__$1 = state_33629;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33629__$1,(11),out,inst_33607);
} else {
if((state_val_33630 === (5))){
var inst_33593 = (state_33629[(7)]);
var inst_33594 = (state_33629[(8)]);
var inst_33597 = (state_33629[(9)]);
var inst_33602 = (state_33629[(11)]);
var inst_33601 = (inst_33593[inst_33594] = inst_33597);
var inst_33602__$1 = (inst_33594 + (1));
var inst_33603 = (inst_33602__$1 < n);
var state_33629__$1 = (function (){var statearr_33643 = state_33629;
(statearr_33643[(12)] = inst_33601);

(statearr_33643[(11)] = inst_33602__$1);

return statearr_33643;
})();
if(cljs.core.truth_(inst_33603)){
var statearr_33644_33673 = state_33629__$1;
(statearr_33644_33673[(1)] = (8));

} else {
var statearr_33645_33674 = state_33629__$1;
(statearr_33645_33674[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (14))){
var inst_33622 = (state_33629[(2)]);
var inst_33623 = cljs.core.async.close_BANG_.call(null,out);
var state_33629__$1 = (function (){var statearr_33647 = state_33629;
(statearr_33647[(13)] = inst_33622);

return statearr_33647;
})();
var statearr_33648_33675 = state_33629__$1;
(statearr_33648_33675[(2)] = inst_33623);

(statearr_33648_33675[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (10))){
var inst_33613 = (state_33629[(2)]);
var state_33629__$1 = state_33629;
var statearr_33649_33676 = state_33629__$1;
(statearr_33649_33676[(2)] = inst_33613);

(statearr_33649_33676[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33630 === (8))){
var inst_33593 = (state_33629[(7)]);
var inst_33602 = (state_33629[(11)]);
var tmp33646 = inst_33593;
var inst_33593__$1 = tmp33646;
var inst_33594 = inst_33602;
var state_33629__$1 = (function (){var statearr_33650 = state_33629;
(statearr_33650[(7)] = inst_33593__$1);

(statearr_33650[(8)] = inst_33594);

return statearr_33650;
})();
var statearr_33651_33677 = state_33629__$1;
(statearr_33651_33677[(2)] = null);

(statearr_33651_33677[(1)] = (2));


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
});})(c__20323__auto___33663,out))
;
return ((function (switch__20302__auto__,c__20323__auto___33663,out){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_33655 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33655[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_33655[(1)] = (1));

return statearr_33655;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_33629){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_33629);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e33656){if((e33656 instanceof Object)){
var ex__20306__auto__ = e33656;
var statearr_33657_33678 = state_33629;
(statearr_33657_33678[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33629);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33656;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33679 = state_33629;
state_33629 = G__33679;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_33629){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_33629);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___33663,out))
})();
var state__20325__auto__ = (function (){var statearr_33658 = f__20324__auto__.call(null);
(statearr_33658[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___33663);

return statearr_33658;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___33663,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args33680 = [];
var len__19356__auto___33754 = arguments.length;
var i__19357__auto___33755 = (0);
while(true){
if((i__19357__auto___33755 < len__19356__auto___33754)){
args33680.push((arguments[i__19357__auto___33755]));

var G__33756 = (i__19357__auto___33755 + (1));
i__19357__auto___33755 = G__33756;
continue;
} else {
}
break;
}

var G__33682 = args33680.length;
switch (G__33682) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args33680.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__20323__auto___33758 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__20323__auto___33758,out){
return (function (){
var f__20324__auto__ = (function (){var switch__20302__auto__ = ((function (c__20323__auto___33758,out){
return (function (state_33724){
var state_val_33725 = (state_33724[(1)]);
if((state_val_33725 === (7))){
var inst_33720 = (state_33724[(2)]);
var state_33724__$1 = state_33724;
var statearr_33726_33759 = state_33724__$1;
(statearr_33726_33759[(2)] = inst_33720);

(statearr_33726_33759[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (1))){
var inst_33683 = [];
var inst_33684 = inst_33683;
var inst_33685 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_33724__$1 = (function (){var statearr_33727 = state_33724;
(statearr_33727[(7)] = inst_33685);

(statearr_33727[(8)] = inst_33684);

return statearr_33727;
})();
var statearr_33728_33760 = state_33724__$1;
(statearr_33728_33760[(2)] = null);

(statearr_33728_33760[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (4))){
var inst_33688 = (state_33724[(9)]);
var inst_33688__$1 = (state_33724[(2)]);
var inst_33689 = (inst_33688__$1 == null);
var inst_33690 = cljs.core.not.call(null,inst_33689);
var state_33724__$1 = (function (){var statearr_33729 = state_33724;
(statearr_33729[(9)] = inst_33688__$1);

return statearr_33729;
})();
if(inst_33690){
var statearr_33730_33761 = state_33724__$1;
(statearr_33730_33761[(1)] = (5));

} else {
var statearr_33731_33762 = state_33724__$1;
(statearr_33731_33762[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (15))){
var inst_33714 = (state_33724[(2)]);
var state_33724__$1 = state_33724;
var statearr_33732_33763 = state_33724__$1;
(statearr_33732_33763[(2)] = inst_33714);

(statearr_33732_33763[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (13))){
var state_33724__$1 = state_33724;
var statearr_33733_33764 = state_33724__$1;
(statearr_33733_33764[(2)] = null);

(statearr_33733_33764[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (6))){
var inst_33684 = (state_33724[(8)]);
var inst_33709 = inst_33684.length;
var inst_33710 = (inst_33709 > (0));
var state_33724__$1 = state_33724;
if(cljs.core.truth_(inst_33710)){
var statearr_33734_33765 = state_33724__$1;
(statearr_33734_33765[(1)] = (12));

} else {
var statearr_33735_33766 = state_33724__$1;
(statearr_33735_33766[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (3))){
var inst_33722 = (state_33724[(2)]);
var state_33724__$1 = state_33724;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33724__$1,inst_33722);
} else {
if((state_val_33725 === (12))){
var inst_33684 = (state_33724[(8)]);
var inst_33712 = cljs.core.vec.call(null,inst_33684);
var state_33724__$1 = state_33724;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33724__$1,(15),out,inst_33712);
} else {
if((state_val_33725 === (2))){
var state_33724__$1 = state_33724;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33724__$1,(4),ch);
} else {
if((state_val_33725 === (11))){
var inst_33688 = (state_33724[(9)]);
var inst_33692 = (state_33724[(10)]);
var inst_33702 = (state_33724[(2)]);
var inst_33703 = [];
var inst_33704 = inst_33703.push(inst_33688);
var inst_33684 = inst_33703;
var inst_33685 = inst_33692;
var state_33724__$1 = (function (){var statearr_33736 = state_33724;
(statearr_33736[(11)] = inst_33704);

(statearr_33736[(7)] = inst_33685);

(statearr_33736[(12)] = inst_33702);

(statearr_33736[(8)] = inst_33684);

return statearr_33736;
})();
var statearr_33737_33767 = state_33724__$1;
(statearr_33737_33767[(2)] = null);

(statearr_33737_33767[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (9))){
var inst_33684 = (state_33724[(8)]);
var inst_33700 = cljs.core.vec.call(null,inst_33684);
var state_33724__$1 = state_33724;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33724__$1,(11),out,inst_33700);
} else {
if((state_val_33725 === (5))){
var inst_33688 = (state_33724[(9)]);
var inst_33685 = (state_33724[(7)]);
var inst_33692 = (state_33724[(10)]);
var inst_33692__$1 = f.call(null,inst_33688);
var inst_33693 = cljs.core._EQ_.call(null,inst_33692__$1,inst_33685);
var inst_33694 = cljs.core.keyword_identical_QMARK_.call(null,inst_33685,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_33695 = (inst_33693) || (inst_33694);
var state_33724__$1 = (function (){var statearr_33738 = state_33724;
(statearr_33738[(10)] = inst_33692__$1);

return statearr_33738;
})();
if(cljs.core.truth_(inst_33695)){
var statearr_33739_33768 = state_33724__$1;
(statearr_33739_33768[(1)] = (8));

} else {
var statearr_33740_33769 = state_33724__$1;
(statearr_33740_33769[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (14))){
var inst_33717 = (state_33724[(2)]);
var inst_33718 = cljs.core.async.close_BANG_.call(null,out);
var state_33724__$1 = (function (){var statearr_33742 = state_33724;
(statearr_33742[(13)] = inst_33717);

return statearr_33742;
})();
var statearr_33743_33770 = state_33724__$1;
(statearr_33743_33770[(2)] = inst_33718);

(statearr_33743_33770[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (10))){
var inst_33707 = (state_33724[(2)]);
var state_33724__$1 = state_33724;
var statearr_33744_33771 = state_33724__$1;
(statearr_33744_33771[(2)] = inst_33707);

(statearr_33744_33771[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33725 === (8))){
var inst_33688 = (state_33724[(9)]);
var inst_33692 = (state_33724[(10)]);
var inst_33684 = (state_33724[(8)]);
var inst_33697 = inst_33684.push(inst_33688);
var tmp33741 = inst_33684;
var inst_33684__$1 = tmp33741;
var inst_33685 = inst_33692;
var state_33724__$1 = (function (){var statearr_33745 = state_33724;
(statearr_33745[(7)] = inst_33685);

(statearr_33745[(14)] = inst_33697);

(statearr_33745[(8)] = inst_33684__$1);

return statearr_33745;
})();
var statearr_33746_33772 = state_33724__$1;
(statearr_33746_33772[(2)] = null);

(statearr_33746_33772[(1)] = (2));


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
});})(c__20323__auto___33758,out))
;
return ((function (switch__20302__auto__,c__20323__auto___33758,out){
return (function() {
var cljs$core$async$state_machine__20303__auto__ = null;
var cljs$core$async$state_machine__20303__auto____0 = (function (){
var statearr_33750 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33750[(0)] = cljs$core$async$state_machine__20303__auto__);

(statearr_33750[(1)] = (1));

return statearr_33750;
});
var cljs$core$async$state_machine__20303__auto____1 = (function (state_33724){
while(true){
var ret_value__20304__auto__ = (function (){try{while(true){
var result__20305__auto__ = switch__20302__auto__.call(null,state_33724);
if(cljs.core.keyword_identical_QMARK_.call(null,result__20305__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__20305__auto__;
}
break;
}
}catch (e33751){if((e33751 instanceof Object)){
var ex__20306__auto__ = e33751;
var statearr_33752_33773 = state_33724;
(statearr_33752_33773[(5)] = ex__20306__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33724);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33751;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__20304__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33774 = state_33724;
state_33724 = G__33774;
continue;
} else {
return ret_value__20304__auto__;
}
break;
}
});
cljs$core$async$state_machine__20303__auto__ = function(state_33724){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20303__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20303__auto____1.call(this,state_33724);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20303__auto____0;
cljs$core$async$state_machine__20303__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20303__auto____1;
return cljs$core$async$state_machine__20303__auto__;
})()
;})(switch__20302__auto__,c__20323__auto___33758,out))
})();
var state__20325__auto__ = (function (){var statearr_33753 = f__20324__auto__.call(null);
(statearr_33753[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20323__auto___33758);

return statearr_33753;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__20325__auto__);
});})(c__20323__auto___33758,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map?rel=1458518946386