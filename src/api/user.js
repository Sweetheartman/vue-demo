/*
 * @Author: your name
 * @Date: 2020-09-27 09:16:46
 * @LastEditTime: 2020-10-02 10:03:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\api\user.js
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(access_token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { access_token }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function reGetToken(params) {
  return request({
    url: '/api/user/token',
    method: 'get',
    params
  })
}

export function testRefreshToken() {
  return request({
    url: '/api/user/test',
    method: 'get'
  })
}

export function updatePwd(data) {
  return request({
    url: '/api/user/pwd',
    method: 'put',
    data
  })
}
