<template>
  <div>
    <h1>{{id?"编辑":"新建"}}商品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属品牌">
        <el-select v-model="model.brand">
          <el-option v-for="item in brands" :label="item.name" :value="item._id" :key="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      brands: []
    };
  },
  props: {
    id: {
      type: String
    }
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/products/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/products", this.model);
      }
      this.$router.push("/products/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async _fetch() {
      const res = await this.$http.get(`rest/products/${this.id}`);
      this.model = res.data;
    },
    async _fetchBrand() {
      const res = await this.$http.get(`rest/brands`);
      this.brands = res.data;
    }
  },
  created() {
    this.id && this._fetch();
    this._fetchBrand()
  }
};
</script>

<style>
</style>