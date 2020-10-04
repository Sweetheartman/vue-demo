/*
 * @Author: your name
 * @Date: 2020-09-27 09:16:46
 * @LastEditTime: 2020-10-01 09:41:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\store\getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  accessToken: state => state.user.access_token,
  refreshToken: state => state.user.refresh_token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  realname: state => state.user.realname,
  nickname: state => state.user.nickname
}
export default getters
