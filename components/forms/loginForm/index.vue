<template>
  <form class="loginForm">
    <div class="input--container">
      <inputField
        type="text"
        autofocus
        :placeholder="$t('forms.username')"
        required
        autocomplete="on"
        v-model="$v.loginForm.username.$model"
      >
       <div class="error" v-if="$v.loginForm.username.$dirty && !$v.loginForm.username.required">{{$t("errors.username")}}</div>
      </inputField>
    </div>
    <div class="input--container">
      <inputField
        type="password"
        :placeholder="$t('forms.password')"
        required
        autocomplete="on"
        v-model="$v.loginForm.password.$model"
      >
        <div class="error" v-if="$v.loginForm.password.$dirty && !$v.loginForm.password.required">{{$t("errors.password")}}</div>
      </inputField>
    </div>
    <div class="button--container">
      <submitButton color="blue" :title="$t('buttons.login')" @click="submitForm" />
    </div>
    <notification :label="$t('errors.500')" v-if="error === true" />
  </form>
</template>


<script>
import inputField from "~/components/shared/inputField";
import submitButton from "~/components/shared/submitButton";
import notification from "~/components/shared/notification";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    inputField,
    submitButton,
    notification,
  },
  data() {
    return {
      error: false,
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$v.username.$touch;
    },
  },
  validations: {
    loginForm: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />
