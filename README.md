![alt text](https://github.com/enkot/vue-awaited/blob/main/public/emoji-glossy-person.png?raw=true)

# VueAwaited

[![Build Status](https://travis-ci.org/enkot/vue-awaited.svg?branch=master)](https://travis-ci.org/enkot/vue-awaited)
[![Coverage Status](https://coveralls.io/repos/github/enkot/vue-awaited/badge.svg?branch=master)](https://coveralls.io/github/enkot/vue-awaited?branch=master)

VueAwaited is a Vue.js component for convenient data fetching and lazy loading.

Inspired by [vue-promised](https://github.com/posva/vue-promised), recommend to look at it if you need loading/errors handling without lazy loading.

## Features

- ⚔️ Works for both Vue 3 and 2
- 📝 Fetch, show and manage data directly in the template
- 👁️ Loads data when the element becomes visible
- 📍 Slots for loading and error states

## Why do this library exist?

Usually, on big pages, rendering all content at once can cause performance problems with big "Time to Interactive" or "Largest Contentful Paint" time, or even bigger problem if SSR used - server should render all the content before user could see the page.

And in most cases, the user will not even scroll to that content, but must wait to it to be rendered.

VueAwaited solves these problems by loading data only when it becomes visible and handle loading/error state itself using slots 🙂.

## Installation

You can install it via npm or yarn.

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
// Vue 2

import Vue from 'vue'
import VueAwaited from 'vue-awaited'

Vue.use(VueAwaited, { /* options */ })


// Vue 3

import { createApp } from 'vue'
import VueAwaited from 'vue-awaited'

const app = createApp(App)
app.use(VueAwaited, { /* options */ }))
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

Using url string:

```vue
<template>
  <awaited
    action="https://rickandmortyapi.com/api/character/1"
    #default="{ image, name, species }"
  >
    <img :src="image" :alt="name" />
    <h2>{{ name }}</h2>
    <span>{{ species }}</span>
  </awaited>
</template>
```

Using component's method:

```vue
<template>
  <awaited :action="getCharacter" #default="{ data: { image, name, species } }">
    <img :src="image" :alt="name" />
    <h2>{{ name }}</h2>
    <span>{{ species }}</span>
  </awaited>
</template>

<script>
export default {
  methods: {
    getCharacter() {
      return fetch('https://rickandmortyapi.com/api/character/1')
    }
  }
}
</script>
```

Using slots:

```vue
<template>
  <awaited action="https://rickandmortyapi.com/api/character/1">
    <template #pending>Loading...</template>
    <template #error="{ error }">{{ error.message }}</template>
    <template #default="{ data: { image, name, species } }">
      <img :src="image" :alt="name" />
      <h2>{{ name }}</h2>
      <span>{{ species }}</span>
    </template>
  </awaited>
</template>
```

_No need to call `.json()` method on response object, it will be done automatically under the hood._

## API Reference

### options

| Name    | Description                             | Type     |
| ------- | --------------------------------------- | -------- |
| `name`  | Component name. Defaults to `awaited`   | `String` |
| `props` | Props which will be passed to component | `Object` |

### props

All of these props could be passed to global config as well as directly to component.

| Name            | Description                                                                                                                                                                                 | Type                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `action`        | Url string, method or promise object                                                                                                                                                        | `String` `Function` `Promise`                 |
| `lazy`          | Enables lazy loading which uses Intersection Observer API under the hood                                                                                                                    | `Boolean`                                     |
| `delay`         | Delay in ms to wait before displaying the pending slot. Defaults to `200`                                                                                                                   | `Number`                                      |
| `margin`        | `rootMargin` option for IntersectionObserver class. Defaults to `0px`. See [docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) | `String`                                      |
| `threshold`     | `threshold` option for IntersectionObserver class. Defaults to `1.0`. See [docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)  | `String`                                      |
| `height`        | Height of an element that is shown before pending slot. Defaults to `0px`                                                                                                                   | `String`                                      |
| `watch`         | Reactive value or watch function to watch changes and rerun action                                                                                                                          | `Number` `String` `Array` `Object` `Function` |
| `fetchOptions`  | Options for `fetch` function                                                                                                                                                                | `Number`                                      |
| `actionHandler` | Custom action handler. F.e to use `axios` library                                                                                                                                           | `Number`                                      |

### slots

All slots but `combined` can be used as _scoped_ or regular slots.

| Name      | Description                                                             | Scope                    |
| --------- | ----------------------------------------------------------------------- | ------------------------ |
| `pending` | Content to display while the action is pending and before delay is over | previously resolved data |
| _default_ | Content to display once the action has been successfully resolved       | resolved data            |
| `error`   | Content to display if the action is rejected                            | throwed error            |

## Author

👤 **Enkot**

- Website: [@enkot](https://medium.com/@enkot)
- Twitter: [@enkot\_](https://twitter.com/enkot_)
- Github: [@enkot](https://github.com/enkot)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/enkot/vue-awaited/issues).

## License

[MIT](http://opensource.org/licenses/MIT)
