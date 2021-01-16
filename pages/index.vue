<template>
  <div class="w-full max-w-4xl mx-auto px-6">
    <div class="flex flex-col justify-center items-center h-screen">
      <img src="~/static/logo.png" alt="Awaited" width="120" />
      <h1 class="text-4xl sm:text-6xl font-black mt-2">
        Vue<span class="text-green-500">Lazily</span>
      </h1>
      <p class="mt-4 text-gray-900 text-center">
        The easiest way to load your content lazily
      </p>
      <ArrowDownIcon class="h-8 w-8 text-green-500 mt-8" />
    </div>
    <div style="padding: 1000px"></div>
    <Lazily action="https://rickandmortyapi.com/api/character/1">
      <template #pending> Loading </template>
      <template #error="{ error }">{{ error.message }}</template>
      <template #default="{ data: { name, status } }">
        {{ name }}: {{ status }}
      </template>
    </Lazily>
  </div>
</template>

<script>
import { awaited } from '../src'
import ArrowDownIcon from '@/assets/arrow-down.svg'

export default {
  components: {
    awaited,
    ArrowDownIcon
  },
  head() {
    return {
      title: 'VueLazily - The easiest way to load your content lazily',
      htmlAttrs: {
        lang: 'en'
      },
      bodyAttrs: {
        class: 'antialiased bg-white'
      }
    }
  }
}
</script>