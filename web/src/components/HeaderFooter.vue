<template>
  <div class="header-footer" @click="closeSlider">
    <div class="clearfix shortcut" v-show="shortcutShow">
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
          <li @click="$router.push('/personal-center/order-list')">
            <a>我的订单</a>
          </li>
        </ul>
      </div>
    </div>
    <header class="header">
      <div class="w">
        <h1 @click="$router.push('/')" class="logo">
          <a class="logo_tit"></a>
          <span class="title">{{title}}</span>
        </h1>
        <div class="search" v-show="navShow">
          <input @input="input" type="text" v-model="query" placeholder="搜索商品" class="box" />
          <button class="btn" @click="searchQuery">搜索</button>
          <div class="suggest">
            <div
              @click="suggest(item._id)"
              class="name"
              v-for="(item,index) in resultList"
              :key="index"
            >{{item.name}}</div>
          </div>
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
    <div ref="rightSlider" v-if="user._id" v-show="slideShow" @click.stop class="right-slider">
      <div class="right clearfix">
        <div class="cart-list" v-show="selectIndex===0">
          <h2 class="title font14">我的购物车</h2>
          <div class="no-result" v-show="!cartList.length">
            <span class="text">您的购物车还是空的</span>
          </div>
          <div
            class="cart-item"
            v-show="cartList.length"
            v-for="(cart,index) in cartList"
            :key="index"
          >
            <div class="image">
              <img :src="cart.productCoverImage" width="100" height="100" alt />
            </div>
            <div class="desc">
              <div class="desc-title">{{cart.productName}}&nbsp;{{cart.productSubtitle}}</div>
              <p class="price">￥{{cart.productPrice}}</p>
              <div class="num">x&nbsp;{{cart.productNum}}</div>
              <span class="delete" @click="deleteCartItem(index)">删除</span>
            </div>
          </div>
          <div class="total" v-show="cartList.length">
            <span class="total-num">
              共
              <i>{{totalProductNum}}</i>件商品
            </span>
            <span class="total-price">
              共计
              <i>￥{{totalProductPrice}}</i>
            </span>
          </div>
          <div
            class="btn"
            @click="$router.push('/personal-center/cart-list')"
            v-show="cartList.length"
          >
            <button>去购物车结算</button>
          </div>
        </div>
      </div>
      <div class="left clearfix">
        <ul class="ac">
          <!-- <li
            class="order"
            ref="order"
            @click="order"
            @mouseleave="orderShow=false"
            @mouseover="orderShow=true"
          >
            <i class="el-icon-document"></i>
            <transition name="slide1">
              <span class="text" v-show="orderShow">我的订单</span>
            </transition>
          </li>-->
          <li class="cart" ref="cart" @click="cart">
            <i class="el-icon-shopping-cart-2"></i>
            <div>购物车</div>
            <i class="number">{{totalProductNum}}</i>
          </li>
          <li class="star-me" @mousemove="codeShow=true" @mouseleave="codeShow=false">
            <i class="el-icon-coffee-cup"></i>
            <transition name="slide2">
              <div class="image-wrapper" v-show="codeShow">
                <img src="../assets/my-code.jpg" width="150" height="150" alt />
                <span class="text">加我微信</span>
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      resultList: [],
      query: "",
      orderShow: false,
      codeShow: false,
      brandListIndex: "",
      showFlag: false,
      showFlag1: false,
      showFlag2: false,
      brandList: [],
      selectIndex: -1,
      user: {},
      openFlag: false,
      cartList: [],
      totalProductNum: 0,
      totalProductPrice: 0
    };
  },
  props: {
    navShow: {
      type: Boolean,
      default: true
    },
    slideShow: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "大白鹅商城欢迎您"
    },
    shortcutShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(["refreshCartListFlag"])
  },
  watch: {
    refreshCartListFlag() {
      this._fetchUser();
    }
  },
  methods: {
    searchQuery() {
      if (!this.query.trim()) {
        return;
      }
      this.resultList=[]
      this.$router.push(`/search/${this.query}`);
    },
    suggest(id) {
      this.$router.push(`/product-details/${id}`);
      this.query = "";
    },
    async input() {
      //如果输入为空，则返回
      if (!this.query.trim()) {
        this.resultList = [];
        return;
      }

      const res = await this.$http.post("keyword", {
        query: this.query
      });
      this.resultList = res.data;
    },
    async deleteCartItem(index) {
      this.cartList.splice(index, 1);
      await this.$http.put("cartList", this.cartList);
      this._fetchUser();
      this.setCartListRefresh(false);
      this.$nextTick(() => {
        this.setCartListRefresh(true);
      });
    },
    cart() {
      //0
      if (this.selectIndex != 1 || !this.openFlag) {
        this._toggleClick();
      }
      this.selectIndex = 0;
    },
    order() {
      if (this.selectIndex != 0 || !this.openFlag) {
        this._toggleClick();
      }
      this.selectIndex = 1;
    },

    _toggleClick() {
      if (this.$refs.rightSlider) {
        if (this.openFlag) {
          this.$refs.rightSlider.style["transform"] = "translate3d(230px,0,0)";
          this.$refs.rightSlider.style["transitionDuration"] = "0";
          this.openFlag = false;
          return;
        }
        this.$refs.rightSlider.style["transform"] = "translate3d(0,0,0)";
        this.$refs.rightSlider.style["transitionDuration"] = "500ms";
        this.openFlag = true;
      }
    },
    closeSlider() {
      if (this.$refs.rightSlider) {
        this.openFlag = false;
        this.$refs.rightSlider.style["transform"] = "translate3d(230px,0,0)";
        this.$refs.rightSlider.style["transitionDuration"] = "0";
      }
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
      if (!this.user._id) {
        return;
      }
      this.cartList = res.data.cartList;
      this.totalProductNum = 0;
      this.totalProductPrice = 0;
      this.cartList.forEach((cart, index) => {
        this.totalProductNum += cart.productNum;
        this.totalProductPrice += cart.productNum * cart.productPrice;
      });
    },
    ...mapMutations({
      setCartListRefresh: "SET_CART_LIST_REFRESH"
    })
  },
  mounted(){
    if(this.$router.path!='/'){
      console.log(1);
      
      this.resultList=[]
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
.header-footer
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
      box-sizing border-box
      padding 7px
      .cart-list
        height 100%
        width 100%
        overflow auto
        .title
          padding-left 5px
          color #ffffff
          font-weight bold
        .no-result
          text-align center
          margin-top 15px
          height 40px
          background-color #FFFDEE
          font-size 16px
          color #FF6600
          font-weight bold
          padding-top 15px
        .cart-item
          margin-top 15px
          position relative
          .desc
            position absolute
            top 0
            left 110px
            width 106px
            height 100%
            .desc-title
              color #999
              height 40px
              text-overflow ellipsis
              overflow hidden
            .price, .num
              margin-top 5px
              color #fff
            .num
              margin-left 3px
            .delete
              position absolute
              right 0
              bottom 5px
              cursor pointer
              background-color #939393
              padding 0 3px
              color #fff
              border-radius 3px
        .total
          margin-top 20px
          text-align center
          font-size 14px
          color #999999
          i
            color #EF5549
            font-weight bold
          .total-num
            margin-right 5px
        .btn
          margin-top 15px
          text-align center
          button
            background #EF5549
            color #fff
            padding 5px 50px
    .left
      height 100%
      width 40px
      float right
      background-color #37383C
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
          &.star-me
            position relative
            .image-wrapper
              position absolute
              top -70px
              left -156px
              background-color #37383C
              padding 3px
              z-index -1
              &.slide2-enter-active, &.slide2-leave-active
                transition all 0.5s
              &.slide2-enter, &.slide2-leave-to
                transform translate3d(156px, 0, 0)
              img
                display block
              .text
                font-size 12px
                color #fff
          &.order
            position relative
            .text
              position absolute
              height 33px
              top 0
              background-color #37383C
              color #fff
              padding 0 10px
              line-height 33px
              font-size 12px
              z-index -1
              left -70px
              width 50px
              &.slide1-enter-active, &.slide1-leave-active
                transition all 0.5s
              &.slide1-enter, &.slide1-leave-to
                transform translate3d(70px, 0, 0)
          &.cart
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
        border-radius 50%
        .title
          font-size 22px
          position absolute
          top 50px
          left 130px
      .search
        position absolute
        right 400px
        top 50px
        .suggest
          position absolute
          background-color #fff
          z-index 999
          top 35px
          left 0
          width 412px
          cursor pointer
          box-shadow 1px 2px 1px rgba(0, 0, 0, 0.2)
          .name
            margin-left 12px
            line-height 20px
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