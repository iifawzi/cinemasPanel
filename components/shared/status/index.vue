<template>
  <div :class="['status', status]">
    <div class="status__value">{{value}}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />