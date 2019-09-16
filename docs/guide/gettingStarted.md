# Getting Started

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
