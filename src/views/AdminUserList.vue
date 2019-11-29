<template>
  <div>
    <h1>管理员列表</h1>
    <el-table height="250" :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <!-- slot-scope="scope" -->
      
      <template v-slot="scope" >
        <el-button type="primary" size="small" @click="$router.push(`/admin_users/edit/${scope.row._id}`)">编辑</el-button>
        <!-- 删除一行 -->
        <el-button type="primary" size="small" @click="remove(scope.row)" >删除 </el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async _fetch() {
      const res = await this.$http.get("rest/admin_users");
      this.items = res.data;
    },
    async remove(row) {
      //加提示框
      this.$confirm(`是否确定删除品牌"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
          const res = await  this.$http.delete(`rest/admin_users/${row._id}`)
          this._fetch()
          this.$message({
            type: 'success',
            message: '删除成功!'
          }); 
        });
    }
  },
  created() {
    this._fetch();
  }
};
</script>

<style>
</style>