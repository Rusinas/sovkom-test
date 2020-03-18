import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        starred: []
    },
    mutations: {
        SET_STARRED(state, payload) {
            state.starred = payload
        },
        ADD_STARRED(state, payload) {
            state.starred.push(payload)
        },
        REMOVE_STARRED(state, payload) {
            const index = state.starred.findIndex(item => item.word === payload.word)
            state.starred.splice(index, 1)
        }
    },
    actions: {
        getStarred({ commit }) {
            const starred = JSON.parse(window.localStorage.getItem('starred')) || null
            commit('SET_STARRED', starred)
        },
        addStarred({ commit, dispatch }, word) {
            commit('ADD_STARRED', word)
            dispatch('updateLocalStorage')
        },
        removeStarred({ commit, dispatch }, word) {
            commit('REMOVE_STARRED', word)
            dispatch('updateLocalStorage')
        },

        updateLocalStorage({ state }) {
            window.localStorage.setItem('starred', JSON.stringify(state.starred))
        }
    },
    getters: {
        isStarred: state => word => state.starred.findIndex(item => item.word === word) > -1 ? true : false
    }
})
