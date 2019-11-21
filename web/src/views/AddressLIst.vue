<template>
  <div class="address-list">
    <div class="add-wrapper">
      <button class="add-btn">新增收货地址</button>
    </div>
    <div class="bounce-address"></div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="stylus">
.address-list
  position relative
  .bounce-address
    border 4px solid rgba(0,0,0,.3)
    position absolute
    background-color pink
    width 800px
    left 0
    top 0
    height 500px
  .add-btn
    background-color #fff
    padding 5px 10px
    border 1px solid #cccccc
</style>