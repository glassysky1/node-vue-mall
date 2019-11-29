<template>
  <div class="order-list">
    <div class="top">
      <span class="all active">全部订单</span>
      <span class="no-send">待发货</span>
      <span class="no-receive">待收货</span>
      <span class="receive">已收货</span>
    </div>
    <div class="content">
      <div class="header">
        <div class="header-top">
          <span class="time">2019-09-09 14:00:11</span>
          <span class="order-code">
            订单号:
            <i>102377775123</i>
          </span>
        </div>
        <div class="header-bottom">
          <span class="username">戴肖</span>
          <span class="total-price">订单金额:￥193.00</span>
          <span class="payment-method">支付方式:在线支付</span>
          <span class="order-status">订单状态:待收货</span>
        </div>
      </div>
      <table>
        <tr>
          <td>
            <div class="image">
              <img src="../assets/华为 mate30Pro小.jpg" alt />
            </div>
            <div class="desc">
              <span class="text">发送到风口浪尖爱上的看法就卡了时代峻峰防守打法静安寺快递费</span>
            </div>
          </td>
          <td>
            <span class="number">x1</span>
          </td>
          <td>
            <span class="price">总金额￥148</span>
            <br />
            <span class="payment-method">在线支付</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: []
    };
  },
  methods: {
    async _fetchOrderList() {
      const res = await this.$http.get("user");
      this.orderList = res.data.orderList;
      console.log(this.orderList);
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
  .content
    margin-top 20px
    border 1px solid #cccccc
    .header
      background-color #F6F6F6

</style>