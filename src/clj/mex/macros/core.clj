(ns mex.macros.core)

(defmacro ^:internal -<>*
  "helper macro used by public API macros -<> and -<>>.
   Inserts x in place of '<>' in form, or in first or last position as indicated
   by default-position (which 'traditional arrow' semantics to fall back on when
   no position is explicitly specified by a diamond)"
  [form x default-position]
  (let [substitute-pos (fn [form'] (replace {'<> x} form'))
        count-pos (fn [form'] (count (filter (partial = '<>) form')))
        c (cond
           (or (seq? form) (vector? form)) (count-pos form)
           (map? form) (count-pos (mapcat concat form))
           :otherwise 0)]
    (cond
     (> c 1)              (throw (Exception. "No more than one position per form is allowed."))
     (or (symbol? form)
         (keyword? form)) `(~form ~x)
     (= 0 c)              (cond 
                            (vector? form) (if (= :first default-position)
                                             `(vec (cons ~x ~form))
                                             `(conj ~form ~x)) ,
                            (coll? form) (if (= :first default-position)
                                           `(~(first form) ~x ~@(next form))
                                           `(~(first form) ~@(next form) ~x)) ,
                            :otherwise form)
     (vector? form)       (substitute-pos form)
     (map? form)          (apply hash-map (mapcat substitute-pos form))
     (= 1 c)              `(~(first form) ~@(substitute-pos (next form))))))

(defmacro -<>
  "the 'diamond wand': top-level insertion of x in place of single
   positional '<>' symbol within the threaded form if present, otherwise
   mostly behave as the thread-first macro. Also works with hash literals
   and vectors."
  ([x] x)
  ([x form] `(-<>* ~form ~x :first))
  ([x form & forms] `(-<> (-<> ~x ~form) ~@forms)))

(defmacro -<>>
  "the 'diamond spear': top-level insertion of x in place of single
   positional '<>' symbol within the threaded form if present, otherwise
   mostly behave as the thread-last macro. Also works with hash literals
   and vectors."
  ([x] x)
  ([x form] `(-<>* ~form ~x :last))
  ([x form & forms] `(-<>> (-<>> ~x ~form) ~@forms)))

(defmacro re-export [ns vlist]
      `(do ~@(for [i vlist]
               `(def ~i ~(symbol (str ns "/" i))))))

(defmacro def-let
  ; http://clojure101.blogspot.com/2009/04/destructuring-binding-support-in-def.html
  "like let but defs the bindings"
  [bindings & body]
  (let [let-expr (macroexpand `(cljs.core/let ~bindings))
        vars (filter #(not (.contains (str %) "__"))
               (map first (partition 2 (second let-expr))))
        def-vars (map (fn [v] `(def ~v ~v)) vars)]
    (concat let-expr (into def-vars body))))

(defmacro for-eager
  "Non-lazy version of for, mostly used in reagent bodies"
  [binding & forms]
  `(doall (for ~binding ~@forms)))
