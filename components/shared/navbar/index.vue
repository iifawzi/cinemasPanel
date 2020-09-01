<template>
  <div class="navbar">
    <div class="navbar__contnet">
      <i class="fas fa-bars aside__button" @click="$store.dispatch('dashboard/toggleAside')"></i>
      <div class="right">
        <div class="languages">
            <img   v-if="language == 'en'"
            @click="changeLang('ar')" src="~/assets/images/arabic.png" width="18px" />
            <img v-if="language == 'ar'"
            @click="changeLang('en')" src="~/assets/images/english.png" width="18px" />
        </div>
        <div class="logout">
           <i :class="['fas fa-sign-out-alt icon', language]"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import loginForm from "~/components/forms/loginForm";
export default {
  methods: {
    changeLang(language) {
      Cookie.set("lang",language);
      this.$store.dispatch("changeLang", language);
      this.$i18n.locale = language;
    },
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped/>