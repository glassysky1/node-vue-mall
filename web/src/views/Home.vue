<template>
  <div class="home">
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
        <h1 class="logo">
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
                  <a>{{product.name}}</a>
                </dd>
              </dl>
            </div>
          </li>
          <li class="user-nav-item">
            <a>首页</a>
          </li>
          <li v-for="(brand,index) in brandList.slice(0,6)" :key="index" class="user-nav-item">
            <a>{{brand.name}}</a>
            <div class="user-nav-children">

            </div>
          </li>
        </ul>
      </div>
    </nav>
    <main class="main clearfix">
      <swiper class="swiper" :options="swiperOption" v-if="ads.length">
        <swiper-slide class="swiper-slide" v-for="(item, index) in ads" :key="index">
          <img class="img" ref="img" :src="item.coverImage" :alt="item.name" />
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
    </main>
    <footer>底部</footer>
  </div>
</template>

<script>
// @ is an alias to /src
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      showFlag: false,
      brandList: [],
      ads: [],
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        loop: true,
        loopAdditionalSlides: 0,
        autoplay: {
          daley: 3000,
          //手触摸不会停止
          disableOnInteraction: false
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
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
    async _fetchAds() {
      const res = await this.$http.get("rest/ads");
      this.ads = res.data;
    },
    async _fetchBrands() {
      const res = await this.$http.get("brandList");
      console.log(res);

      this.brandList = res.data;
    }
  },
  mounted() {
    this._fetchAds();
    this._fetchBrands();
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/index.styl'
.home
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
    font-size 14px
    .w
      position relative
      .user-nav-item
        float left
        .brand-list
          background rgba(255, 255, 255, 0.9)
          width 390px
          height 790px
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
        a
          padding 0 50px 0 30px
  .swiper
    width 100%
    .swiper-slide
      overflow hidden
      .img
        width 100%
</style>