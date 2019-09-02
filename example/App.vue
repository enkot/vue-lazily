<template>
  <div id="app">
    <div style="height: 800px;"></div>
    <awaited action="getData" store-data="cars" lazy>
      <template #pending>
        <h1>Loading...</h1>
      </template>
      <template #error>
        <h1>Error happend</h1>
      </template>
      <template #default="{ data: cars }">
        <ul>
          <li v-for="car in cars" :key="car.name">
            {{ car.name }}
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
