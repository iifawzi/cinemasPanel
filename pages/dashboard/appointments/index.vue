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
import interactionPlugin from "@fullcalendar/interaction";
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
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        locales: [arLocale],
        eventClick: this.handleDateClick,
        select: this.handleEventSelect,
        selectAllow: this.isSelectAllowed,
        selectable: true,
        unselectAuto: true,
        selectOverlap:false,
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
    handleEventSelect(arg) {
      // console.log(arg);
    },
    isSelectAllowed(arg){
      if (Math.abs(arg.start.getDate() - arg.end.getDate()) !== 0 && Math.abs(arg.start.getDate() - arg.end.getDate()) !== 1){ // allow just the slots in the same day, or the slots that starts and end in the same day, or end in the day after (11pm to 1am next day for example.) 
      return false;
      }
      return true;
    }
  },
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