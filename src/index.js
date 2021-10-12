import VueScreenOrientationMixin from './vue-screen-orientation-mixin';

const install = (Vue) => {
  Vue.mixin(VueScreenOrientationMixin)
}

// Note that here we're not only exporting the install function, but
// also the mixin itself - this is so with can `Vue.use()` or
// `mixins: [],` it.
export default { install, VueScreenOrientationMixin }