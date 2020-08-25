<template>
  <button :class="['submitButton', color]">Login</button>
</template>


<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    }
  }
};
</script>

<style src="./style.scss" lang="scss" scoped />