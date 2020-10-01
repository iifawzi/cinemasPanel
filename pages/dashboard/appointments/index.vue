<template>
  <div class="appointments">
    <pageInfo :title="$t('pages.appointments.title')" :desc="$t('pages.appointments.desc')" />
    <div class="content" :class="language">
      <div class="calendar-container" v-if="!loading">
      <FullCalendar :options="calendarOptions" />
      </div>
      
      <div class="loading" v-if="loading">
        <loading type="circles" />
      </div>
      
    </div>
    <notification :label="error" v-if="error != ''" />
  </div>
</template>


<script>
import pageInfo from "~/components/shared/pageInfo";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";
import handle from "~/helpers/handle";
import notification from "~/components/shared/notification";
import loading from "~/components/shared/loading";

export default {
  async created() {
    const [slots, slots_error] = await handle(this.$api.post("slots/getSlots"));
    this.loading = false;
    if (slots) {
      for (const slot of slots.data.data) {
        this.calendarOptions.events.push({
          title: slot.movie_name,
          start: slot.start_time,
          end: slot.end_time,
          color: slot.slot_status === 1 ? "green" : "red",
        });
      }
    } else {
      this.loading = false;
      if (!slots_error.response || !slots_error.response.status) {
        this.error = this.$i18n.t("errors.500");
      } else {
        switch (slots_error.response.status) {
          case 400:
            this.error = this.$i18n.t("errors.400");
            break;
          case 401:
            this.error = this.$i18n.t("errors.401");
            break;
          default:
            this.error = this.$i18n.t("errors.500");
        }
      }
    }
  },
  head() {
    return {
      title: "Appointments",
    };
  },
  components: {
    pageInfo,
    FullCalendar,
    notification,
    loading
  },
  layout: "dashboard",
  data() {
    return {
      error: "",
      loading: true,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        locales: [arLocale],
        initialView: "dayGridMonth",
        locale: "en",
        eventClick: this.handleDateClick,
        select: this.handleEventSelect,
        selectAllow: this.isSelectAllowed,
        selectable: true,
        unselectAuto: true,
        selectOverlap: false,
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: [],
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
    isSelectAllowed(arg) {
      if (
        !arg.allDay &&
        (Math.abs(arg.start.getDate() - arg.end.getDate()) === 0 ||
          Math.abs(arg.start.getDate() - arg.end.getDate()) === 1)
      ) {
        // allow just the slots in the same day, or the slots that starts and end in the same day, or end in the day after (11pm to 1am next day for example.)
        return true;
      }
      return false;
    },
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