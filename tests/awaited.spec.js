import { mount } from '@vue/test-utils'
import fakePromise from 'faked-promise'
import { awaited } from '../src'

const DELAY = 10 // reduce default delay to run tests faster

const flushPromises = () => new Promise(setImmediate)
const waitDelay = () => new Promise(resolve => setTimeout(resolve, DELAY))

describe('Awaited', () => {
  let wrapper, promise, resolve, reject

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

  const mountWrapper = ({
    actionProp = action,
    lazy = false,
    delay = DELAY
  } = {}) => {
    wrapper = mount(awaited, {
      propsData: { action: actionProp, lazy, delay },
      scopedSlots: {
        default: `<span slot-scope="props">{{ props.data || 'default' }}</span>`,
        pending: '<span>pending</span>',
        error: `<span slot-scope="props">{{ props.error.message }}</span>`
      }
    })
  }

  beforeEach(() => {
    mountWrapper()
  })
  describe('without lazy load', () => {
    it('displays default data with no action prop', async () => {
      mountWrapper({ actionProp: null })
      await waitDelay()
      expect(wrapper.text()).toBe('default')
    })
    it('display nothing with default delay', () => {
      expect(wrapper.text()).toBe('')
    })
    it('display pending when function passed after waiting delay', async () => {
      await waitDelay()
      expect(wrapper.text()).toBe('pending')
    })
    it('display data when function resolves', async () => {
      resolve('data')
      await flushPromises()
      expect(wrapper.text()).toBe('data')
    })
    it('display data when sync function resolves', async () => {
      mountWrapper({ actionProp: syncAction })
      // await flushPromises()
      expect(wrapper.text()).toBe('data')
    })
    it('display data when promise resolves', async () => {
      mountWrapper({ actionProp: action() })
      resolve('data')
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
    it('displays nothing with no action prop', async () => {
      mountWrapper({ actionProp: null, lazy: true })
      expect(wrapper.text()).toBe('')
    })
    it('display pending when function passed', async () => {
      intersect([{ intersectionRatio: 1 }])
      await waitDelay()
      expect(wrapper.text()).toBe('pending')
    })
    it('display data when function resolves', async () => {
      intersect([{ intersectionRatio: 1 }])
      resolve('data')
      await flushPromises()
      expect(wrapper.text()).toBe('data')
    })
    it('display error when function rejects', async () => {
      intersect([{ intersectionRatio: 1 }])
      reject(new Error('error'))
      await flushPromises()
      expect(wrapper.text()).toBe('error')
    })
    it('unobserve element on unmount', async () => {
      wrapper.destroy()
      expect(unobserveFn).toBeCalled()
    })
  })
})
