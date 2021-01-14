const Vue = require('vue')

const isVue3 = !!Vue.h

export default {
  props: {
    action: {
      type: [String, Function, Promise],
      required: false
    },
    lazy: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 200
    },
    margin: {
      type: String
    },
    threshold: {
      type: Number
    },
    height: {
      type: String
    },
    tag: {
      type: String,
      default: 'div'
    },
    watch: {
      type: [Number, String, Array, Object, Function]
    },
    fetchOptions: {
      type: Object,
      default: () => {}
    },
    actionHandler: {
      type: Function
    }
  },
  data: () => ({
    resolved: false,
    error: null,
    data: null,
    observer: null,
    target: null,
    isDelay: true
  }),
  mounted() {
    this.target = this.$el

    if (this.lazy) this.observe()
  },
  created() {
    if (!this.lazy) this.run()

    if (this.watch)
      this.$watch(
        isFunction(this.watch) ? this.watch : () => this.watch,
        this.run
      )
  },
  [isVue3 ? 'unmounted' : 'destroyed']() {
    this.unobserve()
  },
  methods: {
    run() {
      if (!this.action) {
        this.resolved = true
        return
      }

      this.resolved = false
      this.startDelay()

      try {
        const result = this.actionHandler
          ? this.actionHandler(this.action)
          : this.getData(this.action)

        if (isPromise(result))
          return result
            .then(data => (this.data = data))
            .catch(error => (this.error = error))
            .finally(() => (this.resolved = true))

        this.data = result
      } catch (error) {
        this.error = error
      }

      this.resolved = true
    },
    getData(action) {
      switch (typeof action) {
        case 'string':
          return fetch(
            action,
            Object.assign({}, this.fetchOptions)
          ).then(data => data.json())
        case 'function':
          return action()
        default:
          return action
      }
    },
    runFunction() {},
    observe() {
      this.observer = new IntersectionObserver(
        entries => {
          if (entries[0].intersectionRatio <= 0) return
          this.unobserve()
          this.run()
        },
        {
          rootMargin: this.margin,
          threshold: this.threshold
        }
      )

      this.observer.observe(this.target)
    },
    unobserve() {
      if (this.observer && this.target) {
        this.observer.unobserve(this.target)
        this.target = null
      }
    },
    startDelay() {
      if (this.delay > 0) {
        this.isDelay = true
        const delayTimer = setTimeout(() => {
          this.isDelay = false
          clearTimeout(delayTimer)
        }, this.delay)
      } else {
        this.isDelay = false
      }
    }
  },
  render(h) {
    if (isVue3) h = Vue.h

    if (this.error) {
      return getSlot(this, h, 'error', { error: this.error })
    }

    if (this.resolved) {
      return getSlot(this, h, 'default', { data: this.data })
    }

    if (this.isDelay)
      return h(
        this.tag,
        this.height
          ? {
              style: {
                height: this.height
              }
            }
          : null
      )

    return getSlot(this, h, 'pending', { data: this.data })
  }
}

function convertNodes(h, wrapperTag, nodes) {
  if (nodes.length > 1 || !nodes[0].tag) return h(wrapperTag, {}, nodes)
  return nodes[0]
}

function getSlot(vm, h, name, data) {
  const slot = vm.$slots[name]
  const scopedSlot = isVue3 ? vm.$slots[name] : vm.$scopedSlots[name]
  const node = scopedSlot ? scopedSlot(data) : slot

  return Array.isArray(node) ? convertNodes(h, vm.tag, node) : node
}

function isPromise(value) {
  return value && isFunction(value.then) && isFunction(value.catch)
}

function isFunction(value) {
  return typeof value === 'function'
}
