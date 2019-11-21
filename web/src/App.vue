<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userState"])
  },
  watch: {
    userState() {
      this._fetchUserState();
    }
  },
  methods: {
    async _fetchUserState() {
      const res = await this.$http.get("userInfo");
      this.setUserInfo(res.data);
    },
    ...mapMutations({
      setUserInfo: "SET_USER_INFO"
    })
  },
  mounted() {
    this._fetchUserState();
  }
};
</script>

