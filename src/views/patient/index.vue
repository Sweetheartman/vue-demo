<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="患者姓名">
        <el-input
          v-model="patientName"
          size="mini"
          placeholder="请输入患者姓名"
          clearable
        />
      </el-form-item>
      <el-form-item label="机构名称">
        <el-select v-model="orgCode" size="mini" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in orgOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="genderCode" size="mini" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="identityType" size="mini" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in identityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="fetchData()"
        >查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd()"
        >添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="机构名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orgName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="患者姓名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.genderName }}
        </template>
      </el-table-column>
      <el-table-column label="出生日期" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.birthDate }}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.socialNo }}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-phone" />
          {{ scope.row.telecom }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="证件名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.identityName }}
        </template>
      </el-table-column>
      <el-table-column label="家庭住址" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.homeFullAddress }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="page"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRows"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getPatientList } from '@/api/patient'
import { deletePatient } from '@/api/patient'
import { getGenders } from '@/api/gender'
import { getIdentity } from '@/api/identity'
import { getOrg } from '@/api/organization'

export default {
  inject: ['reload'], // 刷新
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      patientName: '',
      genderCode: '',
      identityType: '',
      orgCode: '',
      homeFullAddress: '',
      page: 1,
      pageSize: 5,
      totalPages: null,
      totalRows: null,
      orgOptions: null,
      genderOptions: null,
      identityOptions: null
    }
  },
  created() {
    this.getGenderData()
    this.getOrgData()
    this.getIdentityData()
    this.fetchData()
  },
  methods: {
    // 分页 当前页改变时的函数
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.fetchData()
    },
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
    fetchData() {
      this.listLoading = true
      const submitData = {
        'page': this.page,
        'pageSize': this.pageSize,
        'patientName': this.patientName,
        'genderCode': this.genderCode,
        'identityType': this.identityType,
        'orgCode': this.orgCode
      }
      getPatientList(submitData).then(response => {
        this.list = response.data.list
        this.page = response.data.pageNum
        this.totalPages = response.data.totalPages
        this.totalRows = response.data.totalRows
        this.listLoading = false
      })
    },
    handleAdd() {
      this.$router.push({
        path: '/patient/add'
      })
    },
    handleEdit(index, data) {
      this.$router.push({
        name: 'updatepatient',
        params: {
          orgCode: data.orgCode,
          patientName: data.patientName,
          genderCode: data.genderCode,
          birthDate: data.birthDate,
          socialNo: data.socialNo,
          telecom: data.telecom,
          email: data.email,
          identityType: data.identityType,
          identityNo: data.identityNo,
          homeFullAddress: data.homeFullAddress,
          homeAddrProvince: data.homeAddrProvince,
          homeAddrCity: data.homeAddrCity,
          homeAddrCounty: data.homeAddrCounty,
          homeAddrTown: data.homeAddrTown,
          homeAddrVillage: data.homeAddrVillage,
          homeAddrHouseNo: data.homeAddrHouseNo,
          homeZipCode: data.homeZipCode,
          id: data.id,
          updateCount: data.updateCount
        }
      })
    },
    handleDelete(index, data) {
      this.$confirm('此操作将删除该患者信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        const subdata = {
          'id': data.id
        }
        deletePatient(JSON.stringify(subdata)).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loading = false
          this.reload()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }
}
</script>
