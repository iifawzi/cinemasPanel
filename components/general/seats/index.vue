<template>
  <div class="seats">
    
  </div>
</template>

<script>
import seat from "~/components/shared/seat/";
export default {
  components: {
    seat,
  },
  computed: {
      language(){
          return this.$store.getters.getLocale;
      }
  }
};
</script>

<style src='./style.scss' lang='scss' scoped />
