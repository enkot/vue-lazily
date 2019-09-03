import { _ as __vue_normalize__, a as __vue_create_injector__ } from './browser-ece6c030.js';

//
//
//
//
//
//
//
//
//

var script = {
  props: ['characters']
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "ul",
    _vm._l(_vm.characters, function(character) {
      return _c("li", { key: character.name }, [
        _c("img", { attrs: { src: character.image } }),
        _vm._v(" "),
        _c("h4", [_vm._v(_vm._s(character.name))])
      ])
    }),
    0
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2f010d6a_0", { source: "\nul[data-v-2f010d6a] {\n  padding: 0;\n}\nli[data-v-2f010d6a] {\n  list-style: none;\n}\n", map: {"version":3,"sources":["/Users/tarasbatenkov/Projects/vue-awaited/example/Characters.vue"],"names":[],"mappings":";AAgBA;EACA,UAAA;AACA;AACA;EACA,gBAAA;AACA","file":"Characters.vue","sourcesContent":["<template>\n  <ul>\n    <li v-for=\"character in characters\" :key=\"character.name\">\n      <img :src=\"character.image\" />\n      <h4>{{ character.name }}</h4>\n    </li>\n  </ul>\n</template>\n\n<script>\nexport default {\n  props: ['characters']\n}\n</script> \n\n<style scoped>\nul {\n  padding: 0;\n}\nli {\n  list-style: none;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-2f010d6a";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var Characters = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  );

export default Characters;
//# sourceMappingURL=Characters-2e57b86f.js.map
