<!--
 * @Author: your name
 * @Date: 2020-09-27 09:16:46
 * @LastEditTime: 2020-10-02 16:22:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\views\dashboard\index.vue
-->
<template>
  <div class="dashboard-container">
    <dov class="dashboard-text">用户名: {{ username }}</dov>
    <div class="dashboard-text">用户真实姓名: {{ realname }}</div>
    <div class="dashboard-text">用户昵称: {{ nickname }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'realname',
      'nickname'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
