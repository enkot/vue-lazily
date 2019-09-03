<template>
  <ul>
    <li v-for="character in characters" :key="character.name">
      <img :src="character.image" />
      <h4>{{ character.name }}</h4>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['characters']
}
</script> 

<style scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
}
</style>