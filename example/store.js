import Vue from 'vue'
import Vuex from 'vuex'
import { delay } from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cars: []
  },
  mutations: {
    setCars(state, cars) {
      state.cars = cars
    }
  },
  actions: {
    async getData({ commit }, isFord) {
      await delay(2000)
      const data = [
        { name: 'BMW' },
        { name: 'Audi' },
        { name: isFord ? 'Ford' : 'Mersedes' }
      ]
      commit('setCars', data)
      return data
    }
  }
})