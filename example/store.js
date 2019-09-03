import Vue from 'vue'
import Vuex from 'vuex'

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
      // throw Error(`Can't load data!`)
      const characters = await fetch('https://rickandmortyapi.com/api/character/1,2')
        .then(response => response.json())
      commit('setTitle', 'Main Characters')
      commit('setCharacters', characters)
    }
  }
})