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
          <success>{{$t("short_texts.edited")}}</success>
        </div>
      </div>

      <div class="tabs__content" v-show="!loading.status">
        <div class="content" v-if="dbHallData != ''">
          <info @iscorrect="checkInfo" :dbHallData="dbHallData" class="info" />
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
      dbHallData: "", // coming from database (in edit hall's page)
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
      // user's chosen data: 
      hall_info: {},
      row_corridors: [],
      column_corridors: [],
      lockedSeats: [],


      // will be submitted (after filtered `used in edit hall's page ` )
      newLockedSeats: [],
      deletedLockedSeats: [],
      newCorridors: [],
      deletedCorridors: [],
      // the user's chosen hall's info will be used also. (it's filtered on its place)
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
      this.row_corridors = data.row_corridors.filter(
        (corridor) => corridor !== null
      );
      this.column_corridors = data.column_corridors.filter(
        (corridor) => corridor !== null
      );
      this.lockedSeats = data.lockedSeats;
      this.tabs.seatsStatus = true;
    },

    filterHallInfo(oldData) {
      // filter the hall's info:
      this.hall_info = Object.entries(this.hall_info)
        .filter((element) => {
          // to filter only the data that differs from the old one, to update them only.
          if (element[1] !== oldData[element[0]]) {
            return true;
          } else {
            return false;
          }
        })
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    },

    filterCorridors(oldData) {
      const hall_id = this.$route.params.hall_id;
      this.deletedCorridors = [];
      this.newCorridors = [];
      // filter the corridors:

      //=>  Column Corridors   <= //
      // if new corridors doesn't include the old one: so it's deleted
      oldData.column_corridors.forEach((element) => {
        if (!this.column_corridors.includes(element.corridor_number)) {
          this.deletedCorridors.push(element.corridor_id);
        }
      });

      // if old corridors doesn't include the new one: so it's new:
      this.column_corridors.forEach((corridorNumber) => {
        if (
          oldData.column_corridors.findIndex(
            (element) => element.corridor_number === corridorNumber
          ) === -1
        ) {
          this.newCorridors.push({
            corridor_number: corridorNumber,
            direction: "column",
            hall_id: hall_id,
          });
        }
      });

      //=>  Row Corridors   <= //
      // if new corridors doesn't include the old one: so it's deleted
      oldData.row_corridors.forEach((element) => {
        if (!this.row_corridors.includes(element.corridor_number)) {
          this.deletedCorridors.push(element.corridor_id);
        }
      });
      // if old corridors doesn't include the new one: so it's new:
      this.row_corridors.forEach((corridorNumber) => {
        if (oldData.row_corridors.findIndex((element) => element.corridor_number === corridorNumber) === -1) {
          this.newCorridors.push({
            corridor_number: corridorNumber,
            direction: "row",
            hall_id: hall_id,
          });
        }
      });
    },


    filterLockedSeats(oldData){
      const hall_id = this.$route.params.hall_id;
      this.newLockedSeats = [];
      this.deletedLockedSeats = [];
      // filter the lockedSeats:
      // if new locked Seats doesn't include the old one: so it's deleted
      oldData.lockedSeats.forEach((element) => {
        if (this.lockedSeats.findIndex(locked=>locked.row === element.row && locked.column === element.column) === -1) {
          this.deletedLockedSeats.push(element.lockedSeat_id);
        }
      });

       // if old locked Seats doesn't include the new one: so it's new:
      this.lockedSeats.forEach((locked) => {
        if (oldData.lockedSeats.findIndex(element=>element.row === locked.row && element.column === locked.column) === -1) {
          this.newLockedSeats.push({
            row: locked.row,
            column: locked.column,
            hall_id: hall_id,
          });
        }
      });
    
    },

    async addHallInfo(hall_id,hallInfo, newLockedSeats,deletedLockedSeats,deletedCorridors,newCorridors) {
      const [hall, hall_error] = await handle(
        this.$api.patch("halls/updateHall", {hall_id,hallInfo, newLockedSeats,deletedLockedSeats,deletedCorridors,newCorridors}));
      if (hall) {
        return hall;
      } else {
        this.loading.status = false;
        if (!hall_error.response || !hall_error.response.status) {
          this.error.message = this.$i18n.t("errors.500");
        } else {
          switch (hall_error.response.status) {
            case 400:
              this.error.message = this.$i18n.t("errors.400");
              break;
            case 401:
              this.error.message = this.$i18n.t("errors.401");
              break;
            case 409:
              this.error.message = this.$i18n.t("errors.addHall_409");
              break;
            default:
              this.error.message = this.$i18n.t("errors.500");
          }
        }
        return false;
      }
    },

    async confirm() {
      this.loading.status = true;
      this.loading.step = 1;
      this.error.message = "";
      const hall_id = this.$route.params.hall_id;
      this.filterHallInfo(this.dbHallData);
      this.filterCorridors(this.dbHallData);
      this.filterLockedSeats(this.dbHallData);
      const addedHall = await this.addHallInfo(hall_id,this.hall_info, this.newLockedSeats,this.deletedLockedSeats,this.deletedCorridors,this.newCorridors);
      if (addedHall) {
      this.loading.step = 2;
      setTimeout(() => {
        this.$emit('rerender');
      }, 1000);
      }
    },
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    isDisabled() {
      let status = this.tabs.infoStatus && this.tabs.seatsStatus ? false : true;
      return status;
    },
    getAccountData() {
      return this.$store.getters.getAccountData;
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />