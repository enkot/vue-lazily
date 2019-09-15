# VueAwaited

[![Coverage Status](https://coveralls.io/repos/github/enkot/vue-awaited/badge.svg?branch=master)](https://coveralls.io/github/enkot/vue-awaited?branch=master)

VueAwaited is a Vue.js plugin for data and components lazy loading. 

## Features
* Loads data and components when they become visible.
* Slots for loading and error states.
* Can be used with Vuex actions.
* Shared loading and error states for data and component.
* No dependencies.

## Why do I need this library?

There is a big chance that you don't need it if your app is small. But, if one page of your app loads more than 5-10 seconds - this library can help 🙂.

VueAwaited also can handle loading and error states for you using slots and scoped slots API. 

## Installation
You can install this plugin via npm.

### yarn
```sh
yarn add vue-awaited
```

### npm
```sh
npm i vue-awaited
```

## Usage
### Global
```js
import Vue from 'vue'
import awaited from 'vue-awaited'

Vue.component('awaited', awaited)
```

### Local
```vue
<script>
import { awaited } from 'vue-awaited'

export default {
  components: {
    awaited
  }
}
</script>
```

## Basic Example
Using component's method.
```vue
<template>
  <awaited :action="getData" #default={ data: user }>
    <h2>{{ user.name }}</h2>
    <span>{{ user.email }}</span>
  </awaited>
</template>

<script>
import { fetchUser } from '@/services'

export default {
  methods: {
    getData() {
      return fetchUser()
    }
  }
}
</script>
```