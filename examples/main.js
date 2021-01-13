import { createApp } from 'vue'
import VueAwaited from '../src'
import App from './App.vue'

const app = createApp(App)
app.use(VueAwaited, {
  props: {
    lazy: true,
    height: '100px',
    margin: '500px'
  }
})
app.mount('#app')
