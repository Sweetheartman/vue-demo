<!--
 * @Author: your name
 * @Date: 2020-09-30 14:07:36
 * @LastEditTime: 2020-10-01 17:48:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template-master\src\views\gender\add.vue
-->
<template>
  <el-card class="box-card">
    <el-page-header content="添加患者信息" style="margin-left: 2%;margin-bottom: 2%;" @back="goBack" />
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="机构名称" prop="orgCode">
        <el-select v-model="ruleForm.orgCode" filterable placeholder="请选择">
          <el-option
            v-for="item in orgOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="患者姓名" prop="patientName">
        <el-input v-model="ruleForm.patientName" style="width:200px;" />
      </el-form-item>
      <el-form-item label="性别" prop="genderCode">
        <el-select v-model="ruleForm.genderCode" filterable placeholder="请选择">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthDate">
        <el-date-picker
          v-model="ruleForm.birthDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          style="width:200px;"
        />
      </el-form-item>
      <el-form-item label="身份证号" prop="socialNo">
        <el-input v-model="ruleForm.socialNo" style="width:200px;" />
      </el-form-item>
      <el-form-item label="联系电话" prop="telecom">
        <el-input v-model="ruleForm.telecom" style="width:200px;" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" style="width:200px;" />
      </el-form-item>
      <el-form-item label="证件类型" prop="identityType">
        <el-select v-model="ruleForm.identityType" filterable placeholder="请选择">
          <el-option
            v-for="item in identityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号" prop="identityNo">
        <el-input v-model="ruleForm.identityNo" style="width:200px;" />
      </el-form-item>
      <el-form-item label="家庭住址" prop="homeFullAddress">
        <el-input v-model="ruleForm.homeFullAddress" style="width:200px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { addPatient } from '@/api/patient'
import { getGenders } from '@/api/gender'
import { getIdentity } from '@/api/identity'
import { getOrg } from '@/api/organization'
import { validateIdNo } from '@/utils/validate'
import { validatePhone } from '@/utils/validate'
import { validateEMail } from '@/utils/validate'

export default {
  data() {
    return {
      ruleForm: {
        orgCode: '',
        patientName: '',
        genderCode: '',
        birthDate: '',
        socialNo: '',
        telecom: '',
        email: '',
        identityType: '',
        identityNo: '',
        homeFullAddress: ''
      },
      rules: {
        orgCode: [
          { required: true, message: '请选择机构', trigger: 'change' }
        ],
        patientName: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        genderName: [
          { required: true, message: '请选择患者性别', trigger: 'change' }
        ],
        birthDate: [
          { required: true, message: '请选择患者出生日期', trigger: 'change' }
        ],
        socialNo: [
          { required: true, message: '请输入患者身份证号', trigger: 'blur' },
          { validator: validateIdNo, trigger: 'blur' }
        ],
        telecom: [
          { required: true, message: '请输入患者联系电话', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入患者邮箱', trigger: 'blur' },
          { validator: validateEMail, trigger: 'blur' }
        ],
        identityType: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        identityNo: [
          { required: true, message: '请输入患者证件号', trigger: 'blur' }
        ],
        homeFullAddress: [
          { required: true, message: '请输入家庭住址', trigger: 'blur' }
        ]
      },
      orgOptions: null,
      genderOptions: null,
      identityOptions: null
    }
  },
  mounted() {
    this.getGenderData()
    this.getOrgData()
    this.getIdentityData()
  },
  methods: {
    getGenderData() {
      this.loading = true
      getGenders().then((response) => {
        const genderData = response.data
        var slectData = []
        genderData.forEach(function(value, key, iterable) {
          var temp = {
            'value': value.genderCode,
            'label': value.genderName
          }
          slectData.push(temp)
        })
        this.genderOptions = slectData
        this.loading = false
      }).catch(() => {
        this.loading = false
        console.log('get gender data failure!')
      })
    },
    getOrgData() {
      this.loading = true
      getOrg().then((response) => {
        const orgData = response.data
        var slectData = []
        orgData.forEach(function(value, key, iterable) {
          var temp = {
            'value': value.orgCode,
            'label': value.orgName
          }
          slectData.push(temp)
        })
        this.orgOptions = slectData
        this.loading = false
      }).catch(() => {
        this.loading = false
        console.log('get orgnazition data failure!')
      })
    },
    getIdentityData() {
      this.loading = true
      getIdentity().then((response) => {
        const identityData = response.data
        var slectData = []
        identityData.forEach(function(value, key, iterable) {
          var temp = {
            'value': value.identityType,
            'label': value.identityName
          }
          slectData.push(temp)
        })
        this.identityOptions = slectData
        this.loading = false
      }).catch(() => {
        this.loading = false
        console.log('get identity data failure!')
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addPatient(JSON.stringify(this.ruleForm)).then(() => {
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
        path: '/patient/index'
      })
    }
  }
}
</script>
