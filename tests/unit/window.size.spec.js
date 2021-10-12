import { createLocalVue, shallowMount  } from '@vue/test-utils'
import VueScreenOrientation from '../../src'

const localVue = createLocalVue()
localVue.use(VueScreenOrientation)

const screenComponent = {
  template: '<div>Hello Wolrd</div>',
}

let wrapper
let events = {}

afterEach(() => {
  wrapper.vm.$vsoDestroyListener()
})

beforeEach(() => {
  delete global.screen;
  events = {}
  global.addEventListener = (event, callback) => {
    events[event] = callback;
  }
  global.removeEventListener = (event, callback) => {
    if (events[event] === callback) {
      delete events[event]
    }
  }
  global.dispatchEvent = (event, eventData) => {
    if (events.hasOwnProperty(event)) {
      events[event](eventData)
    }
  }
  wrapper = shallowMount(screenComponent, { localVue })

  global.innerWidth = 1024;
  global.innerHeight = 800;
});


describe('With window size', () => {
  test('Default Load', () => {
    expect(wrapper.vm.$vsoDirection).toEqual('landscape')
    expect(wrapper.vm.$vsoVersion).toEqual('primary')
    expect(wrapper.vm.$vsoAngle).toEqual(0)
  })
  
  test('Rotate left', async () => {
    global.dispatchEvent('resize', {
      target: {
        innerWidth: 800,
        innerHeight: 1024,
      }
    })
  
    await new Promise(resolve => setTimeout(resolve, 200));

    expect(wrapper.vm.$vsoDirection).toEqual('portrait')
    expect(wrapper.vm.$vsoVersion).toEqual('primary')
    expect(wrapper.vm.$vsoAngle).toEqual(0)
  })
  
  
  test('$vsoDestroyListener', async () => {
    global.dispatchEvent('resize', {
      target: {
        innerWidth: 1024,
        innerHeight: 800,
      }
    })

    wrapper.vm.$vsoDestroyListener()
  
    global.dispatchEvent('resize', {
      target: {
        innerWidth: 800,
        innerHeight: 1024,
      }
    })
  
    await new Promise(resolve => setTimeout(resolve, 200));
    expect(wrapper.vm.$vsoDirection).not.toEqual('portrait')
  })
})