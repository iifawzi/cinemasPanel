<template>
    <div class="addhall">
        <pageInfo :title="$t('pages.addhall.title')" :desc="$t('pages.addhall.desc')"/>
    </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo"
export default {
    head() {
    return {
      title: "Add Hall",
    };
  },
    layout: 'dashboard',
    components: {
        pageInfo,
    }
}
</script>