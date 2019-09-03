export default {
  props: {
    action: {
      type: [String, Promise, Function],
      required: false
    },
    storeData: {
      type: [String, Array],
      required: false
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    resolved: false,
    error: null,
    observer: null,
    target: null
  }),
  mounted() {
    assert(this.$store, `Vuex doesn't installed.`)
    assert(this.action, `You should pass an "action" prop.`)
  
    this.target = this.$refs.target

    if (this.lazy)
      this.observe()
    else
      this.run()
  },
  destroyed() {
    this.unobserve()
  },
  methods: {
    async run() {
      this.resolved = false

      try {
        if (typeof this.action === 'string')
          await this.$store.dispatch(this.action)
        else if (typeof this.action === 'function')
          await this.action()
        else if (isPromise(this.action))
          await this.action
      } catch(error) {
        this.error = error
      } finally {
        this.resolved = true
      }
    },
    observe() {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) return
        this.unobserve()
        this.run()
      })
      this.observer.observe(this.target)
    },
    unobserve() {
      this.observer.unobserve(this.target)
    }
  },
  render(h) {
    let data

    if (Array.isArray(this.storeData)) {
      data = this.storeData.map((key) => this.$store.state[key])
    } else {
      data = this.$store.state[this.storeData]
    }

    if (this.error) {
      return getSlot(this, h, 'error', { error: this.error })
    }

    if (this.resolved) {
      return getSlot(this, h, 'default', { data })
    }

    return getSlot(this, h, 'pending', { data })
  }
}

function getSlot(vm, h, name, data) {
  if (vm.$scopedSlots[name]) {
    return h('div', {
      ref: 'target'
    }, vm.$scopedSlots[name](data))
  }
}

function isPromise(value) {
  return value && typeof value.then === 'function' && typeof value.catch === 'function'
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[vue-awaited] ${message}`)
  }
}