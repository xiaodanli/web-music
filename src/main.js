import 'babel-polyfill'             /* 转换ES6API */
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'   /* 解决移动端300ms延迟问题 */

import 'common/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
