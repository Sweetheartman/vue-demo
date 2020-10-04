<!--
 * @Author: your name
 * @Date: 2020-09-30 14:07:36
 * @LastEditTime: 2020-10-01 17:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\views\gender\add.vue
-->
<template>
  <el-card class="box-card">
    <el-page-header content="添加证件类型编码信息" style="margin-left: 2%;margin-bottom: 2%;" @back="goBack" />
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
import { addIdentity } from '@/api/identity'

export default {
  data() {
    return {
      ruleForm: {
        identityName: ''
      },
      rules: {
        identityName: [
          { required: true, message: '请输入证件编码名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addIdentity(JSON.stringify(this.ruleForm)).then(() => {
            this.$message({
              message: '添加成功',
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
