<template>
  <div class="personal-center">
    <header-footer :navShow="navShow">
      <div class="w">
        <el-container style="min-height: 80vh; border: 1px solid #eee">
          <el-aside width="200px"  >
            <el-menu router :default-openeds="['1']" :default-active="$route.path" >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-message"></i>hh
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/personal-center/address-list">收货地址</el-menu-item>
                  <el-menu-item index="/personal-center/cart-list">购物车</el-menu-item>
                  <el-menu-item index="/personal-center/order-list">订单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-container>
            <el-main style="background-color:#fff;">
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </header-footer>
  </div>
</template>

<script>
import HeaderFooter from "../components/HeaderFooter";
export default {
  data() {
    return {
      navShow: false,
    };
  },
  components: {
    HeaderFooter
  }
};
</script>

<style lang="stylus" >
.personal-center
  background #f5f5f5
  .el-aside
    color #333
    background-color #f5f5f5 !important
    .el-submenu__title
      display none
      &:hover
        background-color #f5f5f5
    .el-menu-item-group
      background-color #f5f5f5
      .el-menu-item
        text-align center
        font-size 12px
        height 30px
        line-height 30px
        color #666
        &.is-active
          background-color #f5f5f5
          color #ec393c
        &:hover
          background-color #f5f5f5
          color #ec393c
          text-decoration underline
      .el-menu-item-group__title
        display none
</style>