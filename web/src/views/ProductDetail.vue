<template>
  <div class="product-details">
    <header-footer>
      <div class="w">
        <div class="content clearfix">
          <div class="right fr">
            <h1 class="title">{{product.name}} {{product.subtitle}}</h1>
            <p class="price" v-if="product">
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
                  class="storage"
                  v-for="(storage,index) in product.storages"
                  :key="index"
                >{{storage.name}}</button>
              </div>
              <div class="colors">
                <span class="text">选择颜色</span>
                <button class="color">暗夜魅影</button>
                <button class="color">魔法滤镜</button>
                <button class="color no-result">魔法滤镜</button>
              </div>
            </div>
            <div class="cart">
              <el-input-number
                class="input-number"
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="10"
                label="描述文字"
              ></el-input-number>
              <button class="btn">加入购物车</button>
            </div>
          </div>
          <div class="left">
            <div class="image-wrapper">
              <img :src="product.detailImage" alt />
            </div>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
    </header-footer>
  </div>
</template>

<script>
import HeaderFooter from "../components/HeaderFooter";
export default {
  data() {
    return {
      num: 1,
      product: {},
      storageIndex: 0,
      colorindex: 0,
      storageId: 0,
      colorId: 0
    };
  },
  watch: {
    id() {
      this._fechProduct();
    }
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
    handleChange(value) {
      console.log(value);
    },
    async _fechProduct() {
      const res = await this.$http.get(`rest/product/${this.id}`);
      this.product = res.data;
    }
  },
  mounted() {
    this._fechProduct();
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
        .cart
          margin-top 30px
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
</style>