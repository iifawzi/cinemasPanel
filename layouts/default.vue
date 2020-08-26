<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
      head() {
    return {
    htmlAttrs: {
      lang: this.language,
    },
    bodyAttrs:{
        dir: this.language == 'ar' ? 'rtl' : 'ltr',
    }
  }
  },
      computed:{
    language(){
      return this.$store.getters.getLocale;
    }
  }
}
</script>