/*
 * @Author: your name
 * @Date: 2020-09-27 09:16:46
 * @LastEditTime: 2020-10-01 23:50:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\utils\request.js
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getRefreshToken } from '@/utils/auth'
import { reGetToken } from '@/api/user'
import { setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 是否有请求正在刷新accessToken
window.isRefreshing = false

// 被挂起的请求数组
let refreshSubscribers = []

// push所有请求到数组中
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

// 刷新请求（refreshSubscribers数组中的请求得到新的accessToken之后会自执行，用新的token去请求数据）
function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token))
}
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.accessToken) { // store/getter.js设置
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['accessToken'] = getToken()
    }
    if (store.getters.refreshToken) { // store/getter.js设置
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['refreshToken'] = getRefreshToken()
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const config = response.config
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || '操作失败',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal accessToken; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      // 如果当前请求的accessToken过期，后端返回过期的状态码
      if (res.code === 4010002) {
        // 判断是否正在刷新
        if (!window.isRefreshing) {
          // 将刷新accessToken的标志置为true
          window.isRefreshing = true
          // 发起刷新accessToken的请求
          reGetToken({ refreshToken: getRefreshToken() }).then(responseData => {
            // 将标志置为false
            window.isRefreshing = false
            // 成功刷新accessToken
            config.headers['accessToken'] = responseData.data
            // 更新accessToken
            setToken(responseData.data)
            // 执行数组里的函数,重新发起被挂起的请求
            onRrefreshed(responseData.data)
            // 执行onRefreshed函数后清空数组中保存的请求
            refreshSubscribers = []
          }).catch(err => {
            alert(err.response.data.message)
            window.location.href = '#/login'
          })
        }
        // 把请求(token)=>{....}都push到一个数组中
        const retry = new Promise((resolve, reject) => {
          // (token) => {...}这个函数就是回调函数
          subscribeTokenRefresh((token) => {
            config.headers['accessToken'] = token
            // 将请求挂起
            resolve(config)
          })
        })
        return retry
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
