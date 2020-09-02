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

      <li class="section">
        <nuxt-link class="link" to="/dashboard">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
          <span class="title">Dashboard</span>
        </nuxt-link>
      </li>

      <li class="main-section">
        <span class="title">Preferences</span>
      </li>

      <li class="section">
        <nuxt-link class="link" to="/dashboardddd">
          <span class="icon">
            <i class="fas fa-film"></i>
          </span>
          <span class="title">Halls</span>
        </nuxt-link>
      </li>

      <li class="section">
        <nuxt-link class="link" to="/dashboardddd">
          <span class="icon">
            <i class="fas fa-calendar-check"></i>
          </span>
          <span class="title">Shows</span>
        </nuxt-link>
      </li>
      
      <li class="section">
        <nuxt-link class="link" to="/dashboardddd">
          <span class="icon">
            <i class="fas fa-ticket-alt"></i>
          </span>
          <span class="title">Tickets</span>
        </nuxt-link>
      </li>

<li class="main-section">
        <span class="title">Payments</span>
      </li>

      <li class="section">
        <nuxt-link class="link" to="/dashboardddd">
          <span class="icon">
            <i class="fas fa-money-check-alt"></i>
          </span>
          <span class="title">Diposits</span>
        </nuxt-link>
      </li>

        <li class="section">
        <nuxt-link class="link" to="/dashboardddd">
          <span class="icon">
            <i class="fas fa-file-pdf"></i>
          </span>
          <span class="title">Reports</span>
        </nuxt-link>
      </li>

      <li class="main-section">
        <span class="title">Control</span>
      </li>

      <li class="section">
        <nuxt-link class="link" to="/dashboardddd">
          <span class="icon">
            <i class="fas fa-user-astronaut"></i>
          </span>
          <span class="title">Admins & Modirators</span>
        </nuxt-link>
      </li>

        <li class="section">
        <nuxt-link class="link" to="/dashboardddd">
          <span class="icon">
            <i class="fas fa-question-circle"></i>
          </span>
          <span class="title">Support</span>
        </nuxt-link>
      </li>
      

    </ul>
  </aside>
</template>

<script>
import badge from "~/components/shared/badge";
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
    },
  },
  components: {
    badge,
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />