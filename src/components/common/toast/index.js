import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
  console.log('执行obj');
  //1.组件构造器
  const toastcontrustor = Vue.extend(Toast)
  //2.新建一个实例
  const toast = new toastcontrustor()
  //3.将组件手动挂载到实例上
  toast.$mount(document.createElement('div'))
  //4.toast.$el就是对应的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj