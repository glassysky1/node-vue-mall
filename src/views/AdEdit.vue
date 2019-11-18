<template>
  <div>
    <h1>{{id?"编辑":"新建"}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位封面">
        <!-- 好厉害的感觉 -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="res => $set(model,'coverImage',res.url)"
        >
          <img v-if="model.coverImage" :src="model.coverImage" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="链接商品">
        <el-select filterable v-model="model.productId">
          <el-option v-for="(product,index) in products" :key="index" :label="product.name" :value="product._id"></el-option>
        </el-select>
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
      products: []
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
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async _fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    },
    async _fetchProducts() {
      const res = await this.$http.get(`rest/product`);
      this.products = res.data;
    }
  },
  created() {
    this.id && this._fetch();
    this._fetchProducts();
  }
};
</script>

<style>
</style>