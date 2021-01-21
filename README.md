<p align="center">
  <img alt="Logo" src="https://github.com/enkot/vue-awaited/blob/master/static/logo.png?raw=true" height="120"/>
  <h1 align="center">
    <b>Vue<font color="10b981">Lazily</font></b>
  </h1>
</p>

[![Build Status](https://travis-ci.org/enkot/vue-lazily.svg?branch=master)](https://travis-ci.org/enkot/vue-lazily)
[![Coverage Status](https://coveralls.io/repos/github/enkot/vue-lazily/badge.svg?branch=master)](https://coveralls.io/github/enkot/vue-lazily?branch=master)
<img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />

The easiest way to lazy load your content.

> Inspired by [vue-promised](https://github.com/posva/vue-promised), recommend to look at it if you need loading/errors handling without lazy loading.

## [Demo](https://enkot.github.io/vue-lazily)

## Features

- ⚔️ Works for both Vue 3 and 2
- 👁️ Loads content when it becomes visible
- 📝 Manipulate data directly in the template
- 📍 Slots for loading and error states
- No dependencies.

## Why does this library exist?

Usually, on big pages, rendering all content at once can cause performance problems with big "Time to Interactive" or "Largest Contentful Paint" time, or even bigger problem if SSR used - server should render all the content before user could see the page.

And in most cases, the user will not even scroll to that content, but must wait to it to be rendered.

VueLazily solves these problems by loading data only when it becomes visible and handle loading/error state itself using slots 🙂.

## Installation

```sh
yarn add vue-lazily
```

or

```sh
npm i vue-lazily
```

## Usage

### Global

```js
// Vue 2

import Vue from 'vue'
import VueLazily from 'vue-lazily'

Vue.use(VueLazily, { /* options */ })


// Vue 3

import { createApp } from 'vue'
import VueLazily from 'vue-lazily'

const app = createApp(App)
app.use(VueLazily, { /* options */ }))
```

### Local

```vue
<script>
import { Lazily } from 'vue-lazily'

export default {
  components: {
    Lazily
  }
}
</script>
```

## Basic Example

Using url string:

```vue
<template>
  <Lazily
    action="https://rickandmortyapi.com/api/character/1"
    #default="{ data: { image, name, species } }"
  >
    <img :src="image" :alt="name" />
    <h2>{{ name }}</h2>
    <span>{{ species }}</span>
  </Lazily>
</template>
```

Using component's method:

```vue
<template>
  <Lazily :action="getCharacter" #default="{ data: { image, name, species } }">
    <img :src="image" :alt="name" />
    <h2>{{ name }}</h2>
    <span>{{ species }}</span>
  </Lazily>
</template>

<script>
export default {
  methods: {
    getCharacter() {
      return fetch('https://rickandmortyapi.com/api/character/1').then(res =>
        res.json()
      )
    }
  }
}
</script>
```

Using slots:

```vue
<template>
  <Lazily action="https://rickandmortyapi.com/api/character/1">
    <template #pending>Loading...</template>
    <template #error="{ error }">{{ error.message }}</template>
    <template #default="{ data: { image, name, species } }">
      <img :src="image" :alt="name" />
      <h2>{{ name }}</h2>
      <span>{{ species }}</span>
    </template>
  </Lazily>
</template>
```

## API Reference

### options

| Name    | Description                             | Type     |
| ------- | --------------------------------------- | -------- |
| `name`  | Component name. Defaults to `Lazily`    | `String` |
| `props` | Props which will be passed to component | `Object` |

### props

All of these props could be passed to global config as well as directly to component.

| Name            | Description                                                                                                                                                                                 | Type                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `action`        | Url string, method or promise for default action handler. Or anything else that could be passed to custom `actionHandler`                                                                   | `any`                                         |
| `lazy`          | Enables lazy loading which uses Intersection Observer API under the hood. Defaults to `true`                                                                                                | `Boolean`                                     |
| `delay`         | Delay in ms to wait before displaying the pending slot. Disabled by default, if passed `true` - defaults to `200`. If disabled - pending slot will be rendered in SSR                       | `Boolean` `Number`                            |
| `margin`        | `rootMargin` option for IntersectionObserver class. Defaults to `0px`. See [docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) | `String`                                      |
| `threshold`     | `threshold` option for IntersectionObserver class. Defaults to `0`. See [docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)    | `String`                                      |
| `height`        | Height of an element that is shown before pending slot. Defaults to `0px`                                                                                                                   | `String`                                      |
| `watch`         | Reactive value or watch function to watch changes and rerun action                                                                                                                          | `Number` `String` `Array` `Object` `Function` |
| `actionHandler` | Custom action handler. F.e. to use custom `fetch`, `axios` or `apollo`. Gets action prop as argument                                                                                        | `Function`                                    |

### slots

All slots can be used as _scoped_ or regular slots.

| Name      | Description                                                             | Scope                                       |
| --------- | ----------------------------------------------------------------------- | ------------------------------------------- |
| `pending` | Content to display while the action is pending and before delay is over | previously resolved `data`, `observed` flag |
| _default_ | Content to display once the action has been successfully resolved       | resolved `data`                             |
| `error`   | Content to display if the action is rejected                            | throwed `error`                             |

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/enkot/vue-awaited/issues).

## Show your support

Give a ⭐️ if this project helped you!

## License

[MIT](http://opensource.org/licenses/MIT)
