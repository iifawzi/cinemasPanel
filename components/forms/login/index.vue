<template>
  <form class="loginForm">
    <div class="input--container" v-if="!loading">
      <inputField
        type="text"
        autofocus
        :placeholder="$t('general.username')"
        required
        autocomplete="on"
        v-model="$v.loginForm.username.$model"
      >
        <div
          class="error"
          v-if="$v.loginForm.username.$dirty && !$v.loginForm.username.required"
        >{{$t("errors.username")}}</div>
      </inputField>
    </div>
    <div class="input--container" v-if="!loading">
      <inputField
        type="password"
        :placeholder="$t('general.password')"
        required
        autocomplete="on"
        v-model="$v.loginForm.password.$model"
      >
        <div
          class="error"
          v-if="$v.loginForm.password.$dirty && !$v.loginForm.password.required"
        >{{$t("errors.password")}}</div>
      </inputField>
    </div>
    <div class="button--container" v-if="!loading">
      <submitButton color="blue" :title="$t('buttons.login')" @click="submitForm" />
    </div>
    <notification :label="error.message" v-if="error.status === true && error.message != ''" />
    <loading type="circles" v-if="loading" />
  </form>
</template>


<script>
import inputField from "~/components/shared/inputField";
import submitButton from "~/components/shared/submitButton";
import loading from "~/components/shared/loading";
import notification from "~/components/shared/notification";
import { required } from "vuelidate/lib/validators";
import Cookie from "js-cookie";
export default {
  components: {
    inputField,
    submitButton,
    notification,
    loading,
  },
  data() {
    return {
      loading: false,
      error: {
        status: false,
        message: "",
      },
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        this.error.status = false;
        this.$api
          .post("cinemaAccounts/signinAccount", this.loginForm)
          .then((respond) => {
            const cinemaData = respond.data.data;
            Cookie.set("authorization", 'Bearer '+cinemaData.token);
            this.$store.dispatch("setAccountData", {username: cinemaData.username,account_id: cinemaData.cinemaAccount_id,cinema_id: cinemaData.cinema_id,name_ar: cinemaData.name_ar,name_en: cinemaData.name_en,role: cinemaData.role});
            this.$router.push("/dashboard");
          })
          .catch((err) => {
            this.loading = false;
            this.error.status = true;
            if (!err.response || !err.response.status) {
              (this.error.status = true),
                (this.error.message = this.$i18n.t("errors.500"));
            } else {
              switch (err.response.status) {
                case 400:
                  this.error.message = this.$i18n.t("errors.400");
                  break;
                case 401:
                  this.error.message = this.$i18n.t("errors.401");
                  break;
                default:
                  this.error.message = this.$i18n.t("errors.500");
              }
            }
          });
      }
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
