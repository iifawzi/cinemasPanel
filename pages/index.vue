<template>
  <div class="authPage">
    <div class="authPage--container">
      <img alt="website logo" src="~/assets/images/logo.png" class="logo" width="130px" />
      <div class="login__message">
        <span class="welcome">Welcome Back!</span>
        <span class="continue">Login to continue</span>
      </div>
      <div class="loginForm__container">
        <loginForm />
      </div>
    </div>
  </div>
</template>


<script>
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
  &--container {
    width: 350px;
    height: 500px;
    background-color: $white;
    box-shadow: 0px 0px 20px 0px $grey-1;
    border-radius: 15px;
    padding: 0px 40px;
    .logo {
      margin-top: 60px;
    }
    .login__message {
      margin-top: 50px;
      text-align: center;
      .welcome {
        font-size: 2rem;
        display: block;
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