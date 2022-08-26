import { PluginObject } from "vue";
import Lazily from "./Lazily";

export { Lazily };
export default {
  install(app, { name, props }) {
    if (props)
      Object.keys(props).forEach((name) => {
        // @ts-ignore
        const prop = Lazily.props[name];
        if (prop) prop.default = props[name];
      });

    app.component(name || "Lazily", Lazily);
  },
} as PluginObject<any>;
