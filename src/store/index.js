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
            if (!state.starred) state.starred = {}

            state.starred.push(payload)
        },
        REMOVE_STARRED(state, payload) {
            const index = state.starred.findIndex(item => item.word === payload.word)
            console.log('Попытка удалить', { payload, index })
            state.starred.splice(index, 1)
            console.log('State now!', state.starred)
        }
    },
    actions: {
        getStarred({ state, commit }) {
            console.log('Пытаемся получить сохраненочки')

            // Если избранное уже получено, то ничего не делаем
            if (state.starred.length) return

            const starred = JSON.parse(window.localStorage.getItem('starred')) || null

            commit('SET_STARRED', starred)
        },
        addStarred({ commit, dispatch }, word) {
            console.log('Добавляем слово в избранное', word)
            commit('ADD_STARRED', word)

            dispatch('updateLocalStorage')
        },
        removeStarred({ commit, dispatch }, word) {
            console.log('Удаляем из избранного')
            commit('REMOVE_STARRED', word)

            dispatch('updateLocalStorage')
        },

        updateLocalStorage({ state }) {
            console.log('local storage обновлен')
            window.localStorage.setItem('starred', JSON.stringify(state.starred))
        }
    },
    getters: {
        isStarred: state => word => state.starred.findIndex(item => item.word === word) > -1 ? true : false
    }
})
