<template>
  <div>
    <h1>品牌列表</h1>
    <el-table height="250" :data="items.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="brand.name" label="所属品牌"></el-table-column>
      <el-table-column align="right">
        <template #header v-slot="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template v-slot="scope">
          <el-button
            type="primary"
            @click="$router.push(`/products/edit/${scope.row._id}`)"
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
      items: [],
      search: ""
    };
  },
  methods: {
    async _fetch() {
      const res = await this.$http.get("rest/products");
      this.items = res.data;
    },
    async remove(row) {
      //加提示框
      this.$confirm(`是否确定删除商品"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/products/${row._id}`);
        this._fetch();
        this.$message({
          type: "success",
          message: "删除成功!"
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