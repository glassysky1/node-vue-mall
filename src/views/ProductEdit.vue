<template>
  <div>
    <h1>{{id?"编辑":"新建"}}商品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="storage">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="所属品牌">
            <el-select v-model="model.brand" filterable>
              <el-option
                v-for="item in brands"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="model.subtitle"></el-input>
          </el-form-item>
          <el-form-item label="详情">
            <el-input v-model="model.detail"></el-input>
          </el-form-item>
          <el-form-item label="封面图片">
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
          <el-form-item label="详情图片">
            <!-- 好厉害的感觉 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="res => $set(model,'detailImage',res.url)"
            >
              <img v-if="model.detailImage" :src="model.detailImage" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <!-- score: { type: Number },
    productionDate: { type: String },
    screenMaterial: { type: String },
    screenSize: { type: String },
    resolution: { type: String },
    screenRatio: { type: String },
    cpuType: { type: String },
    ramSize: { type: String },
    ramType: { type: String },
    romSize: { type: String },
    romType: { type: String },
    batteryCapacity: { type: String },
    rearCamera: { type: String },
    frontCamera: { type: String },
        weight: { type: String }-->
        <el-tab-pane label="参数配置" name="parameter">
          <el-form-item label="评分">
            <el-input v-model="model.parameter.score"></el-input>
          </el-form-item>
          <el-form-item label="生产日期">
            <el-date-picker v-model="model.parameter.productionDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="屏幕材质">
            <el-select v-model="model.parameter.screenMaterial">
              <el-option v-for="(item,index) in screenMaterials" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="屏幕尺寸">
          </el-form-item>
        </el-tab-pane>
        
        <el-tab-pane label="存储类型" name="storage">

        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        parameter: {
          score: 0
        }
      },
      screenMaterials:[
        'AMOLED',
        'TFT材质（IPS技术）',
        'TFT LCD（IPS）'
      ],
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
    this._fetchBrand();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem !important;
  text-align: center;
}

.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>