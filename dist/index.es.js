import 'core-js/modules/es6.function.name';
import 'core-js/modules/es6.number.constructor';

var awaited = {
  props: {
    action: {
      type: [String, Function, Promise],
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    storeData: {
      type: [String, Array],
      required: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 0
    },
    pendingDelay: {
      type: Number,
      default: 200
    },
    tag: {
      type: String,
      default: 'div'
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      resolved: false,
      error: null,
      data: null,
      observer: null,
      target: null,
      isPendingDelay: true
    };
  },
  mounted: function mounted() {
    if (this.action && isString(this.action)) assert(this.$store, "Vuex doesn't installed.");
    this.target = this.$el;
    if (this.lazy) this.observe();else this.run();
  },
  destroyed: function destroyed() {
    this.unobserve();
  },
  methods: {
    run: function run() {
      var _this = this;

      if (this.delay > 0) {
        this.delayTimer = setTimeout(function () {
          _this.handler();

          clearTimeout(_this.delayTimer);
        }, this.delay);
      } else {
        this.handler();
      }
    },
    handler: function handler() {
      var _this2 = this;

      if (!this.action) {
        this.resolved = true;
        return;
      }

      var promise = getPromiseFromAction(this, this.action);
      this.resolved = false;
      this.startpendingDelay();
      promise.then(function (data) {
        _this2.data = data;
        _this2.resolved = true;
      }).catch(function (error) {
        _this2.error = error;
        _this2.resolved = true;
      });
    },
    observe: function observe() {
      var _this3 = this;

      this.observer = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio <= 0) return;

        _this3.unobserve();

        _this3.run();
      });
      this.observer.observe(this.target);
    },
    unobserve: function unobserve() {
      if (this.observer && this.target) {
        this.observer.unobserve(this.target);
        this.target = null;
      }
    },
    startpendingDelay: function startpendingDelay() {
      var _this4 = this;

      if (this.pendingDelay > 0) {
        this.isPendingDelay = true;
        this.pendingDelayTimer = setTimeout(function () {
          _this4.isPendingDelay = false;
          clearTimeout(_this4.pendingDelayTimer);
        }, this.pendingDelay);
      } else {
        this.isPendingDelay = false;
      }
    }
  },
  render: function render(h) {
    if (this.error && !this.loading) {
      return getSlot(this, h, 'error', {
        error: this.error
      });
    }

    if (this.resolved && !this.loading) {
      return getSlot(this, h, 'default', {
        data: this.data
      });
    }

    if (this.isPendingDelay) return h(this.tag, {
      style: {
        height: "".concat(this.height, "px")
      }
    });
    return getSlot(this, h, 'pending', {
      data: this.data
    });
  }
};

function ensurePromise(func) {
  return new Promise(function (resolve, reject) {
    try {
      var result = func();
      isPromise(result) && result.then(resolve, reject);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

function getPromiseFromAction(vm, action) {
  if (isString(action)) return ensurePromise(function () {
    return vm.$store.dispatch(action);
  });
  if (isFunction(action)) return ensurePromise(function () {
    return action();
  });
  if (isPromise(action)) return action;
}

function convertNodes(h, wrapperTag, nodes) {
  if (nodes.length > 1 || !nodes[0].tag) return h(wrapperTag, {}, nodes);
  return nodes[0];
}

function getSlot(vm, h, name, data) {
  var slot = vm.$slots[name];
  var scopedSlot = vm.$scopedSlots[name];
  var node = scopedSlot ? scopedSlot(data) : slot;
  return Array.isArray(node) ? convertNodes(h, vm.tag, node) : node;
}

function isString(value) {
  return typeof value === 'string';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isPromise(value) {
  return value && isFunction(value.then) && isFunction(value.catch);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-awaited] ".concat(message));
  }
}

function awaitedComponent (_ref) {
  var asyncComponent = _ref.asyncComponent,
      loading = _ref.loading;
  var resolveComponent;
  return function () {
    return {
      // resolve a component eventually.
      component: new Promise(function (resolve) {
        resolveComponent = resolve;
      }),
      loading: {
        mounted: function mounted() {
          var _this = this;

          // if `IntersectionObserver` is not supported.
          if (!('IntersectionObserver' in window)) {
            asyncComponent().then(resolveComponent);
            return;
          }

          var observer = new IntersectionObserver(function (entries) {
            // use `intersectionRatio` instead of `isIntersecting`
            // https://github.com/w3c/IntersectionObserver/issues/211
            if (entries[0].intersectionRatio <= 0) return; // cleanup the observer

            observer.unobserve(_this.$el);
            asyncComponent().then(resolveComponent);
          });
          observer.observe(this.$el);
        },
        render: function render(h) {
          return loading || h('div');
        }
      }
    };
  };
}

var main = {
  install: function install(Vue) {
    Vue.component('awaited', awaited);
    Vue.component('awaitedComponent', awaitedComponent);
  }
};

export default main;
export { awaited, awaitedComponent };
