<template>
  <label class="toggle">
    <input type="checkbox" @change="$emit('input', $event.target.checked)" v-bind="$attrs" />
    <span :class="['slider round', language]"></span>
  </label>
</template>

<script>
export default {
  inheritAttrs:false,
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />