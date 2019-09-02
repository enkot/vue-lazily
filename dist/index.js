'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _empty() {}

function _invokeIgnored(body) {
  var result = body();

  if (result && result.then) {
    return result.then(_empty);
  }
}

var awaited = {
  props: {
    action: {
      type: [String, Promise],
      required: false
    },
    storeData: {
      type: String,
      required: false
    }
  },
  data: function data() {
    return {
      promise: null
    };
  },
  created: function created() {
    try {
      var _this2 = this;

      return _invokeIgnored(function () {
        if (typeof _this2.action === 'string') {
          _this2.$store.dispatch(_this2.action);
        } else {
          return _await(_this2.action, function (_this$action) {
            _this2.promise = _this$action;
          });
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  },
  render: function render() {
    var key = this.storeData;
    return this.$scopedSlots["default"](_defineProperty({}, key || 'data', key ? this.$store.state[key] : this.promise));
  }
};

var index = (function (Vue) {
  return Vue.component('awaited', awaited);
});

exports.awaited = awaited;
exports.default = index;
