<template>
    <div class="addhall">
        <pageInfo :title="$t('pages.halls.title')" :desc="$t('pages.halls.desc')"/>
        <div class="content">
          <div class="hallsTable">
          <modernTable />
          </div>
        </div>
    </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo"
import modernTable from "~/components/shared/modernTable"
export default {
    head() {
    return {
      title: "Halls",
    };
  },
    layout: 'dashboard',
    components: {
        pageInfo,
        modernTable
    }
}
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