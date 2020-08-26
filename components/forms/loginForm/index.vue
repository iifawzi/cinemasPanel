<template>
  <form class="loginForm">
    <div class="input--container">
      <inputField type="text" autofocus :placeholder="$t('forms.username')" required autocomplete="on" />
    </div>
    <div class="input--container">
      <inputField type="password" :placeholder="$t('forms.password')" required autocomplete="on" />
    </div>
    <div class="button--container">
      <submitButton color="blue" :title="$t('buttons.login')"/>
    </div>
  </form>
</template>


<script>
import inputField from "~/components/shared/inputField";
import submitButton from "~/components/shared/submitButton";
export default {
  components: {
    inputField,
    submitButton,
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />
