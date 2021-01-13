<template>
  <div>
    <div style="fixed"></div>
    <div style="padding: 1000px"></div>
    <awaited action="https://rickandmortyapi.com/api/character/1">
      <template #pending> Loading </template>
      <template #error="error">{{ error.message }}</template>
      <template #default="{ name, status }">{{ name }}: {{ status }}</template>
    </awaited>
  </div>
</template>
