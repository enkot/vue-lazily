<template>
  <div class="w-full max-w-7xl mx-auto pb-10">
    <div class="flex flex-col justify-center items-center min-h-screen p-6">
      <img src="~/static/logo.png" alt="Awaited" width="120" />
      <h1 class="text-4xl sm:text-6xl font-black mt-2">
        Vue<span class="text-green-500">Lazily</span>
      </h1>
      <p class="mt-4 text-gray-800 text-center">
        The easiest way to lazy load your content
      </p>
      <div class="max-w-full overflow-hidden">
        <highlightjs
          autodetect
          code="  yarn add vue-lazily // npm i vue-lazily"
          class="mt-8 rounded-md overflow-hidden"
        />
        <highlightjs
          language="javascript"
          :code="importMarkup"
          class="mt-4 rounded-md overflow-hidden"
        />
        <highlightjs
          language="html"
          :code="templateMarkup"
          class="mt-4 rounded-md overflow-hidden"
        />
      </div>
      <p class="mt-4 text-gray-800">
        Check the
        <a
          href="https://github.com/enkot/vue-lazily#readme"
          class="font-bold text-green-500 hover:underline"
          target="blank"
        >
          Documentation and Why?
        </a>
      </p>
      <span class="text-gray-500 mt-4">Scroll to example</span>
      <a href="#now-playing">
        <ArrowDownIcon class="animate-bounce h-8 w-8 text-green-500 mt-8" />
      </a>
    </div>
    <h1 id="now-playing" class="text-3xl font-black px-6 mb-6 mt-16">
      Now Playing
    </h1>
    <Lazily :action="getNowPlaying" :threshold="0.3">
      <template #pending="{ observed }">
        <div class="relative flex flex-nowrap space-x-4 overflow-x-hidden px-6">
          <div v-for="i in 6" :key="i" class="animate-pulse w-56 flex-shrink-0">
            <div class="aspect-w-2 aspect-h-3 bg-gray-300 rounded-md"></div>
            <div class="w-2/3 h-4 bg-gray-300 rounded-md mt-4"></div>
            <div class="w-1/3 h-4 bg-gray-300 rounded-md mt-2"></div>
          </div>
          <div
            class="flex justify-center items-center absolute inset-0 bg-green-500 bg-opacity-75 text-white font-bold text-4xl rounded-md opacity-0"
            :class="{ 'animate-flash': observed }"
          >
            Observed!
          </div>
        </div>
      </template>
      <template #error="{ error }">{{ error.message }}</template>
      <template #default="{ data }">
        <div class="flex flex-nowrap space-x-4 overflow-x-scroll px-6">
          <div
            v-for="item in data.results"
            :key="item.id"
            class="w-56 flex-shrink-0"
          >
            <div
              class="aspect-w-2 aspect-h-3 bg-gray-300 rounded-md overflow-hidden"
            >
              <img
                :src="`http://image.tmdb.org/t/p/w500${item.poster_path}`"
                :alt="item.title"
              />
            </div>
            <h2 class="text-md font-bold mt-4">{{ item.title }}</h2>
            <span class="text-gray-600">{{ item.release_date }}</span>
          </div>
        </div>
      </template>
    </Lazily>
    <h1 class="text-3xl font-black px-6 mb-6 mt-20">Popular Actors</h1>
    <Lazily :action="getPopularActors" :threshold="0.3">
      <template #pending="{ observed }">
        <div class="relative flex flex-nowrap space-x-4 overflow-x-hidden px-6">
          <div v-for="i in 6" :key="i" class="animate-pulse w-56 flex-shrink-0">
            <div class="aspect-w-2 aspect-h-3 bg-gray-300 rounded-md"></div>
            <div class="w-2/3 h-4 bg-gray-300 rounded-md mt-4"></div>
          </div>
          <div
            class="flex justify-center items-center absolute inset-0 bg-green-500 bg-opacity-75 text-white font-bold text-4xl rounded-md opacity-0"
            :class="{ 'animate-flash': observed }"
          >
            Observed!
          </div>
        </div>
      </template>
      <template #error="{ error }">{{ error.message }}</template>
      <template #default="{ data }">
        <div class="flex flex-nowrap space-x-4 overflow-x-scroll px-6">
          <div
            v-for="item in data.results"
            :key="item.id"
            class="w-56 flex-shrink-0"
          >
            <div
              class="aspect-w-2 aspect-h-3 bg-gray-300 rounded-md overflow-hidden"
            >
              <img
                :src="`http://image.tmdb.org/t/p/w500${item.profile_path}`"
                :alt="item.name"
                class="rounded-md"
              />
            </div>
            <h2 class="text-md font-bold mt-4">{{ item.name }}</h2>
          </div>
        </div>
      </template>
    </Lazily>
    <div class="flex justify-center items-center mt-16">
      <span class="text-gray-500 mr-2">Data source:</span>
      <a href="https://www.themoviedb.org/" target="blank">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="TheMovieDB"
          class="h-4"
        />
      </a>
    </div>
  </div>
</template>

<script>
import { Lazily } from '../src'
import ArrowDownIcon from '@/assets/arrow-down.svg'

export default {
  components: {
    Lazily,
    ArrowDownIcon
  },
  data() {
    return {
      importMarkup: `
  import VueLazily from 'vue-lazily'
  ...
  app.use(VueLazily) // Vue.use(VueLazily) 
      `,
      templateMarkup: `
  <template>
    <Lazily action="https://api.themoviedb.org/3/movie/now_playing"> 
      <template #pending> ... </template>
      <template #error="{ error }"> ... </template>
      <template #default="{ data }"> ... </template>
    </Lazily>
  </template>
    `
    }
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
  },
  methods: {
    async getNowPlaying() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            fetch(
              'https://api.themoviedb.org/3/movie/now_playing?api_key=30186d63c1df83f60479b1071afe9655&language=en-US'
            ).then((result) => result.json())
          )
        }, 2000)
      })
    },
    async getPopularActors() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            fetch(
              'https://api.themoviedb.org/3/person/popular?api_key=30186d63c1df83f60479b1071afe9655&language=en-US'
            ).then((result) => result.json())
          )
        }, 2000)
      })
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>