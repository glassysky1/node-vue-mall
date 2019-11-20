<template>
  <div class="header_footer">
    <div class="clearfix shortcut">
      <div class="w">
        <ul class="fr">
          <li>
            <a style="margin-right:2px;">你好,请登录&nbsp;</a>
            <a class="col-red">免费注册</a>
          </li>
          <li v-show="false">用户</li>
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
        <div class="search">
          <input type="text" placeholder="搜索商品" class="box" />
          <button class="btn">搜索</button>
        </div>
      </div>
    </header>
    <nav class="nav">
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
      <h3 class="title">make by 村头大白鹅</h3>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandListIndex: "",
      showFlag: false,
      showFlag1: false,
      brandList: []
    };
  },
  methods: {
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
    enter1(index) {
      this.brandListIndex = index;
      console.log(index);

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

    async _fetchBrands() {
      const res = await this.$http.get("brandList");
      console.log(res);

      this.brandList = res.data;
    }
  },
  mounted() {
    this._fetchBrands();
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/index.styl'
.header_footer
  .shortcut
    color #999999
    background-color #e3e4e5
    line-height 30px
    .fr
      li
        float left
        margin 0 5px
        &.space
          margin-top 9px
          height 12px
          width 1px
          background-color #999
  .header
    height 140px
    border-bottom 1px solid #cccccc
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