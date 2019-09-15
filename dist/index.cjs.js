'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es6.function.name');

var awaited = {
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
  data: function data() {
    return {
      resolved: false,
      error: null,
      data: null,
      observer: null,
      target: null
    };
  },
  mounted: function mounted() {
    if (this.action && isString(this.action)) assert(this.$store, "Vuex doesn't installed.");
    this.target = this.$refs.target;
    if (this.lazy) this.observe();else this.run();
  },
  destroyed: function destroyed() {
    this.unobserve();
  },
  methods: {
    run: function run() {
      var _this = this;

      if (!this.action) {
        this.resolved = true;
        return;
      }

      var promise = getPromiseFromAction(this, this.action);
      assert(promise, "Action prop is not valid. It should be Vuex action name, function or promise");
      this.resolved = false;
      promise.then(function (data) {
        _this.data = data;
      }).catch(function (error) {
        _this.error = error;
      }).finally(function () {
        _this.resolved = true;
      });
    },
    observe: function observe() {
      var _this2 = this;

      this.observer = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio <= 0) return;

        _this2.unobserve();

        _this2.run();
      });
      this.observer.observe(this.target);
    },
    unobserve: function unobserve() {
      this.observer.unobserve(this.target);
    }
  },
  render: function render(h) {
    if (this.error) {
      return getSlot(this, h, 'error', {
        error: this.error
      });
    }

    if (this.resolved) {
      return getSlot(this, h, 'default', {
        data: this.data
      });
    }

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
  return null;
}

function wrapper(h) {
  var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return h('div', {
    ref: 'target'
  }, children);
}

function getSlot(vm, h, name, data) {
  var slot = vm.$slots[name];
  var scopedSlot = vm.$scopedSlots[name];
  return wrapper(h, scopedSlot ? scopedSlot(data) : slot || []);
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

exports.awaited = awaited;
exports.awaitedComponent = awaitedComponent;
exports.default = main;
