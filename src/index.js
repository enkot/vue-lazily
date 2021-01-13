import awaited from './awaited'

export { awaited }
export default {
  install(app, { name, props } = {}) {
    if (props)
      Object.entries(props).forEach(([name, value]) => {
        const prop = awaited.props[name]
        if (prop) prop.default = value
      })

    app.component(name || 'awaited', awaited)
  }
}
