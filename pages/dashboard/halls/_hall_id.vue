<template>
  <div class="edithall">
    <pageInfo :title="$t('pages.edithall.title')" :desc="$t('pages.edithall.desc')" />
    <div class="content">
      <edithallForm v-if="!loading && !error" />
      <span v-if="error && !loading" class="not-found">لم يتم العثور على القاعه عذرًا</span>
      <loading type="circles" v-if="loading" />
    </div>
  </div>
</template>


<script>
import handle from "~/helpers/handle";
import pageInfo from "~/components/shared/pageInfo";
import edithallForm from "~/components/forms/editHall/main/";
import loading from "~/components/shared/loading";

export default {
  async mounted() {
    this.loading = true;
    const hall_id = this.$route.params.hall_id;
    const [hall, hall_error] = await handle(
      this.$api.post("halls/getHall", { hall_id })
    );
    this.loading = false;
    if (hall) {
      this.hallData = hall;
    } else {
      this.error = true;
    }
  },
  head() {
    return {
      title: "Edit Hall",
    };
  },
  layout: "dashboard",
  components: {
    pageInfo,
    edithallForm,
    loading,
  },
  data() {
    return {
      loading: false,
      error: false,
      hallData: ""
    };
  },
};
</script>


<style lang="scss" scoped>
.content {
  background-color: $white;
  width: 95%;
  margin: 25px auto;
  padding: 25px 0px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px $grey-1;
  .not-found{
  display: block;
  text-align: center;
  color: $red;
  }
}
</style>