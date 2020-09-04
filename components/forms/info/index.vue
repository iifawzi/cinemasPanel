<template>
  <form class="info">
      <span class="title">{{$t("general.essential")}} :</span>
      <div class="inputs">
    <div class="input--container">
      <inputField
        type="text"
        autofocus
        :placeholder="$t('general.hall_name')"
        required
        autocomplete="on"
        v-model="$v.hallInfo.hall_name.$model"
      >
        <div
          class="error"
          v-if="$v.hallInfo.hall_name.$dirty && !$v.hallInfo.hall_name.required"
        >{{$t("errors.hall_name")}}</div>
      </inputField>
    </div>
    <div class="input--container">
      <inputField
        type="text"
        autofocus
        :placeholder="$t('general.hall_description')"
        required
        autocomplete="on"
        v-model="$v.hallInfo.hall_description.$model"
      >
        <div
          class="error"
          v-if="$v.hallInfo.hall_description.$dirty && !$v.hallInfo.hall_description.required"
        >{{$t("errors.hall_description")}}</div>
      </inputField>
    </div>
      </div>

  </form>
</template>


<script>
import inputField from "~/components/shared/inputField";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    inputField,
  },
  data() {
    return {
      hallInfo: {
        hall_name: "",
        hall_description: "",
      },
    };
  },
  validations: {
    hallInfo: {
      hall_name: {
        required,
      },
      hall_description: {
        required,
      },
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />
