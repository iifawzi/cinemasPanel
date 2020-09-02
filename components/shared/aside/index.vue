<template>
  <aside
    :class="['aside',getAsideStatus === true || isAsideHovered === true ? 'opened' : 'closed', isAsideHovered === true && getAsideStatus === false ? 'fixed' : '']"
    @mouseenter="$store.dispatch('dashboard/toggleHover')"
    @mouseleave="$store.dispatch('dashboard/toggleHover')"
  >
    <div class="top">
      <img
        v-if="getAsideStatus === true || isAsideHovered === true"
        alt="website logo"
        src="~/assets/images/logo.png"
        class="logo"
        width="90px"
      />
      <img v-else alt="website logo" src="~/assets/images/letter.png" class="logo" width="20px" />
    </div>
    <ul class="bottom">

      <listItem itemType="section" icon="fas fa-home" title="Dashboard" goto="/dashboard" />

       <listItem itemType="main" title="Preferences" />
       <listItem itemType="section" icon="fas fa-film" title="Halls"  goto="/halls"/>
       <listItem itemType="section" icon="fas fa-calendar-check" title="Shows" goto="halls"  />
       <listItem itemType="section" icon="fas fa-ticket-alt" title="Tickets" goto="tickets" />

       <listItem itemType="main" title="Payments" />
       <listItem itemType="section" icon="fas fa-money-check-alt" title="Diposits" goto="diposits"/>
       <listItem itemType="section" icon="fas fa-file-signature" title="Reports" goto="/reports"/>

          <listItem itemType="main" title="Control" />
          <listItem itemType="section" icon="fas fa-user-astronaut" title="Admins & Modirators" goto="/admin"/>
          <listItem itemType="section" icon="fas fa-question-circle" title="Support"  goto="/support" />
    </ul>
  </aside>
</template>

<script>
import listItem from "~/components/shared/listItem";
export default {
  computed: {
    getAsideStatus() {
      return this.$store.getters["dashboard/getAsideStatus"];
    },
    isAsideHovered() {
      return this.$store.getters["dashboard/isAsideHovered"];
    },
    getAccountData() {
      return this.$store.getters.getAccountData;
    }
  },
  components: {
    listItem
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />