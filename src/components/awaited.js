export default {
  props: {
    action: {
      type: [String, Function, Promise],
      required: false
    },
    storeData: {
      type: [String, Array],
      required: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'span'
    }
  },
  data: () => ({
    resolved: false,
    error: null,
    data: null,
    observer: null
  }),
  mounted() {
    if (this.action && isString(this.action))
      assert(this.$store, `Vuex doesn't installed.`)

    if (this.lazy) this.observe()
    else this.run()
  },
  destroyed() {
    this.unobserve()
  },
  methods: {
    run() {
      if (!this.action) {
        this.resolved = true
        return
      }

      const promise = getPromiseFromAction(this, this.action)

      this.resolved = false

      promise
        .then(data => {
          this.data = data
        })
        .catch(error => {
          this.error = error
        })
        .finally(() => {
          this.resolved = true
        })
    },
    observe() {
      this.observer = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio <= 0) return
        this.unobserve()
        this.run()
      })

      this.observer.observe(this.$el)
    },
    unobserve() {
      if (this.observer && this.$el) {
        this.observer.unobserve(this.$el)
      }
    }
  },
  render(h) {
    if (this.error) {
      return getSlot(this, h, 'error', { error: this.error })
    }

    if (this.resolved) {
      return getSlot(this, h, 'default', { data: this.data })
    }

    return getSlot(this, h, 'pending', { data: this.data })
  }
}

function ensurePromise(func) {
  return new Promise((resolve, reject) => {
    try {
      const result = func()
      isPromise(result) && result.then(resolve, reject)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

function getPromiseFromAction(vm, action) {
  if (isString(action)) return ensurePromise(() => vm.$store.dispatch(action))
  if (isFunction(action)) return ensurePromise(() => action())
  if (isPromise(action)) return action
}

function convertNodes(h, wrapperTag, nodes) {
  if (nodes.length > 1 || !nodes[0].tag) return h(wrapperTag, {}, nodes)
  return nodes[0]
}

function getSlot(vm, h, name, data) {
  const slot = vm.$slots[name]
  const scopedSlot = vm.$scopedSlots[name]
  const node = scopedSlot ? scopedSlot(data) : slot

  return Array.isArray(node) ? convertNodes(h, vm.tag, node) : node
}

function isString(value) {
  return typeof value === 'string'
}

function isFunction(value) {
  return typeof value === 'function'
}

function isPromise(value) {
  return value && isFunction(value.then) && isFunction(value.catch)
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[vue-awaited] ${message}`)
  }
}
