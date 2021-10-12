import { createLocalVue, shallowMount  } from '@vue/test-utils'
import VueScreenOrientation from '../../src'

const localVue = createLocalVue()
localVue.use(VueScreenOrientation)

const screenComponent = {
  template: '<div>Hello Wolrd</div>',
}

let wrapper
let events = {}

beforeEach(() => {
  events = {};
  global.screen.orientation = {
    type: 'portrait-primary',
    angle: 0,
    onchange: null,
    addEventListener(event, callback) {
      events[event] = callback;
    },
    removeEventListener(event, callback) {
      if (events[event] === callback) {
        delete events[event]
      }
    },
    dispatchEvent(event, eventData) {
      if (events.hasOwnProperty(event)) {
        events[event](eventData)
      }
    }
  }
  wrapper = shallowMount(screenComponent, { localVue })
});


describe('With window.screen.orientation', () => {
  test('Default Load', () => {
    expect(wrapper.vm.$vsoDirection).toEqual('portrait')
    expect(wrapper.vm.$vsoVersion).toEqual('primary')
    expect(wrapper.vm.$vsoAngle).toEqual(0)
  })
  
  test('Rotate left 1 time', () => {
    global.screen.orientation.dispatchEvent('change', {
      target: {
        type: 'landscape-primary',
        angle: 90,
      }
    })
  
    expect(wrapper.vm.$vsoDirection).toEqual('landscape')
    expect(wrapper.vm.$vsoVersion).toEqual('primary')
    expect(wrapper.vm.$vsoAngle).toEqual(90)
  })
  
  test('Rotate left 2 times', () => {
    global.screen.orientation.dispatchEvent('change', {
      target: {
        type: 'portrait-secondary',
        angle: 180,
      }
    })
  
    expect(wrapper.vm.$vsoDirection).toEqual('portrait')
    expect(wrapper.vm.$vsoVersion).toEqual('secondary')
    expect(wrapper.vm.$vsoAngle).toEqual(180)
  })
  
  test('Rotate left 3 time', () => {
    global.screen.orientation.dispatchEvent('change', {
      target: {
        type: 'landscape-secondary',
        angle: 270,
      }
    })
  
    expect(wrapper.vm.$vsoDirection).toEqual('landscape')
    expect(wrapper.vm.$vsoVersion).toEqual('secondary')
    expect(wrapper.vm.$vsoAngle).toEqual(270)
  })
  
  test('Rotate left 4 times', () => {
    global.screen.orientation.dispatchEvent('change', {
      target: {
        type: 'portrait-primary',
        angle: 0,
      }
    })
  
    expect(wrapper.vm.$vsoDirection).toEqual('portrait')
    expect(wrapper.vm.$vsoVersion).toEqual('primary')
    expect(wrapper.vm.$vsoAngle).toEqual(0)
  })
  
  
  test('$vsoDestroyListener', () => {
    wrapper.vm.$vsoDestroyListener()
  
    global.screen.orientation.dispatchEvent('change', {
      target: {
        type: 'landscape-secondary',
        angle: 270,
      }
    })
  
    expect(wrapper.vm.$vsoDirection).not.toEqual('landscape')
    expect(wrapper.vm.$vsoVersion).not.toEqual('secondary')
    expect(wrapper.vm.$vsoAngle).not.toEqual(270)
  })
})