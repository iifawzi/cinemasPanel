<template>
  <div class="layout">
      <daside/>
      <div class="contents">
  <dnavbar/>
  <div>
    <nuxt />

  </div>
      </div>
  </div>
</template>
<script>
import daside from "~/components/shared/aside";
import dnavbar from "~/components/shared/navbar";
export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.language,
      },
      bodyAttrs: {
        dir: this.language == "ar" ? "rtl" : "ltr",
      },
    };
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  },
  components: {
    daside,
    dnavbar
  },
  middleware: ["isAuth"],
};
</script>


<style lang="scss" scoped>
.layout {
  display: flex;
  flex-flow: row;
}
.contents {
  display: flex;
  flex-flow: column;
  flex-grow: 1;
}
</style>