import Vue from 'vue'
import Vuex from 'vuex'

import { delay } from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: null,
    characters: []
  },
  mutations: {
    setTitle(state, title) {
      state.title = title
    },
    setCharacters(state, characters) {
      state.characters = characters
    }
  },
  actions: {
    async getData({ commit }) {
      await delay(1500)
      const characters = await fetchData('https://rickandmortyapi.com/api/character/1,2')
      commit('setTitle', 'Main Characters')
      commit('setCharacters', characters)
    }
  }
})

async function fetchData(url) {
  return await fetch(url).then(response => response.json())
}