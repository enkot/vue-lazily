# Introduction

VueAwaited is a Vue.js plugin for data and components lazy loading. 

## Features
* Loads data and components when they become visible.
* Slots for loading and error states.
* Can be used with Vuex actions.
* Shared loading and error states for data and component.
* No dependencies.

## Why do I need this?

There is a big chance that you don't need this library if your app is small. But, if one page of your app loads more than 5-10 seconds - VueAwaited can help 🙂. 

This is because browser should load a large bundle of JavaScript, which must be downloaded and parsed, after that components may need some data that should be fetched before anything is displayed on the screen - all of this block user from viewing the page. Or, even worth, you use server-side rendering (SSR) and your big page should be rendered on the server and hydrated on the client.

So, you have the problem and 2 options:
* Get rid of some page content, which is not the best option.
* [Async Components](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components) - better, but will not help a lot.

The better solution is to load data and components only when they become visible on the screen. For this VueAwaited, as a lot of other libraries, uses [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) under the hood, which do all of work for us :).
