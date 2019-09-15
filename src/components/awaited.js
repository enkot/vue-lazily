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
    }
  },
  data: () => ({
    resolved: false,
    error: null,
    data: null,
    observer: null,
    target: null
  }),
  mounted() {
    if (this.action && isString(this.action))
      assert(this.$store, `Vuex doesn't installed.`)

    this.target = this.$refs.target

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
      assert(
        promise,
        `Action prop is not valid. It should be Vuex action name, function or promise`
      )

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
      this.observer.observe(this.target)
    },
    unobserve() {
      this.observer.unobserve(this.target)
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

  return null
}

function wrapper(h, children = []) {
  return h('div', { ref: 'target' }, children)
}

function getSlot(vm, h, name, data) {
  const slot = vm.$slots[name]
  const scopedSlot = vm.$scopedSlots[name]

  return wrapper(h, scopedSlot ? scopedSlot(data) : slot || [])
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