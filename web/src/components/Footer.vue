<template>
  <div class="footer-container">
    <slot></slot>
    <footer class="footer">
      <h3 class="title">村头大白鹅</h3>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
  .footer
    height 100px
    border-top 1px solid #cccccc
    background-color #EAEAEA
    text-align center
    .title
      line-height 100px
      font-size 30px
</style>