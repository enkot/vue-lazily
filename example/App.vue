<template>
  <div id="app" class="app">
    <h1>Scroll down ⬇</h1>
    <div style="height: 1000px;"></div>
    <awaited action="getData" store-data="cars" lazy class="content">
      <template #pending>
        <h2>Loading...</h2>
      </template>
      <template #error>
        <h2>Error happend</h2>
      </template>
      <template #default="{ data: cars }">
        <ul>
          <li v-for="car in cars" :key="car.name">
            <h3>{{ car.name }}</h3>
          </li>
        </ul>
      </template>
    </awaited>
  </div>
</template>

<script>
import { awaited } from '../src'

export default {
  name: 'app',
  components: {
    awaited
  },
  methods: {
    async getData() {
      await this.$store.dispatch('getData')
    }
  }
}
</script>

<style>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content {
  padding: 40px 0;
}
</style>