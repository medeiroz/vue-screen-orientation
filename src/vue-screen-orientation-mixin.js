import Vue from 'vue'
import {
  getScreenOrientation,
  addEventOnOrientationChange,
  removeEventOnOrientationChange
} from 'screen-orientation'

const reactiveComponent = new Vue({
  data() {
    return {
      vsoDirection: null,
      vsoVersion: null,
      vsoAngle: null,
    }
  }
})

export default {
  computed: {
    $vsoDirection() {
        return reactiveComponent.vsoDirection || getScreenOrientation().direction || 'portrait'
    },
    $vsoVersion() {
        return reactiveComponent.vsoVersion || getScreenOrientation().version || 'primary'
    },
    $vsoAngle() {
      return reactiveComponent.vsoAngle || getScreenOrientation().angle || 0
    },
  },
  methods: {
    handleOrientationChage(newOrientation) {
      reactiveComponent.vsoDirection = newOrientation.direction
      reactiveComponent.vsoVersion = newOrientation.version
      reactiveComponent.vsoAngle = newOrientation.angle
    },

    $vsoDestroyListener() {
      removeEventOnOrientationChange()
    },
  },
  mounted() {
    addEventOnOrientationChange(this.handleOrientationChage)
  },
  destroyed() {
    removeEventOnOrientationChange()
  }
}