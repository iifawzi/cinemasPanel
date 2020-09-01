<template>
  <div class="layout">
      <daside/>
    <nuxt />
  </div>
</template>
<script>
import daside from "~/components/shared/aside";
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
  },
  middleware: ["isAuth"],
};
</script>


<style lang="scss" scoped>
.layout {
  display: flex;
  flex-flow: row;
}
</style>