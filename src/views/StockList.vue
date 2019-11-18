<template>
  <div>
    <h1>销售图表</h1>
    <el-table :data="items">
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
      const res = await this.$http.get("rest/products");
      this.items = res.data;
    }
  },
  created() {
    this._fetch();
  }
};
</script>

<style>
</style>