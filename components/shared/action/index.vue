<template>
  <div :class="['action', action]">
    <div class="action__icon"><i :class="icon"></i></div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />