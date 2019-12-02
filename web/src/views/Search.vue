<template>
  <div class="search">
    <header-footer>
      <div class="w">
        <div class="top">
          <span
            @click="selectCurrentIndex(index)"
            v-for="(item,index) in sort"
            :key="index"
            :class="{'active':currentIndex ===index}"
          >
            <i v-show="sortFlag && index!=0 && currentIndex ===index" class="el-icon-arrow-down"></i>
            <i v-show="!sortFlag && index!=0 && currentIndex ===index" class="el-icon-arrow-up"></i>
            {{item}}
          </span>
        </div>
        <div class="bottom" v-show="productList.length">
          <div
            class="product"
            v-for="(item,index) in productList"
            :key="index"
            @click="$router.push(`/product-details/${item._id}`)"
          >
            <div class="image">
              <img :src="item.detailImage" alt />
            </div>
            <div class="price">
              <span class="now-price" v-if="item.storages">￥{{item.nowPrice}}起</span>
            </div>
            <div class="sales">销量:{{item.totalNumber}}</div>
            <div class="title">{{item.name}} {{item.subtitle}}</div>
          </div>
        </div>
        <div class="no-result" v-show="!productList.length">暂无结果哦</div>
      </div>
    </header-footer>
  </div>
</template>

<script>
import HeaderFooter from "../components/HeaderFooter";
export default {
  data() {
    return {
      sort: ["综合排序", "销量", "价格"],
      currentIndex: 0,
      sortFlag: false,
      productList: []
    };
  },
  components: {
    HeaderFooter
  },
  props: {
    query: {
      type: String
    }
  },
  watch: {
    query() {
      this._fetchSearchResult();
    }
  },
  methods: {
    selectCurrentIndex(index) {
      if (index === 2 || index === 1) {
        this.sortFlag = !this.sortFlag;
      }
      this.currentIndex = index;
      if (this.currentIndex === 0) {
        this._fetchSearchResult();
      }
      //如果是降序排序
      if (this.currentIndex === 1 && this.sortFlag === true) {
        this.productList.sort((a, b) => b.totalNumber - a.totalNumber);
      }
      if (this.currentIndex === 1 && this.sortFlag === false) {
        this.productList.sort((a, b) => a.totalNumber - b.totalNumber);
      }
      if (this.currentIndex === 2 && this.sortFlag === true) {
        this.productList.sort((a, b) => b.nowPrice - a.nowPrice);
      }
      if (this.currentIndex === 2 && this.sortFlag === false) {
        this.productList.sort((a, b) => a.nowPrice - b.nowPrice);
      }
    },
    async _fetchSearchResult() {
      const res = await this.$http.post("keyword", {
        query: this.query
      });
      res.data.forEach((item, index) => {
        let totalNumber = 0;
        item.storages.forEach((storage, index) => {
          storage.colors.forEach((color, index) => {
            totalNumber += color.salesVolume;
          });
        });
        let nowPrice = item.storages[0].nowPrice;
        this.$set(item, "totalNumber", totalNumber);
        this.$set(item, "nowPrice", nowPrice);
      });
      this.productList = res.data;
    }
  },
  mounted() {},
  created() {
    this._fetchSearchResult();
  }
};
</script>
<style lang="stylus" scoped>
.search
  .w
    min-height 500px
    background-color #F1F1F1
    .top
      padding-top 20px
      padding-left 20px
      font-size 0px
      span
        border 1px solid #cccccc
        font-size 12px
        border-right none
        cursor pointer
        display inline-block
        line-height 25px
        background-color #fff
        padding 0 10px
        &:last-child
          border-right 1px solid #cccccc
        &.active
          color #ffffff
          background-color #EC393C
    .no-result
      margin-left 50%
      transform translate3d(-50%, 0, 0)
      margin-top 200px
      font-size 20px
    .bottom
      width 100%
      padding-bottom 20px
      .product
        border 1px solid #cccccc
        display inline-block
        width 20%
        margin-left 4%
        margin-top 20px
        background-color #fff
        .image
          width 100%
          img
            width 100%
        .sales
          padding-left 5px
          margin 4px 0
        .price
          .now-price
            font-size 20px
            line-height 30px
            color #EC393C
            font-weight bold
            padding-left 10px
        .title
          padding 0 5px
          height 40px
          overflow hidden
          text-overflow ellipsis
</style>