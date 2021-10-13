import Vue from 'vue';

var screenOrientation = require('screen-orientation-2');

var reactiveComponent = new Vue({
  data: function data() {
    return {
      vsoDirection: null,
      vsoVersion: null,
      vsoAngle: null,
    }
  }
});

var VSO_USE_TYPE = {
  AUTO: 'AUTO',
  ORIENTATION: 'ORIENTATION',
  WINDOW: 'WINDOW',
};

function mixin (options) {
  return {
    data: function data() {
      return {
        // AUTO use ORIENTATION by default if ORIENTATION not suported then use WINDOW
        vsoUse: options.vsoUse || VSO_USE_TYPE.AUTO,
      }
    },
    computed: {
      $vsoDirection: function $vsoDirection() {
          return reactiveComponent.vsoDirection || screenOrientation.getScreenOrientation().direction || 'portrait'
      },
      $vsoVersion: function $vsoVersion() {
          return reactiveComponent.vsoVersion || screenOrientation.getScreenOrientation().version || 'primary'
      },
      $vsoAngle: function $vsoAngle() {
        return reactiveComponent.vsoAngle || screenOrientation.getScreenOrientation().angle || 0
      },
    },
    methods: {
      handleOrientationChage: function handleOrientationChage(newOrientation) {
        reactiveComponent.vsoDirection = newOrientation.direction;
        reactiveComponent.vsoVersion = newOrientation.version;
        reactiveComponent.vsoAngle = newOrientation.angle;
      },
  
      $vsoDestroyListener: function $vsoDestroyListener() {
        screenOrientation.removeEventOnOrientationChange();
      },
    },
    destroyed: function destroyed() {
      screenOrientation.removeEventOnOrientationChange();
    },
    watch: {
      vsoUse: {
        immediate: true,
        handler: function handler() {
          screenOrientation.removeEventOnOrientationChange();
          switch(this.vsoUse) {
            case VSO_USE_TYPE.WINDOW:
              screenOrientation.setUseWindowSize();
              break;
            case VSO_USE_TYPE.ORIENTATION:
              screenOrientation.setUseOrientation();
              break;
          }
          this.handleOrientationChage(screenOrientation.getScreenOrientation());
          screenOrientation.addEventOnOrientationChange(this.handleOrientationChage);
        },
      }
    }
  }
}

var install = function (Vue$$1, options) {
  Vue$$1.mixin(mixin(options));
};

// Note that here we're not only exporting the install function, but
// also the mixin itself - this is so with can `Vue.use()` or
// `mixins: [],` it.
var index = { install: install, mixin: mixin, VSO_USE_TYPE: VSO_USE_TYPE }

export default index;
