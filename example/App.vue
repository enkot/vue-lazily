<template>
  <div id="app" class="app">
    <h1>Scroll down ⬇</h1>
    <p>Check the "Network" tab to see when data and component will be loaded.</p>
    <div style="height: 1000px;"></div>
    <awaited action="getData" :store-data="['characters', 'title']" lazy class="content">
      <template #pending>
        <h2>Loading...</h2>
      </template>
      <template #error>
        <h2>Error happend</h2>
      </template>
      <template #default="{ data: [characters, title] }">
        <h2>{{ title }}</h2>
        <Characters :characters="characters" />
      </template>
    </awaited>
  </div>
</template>

<script>
import { awaited, awaitedComponent } from '../src'

export default {
  name: 'app',
  components: {
    awaited,
    Characters: awaitedComponent({
      asyncComponent: () => import('./Characters.vue')
    })
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