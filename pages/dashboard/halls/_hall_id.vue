<template>
    <div class="edithall">
        <pageInfo :title="$t('pages.edithall.title')" :desc="$t('pages.edithall.desc')"/>
        <div class="content">
          <edithallForm/>
        </div>
    </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo"
import edithallForm from "~/components/forms/editHall/main/"

export default {
    mounted(){
        console.log(this.$route.params);
    },
    head() {
    return {
      title: "Edit Hall",
    };
  },
    layout: 'dashboard',
    components: {
        pageInfo,
        edithallForm
    }
}
</script>


<style lang="scss" scoped>
.content {
  background-color: $white;
  width: 95%;
  margin: 25px auto;
  min-height: 500px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px $grey-1;
}
</style>