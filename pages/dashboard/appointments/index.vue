<template>
  <div class="appointments">
    <pageInfo :title="$t('pages.appointments.title')" :desc="$t('pages.appointments.desc')" />
    <div class="content" :class="language">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import arLocale from "@fullcalendar/core/locales/ar";

export default {
  head() {
    return {
      title: "Appointments",
    };
  },
  components: {
    pageInfo,
    FullCalendar,
  },
  layout: "dashboard",
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin],
        locales: [arLocale],
        eventClick: this.handleDateClick,
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: [
          {
            title: "White House Down",
            start: "2020-09-30T20:00:00Z",
            end: "2020-09-30T21:00:00Z",
            description: 'description for All Day Event',
            color: "green",
          },
        ],
        initialView: "dayGridMonth",
        locale: "en",
      },
    };
  },
  computed: {
    language() {
      this.calendarOptions.locale = this.$store.getters.getLocale;
      return this.$store.getters.getLocale;
    },
  },
   methods: {
    handleDateClick: function(arg) {
      console.log(arg);
    }
  }
};
</script>


<style lang="scss" scoped>
.content {
  background-color: $white;
  width: 80%;
  margin: 25px auto;
  padding-top: 40px;
  padding-bottom: 50px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px $grey-1;
}
</style>