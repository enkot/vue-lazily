import 'core-js/modules/es.array.for-each.js';
import 'core-js/modules/es.function.name.js';
import 'core-js/modules/es.object.entries.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import arrayWithHoles from '@babel/runtime/helpers/esm/arrayWithHoles';
import iterableToArrayLimit from '@babel/runtime/helpers/esm/iterableToArrayLimit';
import unsupportedIterableToArray from '@babel/runtime/helpers/esm/unsupportedIterableToArray';
import nonIterableRest from '@babel/runtime/helpers/esm/nonIterableRest';
import 'core-js/modules/es.number.constructor.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.symbol.js';
import 'core-js/modules/es.array.filter.js';
import 'core-js/modules/es.object.get-own-property-descriptor.js';
import 'core-js/modules/es.object.get-own-property-descriptors.js';
import 'core-js/modules/es.object.keys.js';
import defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import 'core-js/modules/es.symbol.description.js';
import 'core-js/modules/es.symbol.iterator.js';
import 'core-js/modules/es.string.iterator.js';
import 'core-js/modules/web.dom-collections.iterator.js';
import 'regenerator-runtime/runtime.js';
import { isVue3, Vue } from 'vue-demi';

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
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
      ownKeys(Object(source), true).forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
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

var _props$data$mounted$c;
var awaited = (_props$data$mounted$c = {
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
      default: function _default() {}
    },
    actionHandler: {
      type: Function
    }
  },
  data: function data() {
    return {
      resolved: false,
      error: null,
      data: null,
      observer: null,
      target: null,
      isDelay: true
    };
  },
  mounted: function mounted() {
    this.target = this.$el;
    if (this.lazy) this.observe();
  },
  created: function created() {
    var _this = this;

    if (!this.lazy) this.run();
    if (this.watch) this.$watch(typeof this.watch === 'function' ? this.watch : function () {
      return _this.watch;
    }, this.run);
  }
}, _defineProperty(_props$data$mounted$c, isVue3 ? 'unmounted' : 'destroyed', function () {
  this.unobserve();
}), _defineProperty(_props$data$mounted$c, "methods", {
  run: function run() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this2.action) {
                _context.next = 3;
                break;
              }

              _this2.resolved = true;
              return _context.abrupt("return");

            case 3:
              _this2.resolved = false;

              _this2.startDelay();

              _context.prev = 5;

              if (!_this2.actionHandler) {
                _context.next = 10;
                break;
              }

              _context.t0 = _this2.actionHandler(_this2.action);
              _context.next = 13;
              break;

            case 10:
              _context.next = 12;
              return _this2.getData(_this2.action);

            case 12:
              _context.t0 = _context.sent;

            case 13:
              _this2.data = _context.t0;
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t1 = _context["catch"](5);
              _this2.error = _context.t1;

            case 19:
              _context.prev = 19;
              _this2.resolved = true;
              return _context.finish(19);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 16, 19, 22]]);
    }))();
  },
  getData: function getData(action) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = _typeof(action);
              _context2.next = _context2.t0 === 'string' ? 3 : _context2.t0 === 'function' ? 4 : 8;
              break;

            case 3:
              return _context2.abrupt("return", fetch(action, _objectSpread2({}, _this3.fetchOptions)).then(function (data) {
                return data.json();
              }));

            case 4:
              _context2.next = 6;
              return action();

            case 6:
              result = _context2.sent;
              return _context2.abrupt("return", result instanceof Response ? result.json() : result);

            case 8:
              return _context2.abrupt("return", action);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  observe: function observe() {
    var _this4 = this;

    this.observer = new IntersectionObserver(function (entries) {
      if (entries[0].intersectionRatio <= 0) return;

      _this4.unobserve();

      _this4.run();
    }, {
      rootMargin: this.margin,
      threshold: this.threshold
    });
    this.observer.observe(this.target);
  },
  unobserve: function unobserve() {
    if (this.observer && this.target) {
      this.observer.unobserve(this.target);
      this.target = null;
    }
  },
  startDelay: function startDelay() {
    var _this5 = this;

    if (this.delay > 0) {
      this.isDelay = true;
      var delayTimer = setTimeout(function () {
        _this5.isDelay = false;
        clearTimeout(delayTimer);
      }, this.delay);
    } else {
      this.isDelay = false;
    }
  }
}), _defineProperty(_props$data$mounted$c, "render", function render(createElement) {
  var h = isVue3 ? Vue.h : createElement;

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

  if (this.isDelay) return h(this.tag, this.height ? {
    style: {
      height: this.height
    }
  } : null);
  return getSlot(this, h, 'pending', {
    data: this.data
  });
}), _props$data$mounted$c);

function convertNodes(h, wrapperTag, nodes) {
  if (nodes.length > 1 || !nodes[0].tag) return h(wrapperTag, {}, nodes);
  return nodes[0];
}

function getSlot(vm, h, name, data) {
  var slot = vm.$slots[name];
  var scopedSlot = isVue3 ? vm.$slots[name] : vm.$scopedSlots[name];
  var node = scopedSlot ? scopedSlot(data) : slot;
  return Array.isArray(node) ? convertNodes(h, vm.tag, node) : node;
}

var index = {
  install: function install(app) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        name = _ref.name,
        props = _ref.props;

    if (props) Object.entries(props).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          name = _ref3[0],
          value = _ref3[1];

      var prop = awaited.props[name];
      if (prop) prop.default = value;
    });
    app.component(name || 'awaited', awaited);
  }
};

export default index;
export { awaited };
