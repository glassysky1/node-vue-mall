<template>
  <div class="order-list">
    <div class="top">
      <span
        v-for="(item,index) in selectItems"
        @click="selectIndex=index"
        :class="{'active':index===selectIndex}"
        :key="index"
      >{{item}}</span>
    </div>
    <div
      class="content"
      v-show="matchOrder(order.status) && orderList.length"
      v-for="(order,index1) in orderList"
      :key="index1"
    >
      <div class="header">
        <div class="header-top">
          <span class="time">{{order.createTime}}</span>
          <span class="order-code">
            订单号:
            <i>{{order._id}}</i>
          </span>
        </div>
        <div class="header-bottom">
          <span class="username" v-if="order.address">收货人:{{order.address.username}}</span>
          <span class="total-price">订单金额:￥{{order.totalPrice}}</span>
          <span class="payment-method">支付方式:{{order.paymentMethod===0?'在线支付':'货到付款'}}</span>
          <span class="order-status" v-if="order.status===0">订单状态:待发货</span>
          <span class="order-status" v-if="order.status===1">
            订单状态:待收货
            <button @click="receive(order._id)">点击收货</button>
          </span>
          <span class="order-status" v-if="order.status===2">订单状态:已收货</span>
        </div>
      </div>
      <table v-for="(cart,index) in order.cartList" :key="index">
        <tr>
          <td>
            <img :src="cart.productCoverImage" alt />
            <div class="desc">
              <span class="text">{{cart.productName}} {{cart.productSubtitle}}</span>
            </div>
            <p class="detail">
              <span class="storage">{{cart.colorName}}</span>
              <br />
              <span class="color">{{cart.storageName}}</span>
            </p>
          </td>
          <td>
            <span class="number">x{{cart.productNum}}</span>
          </td>
          <td>
            <span class="price">总金额￥{{cart.productPrice * cart.productNum}}</span>
            <br />
            <span class="payment-method">{{order.paymentMethod===0?'在线支付':'货到付款'}}</span>
          </td>
        </tr>
      </table>
    </div>
    <div v-show="!orderList.length" class="no-result">没有订单哎</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 0,
      selectItems: ["全部订单", "待发货", "待收货", "已收货"],
      orderList: []
    };
  },
  methods: {
    async receive(orderId) {
      this.orderList.forEach((order, index) => {
        if (order._id === orderId) {
          order.status = 2;
        }
      });
      await this.$http.put("orderList", this.orderList);
    },
    matchOrder(status) {
      //0全部订单，1待发货，2待收货，3已收货
      //           0待发货 1到收货 2 已收货
      if (this.selectIndex === 0) {
        return true;
      } else {
        return status + 1 === this.selectIndex;
      }
    },
    async _fetchOrderList() {
      const res = await this.$http.get("user");
      this.orderList = res.data.orderList;
    }
  },
  created() {
    this._fetchOrderList();
  }
};
</script>

<style lang="stylus" scoped>
.order-list
  .top
    font-weight bold
    span
      margin-right 20px
      cursor pointer
      &.active
        color #ec393c
        border-bottom 2px solid #ec393c
  .no-result
    margin-left 50%
    margin-top 200px
    transform translate3d(-50%,0,0)
    font-size 18px
  .content
    margin-top 20px
    border 1px solid #cccccc
    .header
      background-color #F6F6F6
      padding-left 15px
      line-height 25px
      .header-top
        color #BFB6B3
        .order-code
          margin-left 30px
          i
            color #ec393c
      .header-bottom
        button
          font-size 12px
          margin-left 10px
          padding 2px
          border 1px solid #cccccc
        span
          margin-right 50px
    table
      font-size 12px
      tr
        &:last-child
          border-bottom none
        td
          border none
          &:nth-child(2)
            border-right 1px solid #cccccc
          &:nth-child(1)
            width 500px
            text-align left
            img
              display inline-block
              width 100px
              vertical-align top
            .desc
              width 180px
              margin-left 20px
              display inline-block
              height 40px
              overflow hidden
              margin-top 20px
              .text
                vertical-align top
                text-overflow ellipsis
                overflow hidden
            .detail
              margin-top 20px
              vertical-align top
              display inline-block
              margin-left 20px
</style>