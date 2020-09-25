<template>
  <div class="edithall">
    <pageInfo :title="$t('pages.edithall.title')" :desc="$t('pages.edithall.desc')" />
    <div class="content">
      <edithallForm @rerender="rerenderComponent" :key="keyToUpdate" />
    </div>
  </div>
</template>


<script>
import handle from "~/helpers/handle";
import pageInfo from "~/components/shared/pageInfo";
import edithallForm from "~/components/forms/editHall/main/";
import loading from "~/components/shared/loading";

export default {
  head() {
    return {
      title: "Edit Hall",
    };
  },
  data(){
    return {
      keyToUpdate: 0,
    }
  },
  layout: "dashboard",
  components: {
    pageInfo,
    edithallForm,
    loading,
  },
  methods: {
    rerenderComponent(){
      this.keyToUpdate++;
    }
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
}
</style>