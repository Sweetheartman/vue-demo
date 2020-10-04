/*
 * @Author: your name
 * @Date: 2020-10-01 09:15:54
 * @LastEditTime: 2020-10-01 13:03:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\api\identity.js
 */
import request from '@/utils/request'
export function getIdentityList(params) {
  return request({
    url: '/api/identities/page',
    method: 'get',
    params
  })
}

export function getIdentity() {
  return request({
    url: '/api/identities',
    method: 'get'
  })
}

export function addIdentity(data) {
  return request({
    url: '/api/identity',
    method: 'post',
    data
  })
}

export function updateIdentity(data) {
  return request({
    url: '/api/identity',
    method: 'put',
    data
  })
}

export function deleteIdentity(data) {
  return request({
    url: '/api/identity',
    method: 'delete',
    data
  })
}
