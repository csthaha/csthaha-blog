
// import Vue from "vue";
// import Vuex from "vuex";
// Vue.use(Vuex)
// export default new Vuex.store({
//     ...
// })

// 通过 vuex 的使用：
// Vue.use(vuex) 发现 vuex 只是一个插件。插件可以知道 vuex 要么是一个 对象并提供一个 install 方法，要么是一个函数 


// 然后 Vuex.store 可以确定 vuex 抛出来的是一个对象。

// 所以我们需要实现 install、store 从而实现 vuex

import { forEachFn } from './utils'

import ModuleCollection from './ModuleCollection'

let _Vue;

function getNamespaced(path, _raw) {
    console.log(path);
    return path.reduce((namespace, key) => {
        return namespace + (_raw.namespaced ? key + '/' : '')
    }, '')
}

function installModule(store, state, path, module) {

    // 根据 path 计算到当前的命名空间：
    let namespace = getNamespaced(path, module._raw)

    // 获取到当前 stroe 的内容，根状体啊，根路径即 [], 根模块
    console.log(namespace, store, state, path, module, module._state);

    if(path.length > 0) {
        console.log(111);
        // 类似处理模块树
        // 生成结构 
        // state：{
        //      name: 10, 
        //      a: {
        //         x: 1,
        //         c: { a:8}
        //     },
        //     b{}
        //  }
        let parent = path.slice(0, -1).reduce((state, current) => {
            return state[current]
        }, state)
        console.log(parent);
        // 使用 vue set api 主要是将 数据添加成响应式的。vue 可以通过 api 的方式 注册 store。
        // 即并不是直接定义的 store 对象。需求当中也会出现这种情况
        // （先定义过一个空的对象。然后给该对象添加属性。正常添加的话该属性不是响应式的）
        // this._vm = new Vue ...  做的响应式
        _Vue.set(parent, [path[path.length - 1]], module._state);
    }

    // getters getters 都会被注册到最外层 根的 getter 上所以重名会被覆盖
    forEachFn(module._raw.getters, (getter, getterName) => {
        // getter(module._state) 将 getter(module._state) 获取到的结果放在 一个函数中
        // 访问的时候调用
        store.getters[namespace + getterName] = () => getter(module._state)
    })

    // mutaion 处理 处理成数组形式。 因为调用的时候会把同名的都调用一遍
    forEachFn(module._raw.mutations, (mutation, mutationName) => {
        console.log(namespace + mutationName, 'ppp');
        store._mutations[namespace + mutationName] = store._mutations[namespace + mutationName] || []
        store._mutations[namespace + mutationName].push(payload => {
            mutation.call(store, module._state, payload)
        })
    })

    // aciton 同理
    forEachFn(module._raw.actions, (action, actionName) => {
        store._actions[namespace + actionName] = store._actions[namespace + actionName] || []
        store._actions[namespace + actionName].push(payload => {
            action.call(store, store, payload)
        })
    })

    // _children 存在
    if(module._children) {
        forEachFn(module._children, (childrenM, moduleName) => {
            // 拼接 store  -> $store.state.a.x
            installModule(store, state, [...path, moduleName], childrenM)
        })
    }


    
}

function _install(_vue) {
// _vue 从哪来 是什么 ？
// 通过 use 源码，其中 args.unshift(this);  可以知道 _vue 就是 Vue 实例

// Vue.use = function (plugin) {
//     var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
//     if (installedPlugins.indexOf(plugin) > -1) {
//       return this
//     }

//     // additional parameters
//     var args = toArray(arguments, 1);
//     args.unshift(this);
//     if (typeof plugin.install === 'function') {
//       plugin.install.apply(plugin, args);
//     } else if (typeof plugin === 'function') {
//       plugin.apply(null, args);
//     }
//     installedPlugins.push(plugin);
//     return this
// };

// 注：调用 install 方法时，会将 _vue (其实是 Vue 实例)作为参数传入的。 所以 _vue 就是 Vue
if (_vue && _Vue === _vue) {
    {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
    _Vue = _vue;

    // 找到 install 的源码

    // function install (_Vue) {
    //     if (Vue && _Vue === Vue) {
    //       {
    //         console.error(
    //           '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    //         );
    //       }
    //       return
    //     }
    //     Vue = _Vue;
    //     applyMixin(Vue);
    //   }
    // 接下来调用 applyMixin 方法

    // 我们再找到 appyMixin 方法
    // function applyMixin (Vue) {
    //     var version = Number(Vue.version.split('.')[0]);
    
    //     if (version >= 2) {
    //       Vue.mixin({ beforeCreate: vuexInit });
    //     } else {
    //       // override init and inject vuex init procedure
    //       // for 1.x backwards compatibility.
    //       var _init = Vue.prototype._init;
    //       Vue.prototype._init = function (options) {
    //         if ( options === void 0 ) options = {};
    
    //         options.init = options.init
    //           ? [vuexInit].concat(options.init)
    //           : vuexInit;
    //         _init.call(this, options);
    //       };
    //     }
    
    //     /**
    //      * Vuex init hook, injected into each instances init hooks list.
    //      */
    
    //     function vuexInit () {
    //       var options = this.$options;
    //       // store injection
    //       if (options.store) {
    //         this.$store = typeof options.store === 'function'
    //           ? options.store()
    //           : options.store;
    //       } else if (options.parent && options.parent.$store) {
    //         this.$store = options.parent.$store;
    //       }
    //     }
    //   }

    // 我们只关注 版本大于 2的 使用 hook 的形式进行注入
    // 所以
    _Vue.mixin({
        beforeCreate: vuexInit
    });
    function vuexInit () {
        // 至于这里为什么 this 指向的是 组件实例。则可以找到 Vue.mixin 方法 mixin 是一个全局混入。
        var options = this.$options;
        // store injection
        // 将初始化Vue根组件时传入的store设置到this对象的$store属性上，
        // 子组件从其父组件引用$store属性，层层嵌套进行设置。
        // 在任意组件中执行 this.$store 都能找到装载的那个store对象，vuexInit方法实现如下：
        if (options.store) {
            this.$store = options.store;
        } else if (options.parent && options.parent.$store) {
            this.$store = options.parent.$store;
        }
    }
}

class store {
    constructor(opt) {
        console.log(opt);

// -----------------------实现 module 之前的思路 start------------------------
        // let state = opt.state;
        // // getters 取值的时候是属性 其实写的是个方法 ---> Object.defineProperty
        // this.getters = {}

        // // 做计算属性： 专门针对 依赖值变化才执行 其实就是我们组件中的 computed 用法。
        // const computed = {}
        // forEachFn(opt.getters, (fn, key) => {
        //     //利用 vue computed 作用 将 getter 中的方法定义到 computed 中做缓存
        //     computed[key] = () => fn(this.state);
        //     Object.defineProperty(this.getters, key, {
        //         // get: () => this._vm[key] // 下面定义过 state 的访问属性起
        //         get: () => {
        //             return this._vm[key]
        //         }
        //     })
        // })
        // console.log(this.getters);

        // this._vm = new _Vue({
        //     data() {
        //         return {
        //             // vuex 中使用两个 $$ 表示内部状态。 不需要通过实例获取到 state 那怎么获取呢？？
        //             $$state: state,
        //             // 将 vuex 的state 放入 data 中 弄成响应式数据
        //         }
        //     },
        //     computed // 定义 computed 组件用法
        // })
        // console.log(this, this._vm.state);
        
        // // 发布订阅者模式 
        // // mutations
        // this._mutations = {}
        // forEachFn(opt.mutations, (mutation, key) => {
        //     this._mutations[key] = payload => mutation(this.state, payload)
        //     console.log(this._mutations);
        // })

        // // actions
        // this._actions = {}
        // forEachFn(opt.actions, (action, key) => {
        //     this._actions[key] = payload => action(this, payload)
        // })
// -----------------------实现 module 之前的思路 end------------------------

        this.getters = {}  //创建一个空的getters 对象
        this._mutations = {} //创建一个空的mutations 对象
        this._actions = {}  // 创建一个空的actions对象

        // 用户参数格式化。
        // 格式化成一颗树。
        this._modules = new ModuleCollection(opt)
        console.log(this._modules);  // 整理之后的 store 数据

        // 获取后整理之后的模块数据之后 那么就需要进行安装操作
        //  将模块上的属性定义在 store 中
        // 当前实例、根 state （或者直接 this.state）、路径、根模块
        const rootM = this._modules.root
        installModule(this, rootM._state, [], rootM)

        // 注册 store 且 getter 利用 computed 做缓存
        const computed = {}
        forEachFn(this.getters, (getter, getterName) => {
            computed[getterName] = () => {
                return getter()
            }
            Object.defineProperty(this.getters, getterName, {
                get: () => this._vm[getterName]
            })
        })
        this._vm = new _Vue({
            data() {
                return {
                    // vuex 中使用两个 $$ 表示内部状态。 不需要通过实例获取到 state 那怎么获取呢？？
                    $$state: opt.state,
                    // 将 vuex 的state 放入 data 中 弄成响应式数据
                }
            },
            computed // 定义 computed 组件用法
        })

        
    }

    // get 属性访问器
    get state() {
        return this._vm._data.$$state
    }

    // module之前
    // 组件调用 commit 的时候 // 使用剪头函数 保证 this （异步方法执行的时候）
    // commit = (type, payload) => {
    //     // 如果 这里不使用 箭头函数那么要区分 dispath 的时候 这个 type 就是 dispathc 的类型
    //     console.log(type); 
    //     this._mutations[type](payload)   
    // }

    // dispatch(type, payload){
    //     this._actions[type](payload)
    // }   

    commit = (type, payload) => {
        // 如果 这里不使用 箭头函数那么要区分 dispath 的时候 这个 type 就是 dispathc 的类型
        console.log(type, payload, this._mutations, this._mutations[type]); 
        this._mutations[type].forEach(fn => {
            console.log(fn);
            fn(payload)
        })
    }

    dispatch(type, payload){
        this._actions[type].forEach(fn => {
            fn(payload)
        })
    }   
}

export default {
    install: _install,
    store
}