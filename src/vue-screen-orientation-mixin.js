import Vue from 'vue'
const screenOrientation = require('screen-orientation-2')

const reactiveComponent = new Vue({
  data() {
    return {
      vsoDirection: null,
      vsoVersion: null,
      vsoAngle: null,
    }
  }
})

const VSO_USE_TYPE = {
  AUTO: 'AUTO',
  ORIENTATION: 'ORIENTATION',
  WINDOW: 'WINDOW',
};

export { VSO_USE_TYPE }

export default (options) => {
  return {
    data() {
      return {
        // AUTO use ORIENTATION by default if ORIENTATION not suported then use WINDOW
        vsoUse: options.vsoUse || VSO_USE_TYPE.AUTO,
      }
    },
    computed: {
      $vsoDirection() {
          return reactiveComponent.vsoDirection || screenOrientation.getScreenOrientation().direction || 'portrait'
      },
      $vsoVersion() {
          return reactiveComponent.vsoVersion || screenOrientation.getScreenOrientation().version || 'primary'
      },
      $vsoAngle() {
        return reactiveComponent.vsoAngle || screenOrientation.getScreenOrientation().angle || 0
      },
    },
    methods: {
      handleOrientationChage(newOrientation) {
        reactiveComponent.vsoDirection = newOrientation.direction
        reactiveComponent.vsoVersion = newOrientation.version
        reactiveComponent.vsoAngle = newOrientation.angle
      },
  
      $vsoDestroyListener() {
        screenOrientation.removeEventOnOrientationChange()
      },
    },
    destroyed() {
      screenOrientation.removeEventOnOrientationChange()
    },
    watch: {
      vsoUse: {
        immediate: true,
        handler() {
          screenOrientation.removeEventOnOrientationChange()
          switch(this.vsoUse) {
            case VSO_USE_TYPE.WINDOW:
              screenOrientation.setUseWindowSize()
              break;
            case VSO_USE_TYPE.ORIENTATION:
              screenOrientation.setUseOrientation()
              break;
          }
          this.handleOrientationChage(screenOrientation.getScreenOrientation())
          screenOrientation.addEventOnOrientationChange(this.handleOrientationChage)
        },
      }
    }
  }
}