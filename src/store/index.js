import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    waymarks: []
  },
  mutations: {
    addWaymarks (state, waymark) {
      state.waymarks.push(waymark)
    }
  },
  getters: {
    getWaymarks: state => state.waymarks,
  },
  actions: {
  },
  modules: {
  }
})
