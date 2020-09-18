<template>
  <table :class="['modernTable', language === 'en' ? 'left' : 'right']">
    <tr>
      <slot name="table__head"></slot>
    </tr>
    <slot name="table__data"></slot>
  </table>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  },
};
</script>

<style lang="scss" src="./style.scss" scoped />