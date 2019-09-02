'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _empty() {}

function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty) : Promise.resolve();
  }
}

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function _rethrow(thrown, value) {
  if (thrown) throw value;
  return value;
}

function _finallyRethrows(body, finalizer) {
  try {
    var result = body();
  } catch (e) {
    return finalizer(true, e);
  }

  if (result && result.then) {
    return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
  }

  return finalizer(false, value);
}

function _continueIgnored(value) {
  if (value && value.then) {
    return value.then(_empty);
  }
}

var awaited = {
  props: {
    action: {
      type: String,
      required: false
    },
    storeData: {
      type: String,
      required: false
    },
    lazy: {
      type: Boolean,
      "default": false
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
    if (!this.action) return;
    this.target = this.$refs.target;
    if (this.lazy) this.observe();else this.run();
  },
  destroyed: function destroyed() {
    this.unobserve();
  },
  methods: {
    run: function run() {
      try {
        var _this2 = this;

        _this2.resolved = false;
        return _continueIgnored(_finallyRethrows(function () {
          return _catch(function () {
            return _awaitIgnored(_this2.$store.dispatch(_this2.action));
          }, function (error) {
            _this2.error = error;
          });
        }, function (_wasThrown, _result) {
          _this2.resolved = true;
          return _rethrow(_wasThrown, _result);
        }));
      } catch (e) {
        return Promise.reject(e);
      }
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
      this.observer.unobserve(this.target);
    }
  },
  render: function render(h) {
    var key = this.storeData;

    if (this.error) {
      return getSlot(this, h, 'error', this.error);
    }

    if (this.resolved) {
      return getSlot(this, h, 'default', this.$store.state[key]);
    }

    return getSlot(this, h, 'pending', this.$store.state[key]);
  }
};

function getSlot(vm, h, name, data) {
  if (vm.$scopedSlots[name]) {
    return h('div', [vm.$scopedSlots[name]({
      data: data
    }), h('div', {
      ref: 'target'
    })]);
  }
}

var index = (function (Vue) {
  return Vue.component('awaited', awaited);
});

exports.awaited = awaited;
exports.default = index;
