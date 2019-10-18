<template>
  <div class="container">
    <h1>Scroll down ⬇</h1>
    <p>Check the "Network" tab to see when data and component will be loaded.</p>
    <div class="offset"></div>
    <awaited>
      <template #pending>
        <span>Loading...</span>
      </template>
      <template #default>
        <p>Static here</p>
      </template>
    </awaited>
    <awaited :action="getData" lazy :pending-delay="100" :delay="2000">
      <template #pending>
        <loading />
      </template>
      <template #error="{ error }">{{ error.message }}</template>
      <template #default>This is slot content 1.</template>
    </awaited>
    <div class="offset"></div>
  </div>
</template>

<script>
import loading from './loading'
export default {
  components: {
    loading
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve('My data!'), 1000)
      })
    }
  }
}
</script>  

<style scoped>
.container {
  height: 400px;
  margin: 10px 0;
  padding: 10px 40px;
  overflow-y: scroll;
  background-color: #f7fafc;
}
.offset {
  height: 420px;
}
</style>