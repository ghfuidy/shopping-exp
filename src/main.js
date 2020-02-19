import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import toast from './components/common/toast/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import "normalize.css"

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//移动端快速点击
FastClick.attach(document.body)
//图片懒加载插件
Vue.use(VueLazyLoad, {
  preLoad: 1,
  attempt: 3,
  loading: require('./assets/img/loadimg.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
