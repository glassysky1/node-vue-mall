<template>
  <div class="product-details">
    <header-footer>
      <div class="w">
        <div class="content clearfix">
          <div class="right fr">
            <h1 class="title">{{product.name}} {{storageName}} {{colorName}} {{product.subtitle}}</h1>
            <p class="price" v-if="product.storages">
              价&nbsp;格
              <span class="nowPrice">￥{{product.storages[storageIndex].nowPrice}}</span>
              <span
                class="oldPrice"
                v-show="product.storages[storageIndex].nowPrice != product.storages[storageIndex].oldPrice"
              >￥{{product.storages[storageIndex].oldPrice}}</span>
            </p>
            <div class="select-options">
              <div class="storages">
                <span class="text">选择版本</span>
                <button
                  @click="selectStorage(storage, index)"
                  class="storage"
                  :class="{'active':storageIndex === index}"
                  v-for="(storage,index) in product.storages"
                  :key="index"
                >{{storage.name}}</button>
              </div>
              <div class="colors" v-if="product.storages">
                <span class="text">选择颜色</span>
                <button
                  class="color"
                  @click="selectColor(color, index)"
                  :class="{'active':colorIndex === index,'no-result':product.storages[storageIndex].colors[index].stock===0}"
                  v-for="(color,index) in product.storages[storageIndex].colors"
                  :key="index"
                >{{color.name}}</button>
              </div>
              <div class="other" v-if="product.storages">
                <span
                  class="sale"
                >销量: {{product.storages[storageIndex].colors[colorIndex].salesVolume}}件</span>
                <span class="stock">库存: {{product.storages[storageIndex].colors[colorIndex].stock}}件</span>
              </div>
            </div>
            <div class="cart">
              <el-input-number
                class="input-number"
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="stock"
                label="描述文字"
              ></el-input-number>
              <button class="btn" v-if="stock" @click="addToCartList">加入购物车</button>
              <button class="btn active" v-else>暂时无货</button>
            </div>
          </div>
          <div class="left">
            <div class="image-wrapper">
              <img :src="product.detailImage" alt />
            </div>
          </div>
        </div>
        <div class="bottom">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="商品参数" name="first">
              <div class="search fr">
                <h3 class="ac font16" style="margin-bottom:10px">手机参数对比</h3>
                <el-select filterable v-model="contrastProductId">
                  <el-option
                    v-for="item in productList"
                    :label="item.name"
                    :value="item._id"
                    :key="item._id"
                  ></el-option>
                </el-select>
              </div>
              <el-row type="flex" style="flex-wrap:wrap">
                <el-col :md="12">
                  <table v-if="product.parameter">
                    <caption>基本参数</caption>
                    <tbody>
                      <tr>
                        <td>ZOL评分</td>
                        <td>{{product.parameter.score}}</td>
                      </tr>
                      <tr>
                        <td>生产日期</td>
                        <td>{{product.parameter.productionDate|date}}</td>
                      </tr>
                      <tr>
                        <td>屏幕材质</td>
                        <td>{{product.parameter.screenMaterial}}</td>
                      </tr>
                      <tr>
                        <td>屏幕尺寸</td>
                        <td>{{product.parameter.screenSize}}英寸</td>
                      </tr>
                      <tr>
                        <td>屏幕分辨率</td>
                        <td>{{product.parameter.screenRatio}}</td>
                      </tr>
                      <tr>
                        <td>CPU型号</td>
                        <td>{{product.parameter.cpuType}}</td>
                      </tr>
                      <tr>
                        <td>RAM容量</td>
                        <td>{{product.parameter.ramSize}}</td>
                      </tr>
                      <tr>
                        <td>RAM存储类型</td>
                        <td>{{product.parameter.ramType}}</td>
                      </tr>
                      <tr>
                        <td>ROM容量</td>
                        <td>{{product.parameter.romSize}}</td>
                      </tr>
                      <tr>
                        <td>ROM存储类型</td>
                        <td>{{product.parameter.romType}}</td>
                      </tr>
                      <tr>
                        <td>电池容量</td>
                        <td>{{product.parameter.batteryCapacity}}mAh</td>
                      </tr>
                      <tr>
                        <td>重量</td>
                        <td>{{product.parameter.weight}}</td>
                      </tr>
                      <tr>
                        <td>前置摄像头</td>
                        <td>{{product.parameter.frontCamera}}</td>
                      </tr>
                      <tr>
                        <td>后置摄像头</td>
                        <td>{{product.parameter.rearCamera}}</td>
                      </tr>
                    </tbody>
                  </table>
                </el-col>
                <el-col :md="12">
                  <table v-if="contrastProduct.parameter">
                    <caption>基本参数</caption>
                    <tbody>
                      <tr>
                        <td>ZOL评分</td>
                        <td>{{contrastProduct.parameter.score}}</td>
                      </tr>
                      <tr>
                        <td>生产日期</td>
                        <td>{{contrastProduct.parameter.productionDate|date}}</td>
                      </tr>
                      <tr>
                        <td>屏幕材质</td>
                        <td>{{contrastProduct.parameter.screenMaterial}}</td>
                      </tr>
                      <tr>
                        <td>屏幕尺寸</td>
                        <td>{{contrastProduct.parameter.screenSize}}英寸</td>
                      </tr>
                      <tr>
                        <td>屏幕分辨率</td>
                        <td>{{contrastProduct.parameter.screenRatio}}</td>
                      </tr>
                      <tr>
                        <td>CPU型号</td>
                        <td>{{contrastProduct.parameter.cpuType}}</td>
                      </tr>
                      <tr>
                        <td>RAM容量</td>
                        <td>{{contrastProduct.parameter.ramSize}}</td>
                      </tr>
                      <tr>
                        <td>RAM存储类型</td>
                        <td>{{contrastProduct.parameter.ramType}}</td>
                      </tr>
                      <tr>
                        <td>ROM容量</td>
                        <td>{{contrastProduct.parameter.romSize}}</td>
                      </tr>
                      <tr>
                        <td>ROM存储类型</td>
                        <td>{{contrastProduct.parameter.romType}}</td>
                      </tr>
                      <tr>
                        <td>电池容量</td>
                        <td>{{contrastProduct.parameter.batteryCapacity}}mAh</td>
                      </tr>
                      <tr>
                        <td>重量</td>
                        <td>{{contrastProduct.parameter.weight}}</td>
                      </tr>
                      <tr>
                        <td>前置摄像头</td>
                        <td>{{contrastProduct.parameter.frontCamera}}</td>
                      </tr>
                      <tr>
                        <td>后置摄像头</td>
                        <td>{{contrastProduct.parameter.rearCamera}}</td>
                      </tr>
                    </tbody>
                  </table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </header-footer>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapMutations, mapGetters } from "vuex";
import HeaderFooter from "../components/HeaderFooter";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("YYYY/MM/DD");
    }
  },
  data() {
    return {
      contrastProductId: "",
      contrastProduct: {},
      productList: [],
      num: 1,
      activeName: "first",
      product: {},
      storageIndex: 0,
      colorIndex: 0,
      storageId: 0,
      colorId: 0,
      stock: 0,
      productPrice: "",
      storageName: "",
      colorName: "",
      cartList: []
    };
  },
  watch: {
    stock(value) {
      if (value === 0) {
        this.num = 1;
      }
    },
    id() {
      this._fetchProduct();
    },
    contrastProductId() {
      this._fetchContrastProduct();
    },
    refreshCartListFlag() {
      this._fechCartList();
    }
  },
  computed: {
    ...mapGetters(["refreshCartListFlag"])
  },
  components: {
    HeaderFooter
  },
  props: {
    id: {
      type: String
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async addToCartList() {
      let cart = {
        productId: this.productId,
        productName: this.productName,
        productSubtitle: this.productSubtitle,
        productPrice: this.productPrice,
        productCoverImage: this.productCoverImage,
        productNum: this.num,
        storageId: this.storageId,
        storageName: this.storageName,
        colorId: this.colorId,
        colorName: this.colorName,
        checked: true
      };
      let flag = false;

      this.cartList.forEach((item, index) => {
        //判断购物车里面有没有同种商品，如果有则数量加加
        if (
          item.productId === cart.productId &&
          item.storageId === cart.storageId &&
          item.colorId === cart.colorId
        ) {
          flag = true;
          item.productNum += cart.productNum;
        }
      });
      if (!flag) {
        this.cartList.push(cart);
      }
      await this.$http.put("cartList", this.cartList);
      this.$message({
        type: "success",
        message: "加入购物车成功"
      });
      this.setCartListRefresh(false);
      this.$nextTick(() => {
        this.setCartListRefresh(true);
      });
      this.num = 1;
    },
    //默认加载第一个容量和颜色
    _loadStorageAndColor() {
      if (this.product.storages) {
        let storage = this.product.storages[this.storageIndex];
        let color = this.product.storages[this.storageIndex].colors[
          this.colorIndex
        ];
        if (color === undefined) {
          this.colorIndex--;
          this._loadStorageAndColor();
          return;
        }
        this.num = 1;
        this.storageId = storage._id;
        this.colorId = color._id;
        this.stock = this.product.storages[this.storageIndex].colors[
          this.colorIndex
        ].stock;
        this.productId = this.product._id;
        this.productName = this.product.name;
        this.productSubtitle = this.product.subtitle;
        this.productPrice = storage.nowPrice;
        this.productCoverImage = this.product.coverImage;
        this.storageName = storage.name;
        this.colorName = color.name;
      }
    },
    selectStorage(storage, index) {
      this.storageIndex = index;
      this._loadStorageAndColor();
    },
    selectColor(color, index) {
      this.colorIndex = index;
      this._loadStorageAndColor();
    },
    handleChange(value) {},
    async _fetchProduct() {
      const res = await this.$http.get(`rest/product/${this.id}`);
      this.product = res.data;
      this._loadStorageAndColor();
    },
    async _fetchContrastProduct() {
      if (!this.contrastProductId) {
        return;
      }
      const res = await this.$http.get(
        `rest/product/${this.contrastProductId}`
      );
      console.log(res.data);

      this.contrastProduct = res.data;
    },
    async _fetchProductList() {
      const res = await this.$http.get(`rest/product`);
      this.productList = res.data;
    },
    async _fechCartList() {
      const res = await this.$http.get(`user`);
      this.cartList = res.data.cartList;
    },
    ...mapMutations({
      setCartListRefresh: "SET_CART_LIST_REFRESH"
    })
  },
  created() {
    this._fechCartList();
    this._fetchProduct();
    this._fetchProductList();
  }
};
</script>

<style lang="stylus">
.product-details
  .w
    .content
      margin-top 50px
      margin-bottom 50px
      .left
        .image-wrapper
          display inline-block
          width 240px
          margin-left 1px
          border 1px solid #cccccc
          img
            width 100%
      .right
        width 800px
        .title
          display inline
          color #000000
          font-size 18px
          line-height 30px
          font-weight bold
        .price
          background-color #F3F3F3
          padding-left 10px
          line-height 50px
          span
            color #e4393c
            font-size 22px
          .oldPrice
            margin-left 10px
            font-size 12px
            text-decoration line-through
            color #999999
        .select-options
          .storages, .colors
            margin-top 20px
            height 35px
            .text, .storage, .color
              margin-right 20px
              line-height 35px
            .storage, .color
              color #666666
              background-color #ffffff
              border 1px solid #cccccc
              padding 0 10px
              &.active
                border 1px solid #e4393c
              &.no-result
                color rgba(0, 0, 0, 0.3)
        .other
          line-height 50px
          .stock
            margin-left 20px
        .cart
          margin-top 10px
          padding-left 1px
          .input-number
            margin-right 20px
          .btn
            line-height 50px
            padding 0 20px
            font-size 18px
            color #ffffff
            font-weight 700
            background-color #e4393c
            &.active
              background-color #F7F7F7
              color #CDCCCC
table
  border-collpse collapse
  margin 0 auto
  text-align center
  width 100%
  font-size 16px
  tr
    border-bottom 1px solid #ccc
    color #666
    height 30px
  td
    &:first-child
      width 100px
      border-right 1px solid #ccc
</style>