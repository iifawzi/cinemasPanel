<template>
  <li v-if="itemType === 'main'" class="main-section">
    <span
      :class="[getAsideStatus === true || isAsideHovered === true ? '' : 'closed__main-title']"
    >{{title}}</span>
  </li>

  <li v-else class="section">
    <nuxt-link class="link" :to="goto">
      <span :class="['icon',getAsideStatus === true || isAsideHovered === true ? '' : 'closed__icon']">
        <i :class="icon"></i>
      </span>
      <span
        :class="[getAsideStatus === true || isAsideHovered === true ? 'title' : 'closed__title']"
      >{{title}}</span>
    </nuxt-link>
  </li>
</template>


<script>
export default {
  props: {
    itemType: {
      type: String,
      required: true,
    },
    icon: String,
    title: {
      type: String,
      required: true,
    },
    goto: String,
  },
   computed: {
    getAsideStatus() {
      return this.$store.getters["dashboard/getAsideStatus"];
    },
    isAsideHovered() {
      return this.$store.getters["dashboard/isAsideHovered"];
    },
    getAccountData() {
      return this.$store.getters.getAccountData;
    }
  },
};
</script>


<style src='./style.scss' scoped lang='scss' />