<template>
    <div class="addhall">
        <pageInfo :title="$t('pages.halls.title')" :desc="$t('pages.halls.desc')"/>
        <div class="content">
        </div>
    </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo"
export default {
    head() {
    return {
      title: "Halls",
    };
  },
    layout: 'dashboard',
    components: {
        pageInfo,
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