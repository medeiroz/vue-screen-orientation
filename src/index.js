import VueScreenOrientationMixin from './vue-screen-orientation-mixin';
import { VSO_USE_TYPE } from './vue-screen-orientation-mixin';

const install = (Vue, options) => {
  Vue.mixin(VueScreenOrientationMixin(options))
}

// Note that here we're not only exporting the install function, but
// also the mixin itself - this is so with can `Vue.use()` or
// `mixins: [],` it.
export default { install, VueScreenOrientationMixin, VSO_USE_TYPE }