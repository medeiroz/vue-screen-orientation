# vue-screen-orientation

Get easy and reactive access to the width and height of your screen.

<p align="left">
  <a href="https://www.npmjs.com/package/vue-screen-orientation"><img src="https://img.shields.io/npm/v/vue-screen-orientaion.svg" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/vue-screen-orientation"><img src="https://img.shields.io/npm/dm/vue-screen-orientation.svg" alt="NPM Downloads"></a>
  <a href="http://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

### Links

[View demo](https://MedeirosDev.github.io/vue-screen-orientation/)

[View on npm](https://www.npmjs.com/package/vue-screen-orientation)

[View on GitHub](https://github.com/MedeirosDev/vue-screen-orientation)

### Install

```bash
# npm
npm i vue-screen-orientation

# yarn
yarn add vue-screen-orientation
```

Or you can include it through the browser at the bottom of your page:

```html
<script src="https://unpkg.com/vue-screen-orientation/dist/vue-screen-orientation.min.js"></script>
```

### About

Sometimes when building an app you need to have access to the screen's orientation. Usually that's going to be done in the css using `@media` - but sometimes you need to access that info right in your JavaScript.

The issue with this is you have to worry about adding event listeners and then removing them later. We wanted to just be able to import something quickly and then be able to forget about it later. So this `mixin` does just that - just use `Vue.use()` or `mixins: [],` and you're off.

There is something to consider - where and how you include this library. There are two ways, make sure to be aware of the differences:

### Usage Example 1 - Whole app has access (Not Recommended)

In this usage - your whole app - and every child component - has access to the `$vsoDirection`, `$vsoVersion`, and `$vsoAngle` variables. This is sorta pollutive though, as multiple instances of the mixin are initialized and it's kinda wasteful. The is due to the way Vue mixins are passed down to child components. You can read more about this [here](https://vuejs.org/v2/guide/mixins.html#Global-Mixin). The second example is recommended.

```javascript
import VueScreenOrientation from 'vue-screen-orientation'

const options = { vsoUse: VueScreenOrientation.VSO_USE_TYPE.AUTO }

Vue.use(VueScreenOrientation, options)
// Or 
Vue.use(VueScreenOrientation)

// Access `this.$vsoDirection`, `this.$vsoVersion`, and `this.$vsoAngle` anywhere in your app.
```

### Usage Example 2 - Just the component you install it on has access - (Recommended)

In this usage - the component you install it on will have access to the `$vsoDirection`, `$vsoVersion`, and `$vsoAngle` variables. This may be a bit more restrictive, but it's less wasteful and should give you better performance.

```javascript
import VueScreenOrientation from 'vue-screen-orientation'

const options = { vsoUse: VueScreenOrientation.VSO_USE_TYPE.AUTO }

export default {
    ...
    mixins: [VueScreenOrientation.VueScreenOrientationMixin(options)],
    ...
}

// Or without options

export default {
    ...
    mixins: [VueScreenOrientation.VueScreenOrientationMixin()],
    ...
}


// Access `this.$vsoDirection`, `this.$vsoVersion`, and `this.$vsoAngle` in your component.
```
### Options of `vsoUse`

| name | description |
|--------|------------|-------------|
| VSO_USE_TYPE.`AUTO` | Orientation behavior is defined by default `VSO_TYPE.ORIENTATION` if supported. If not supported, `VSO_TYPE.WINDOW` is used |
| VSO_USE_TYPE.`ORIENTATION` | Use window.screen.orientation object to get informations |
| VSO_USE_TYPE.`WINDOW` | Calculate de informations based on window's sizes |


### Variables

| name | type | description | Enum |
|--------|------------|-------------|-------------|
| $vsoDirection | String | The direction of your screen | portrait / landscape |
| $vsoVersion | String | The version of your screen | primary / secondary |
| $vsoAngle | Number | The angle rotation of screen | 0 ~ 360 |

### Methods

| method | parameters | description |
|--------|------------|-------------|
| $vsoDestroyListener | none | Force the removal of the attached event listener |

### Development

```bash
# install dependencies
npm install

# serve with hot reload
npm run watch

# run the tests
npm run test

# build demo page
npm run build:example

# build
npm run build

# publish to npm
npm publish
```

### Other

Go ahead and fork the project! Submit an issue if needed. Have fun!

### License

[MIT](http://opensource.org/licenses/MIT)

Packaged with a mixture of 
- [vue-screen-size](https://github.com/johndatserakis/vue-screen-size)
- [vue-lib-template](https://github.com/biigpongsatorn/vue-lib-template)
- [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup)