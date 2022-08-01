import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    params: {
      group: '',
      project: ''
    }
  },
  getters: {
    params(state) {
      return  state.params
    }
  },
  mutations: {
    SetMenuData(state, data) {
      state.params = data
    }
  },
  actions: {
    setMenuData({ commit }, data) {
      commit('SetMenuData', data)
    }
  }
})

export default store
