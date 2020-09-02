<template>
  <div class="authPage">
    <span
      v-if="language == 'en'"
      :class="['authPage__languages', language]"
      @click="changeLang('ar')"
    ><img src="~/assets/images/arabic.png" width="18px" /></span>
    <span
      v-if="language == 'ar'"
      :class="['authPage__languages', language]"
      @click="changeLang('en')"
    ><img src="~/assets/images/english.png" width="18px" /></span>
    <div class="authPage--container">
      <img alt="website logo" src="~/assets/images/logo-dark.png" class="logo" width="130px" />
      <div class="login__message">
        <span class="welcome">{{$t("short_texts.welcomeBack")}}</span>
        <span class="continue">{{$t("short_texts.loginContinue")}}</span>
      </div>
      <div class="loginForm__container">
        <loginForm />
      </div>
    </div>
  </div>
</template>


<script>
import Cookie from "js-cookie";
import loginForm from "~/components/forms/loginForm";
export default {
  head() {
    return {
      title: "Login",
    };
  },
  components: {
    loginForm,
  },
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
  middleware: ['isAllowed']
};
</script>


<style lang="scss" scoped>
.authPage {
  background-color: $blue-1;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  &__languages {
    position: absolute;
    top: 0;
    font-size: 1.8rem;
    color: $grey-2;
    cursor: pointer;
    &.ar {
      left: 0;
      margin-left: 20px;
      margin-top: 10px;
    }
    &.en {
      right: 0;
      margin-right: 20px;
      margin-top: 10px;
    }
  }
  &--container {
    width: 350px;
    height: 500px;
    background-color: $white;
    box-shadow: 0px 0px 20px 0px $grey-1;
    border-radius: 15px;
    padding: 0px 40px;
    display: flex;
    flex-flow: column;
    align-items: center;;
    .logo {
      margin-top: 60px;
    }
    .login__message {
      margin-top: 50px;
      text-align: center;
      .welcome {
        font-size: 2rem;
        display: block;
        color: $grey-2;
      }
      .continue {
        font-size: 1.4rem;
        display: block;
        color: $blue;
      }
    }
    .loginForm__container {
      margin-top: 30px;
    }
  }
}
</style>