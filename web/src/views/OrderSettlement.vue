<template>
  <div class="order-settlement">
    <header-footer title="订单结算" :slideShow="slideShow" :navShow="navShow"></header-footer>
  </div>
</template>

<script>
import HeaderFooter from "../components/HeaderFooter";
export default {
  data() {
    return {
      slideShow: false,
      navShow: false
    };
  },
  components: {
    HeaderFooter
  }
};
</script>

<style>
</style>