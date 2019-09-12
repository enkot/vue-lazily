<template>
  <div class="container">
    <h1>Scroll down ⬇</h1>
    <p>Check the "Network" tab to see when data and component will be loaded.</p>
    <div class="offset"></div>
    <awaited #default="data">This is slot content 1 {{ data }}.</awaited>
    <awaited>This is slot content 2.</awaited>
  </div>
</template>

<style scoped>
.container {
  height: 400px;
  margin: 10px 0;
  padding: 10px 40px;
  overflow-y: scroll;
  background-color: #F7FAFC;
}
.offset {
  height: 400px;
}
</style>