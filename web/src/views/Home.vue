<template>
  <div class="home">
    <header-footer>
      <swiper class="swiper" :options="swiperOption" v-if="ads.length">
        <swiper-slide class="swiper-slide" v-for="(item, index) in ads" :key="index">
          <img
            @click="$router.push(`/product-details/${item.productId}`)"
            class="img"
            ref="img"
            :src="item.coverImage"
            :alt="item.name"
          />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
    </header-footer>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import HeaderFooter from "../components/HeaderFooter";
export default {
  data() {
    return {
      ads: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
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
    HeaderFooter,
    swiper,
    swiperSlide
  },
  methods: {
    async _fetchAds() {
      const res = await this.$http.get("rest/ads");
      this.ads = res.data;
    }
  },
  mounted() {
    this._fetchAds();
  }
};
</script>

<style lang="stylus" scoped>
.home
  .swiper
    width 100%
    .swiper-slide
      overflow hidden
      .img
        width 100%
</style>