<template>
  <div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async _fetch() {
      const res = await this.$http.get("brandlist");

      this.items = res.data;
    }
  },
  created() {
    this._fetch();
  }
};
</script>

<style>
</style>