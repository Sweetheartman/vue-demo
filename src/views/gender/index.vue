<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
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
      <el-table-column label="性别编码">
        <template slot-scope="scope">
          {{ scope.row.genderCode }}
        </template>
      </el-table-column>
      <el-table-column label="性别名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.genderName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.createBy }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="更新者" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.updateBy }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column label="删除者" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.deleteBy }}
        </template>
      </el-table-column>
      <el-table-column label="删除时间" width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.deleteTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
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
import { getGenderList } from '@/api/gender'
import { deleteGender } from '@/api/gender'

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
      page: 1,
      pageSize: 5,
      totalPages: null,
      totalRows: null
    }
  },
  created() {
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
    fetchData() {
      this.listLoading = true
      const submitData = {
        'page': this.page,
        'pageSize': this.pageSize
      }
      getGenderList(submitData).then(response => {
        this.list = response.data.list
        this.page = response.data.pageNum
        this.totalPages = response.data.totalPages
        this.totalRows = response.data.totalRows
        this.listLoading = false
      })
    },
    handleAdd() {
      this.$router.push({
        path: '/gender/add'
      })
    },
    handleEdit(index, data) {
      this.$router.push({
        name: 'updategender',
        params: {
          genderName: data.genderName,
          genderId: data.genderId,
          updateCount: data.updateCount
        }
      })
    },
    handleDelete(index, data) {
      this.$confirm('此操作将删除该性别编码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        const subdata = {
          'genderId': data.genderId
        }
        deleteGender(JSON.stringify(subdata)).then(() => {
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
