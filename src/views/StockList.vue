<template>
  <div class="main">
    <h2>各品牌库存</h2>
    <chart :options="bar" />
  </div>
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
export default {
  components: {
    chart: ECharts
  },
  data() {
    return {
      source: [],
    };
  },
  computed: {
    bar() {
      return {
        legend: {},
        tooltip: {},
        dataset: {
          source: this.source
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }]
      };
    }
  },
  methods: {
    async _fetch() {
      const res = await this.$http.get("brandList");
      this.items = res.data;
      let brandSalesVolume = [];
      res.data.forEach((brand, index) => {
        brandSalesVolume.push({
          name: brand.name
        });
        if (brandSalesVolume[index].name === brand.name) {
          let salesVolume = 0;
          brand.productList.forEach(product => {
            product.storages.forEach(storage => {
              storage.colors.forEach(color => {
                salesVolume += color.stock;
              });
            });
          });
          brandSalesVolume[index].salesVolume = salesVolume;
        }
      });
      let source = [];
      brandSalesVolume.forEach(item => {
        source.push([item.name, item.salesVolume]);
      });
      this.source = source;
    }
  },
  created() {
    this._fetch();
  }
};
</script>
<style lang="stylus" scoped>
.main
  width 100%
  height 100%
</style>