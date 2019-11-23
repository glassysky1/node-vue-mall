<template>
  <div class="header_footer" @click="closeSlider">
    <div class="clearfix shortcut">
      <div class="w">
        <ul class="fr">
          <li v-if="user.username" class="login" @mouseover="enter2" @mouseleave="mouseleave2">
            <span class="text">
              欢迎您：{{user.username}}
              <i class="el-icon-arrow-down"></i>
            </span>
            <div v-show="showFlag2" class="logout ac" @mouseover="sover2" @mouseleave="sout2">
              <span class="text" @click="$router.push('/personal-center/address-list')">个人中心</span>
              <br />
              <span class="text" @click="logout">退出登录</span>
            </div>
          </li>
          <li v-else>
            <a style="margin-right:2px;" @click="$router.push('/login')">你好,请登录&nbsp;</a>
            <a class="col-red" @click="$router.push('/register')">免费注册</a>
          </li>
          <li class="space"></li>
          <li>
            <a>我的订单</a>
          </li>
        </ul>
      </div>
    </div>
    <header class="header">
      <div class="w">
        <h1 @click="$router.push('/')" class="logo">
          <a class="logo_tit"></a>
        </h1>
        <div class="search" v-show="navShow">
          <input type="text" placeholder="搜索商品" class="box" />
          <button class="btn">搜索</button>
        </div>
      </div>
    </header>
    <nav class="nav" v-show="navShow">
      <div class="w clearfix">
        <ul>
          <li @mouseover="enter" @mouseleave="mouseleave" class="user-nav-item">
            <a>全部品牌&gt;</a>
            <div @mouseenter="sover" @mouseleave="sout" v-show="showFlag" class="brand-list">
              <dl class="clearfix" v-for="(brand,index) in brandList" :key="index">
                <dt v-show="brand.productList">{{brand.name}}</dt>
                <dd v-for="(product,index) in brand.productList" :key="index">
                  <a @click="$router.push(`/product-details/${product._id}`)">{{product.name}}</a>
                </dd>
              </dl>
            </div>
          </li>
          <li class="user-nav-item">
            <a @click="$router.push('/')">首页</a>
          </li>
          <ul @mouseleave="mouseleave1">
            <li
              @mouseover="enter1(index)"
              v-for="(brand,index) in brandList.slice(0,6)"
              :key="index"
              class="user-nav-item"
            >
              <a>{{brand.name}}</a>
            </li>
            <div
              @mouseenter="sover1"
              @mouseleave="sout1"
              v-show="showFlag1"
              class="user-nav-children"
              v-if="brandList[brandListIndex]"
            >
              <ul
                v-for="(product,index) in brandList[brandListIndex].productList.slice(0,6)"
                :key="index"
              >
                <li @click="$router.push(`/product-details/${product._id}`)">
                  <h3 class="title">{{product.name}}</h3>
                  <img :src="product.coverImage" height="100" alt />
                  <p class="nowPrice">{{product.storages[0].nowPrice}}元起</p>
                </li>
              </ul>
            </div>
          </ul>
        </ul>
      </div>
      <div v-show="showFlag1" class="user-nav-children"></div>
    </nav>
    <main class="main clearfix">
      <slot></slot>
    </main>
    <footer class="footer">
      <h3 class="title">村头大白鹅</h3>
    </footer>

    <div ref="rightSlider" @click.stop class="right-slider">
      <div class="right clearfix"></div>
      <div class="left clearfix">
        <ul class="ac">
          <li class="orderList">
            <i class="el-icon-document"></i>
          </li>
          <li class="cartList" @click="toggleCart">
            <i class="el-icon-shopping-cart-2"></i>
            <div>购物车</div>
            <i class="number">0</i>
          </li>
          <li class="starMe">
            <i class="el-icon-star-off"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandListIndex: "",
      showFlag: false,
      showFlag1: false,
      showFlag2: false,
      brandList: [],
      user: {},
      openFlag: false
    };
  },
  props: {
    navShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleCart() {
      if (this.openFlag) {
        this.$refs.rightSlider.style["transform"] = "translate3d(230px,0,0)";
        this.$refs.rightSlider.style["transitionDuration"] = "0";
        this.openFlag = false;
        return;
      }
      this.$refs.rightSlider.style["transform"] = "translate3d(0,0,0)";
      this.$refs.rightSlider.style["transitionDuration"] = "500ms";
      this.openFlag = true;
    },
    closeSlider() {
      this.openFlag = false;
      this.$refs.rightSlider.style["transform"] = "translate3d(230px,0,0)";
      this.$refs.rightSlider.style["transitionDuration"] = "0";
    },
    enter() {
      this.showFlag = true;
    },
    mouseleave() {
      this.timer = setTimeout(() => {
        this.showFlag = false;
      }, 150);
    },
    sover() {
      clearTimeout(this.timer);
    },
    sout() {
      this.showFlag = false;
    },
    enter2() {
      this.showFlag2 = true;
    },
    mouseleave2() {
      this.timer2 = setTimeout(() => {
        this.showFlag2 = false;
      }, 150);
    },
    sover2() {
      clearTimeout(this.timer2);
    },
    sout2() {
      this.showFlag2 = false;
    },
    enter1(index) {
      this.brandListIndex = index;
      this.showFlag1 = true;
    },
    mouseleave1() {
      this.timer1 = setTimeout(() => {
        this.showFlag1 = false;
      }, 150);
    },
    sover1() {
      clearTimeout(this.timer1);
    },
    sout1() {
      this.showFlag1 = false;
    },
    async logout() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.token = "";
        this.$message({
          type: "sucess",
          message: "退出成功"
        });
        this._fetchUser();
      });
    },
    async _fetchBrands() {
      const res = await this.$http.get("brandList");
      this.brandList = res.data;
    },
    async _fetchUser() {
      const res = await this.$http.get("user");
      this.user = res.data;
    }
  },
  created() {
    this._fetchBrands();
    this._fetchUser();
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/index.styl'
.header_footer
  position relative
  overflow-x hidden
  .right-slider
    height 100%
    position absolute
    z-index 998
    right 0
    top 0
    transform translate3d(230px, 0, 0)
    .right
      height 100%
      float right
      width 230px
      background-color #323232
    .left
      height 100%
      width 40px
      float right
      background-color #37383C
      z-index 999
      color #B46155
      position relative
      font-size 22px
      ul
        height 300px
        position absolute
        width 100%
        top 300px
        li
          cursor pointer
          margin-top 30px
          &.cartList
            &:hover
              div
                color #fff
              .number
                background-color #fff
                color #f15443
            background-color #484C4F
            div
              color #C0C1C2
              padding 0 5px
              font-size 16px
            .number
              background-color #F15443
              color #fff
              display inline-block
              font-size 12px
              font-weight bold
              padding 0 6px
              border-radius 50%
          &:hover
            color #ffffff
            background-color #F15443
  .shortcut
    color #999999
    background-color #e3e4e5
    line-height 30px
    .fr
      li
        float left
        margin 0 5px
        &.login
          position relative
          &:hover
            background-color #fff
          .text
            cursor pointer
          .logout
            position absolute
            width 100%
            z-index 500
            background-color #fff
            box-shadow 1px 2px 1px rgba(0, 0, 0, 0.1)
            top 30px
            line-height 30px
            left 0
        &.space
          margin-top 9px
          height 12px
          width 1px
          background-color #999
  .header
    height 140px
    .w
      position relative
      .logo
        width 120px
        height 120px
        margin-top 10px
        display block
        background url('../assets/logo.jpg')
        background-size contain
      .search
        position absolute
        right 400px
        top 50px
        .box
          border 3px solid $col-red
          width 400px
          height 30px
          padding-left 10px
          font-size 14px
          vertical-align top
          outline none
          border-radius 0
        .btn
          height 36px
          width 50px
          border-radius 0px
          border 3px solid $col-red
          background-color $col-red
          color #ffffff
  .nav
    background-color #221c63
    line-height 40px
    color #fff
    position relative
    font-size 14px
    .user-nav-children
      height 150px
      position absolute
      z-index 49
      width 100%
      background-color rgba(255, 255, 255, 0.95)
    .w
      position relative
      .user-nav-item
        float left
        a
          padding 0 50px 0 30px
        .brand-list
          background rgba(255, 255, 255, 0.9)
          width 390px
          z-index 50
          position absolute
          padding 5px
          dl
            line-height 20px
            margin-bottom 20px
            dt
              color #f2563f
              font-weight bold
            dd
              float left
              margin-top 5px
              a
                color #666666
                font-size 12px
                padding 0 3px
                line-height 16px
      .user-nav-children
        position absolute
        z-index 50
        top 40px
        height 150px
        width 100%
        left 0
        ul
          li
            no-wrap()
            text-align center
            width 200px
            float left
            color #ff6700
            border-right 1px solid #cccccc
            .title, .nowPrice
              line-height 25px
  .footer
    height 100px
    border-top 1px solid #cccccc
    background-color #EAEAEA
    text-align center
    .title
      line-height 100px
      font-size 30px
</style>