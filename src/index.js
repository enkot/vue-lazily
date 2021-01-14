import awaited from './awaited'

export { awaited }
export default {
  install(app, { name, props } = {}) {
    if (props)
      Object.keys(props).forEach(name => {
        const prop = awaited.props[name]
        if (prop) prop.default = props[name]
      })

    app.component(name || 'awaited', awaited)
  }
}
