<template>
  <div>
    <h1>广告位列表</h1>
    <el-table height="80vh" :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="coverImage" label="广告位封面">
        <template v-slot = "scope">
          <img :src="scope.row.coverImage" style="height:3rem;">
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template v-slot="scope">
          <el-button
            type="primary"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
            size="small"
          >编辑</el-button>
          <el-button type="primary" @click="remove(scope.row)" size="small">删除</el-button>
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
      const res = await this.$http.get("rest/ads");
      this.items = res.data;
    },
    async remove(row) {
      //加提示框
      this.$confirm(`是否确定删除广告位"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
          const res = await  this.$http.delete(`rest/ads/${row._id}`)
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