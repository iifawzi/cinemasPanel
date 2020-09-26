<template>
  <aside v-if="getAsideStatus"
    :class="['aside',getAnimation, getAsideStatus === true ? 'fixed' : '']">
    <div class="contents">
<div class="top">
      <img
        v-if="getAsideStatus === true"
        alt="website logo"
        src="~/assets/images/logo.png"
        class="logo-main"
      />
    </div>
    <ul class="bottom">

      <listItem itemType="section" icon="fas fa-home" :title="$t('aside.dashboard')" goto="/dashboard" />

       <listItem itemType="main" :title="$t('aside.halls')" />
       <listItem itemType="section" icon="fas fa-vihara" :title="$t('aside.halls')"  goto="/dashboard/halls"/>
       <listItem itemType="section" icon="fas fa-plus-square" :title="$t('aside.addhall')"  goto="/dashboard/halls/addhall"/>

       <listItem itemType="main" :title="$t('aside.appointments')" />
       <listItem itemType="section" icon="fas fa-calendar-alt" :title="$t('aside.appointments')"  goto="/dashboard/appointments"/>
       <listItem itemType="section" icon="fas fa-plus-square" :title="$t('aside.addAppointment')"  goto="/dashboard/appointments/addAppointment"/>

       <listItem itemType="main" :title="$t('aside.preferences')" />
       <listItem itemType="section" icon="fas fa-calendar-check" :title="$t('aside.shows')" goto="shows"  />
       <listItem itemType="section" icon="fas fa-ticket-alt" :title="$t('aside.tickets')" goto="tickets" />
       <listItem itemType="section" icon="fas fa-plus" :title="$t('aside.addTicket')" goto="addTicket" />

       <listItem itemType="main" :title="$t('aside.payments')" />
       <listItem itemType="section" icon="fas fa-money-check-alt" :title="$t('aside.diposits')" goto="diposits"/>
       <listItem itemType="section" icon="fas fa-file-signature" :title="$t('aside.reports')" goto="/reports"/>

          <listItem itemType="main" :title="$t('aside.control')" />
          <listItem itemType="section" icon="fas fa-user-astronaut" :title="$t('aside.admins')" goto="/admin"/>
          <listItem itemType="section" icon="fas fa-question-circle" :title="$t('aside.support')"  goto="/support" />
    </ul>
    </div>
    
  </aside>
</template>

<script>
import listItem from "~/components/shared/listItem";
export default {
  computed: {
    getAsideStatus() {
      return this.$store.getters["dashboard/getAsideStatus"];
    },
    getAnimation(){
      return this.$store.getters["dashboard/getAnimation"];
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