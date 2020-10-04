/*
 * @Author: your name
 * @Date: 2020-09-27 09:16:46
 * @LastEditTime: 2020-09-30 09:50:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\main.js
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import JSEncrypt from 'jsencrypt'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.prototype.$getRsaCode = function(str) {
  const pubKey = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDfQNVcVF7UBlQdt5L/E/8xE+6Z
  Y4MTB2uAHzzD6X7QTt8ihW4+hNsyEEKgdEHj0Xys3nNca+lC3jxX9xkxfQs8ShmJ
  Le+wOVozIlWA4ZUpLclB0oSaCqxPy7+ca9n0QcpjOorsQ0n1aI2yvlSvwW1INc+2
  DIV2oqeigFzesraPmQIDAQAB
  -----END PUBLIC KEY-----`
  const encryptStr = new JSEncrypt()
  encryptStr.setPublicKey(pubKey)
  const data = encryptStr.encrypt(str.toString())
  return data
}
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
