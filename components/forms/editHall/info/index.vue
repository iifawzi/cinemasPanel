<template>
  <form class="info">
    <span class="title">{{$t("general.essential")}} :</span>
    <div class="inputs">
      <div class="input--container">
        <label for="name-input">{{$t('general.hall_name')}}</label>
        <inputField
          type="text"
          autofocus
          :placeholder="$t('general.hall_name')"
          required
          autocomplete="on"
          v-model="$v.hall_info.hall_name.$model"
          inputStyle="blueBorder"
          @input="checkCorrectance"
          id="name-input"
        >
          <div
            class="error"
            v-if="$v.hall_info.hall_name.$dirty && !$v.hall_info.hall_name.required"
          >{{$t("errors.hall_name")}}</div>
        </inputField>
      </div>
      <div class="input--container">
        <label for="description-input">{{$t('general.hall_description')}}</label>
        <inputField
          type="text"
          autofocus
          :placeholder="$t('general.hall_description')"
          required
          autocomplete="on"
          v-model="$v.hall_info.hall_description.$model"
          inputStyle="blueBorder"
          @input="checkCorrectance"
          id="description-input"
        >
          <div
            class="error"
            v-if="$v.hall_info.hall_description.$dirty && !$v.hall_info.hall_description.required"
          >{{$t("errors.hall_description")}}</div>
        </inputField>
      </div>
      <div class="input--container toggle-input">
        <label for="status-input">{{$t('general.status')}}</label>
        <toggleButton @input="checkCorrectance" v-model="$v.hall_info.hall_status.$model" />
      </div>
    </div>
  </form>
</template>


<script>
import inputField from "~/components/shared/inputField";
import toggleButton from "~/components/shared/toggleButton";
import { required } from "vuelidate/lib/validators";
export default {
  mounted() {
    this.hall_info.hall_name = this.dbHallData.hall_name;
    this.hall_info.hall_description = this.dbHallData.hall_description;
    this.hall_info.hall_status = this.dbHallData.hall_status;
  },
  components: {
    inputField,
    toggleButton,
  },
  data() {
    return {
      hall_info: {
        hall_name: "",
        hall_description: "",
        hall_status: "",
      },
    };
  },
  props: {
    dbHallData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    checkCorrectance() {
      if (this.$v.$invalid === false) {
        this.$emit("iscorrect", { ...this.hall_info }); // if correct send data else send false
      } else {
        this.$emit("iscorrect", false); // if correct send data else send false
      }
    },
  },
  validations: {
    hall_info: {
      hall_name: {
        required,
      },
      hall_description: {
        required,
      },
      hall_status: {
        required,
      },
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />
