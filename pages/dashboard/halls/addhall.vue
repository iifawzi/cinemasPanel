<template>
    <div class="addhall">
        <pageInfo/>
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