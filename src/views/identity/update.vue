<!--
 * @Author: your name
 * @Date: 2020-09-30 14:07:36
 * @LastEditTime: 2020-10-01 17:55:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\views\gender\add.vue
-->
<template>
  <el-card class="box-card">
    <el-page-header content="更新证件编码信息" style="margin-left: 2%;margin-bottom: 2%;" @back="goBack" />
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="证件名称" prop="identityName">
        <el-input v-model="ruleForm.identityName" style="width:200px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { updateIdentity } from '@/api/identity'

export default {
  data() {
    return {
      ruleForm: {
        identityName: '',
        identityId: null,
        updateCount: null
      },
      rules: {
        orgName: [
          { required: true, message: '请输入证件名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.ruleForm.identityName = this.$route.params.identityName
    this.ruleForm.identityId = this.$route.params.identityId
    this.ruleForm.updateCount = this.$route.params.updateCount
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          updateIdentity(JSON.stringify(this.ruleForm)).then(() => {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.goBack()
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.push({
        path: '/system/identity'
      })
    }
  }
}
</script>
