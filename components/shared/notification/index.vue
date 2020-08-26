<template>
  <div :class="['notification show', language]" v-if="show">
    <span class="text">{{label}}</span>
    <span class="dismiss">
      <i class="fas fa-times" @click="hideNotfication($event)"></i>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  props: {
    label: {
      type: String,
    },
    color: String,
  },
  methods: {
    hideNotfication(e) {
      e.target.parentElement.parentNode.classList.remove("show");
      e.target.parentElement.parentNode.classList.add("hide");
      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />