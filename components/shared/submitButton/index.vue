<template>
  <button :class="['submitButton', color]" @click.prevent="$emit('click')">{{title}}</button>
</template>


<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    title: {
      type:String,
      required: true,
    }
  }
};
</script>

<style src="./style.scss" lang="scss" scoped />