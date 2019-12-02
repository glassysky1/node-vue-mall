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

<style>

</style>