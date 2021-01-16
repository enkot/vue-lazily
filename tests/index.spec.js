import Lazily from '../src'

describe('Index', () => {
  let app, passedName, passedComponent

  const name = 'test'
  const props = {
    action: () => null,
    lazy: false,
    delay: 300,
    margin: '300px',
    threshold: 0.3,
    height: '300px',
    tag: 'div',
    watch: () => null,
    fetchOptions: {},
    actionHandler: () => {}
  }

  beforeEach(() => {
    app = {
      component(name, component) {
        passedName = name
        passedComponent = component
      }
    }
  })
  describe('without lazy load', () => {
    it('displays default data with no action prop', async () => {
      Lazily.install(app, { name, props })
      expect(passedName).toBe(name)
      Object.entries(passedComponent.props).forEach(([name, value]) => {
        expect(value.default).toBe(props[name])
      })
    })
  })
})
