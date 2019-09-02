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
    async getData({ commit }) {
      await delay(2000)
      // throw Error(`Can't load data!`)
      const data = [
        { name: 'BMW' },
        { name: 'Audi' },
        { name: 'Mersedes' }
      ]
      commit('setCars', data)
      return data
    }
  }
})