<template>
  <div id="app">
    <awaited :action="getData" store-data="cars">
      <template #default="{ cars }">
        <ul>
          <li v-for="car in cars" :key="car.name">
            {{ car.name }}
          </li>
        </ul>
      </template>
    </awaited>
    <button @click="isFord = true">Mersedes -> Ford</button>
  </div>
</template>

<script>
import { awaited } from '../src'

export default {
  name: 'app',
  components: {
    awaited
  },
  data: () => ({
    isFord: false
  }),
  computed: {
    getData() {
      return this.$store.dispatch('getData', this.isFord)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
