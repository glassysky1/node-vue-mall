<template>
  <div>
    <h1>订单列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="username" label="订单名"></el-table-column>
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
      const res = await this.$http.get("rest/web_users");
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