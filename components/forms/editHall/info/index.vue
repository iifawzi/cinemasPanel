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
        v-model="$v.hall_info.hall_name.$model"
        inputStyle="blueBorder"
        @input="checkCorrectance"
      >
        <div
          class="error"
          v-if="$v.hall_info.hall_name.$dirty && !$v.hall_info.hall_name.required"
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
        v-model="$v.hall_info.hall_description.$model"
        inputStyle="blueBorder"
        @input="checkCorrectance"
      >
        <div
          class="error"
          v-if="$v.hall_info.hall_description.$dirty && !$v.hall_info.hall_description.required"
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
  mounted(){
   this.hall_info.hall_name = this.dbHallData.hall_name;
   this.hall_info.hall_description = this.dbHallData.hall_description;
  },
  components: {
    inputField,
  },
  data() {
    return {
      hall_info: {
        hall_name: "",
        hall_description: "",
      },
    };
  },
  props: {
    dbHallData: {
      type: Object,
      required: true,
    }
  },
  methods:{
    checkCorrectance(){
      if (this.$v.$invalid === false){
      this.$emit("iscorrect", {...this.hall_info}); // if correct send data else send false
      }else {
      this.$emit("iscorrect", false); // if correct send data else send false
      }
    }
  },
  validations: {
    hall_info: {
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
