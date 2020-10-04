<!--
 * @Author: your name
 * @Date: 2020-09-30 14:07:36
 * @LastEditTime: 2020-10-01 17:55:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\views\gender\add.vue
-->
<template>
  <el-card class="box-card">
    <el-page-header content="添加性别信息" style="margin-left: 2%;margin-bottom: 2%;" @back="goBack" />
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="性别名称" prop="genderName">
        <el-input v-model="ruleForm.genderName" style="width:200px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { addGender } from '@/api/gender'

export default {
  data() {
    return {
      ruleForm: {
        genderName: ''
      },
      rules: {
        genderName: [
          { required: true, message: '请输入性别编码名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addGender(JSON.stringify(this.ruleForm)).then(() => {
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
        path: '/system/gender'
      })
    }
  }
}
</script>
