<template>
  <div class="search">
    <header-footer>
      <div class="w">
        {{query}}
      </div>
    </header-footer>
  </div>
</template>

<script>
import HeaderFooter from "../components/HeaderFooter";
export default {
  components:{
    HeaderFooter
  },
  props:{
    query:{
      type:String
    }
  }
}
</script>
<style lang="stylus" scoped>
.search
  .w
    min-height 500px
    background-color #F1F1F1
</style>