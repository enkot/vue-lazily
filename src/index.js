import Lazily from './Lazily'

export { Lazily }
export default {
  install(app, { name, props } = {}) {
    if (props)
      Object.keys(props).forEach(name => {
        const prop = Lazily.props[name]
        if (prop) prop.default = props[name]
      })

    app.component(name || 'Lazily', Lazily)
  }
}
