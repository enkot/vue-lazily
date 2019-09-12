import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { intersectionObserver } from '@shopify/jest-dom-mocks'
import fakePromise from 'faked-promise'
import awaited from '@/components/awaited'

const localVue = createLocalVue()
localVue.use(Vuex)

const flushPromises = () => new Promise(setImmediate)

const slots = {
  pending: '<span>pending</span>'
}
const scopedSlots = {
  default: '<span slot-scope="{ data }">{{ data }}</span>',
  error: '<span class="error" slot-scope="{ error }">{{ error.message }}</span>'
}

describe('Awaited', () => {
  let wrapper, store, promise, resolve, reject

  const action = function() {
    ;[promise, resolve, reject] = fakePromise()

    return promise
  }

  const mountWrapper = ({ actionProp = action, lazy = false } = {}) => {
    wrapper = mount(awaited, {
      store,
      localVue,
      propsData: { action: actionProp, lazy },
      slots,
      scopedSlots
    })
  }

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        foo: action
      }
    })
    mountWrapper()
  })
  describe('without lazy load', () => {
    it('displays pending with no action prop', () => {
      mountWrapper({ actionProp: null })
      expect(wrapper.text()).toBe('pending')
    })
    it('display pending when function passed', () => {
      expect(wrapper.text()).toBe('pending')
    })
    it('display data when function resolves', async () => {
      resolve('foo')
      await flushPromises()
      expect(wrapper.text()).toBe('foo')
    })
    it('display data when Vuex action resolves', async () => {
      mountWrapper({ actionProp: 'foo' })
      resolve('foo')
      await flushPromises()
      expect(wrapper.text()).toBe('foo')
    })
    it('display data when promise resolves', async () => {
      mountWrapper({ actionProp: action() })
      resolve('foo')
      await flushPromises()
      expect(wrapper.text()).toBe('foo')
    })
    it('display error when function rejects', async () => {
      reject(new Error('bar'))
      await flushPromises()
      expect(wrapper.text()).toBe('bar')
    })
    it('display error when Vuex action rejects', async () => {
      mountWrapper({ actionProp: 'foo' })
      reject(new Error('bar'))
      await flushPromises()
      expect(wrapper.text()).toBe('bar')
    })
    it('display error when promise rejects', async () => {
      mountWrapper({ actionProp: action() })
      reject(new Error('bar'))
      await flushPromises()
      expect(wrapper.text()).toBe('bar')
    })
  })
  describe('with lazy load', () => {
    beforeEach(() => {
      intersectionObserver.mock()
      mountWrapper({ lazy: true })
    })
    afterEach(() => {
      intersectionObserver.restore()
    })
    it('displays pending with no action prop', () => {
      mountWrapper({ actionProp: null, lazy: true })
      expect(wrapper.text()).toBe('pending')
    })
  })
})
