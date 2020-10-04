/*
 * @Author: your name
 * @Date: 2020-09-27 09:16:46
 * @LastEditTime: 2020-10-04 22:51:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\utils\request.js
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getRefreshToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

let retryRequest = [] // 存放token 过期的请求

let isRefresh = false // 是否在请求新的token
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
      // 如果当前请求的accessToken过期，后端返回过期的状态码
      if (res.code === 4010002) {
        // 判断是否正在刷新
        if (!isRefresh) {
          // 将刷新accessToken的标志置为true
          isRefresh = true
          // 发起刷新accessToken的请求
          return store.dispatch('user/reGetToken', store.getters.refreshToken).then(data => {
            // 这里是去请求新的token 并返回promise 然后保存新的token
            setToken(data)
            config.headers['accessToken'] = data
            retryRequest.forEach(cb => {
              cb(data)
            })
            isRefresh = false
            retryRequest = []
            return axios(config)
          })
        } else {
          return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            retryRequest.push((token) => {
              config.headers['accessToken'] = token
              resolve(axios(config))
            })
          })
        }
      } else if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 50008: Illegal accessToken; 50012: Other clients logged in; 50014: Token expired;
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
      } else {
        Message({
          message: res.msg || '操作失败',
          type: 'error',
          duration: 5 * 1000
        })
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
