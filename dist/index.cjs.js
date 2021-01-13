'use strict';

require('core-js/modules/es.number.constructor.js');
require('core-js/modules/es.object.to-string.js');
require('regenerator-runtime/runtime.js');
var vueDemi = require('vue-demi');

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

var _props$data$mounted$m;
var index = (_props$data$mounted$m = {
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
    },
    watch: {
      type: [Number, String, Array, Object, Function]
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
    var _this = this;

    this.target = this.$el;
    if (this.lazy) this.observe();else this.run();
    if (this.watch) this.$watch(typeof this.watch === 'function' ? this.watch : function () {
      return _this.watch;
    }, this.run);
  }
}, _defineProperty(_props$data$mounted$m, vueDemi.isVue3 ? 'unmounted' : 'destroyed', function () {
  this.unobserve();
}), _defineProperty(_props$data$mounted$m, "methods", {
  run: function run() {
    var _this2 = this;

    if (this.delay > 0) {
      this.delayTimer = setTimeout(function () {
        _this2.handler();

        clearTimeout(_this2.delayTimer);
      }, this.delay);
    } else {
      this.handler();
    }
  },
  handler: function handler() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var promise;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this3.action) {
                _context.next = 3;
                break;
              }

              _this3.resolved = true;
              return _context.abrupt("return");

            case 3:
              promise = isFunction(_this3.action) ? _this3.action() : _this3.action;
              _this3.resolved = false;

              _this3.startpendingDelay();

              _context.prev = 6;
              _context.next = 9;
              return promise;

            case 9:
              _this3.data = _context.sent;
              _this3.resolved = true;
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](6);
              _this3.error = _context.t0;
              _this3.resolved = true;

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 13]]);
    }))();
  },
  observe: function observe() {
    var _this4 = this;

    this.observer = new IntersectionObserver(function (entries) {
      if (entries[0].intersectionRatio <= 0) return;

      _this4.unobserve();

      _this4.run();
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
    var _this5 = this;

    if (this.pendingDelay > 0) {
      this.isPendingDelay = true;
      this.pendingDelayTimer = setTimeout(function () {
        _this5.isPendingDelay = false;
        clearTimeout(_this5.pendingDelayTimer);
      }, this.pendingDelay);
    } else {
      this.isPendingDelay = false;
    }
  }
}), _defineProperty(_props$data$mounted$m, "render", function render(createElement) {
  var h = vueDemi.isVue3 ? vueDemi.Vue.h : createElement;

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
}), _props$data$mounted$m);

function convertNodes(h, wrapperTag, nodes) {
  if (nodes.length > 1 || !nodes[0].tag) return h(wrapperTag, {}, nodes);
  return nodes[0];
}

function getSlot(vm, h, name, data) {
  var slot = vm.$slots[name];
  var scopedSlot = vueDemi.isVue3 ? vm.$slots[name] : vm.$scopedSlots[name];
  var node = scopedSlot ? scopedSlot(data) : slot;
  return Array.isArray(node) ? convertNodes(h, vm.tag, node) : node;
}

function isFunction(value) {
  return typeof value === 'function';
}

module.exports = index;
