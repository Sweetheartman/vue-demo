/*
 * @Author: your name
 * @Date: 2020-09-30 11:54:38
 * @LastEditTime: 2020-10-01 13:07:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\api\gender.js
 */
import request from '@/utils/request'
export function getOrgList(params) {
  return request({
    url: '/api/orgs/page',
    method: 'get',
    params
  })
}

export function getOrg() {
  return request({
    url: '/api/orgs',
    method: 'get'
  })
}

export function addOrg(data) {
  return request({
    url: '/api/org',
    method: 'post',
    data
  })
}

export function updateOrg(data) {
  return request({
    url: '/api/org',
    method: 'put',
    data
  })
}

export function deleteOrg(data) {
  return request({
    url: '/api/org',
    method: 'delete',
    data
  })
}
