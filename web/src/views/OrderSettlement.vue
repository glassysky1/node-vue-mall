<template>
  <div class="order-settlement">
    <header-footer title="订单结算" :slideShow="slideShow" :navShow="navShow">
      <div class="w">
        <div class="select-address">
          <h2 class="title">收件人信息</h2>
          <div class="address-item" v-for="(address,index) in addressList" :key="index">
            <span class="username" :class="{'active':address.isDefault}">{{address.username}}</span>
            <span class="desc">他以幽默犀利的灵活多变的授课语言向学生们传授历史知识，被某些大陆网友奉为“史上最牛的历史老师”</span>
            <span class="default">默认地址</span>
            <a class="add-address">新增收货地址</a>
            <!-- <span class="isDefault">设为地址</span> -->
          </div>
          <div class="more-address">
            <a>更多地址</a>
            <i class="el-icon-arrow-down"></i>
          </div>
          <div class="fold-address">
            <a>收起地址</a>
            <i class="el-icon-arrow-up"></i>
          </div>
        </div>
      </div>
    </header-footer>
  </div>
</template>

<script>
import HeaderFooter from "../components/HeaderFooter";
export default {
  data() {
    return {
      slideShow: false,
      navShow: false,
      addressList: []
    };
  },
  components: {
    HeaderFooter
  },
  methods: {
    async _fetchUser() {
      const res = await this.$http.get("user");
      this.addressList = res.data.addressList;
    }
  },
  created() {
    this._fetchUser();
  }
};
</script>

<style lang="stylus" scoped>
.order-settlement
  .select-address
    margin-bottom 600px
    border 1px solid #eeeeee
    position relative
    .title
      font-size 14px
      font-weight bold
      padding-left 20px
      color #000
    .address-item
      padding 0 35px
      width 824px
      margin-top 10px
      line-height 20px
      .add-address
        position absolute
        right 0
        top 0
        color #3B6DB0
      .username
        width 80px
        text-align center
        display inline-block
        vertical-align top
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        cursor pointer
        padding-top 2px
        border 2px solid #ffffff
        &.active
          border 2px solid #ec393c
      .desc
        display inline-block
        width 640px
        padding 0 10px
        text-overflow ellipsis
        padding-top 2px
        overflow hidden
        vertical-align top
        white-space nowrap
        line-height 20px
      .default
        padding-top 2px
        vertical-align top
        display inline-block
        width 80px
        line-height 20px
        text-align center
    .more-address, .fold-address
      padding-left 50px
      margin-top 10px
</style>