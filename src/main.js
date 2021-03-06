import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store'
import fastclick from "fastclick";
/* 解决移动端300ms延迟问题 */
import VueLazyload from "vue-lazyload";
import "common/stylus/index.styl";
import Vconsole from 'vconsole'
var vConsole = new Vconsole();

Vue.config.productionTip = false
Vue.use(VueLazyload, {
    loading: require('common/image/default.png')
})

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
