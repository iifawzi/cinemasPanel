<template>
  <div class="addhall">
    <div class="content">

    </div>
  </div>
</template>


<script>
export default {
  head() {
    return {
      title: "Appointments",
    };
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