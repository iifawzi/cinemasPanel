<template>
  <div class="inputField">
    <input @input="$emit('input', $event.target.value)" v-bind="$attrs" :class="['input', inputStyle]" />
    <div class="input__error">
     <slot/>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    inputStyle: {
    type: String,
    default: ""
    }
  }
};
</script>


<style src="./style.scss" lang="scss" scoped />