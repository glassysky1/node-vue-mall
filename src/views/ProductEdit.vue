<template>
  <div>
    <h1>{{id?"编辑":"新建"}}商品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
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
          <el-form-item label="商品名">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="model.subtitle"></el-input>
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
        <el-tab-pane label="参数配置" name="parameter">
          <el-col :md="10">
            <el-form-item label="评分">
              <el-rate
                style="margin-top:.6rem"
                :max="10"
                show-score
                v-model="model.parameter.score"
              ></el-rate>
            </el-form-item>
            <el-form-item label="生产日期">
              <el-date-picker
                v-model="model.parameter.productionDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="屏幕材质">
              <el-select v-model="model.parameter.screenMaterial">
                <el-option
                  v-for="(item,index) in screenMaterials"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="屏幕尺寸">
              <el-input style="width:211px;" v-model="model.parameter.screenSize"></el-input>
            </el-form-item>
            <el-form-item label="屏幕分辨率">
              <el-select filterable v-model="model.parameter.screenRatio">
                <el-option
                  v-for="(screenRatio,index) in screenRatioes"
                  :key="index"
                  :label="screenRatio"
                  :value="screenRatio"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="CPU型号">
              <el-select filterable v-model="model.parameter.cpuType">
                <el-option
                  v-for="(cpuType,index) in cpuTypes"
                  :key="index"
                  :label="cpuType.name"
                  :value="cpuType.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="RAM容量">
              <el-select filterable v-model="model.parameter.ramSize">
                <el-option
                  v-for="(ramSize,index) in ramSizes"
                  :key="index"
                  :label="ramSize"
                  :value="ramSize"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="RAM存储类型">
              <el-select filterable v-model="model.parameter.ramType">
                <el-option
                  v-for="(ramType,index) in ramTypes"
                  :key="index"
                  :label="ramType"
                  :value="ramType"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="ROM容量">
              <el-select filterable v-model="model.parameter.romSize">
                <el-option
                  v-for="(romSize,index) in romSizes"
                  :key="index"
                  :label="romSize"
                  :value="romSize"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="ROM存储类型">
              <el-select filterable v-model="model.parameter.romType">
                <el-option
                  v-for="(romType,index) in romTypes"
                  :key="index"
                  :label="romType"
                  :value="romType"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电池容量(mh)">
              <el-input style="width:211px" v-model="model.parameter.batteryCapacity"></el-input>
            </el-form-item>
            <el-form-item label="重量(g)">
              <el-input style="width:211px" v-model="model.parameter.weight"></el-input>
            </el-form-item>
            <el-form-item label="前置摄像头">
              <el-input v-model="model.parameter.frontCamera"></el-input>
            </el-form-item>
            <el-form-item label="后置摄像头">
              <el-input v-model="model.parameter.rearCamera"></el-input>
            </el-form-item>
          </el-col>
        </el-tab-pane>

        <el-tab-pane label="详细配置" name="storage">
          <el-button
            size="small"
            @click="model.storages ? model.storages.push({}) : $set(model,'storages',[{}])"
          >
            <i class="el-icon-plus"></i>添加存储容量及价格
          </el-button>
          <el-row>
            <el-col
              style="border-bottom:1px solid #DCDFE6; margin-top:1rem;"
              v-for="(storage,index) in model.storages"
              :key="index"
            >
              <el-form-item label="存储容量">
                <el-select v-model="storage.name">
                  <el-option
                    v-for="(storageCapacity,index) in storageCapacitis"
                    :key="index"
                    :value="storageCapacity"
                    :label="storageCapacity"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="原价(元)">
                <el-input style="width:211px" v-model="storage.oldPrice"></el-input>
              </el-form-item>
              <el-form-item label="现价(元)">
                <el-input style="width:211px" v-model="storage.nowPrice"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  @click=" storage.colors ? storage.colors.push({}) : $set(storage,'colors',[{}])"
                >
                  <i class="el-icon-plus"></i>添加机身颜色及库存销量
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-row type="flex" style="flex-wrap:wrap">
                  <el-col :md="8" v-for="(color,index) in storage.colors" :key="index">
                    <el-form-item label="机身颜色">
                      <el-input v-model="color.name"></el-input>
                    </el-form-item>
                    <el-form-item label="库存">
                      <el-input v-model="color.stock"></el-input>
                    </el-form-item>
                    <el-form-item label="销量">
                      <el-input v-model="color.salesVolume"></el-input>
                    </el-form-item>
                    <el-form-item label-width="50px">
                      <el-button
                        style="margin-top:1rem;"
                        type="danger"
                        size="small"
                        @click="storage.colors.splice(index,1)"
                      >删除</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label-width="50px">
                <el-button
                  style="margin-top:1rem;"
                  type="danger"
                  @click="model.storages.splice(index,1)"
                >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
        },
        storages: [
          {
            colors: [
              {
                name: ""
              }
            ]
          }
        ]
      },
      screenMaterials: ["TFT LCD（IPS）", "AMOLED", "TFT材质（IPS技术）"],
      brands: [],
      screenRatioes: [
        "1280×720",
        "1920×1080",
        "2256x1080",
        "2400x1080",
        "2340x1080",
        "2560×1440",
        "2400x1176",
        "3040x1440",
        "3840×2160"
      ],
      storageCapacitis: [
        "4GB+64GB",
        "6GB+64GB",
        "6GB+128GB",
        "8GB+128GB",
        "8GB+256GB",
        "8GB+512GB",
        "12GB+256GB",
        "12GB+512GB"
      ],
      cpuTypes: [
        {
          name: "麒麟990",
          level: 16
        },
        {
          name: "骁龙855 Plus",
          level: 15
        },
        {
          name: "骁龙855",
          level: 14
        },

        {
          name: "Exynos 9820",
          level: 13
        },
        {
          name: "麒麟980",
          level: 12
        },
        {
          name: "骁龙845",
          level: 12
        },
        {
          name: "Exynos 9810	",
          level: 12
        },

        {
          name: "麒麟810	",
          level: 11
        },
        {
          name: "骁龙835(MSM8998)",
          level: 10
        },
        {
          name: "骁龙730",
          level: 10
        }
      ],
      ramSizes: ["4GB", "6GB", "8GB","10GB", "12GB"],
      ramTypes: ["LPDDR3", "LPDDR4", "LPDDR4X"],
      romSizes: ["64GB/128GB", "128GB/256GB", "128GB/256GB/512GB", "256GB/512GB"],
      romTypes: ["UFS 2.1", "UFS 3.0"]
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
        this.$router.push("/products/list");
      }
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