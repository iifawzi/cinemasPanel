<template>
  <div class="slotInfo">
    <div class="slotInfo__content">
      <div class="movie-info">
        <div class="left">
          <img :src="this.slotData.cover" class="cover" />
          <span class="movie-name">{{this.slotData.movie_name}}</span>
          <span
            class="movie-category"
          >{{this.slotData.category[0].toUpperCase()+this.slotData.category.substr(1,this.slotData.category.length)}}</span>
        </div>
        <div class="right">
          <span class="movie-desc">{{this.slotData.description}}</span>
          <div class="slotSpecific">
            <div class="list">
              <span class="list-item">
                <i class="fas fa-power-off icon fa-sm red"></i>
                {{this.slotData.slot_status ? $t("general.available") : $t("general.notavailable")}}
              </span>
              <span class="list-item">
                <i class="far fa-money-bill-alt icon fa-sm green-2"></i>
                {{this.slotData.ticket_price}} {{$t("general.EGP")}}
              </span>
              <span class="list-item">
                <i class="fas fa-clock icon fa-sm yellow"></i>
                {{this.slotData.duration}} {{$t("general.minute")}}
              </span>
            </div>

            <div class="list">
              <span class="list-item">
                <i class="fas fa-film icon fa-sm orange"></i>
                {{this.slotData.hall_name}}
              </span>
              <span class="list-item">
                <i class="far fa-calendar-alt icon fa-sm pink"></i>
                {{new Date(this.slotData.start_time).toLocaleString(this.language === 'ar' ? 'ar-EG' : 'en-US',
                { weekday: 'short', year: '2-digit', month: 'short', day: '2-digit'})}}
              </span>
              <span class="list-item">
                <i class="fas fa-hourglass-start icon fa-sm blue"></i>
                {{$t("general.from")}}:
                {{new Date(this.slotData.start_time).toLocaleString(this.language === 'ar' ? 'ar-EG' : 'en-US',
                { hour:"numeric",minute:"numeric",hour12: false })}}
                {{$t("general.to")}}:
                {{new Date(this.slotData.end_time).toLocaleString(this.language === 'ar' ? 'ar-EG' : 'en-US',
                { hour:"numeric",minute:"numeric",hour12: false })}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="slot-info"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slotData: Object,
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  },
};
</script>


<style scoped lang="scss" src="./style.scss" />