function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var awaited = {
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
  data: function data() {
    return {
      resolved: false,
      error: null,
      observer: null,
      target: null
    };
  },
  mounted: function mounted() {
    assert(this.$store, "Vuex doesn't installed.");
    this.target = this.$refs.target;
    if (this.lazy) this.observe();else this.run();
  },
  destroyed: function destroyed() {
    this.unobserve();
  },
  methods: {
    run: function () {
      var _run = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.action) {
                  _context.next = 3;
                  break;
                }

                this.resolved = true;
                return _context.abrupt("return");

              case 3:
                this.resolved = false;
                _context.prev = 4;

                if (!(typeof this.action === 'string')) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return this.$store.dispatch(this.action);

              case 8:
                _context.next = 18;
                break;

              case 10:
                if (!(typeof this.action === 'function')) {
                  _context.next = 15;
                  break;
                }

                _context.next = 13;
                return this.action();

              case 13:
                _context.next = 18;
                break;

              case 15:
                if (!isPromise(this.action)) {
                  _context.next = 18;
                  break;
                }

                _context.next = 18;
                return this.action;

              case 18:
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](4);
                this.error = _context.t0;

              case 23:
                _context.prev = 23;
                this.resolved = true;
                return _context.finish(23);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 20, 23, 26]]);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }(),
    observe: function observe() {
      var _this = this;

      this.observer = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio <= 0) return;

        _this.unobserve();

        _this.run();
      });
      this.observer.observe(this.target);
    },
    unobserve: function unobserve() {
      this.observer.unobserve(this.target);
    }
  },
  render: function render(h) {
    var _this2 = this;

    var data = null;

    if (this.storeData) {
      if (Array.isArray(this.storeData)) {
        data = this.storeData.map(function (key) {
          return _this2.$store.state[key];
        });
      } else {
        data = this.$store.state[this.storeData];
      }
    }

    if (this.error) {
      return getSlot(this, h, 'error', {
        error: this.error
      });
    }

    if (this.resolved) {
      return getSlot(this, h, 'default', {
        data: data
      });
    }

    return getSlot(this, h, 'pending', {
      data: data
    });
  }
};

function getSlot(vm, h, name, data) {
  var scopedSlot = vm.$scopedSlots[name];
  return h('div', {
    ref: 'target'
  }, scopedSlot ? scopedSlot(data) : []);
}

function isPromise(value) {
  return value && typeof value.then === 'function' && typeof value.catch === 'function';
}

function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-awaited] ".concat(message));
  }
}

function awaitedComponent (_ref) {
  var asyncComponent = _ref.asyncComponent,
      loading = _ref.loading,
      rest = _objectWithoutProperties(_ref, ["asyncComponent", "loading"]);

  var resolveComponent;
  return function () {
    return _objectSpread2({
      // resolve a component eventually.
      component: new Promise(function (resolve) {
        resolveComponent = resolve;
      }),
      loading: {
        mounted: function () {
          var _mounted = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _this = this;

            var observer;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if ('IntersectionObserver' in window) {
                      _context.next = 3;
                      break;
                    }

                    asyncComponent().then(resolveComponent);
                    return _context.abrupt("return");

                  case 3:
                    observer = new IntersectionObserver(function (entries) {
                      // use `intersectionRatio` instead of `isIntersecting`
                      // https://github.com/w3c/IntersectionObserver/issues/211
                      if (entries[0].intersectionRatio <= 0) return; // cleanup the observer

                      observer.unobserve(_this.$el);
                      asyncComponent().then(resolveComponent);
                    });
                    observer.observe(this.$el);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function mounted() {
            return _mounted.apply(this, arguments);
          }

          return mounted;
        }(),
        render: function render(h) {
          return loading || h('div');
        }
      }
    }, rest);
  };
}

var index = (function (Vue) {
  return Vue.component('awaited', awaited);
});

export default index;
export { awaited, awaitedComponent };
