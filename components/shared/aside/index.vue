<template>
  <aside
    :class="['aside',getAsideStatus === true || isAsideHovered === true ? 'opened' : 'closed', isAsideHovered === true && getAsideStatus === false ? 'fixed' : '']"
    @mouseenter="$store.dispatch('dashboard/toggleHover')"
    @mouseleave="$store.dispatch('dashboard/toggleHover')"
  >
  <div class="top">
           <img v-if="getAsideStatus === true || isAsideHovered === true" alt="website logo" src="~/assets/images/logo.png" class="logo" width="100px" /><img v-else alt="website logo" src="~/assets/images/letter.png" class="logo" width="20px" />
  </div>
  <div class="bottom">

  </div>
  </aside>
</template>

<script>
export default {
  computed: {
    getAsideStatus() {
      return this.$store.getters["dashboard/getAsideStatus"];
    },
    isAsideHovered() {
      return this.$store.getters["dashboard/isAsideHovered"];
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />