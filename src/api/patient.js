/*
 * @Author: your name
 * @Date: 2020-10-01 11:40:23
 * @LastEditTime: 2020-10-01 11:50:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\api\patient.js
 */
import request from '@/utils/request'
export function getPatientList(params) {
  return request({
    url: '/api/patients',
    method: 'get',
    params
  })
}

export function addPatient(data) {
  return request({
    url: '/api/patient',
    method: 'post',
    data
  })
}

export function updatePatient(data) {
  return request({
    url: '/api/patient',
    method: 'put',
    data
  })
}

export function deletePatient(data) {
  return request({
    url: '/api/patient',
    method: 'delete',
    data
  })
}
