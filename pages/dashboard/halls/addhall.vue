<template>
    <div class="addhall">
        <pageInfo :title="$t('pages.addhall.title')" :desc="$t('pages.addhall.desc')"/>
        <div class="content">
          <addHallForm/>
        </div>
    </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo"
import addHallForm from "~/components/forms/addHall"
export default {
    head() {
    return {
      title: "Add Hall",
    };
  },
    layout: 'dashboard',
    components: {
        pageInfo,
        addHallForm
    }
}
</script>


<style lang="scss" scoped>
.content {
  background-color: $white;
  width: 95%;
  margin: 25px auto;
  height: 1000px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px $grey-1;
}
</style>