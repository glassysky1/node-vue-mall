<template>
  <div class="order-list">
    <div class="content" v-show="cartList.length">
      <h1 class="total-product font14">全部商品 {{totalProductNum}}</h1>
      <table>
        <thead>
          <tr>
            <td class="al">
              <input type="checkbox" @click="selectAll" :checked="all" /> 全选
            </td>
            <td>商品</td>
            <td>单价</td>
            <td>数量</td>
            <td>小计</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart,index) in cartList" :key="index">
            <td class="al">
              <input
                type="checkbox"
                @click="selectItem(cart.checked,index)"
                :checked="cart.checked"
              />
            </td>
            <td class="al">
              <div class="image">
                <a>
                  <img :src="cart.productCoverImage" height="80" alt />
                </a>
              </div>
              <div class="center">
                <h2 class="desc-title" style="height:40px">
                  <a>{{cart.productName}} {{cart.productSubtitle}}</a>
                </h2>
              </div>
              <div class="right">
                <div class="storage">{{cart.storageName}}</div>
                <div class="color">{{cart.colorName}}</div>
              </div>
            </td>
            <td>
              <span class="price">￥{{cart.productPrice}}</span>
            </td>
            <td>
              <el-input-number
                size="mini"
                v-model="cart.productNum"
                @change="handleChange(cart.productNum,index)"
                :min="1"
                :max="cart.productMaxNum"
                label="描述文字"
              ></el-input-number>
            </td>
            <td>
              <span class="total-price">￥{{cart.productPrice * cart.productNum}}</span>
            </td>
            <td>
              <span class="delete" @click="deleteCart(index)">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="settle clearfix">
        <div class="settle-right fr">
          <span class="selected-num">
            已选择
            <i>{{selectCount}}</i>件商品
          </span>
          <span class="total-price">
            总价:
            <span class="text">￥{{selectTotalProductPrice}}</span>
          </span>
          <button class="btn" @click="settle">去结算</button>
        </div>
      </div>
    </div>
    <div class="no-result ac" v-show="!cartList.length">
      <span class="text font16">是空的哎</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
      totalProductNum: 0,
      selectCount: 0,
      selectTotalProductPrice: 0,
      all: true
    };
  },
  methods: {
    async deleteCart(index) {
      this.cartList.splice(index, 1);
      await this.$http.put("cartList", this.cartList);
      this._fechCartList();
    },
    async handleChange(productNum, index) {
      console.log(productNum, index);
      this.cartList.forEach((cart, index1) => {
        if (index === index1) {
          cart.productNum = productNum;
        }
      });
      await this.$http.put("cartList", this.cartList);
      this._fechCartList();
    },
    async selectItem(checked, index) {
      let count = 0;
      this.cartList.forEach((cart, index1) => {
        if (index === index1) {
          cart.checked = !checked;
        }
        if (cart.checked) {
          count++;
        }
      });
      if (count === this.cartList.length) {
        this.all = true;
      } else {
        this.all = false;
      }
      await this.$http.put("cartList", this.cartList);
      this._fechCartList();
    },
    async selectAll() {
      this.all = !this.all;
      this.cartList.forEach((cart, index) => {
        cart.checked = this.all;
      });
      await this.$http.put("cartList", this.cartList);
      this._fechCartList();
    },
    settle(){
      if (!this.selectCount) {
        this.$message({
            type: "warning",
            message: "未选择商品"
          });
          return
      }
      this.$router.push('/order-settlement')
    },
    async _fechCartList() {
      const res = await this.$http.get("user");
      this.user = res.data;
      this.cartList = res.data.cartList;
      this.totalProductNum = 0;
      this.totalProductPrice = 0;
      let count = 0;
      this.selectCount = 0;
      this.selectTotalProductPrice = 0;
      this.cartList.forEach((cart, index) => {
        this.totalProductNum += cart.productNum;
        this.totalProductPrice += cart.productNum * cart.productPrice;
        if (cart.checked) {
          this.selectCount += cart.productNum;
          this.selectTotalProductPrice += cart.productNum * cart.productPrice;
        }
        if (cart.checked) {
          count++;
        }
      });
      if (count === this.cartList.length) {
        this.all = true;
      } else {
        this.all = false;
      }
    }
  },
  created() {
    this._fechCartList();
  }
};
</script>

<style lang="stylus" scoped>
.order-list
  .total-product
    color #E4231A
    font-weight bold
  table
    font-size 12px
    thead
      line-height 50px
      background-color #F3F3F3
      border 1px solid #cccccc
    tbody
      background-color #FFF4E8
      tr
        border-top 2px solid #cccccc
        &:nth-child(1)
          border none
    tr, td
      border none
    td
      &:nth-child(1)
        padding-left 10px
        width 50px
      &:nth-child(2)
        width 450px
    .image, .center, .right
      display inline-block
      margin-left 15px
      vertical-align top
      text-overflow ellipsis
      overflow hidden
    .center
      margin-top 20px
      width 180px
    .right
      margin-top 20px
    .delete
      cursor pointer
  .no-result
    margin-top 200px
    .text
      font-weight bold
  .settle
    margin-top 20px
    .settle-right
      line-height 50px
      .selected-num
        margin-right 5px
        i
          font-weight bold
          color #E4231A
          padding 0 2px
      .total-price
        margin-right 10px
        .text
          font-size 16px
          font-weight bold
          color #E4231A
      .btn
        height 50px
        padding 0 50px
        background-color #E4231A
        color #fff
        font-size 18px
        font-weight bold
</style>