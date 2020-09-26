<template>
  <div class="appointments">
    <pageInfo :title="$t('pages.appointments.title')" :desc="$t('pages.appointments.desc')" />
    <div class="content"></div>
  </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo";
export default {
  head() {
    return {
      title: "Appointments",
    };
  },
  components: {
    pageInfo,
  },

  layout: "dashboard",
};
</script>


<style lang="scss" scoped>
.content {
  background-color: $white;
  width: 80%;
  margin: 25px auto;
  padding-top: 40px;
  padding-bottom: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px $grey-1;
}
</style>