import Vue from 'vue'
// import Vuex from './vuex2'
import Vuex from './vuex'
Vue.use(Vuex)

export default new Vuex.store({
    state: {
        name: 10,
        x: 123
    },
    getters: {
        y(state) {
            return state.x
        },
        myage(state) {
            console.log(state, 123);
            return state.name + 10
        },
        yourAge(state) {
            return state.name + 20
        }
    },
    mutations: {
        syncAdd(state, parmas) {
            console.log(state, parmas);
            state.name += parmas
        },
        syncSub(state, parmas) {
            state.name -= parmas
        }
    },
    actions: {
        asyncAdd({ commit }, ...parmas) {
            setTimeout(() => {
                commit('syncAdd', ...parmas)
            }, 2000);
        },
        asyncSub({commit}, ...parmas) {
            setTimeout(() => {
                commit('syncSub', ...parmas)
            }, 2000);
        }
    },
    modules: {
        a: {
            namespaced: true,
            state: {
                x: 1,

            },
            getters: {
                y(state) {
                    return state.x + 1
                }
            },
            mutations: {
                syncAdd(state, parmas) {
                    console.log(state, 123, parmas);
                    state.x += parmas
                    
                }
                
            },
            modules: {
                m: {
                    namespaced: true,
                    state: {
                        k: 3
                    },
                    mutations: {
                        syncAdd7(state, parmas) {
                            state.k += parmas
                        }
                    }
                }
            }
        },
        b: {
            namespaced: true
        }
    }
})
