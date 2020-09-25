<template>
  <div class="edithall__form">
    <span v-if="hallError && !hallLoading" class="not-found">لم يتم العثور على القاعه عذرًا</span>
    <loading type="circles" v-if="hallLoading" />
    <div class="content" v-if="!hallLoading && !hallError">
      <div class="loading" v-show="loading.status && loading.step != 2">
        <div class="circles">
          <loading type="circles" />
        </div>
        <div class="status">
          <span class="item" v-if="loading.step === 1">{{$t("loading.addHallInfo")}}</span>
        </div>
      </div>

      <div class="loading" style="padding-top: 25px" v-show="loading.step === 2">
        <div class="status">
          <success>{{$t("short_texts.added")}}</success>
        </div>
      </div>

      <div class="tabs__content" v-show="!loading.status">
        <div class="content" v-if="dbHallData != ''">
          <info @iscorrect="checkInfo" :dbHallData="dbHallData" class="info"  />
          <seats class="seats" @iscorrect="checkSeats" :dbHallData="dbHallData" />
        </div>

        <div class="switcher">
          <div class="btn-container">
            <submitButton
              color="light-green"
              :disabledClass="isDisabled ? 'disabled' : ''"
              :title="$t('buttons.edit')"
              @click="confirm"
              :isDisabled="isDisabled"
            />
          </div>
        </div>
      </div>
      <notification :label="error.message" v-if="error.message != ''" />
    </div>
  </div>
</template>

<script>
import handle from "~/helpers/handle";
import Cookie from "js-cookie";
import submitButton from "~/components/shared/submitButton";
import loading from "~/components/shared/loading";
import info from "~/components/forms/edithall/info/";
import notification from "~/components/shared/notification";
import success from "~/components/shared/success";
import seats from "~/components/general/seats/";
import writeDocument from "~/components/svg/writeDocument";
import arrow from "~/components/svg/arrow";
import besideSeats from "~/components/svg/besideSeats";
export default {
  async mounted() {
    this.hallLoading = true;
    const hall_id = this.$route.params.hall_id;
    const [hall, hall_error] = await handle(
      this.$api.post("halls/getHall", { hall_id })
    );
    this.hallLoading = false;
    if (hall) {
      this.dbHallData = hall.data.data;
    } else {
      this.hallError = true;
    }
  },
  data() {
    return {
      hallLoading: false,
      hallError: false,
      dbHallData: "",
      loading: {
        status: false,
        step: 1,
      },
      error: {
        message: "",
      },
      tabs: {
        infoStatus: true,
        seatsStatus: true,
      },
      hall_info: {
       
      },
      row_corridors: [],
      column_corridors: [],
      locked_seats: [],
      corridors: [],
    };
  },
  components: {
    submitButton,
    info,
    seats,
    loading,
    notification,
    success,
    writeDocument,
    arrow,
    besideSeats,
  },
  methods: {
    checkInfo(data) {
      if (data === false) {
        this.tabs.infoStatus = false;
      } else {
        this.hall_info.hall_name = data.hall_name;
        this.hall_info.hall_description = data.hall_description;
        this.hall_info.hall_status = data.hall_status;
        this.tabs.infoStatus = true;
      }
    },

    checkSeats(data) {
      this.hall_info.rows_number = data.rows_number;
      this.hall_info.columns_number = data.columns_number;
      console.log(this.hall_info.rows_number ,data, data.rows_number);
      this.row_corridors = data.row_corridors.filter(
        (corridor) => corridor !== null
      );
      this.column_corridors = data.column_corridors.filter(
        (corridor) => corridor !== null
      );
      this.locked_seats = data.lockedSeats;
      this.tabs.seatsStatus = true;
    },

    mergeCorridors() {
      // creating an array contain the column_corridors and row_corridors:
      let row_corridors = this.row_corridors.map((corridor_number) => {
        return {
          corridor_number: corridor_number,
          direction: "row",
        };
      });
      let column_corridors = this.column_corridors.map((corridor_number) => {
        return {
          corridor_number: corridor_number,
          direction: "column",
        };
      });
      this.corridors = [...column_corridors, ...row_corridors];
    },


    async addHallInfo(oldData,hallInfo, corridorsInfo, lockedSeatsInfo) {
      const newHallInfo = Object.entries(hallInfo);
      console.log(newHallInfo);
      // const [hall, hall_error] = await handle(
      //   this.$api.post("halls/addhall", {
      //     hallInfo,
      //     corridorsInfo,
      //     lockedSeatsInfo,
      //   })
      // );
      // if (hall) {
      //   return hall;
      // } else {
      //   this.loading.status = false;
      //   if (!hall_error.response || !hall_error.response.status) {
      //     this.error.message = this.$i18n.t("errors.500");
      //   } else {
      //     switch (hall_error.response.status) {
      //       case 400:
      //         this.error.message = this.$i18n.t("errors.400");
      //         break;
      //       case 401:
      //         this.error.message = this.$i18n.t("errors.401");
      //         break;
      //       case 409:
      //         this.error.message = this.$i18n.t("errors.addHall_409");
      //         break;
      //       default:
      //         this.error.message = this.$i18n.t("errors.500");
      //     }
      //   }
      //   return false;
      // }
    },

    async confirm() {
      // this.loading.status = true;
      // this.loading.step = 1;
      // this.error.message = "";

      this.mergeCorridors();

      const addedHall = await this.addHallInfo(
        this.dbHallData,
        this.hall_info,
        this.corridors,
        this.locked_seats
      );
      // if (addedHall) {
      //   this.loading.step = 2;
      // }
    },
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    isDisabled() {
      let status =  this.tabs.infoStatus && this.tabs.seatsStatus ? false : true;
      return status;
    },
    getAccountData() {
      return this.$store.getters.getAccountData;
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />