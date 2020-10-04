/*
 * @Author: your name
 * @Date: 2020-09-27 09:16:46
 * @LastEditTime: 2020-10-05 00:45:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\store\modules\user.js
 */
import { login, logout, getInfo, reGetToken } from '@/api/user'
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    access_token: getToken(),
    refresh_token: getRefreshToken(),
    username: '',
    realname: '',
    nickname: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.access_token = token
  },
  SET_REFRESHTOKEN: (state, token) => {
    state.refresh_token = token
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_REALNAME: (state, realname) => {
    state.realname = realname
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.accessToken)
        commit('SET_REFRESHTOKEN', data.refreshToken)
        setToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  reGetToken({ commit }, refreshToken) {
    return new Promise((resolve, reject) => {
      reGetToken({ 'refreshToken': refreshToken }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { username, realName, nickName, avatar } = data

        commit('SET_NAME', username)
        commit('SET_REALNAME', realName)
        commit('SET_NICKNAME', nickName)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.access_token).then(() => {
        removeToken() // must remove  token  first
        removeRefreshToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeRefreshToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

