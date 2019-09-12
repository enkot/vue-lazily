import awaited from './components/awaited'
import awaitedComponent from './components/awaitedComponent'

export { awaited, awaitedComponent }
export default {
  install(Vue) {
    Vue.component('awaited', awaited)
    Vue.component('awaitedComponent', awaitedComponent)
  }
}
