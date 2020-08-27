<template>
  <form class="loginForm">
    <div class="input--container">
      <inputField type="text" autofocus :placeholder="$t('forms.username')" required autocomplete="on" />
    </div>
    <div class="input--container">
      <inputField type="password" :placeholder="$t('forms.password')" required autocomplete="on" />
    </div>
    <div class="button--container">
      <submitButton color="blue" :title="$t('buttons.login')" @click="showError"/>
    </div>
    <notification :label="$t('errors.500')" v-if="error === true"/>
  </form>
</template>


<script>
import inputField from "~/components/shared/inputField";
import submitButton from "~/components/shared/submitButton";
import notification from "~/components/shared/notification";
export default {
  components: {
    inputField,
    submitButton,
    notification
  },
  data(){
    return {
      error: false
    }
  },
  methods: {
    showError(){
      this.error = true;
    }
  }
};
</script>

<style src="./style.scss" lang="scss" scoped />
