/*
 * @Author: your name
 * @Date: 2020-09-30 11:54:38
 * @LastEditTime: 2020-10-01 13:03:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\api\gender.js
 */
import request from '@/utils/request'

export function getGenderList(params) {
  return request({
    url: '/api/genders/page',
    method: 'get',
    params
  })
}

export function getGenders() {
  return request({
    url: '/api/genders',
    method: 'get'
  })
}

export function addGender(data) {
  return request({
    url: '/api/gender',
    method: 'post',
    data
  })
}

export function updateGender(data) {
  return request({
    url: '/api/gender',
    method: 'put',
    data
  })
}

export function deleteGender(data) {
  return request({
    url: '/api/gender',
    method: 'delete',
    data
  })
}
