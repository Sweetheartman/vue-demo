<!--
 * @Author: your name
 * @Date: 2020-09-27 09:16:46
 * @LastEditTime: 2020-09-30 17:11:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\App.vue
-->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true // 控制视图是否显示的变量
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false // 先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true // 再打开
      })
    }
  }
}
</script>
