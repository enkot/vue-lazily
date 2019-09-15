import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import fakePromise from 'faked-promise'
import awaited from '@/components/awaited'

const localVue = createLocalVue()
localVue.use(Vuex)

const flushPromises = () => new Promise(setImmediate)

const slots = {
  default: '<span>data</span>',
  pending: '<span>pending</span>'
}
const scopedSlots = {
  error: '<span slot-scope="{ error }">{{ error.message }}</span>'
}

describe('Awaited', () => {
  let wrapper, store, promise, resolve, reject

  const action = function() {
    ;[promise, resolve, reject] = fakePromise()

    return promise
  }

  const syncAction = function() {
    return 'data'
  }

  const syncActionReject = function() {
    throw Error('error')
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
    it('displays data with no action prop', async () => {
      mountWrapper({ actionProp: null })
      expect(wrapper.text()).toBe('data')
    })
    it('display pending when function passed', () => {
      expect(wrapper.text()).toBe('pending')
    })
    it('display data when function resolves', async () => {
      resolve()
      await flushPromises()
      expect(wrapper.text()).toBe('data')
    })
    it('display data when sync function resolves', async () => {
      mountWrapper({ actionProp: syncAction })
      await flushPromises()
      expect(wrapper.text()).toBe('data')
    })
    it('display data when Vuex action resolves', async () => {
      mountWrapper({ actionProp: 'foo' })
      resolve()
      await flushPromises()
      expect(wrapper.text()).toBe('data')
    })
    it('display data when promise resolves', async () => {
      mountWrapper({ actionProp: action() })
      resolve()
      await flushPromises()
      expect(wrapper.text()).toBe('data')
    })
    it('display error when function rejects', async () => {
      reject(new Error('error'))
      await flushPromises()
      expect(wrapper.text()).toBe('error')
    })
    it('display data when sync function rejects', async () => {
      mountWrapper({ actionProp: syncActionReject })
      await flushPromises()
      expect(wrapper.text()).toBe('error')
    })
    it('display error when Vuex action rejects', async () => {
      mountWrapper({ actionProp: 'foo' })
      reject(new Error('error'))
      await flushPromises()
      expect(wrapper.text()).toBe('error')
    })
    it('display error when promise rejects', async () => {
      mountWrapper({ actionProp: action() })
      reject(new Error('error'))
      await flushPromises()
      expect(wrapper.text()).toBe('error')
    })
  })
  describe('with lazy load', () => {
    let intersect, unobserveFn
    beforeEach(() => {
      unobserveFn = jest.fn()
      global.IntersectionObserver = function(cb) {
        intersect = cb
        return {
          observe: () => {},
          unobserve: unobserveFn
        }
      }
      mountWrapper({ lazy: true })
    })
    it('displays pending with no action prop', async () => {
      mountWrapper({ actionProp: null, lazy: true })
      expect(wrapper.text()).toBe('pending')
    })
    it('display pending when function passed', async () => {
      expect(wrapper.text()).toBe('pending')
    })
    it('display data when function resolves', async () => {
      intersect([{ intersectionRatio: 1 }])
      resolve()
      await flushPromises()
      expect(wrapper.text()).toBe('data')
    })
    it('display data when Vuex action resolves', async () => {
      mountWrapper({ actionProp: 'foo', lazy: true })
      intersect([{ intersectionRatio: 1 }])
      resolve()
      await flushPromises()
      expect(wrapper.text()).toBe('data')
    })
    it('display error when function rejects', async () => {
      intersect([{ intersectionRatio: 1 }])
      reject(new Error('error'))
      await flushPromises()
      expect(wrapper.text()).toBe('error')
    })
    it('unobserve element on destroy', async () => {
      wrapper.destroy()
      expect(unobserveFn).toBeCalled()
    })
  })
})
