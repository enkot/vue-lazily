<template>
  <div class="container">
    <h1>Scroll down ⬇</h1>
    <p>Check the "Network" tab to see when data and component will be loaded.</p>
    <div class="offset"></div>
    <awaited>
      <template #pending>
        Loading...
      </template> 
      <template #default>
        <p>Static here</p>
      </template>
    </awaited>
    <awaited :action="getData" lazy>
      <template #pending>
        Loading...
      </template>  
      <template #default>
        This is slot content 1.
      </template>
    </awaited>
    <div class="offset"></div>
  </div>
</template>

<script>
import { Promise } from 'q';
export default {
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
  background-color: #F7FAFC;
}
.offset {
  height: 420px;
}
</style>