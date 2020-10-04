/*
 * @Author: your name
 * @Date: 2020-09-27 09:16:46
 * @LastEditTime: 2020-10-01 18:25:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-AccessToken'
const RefreshTokenKey = 'Admin-RefreshToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(refresh_token) {
  return Cookies.set(RefreshTokenKey, refresh_token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}
