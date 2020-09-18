<template>
  <div class="addhall__form">
    <div class="content">
      <div class="tabs">
        <div class="tab">
          <writeDocument
            svgHeight="50"
            svgWidth="50"
            :class="['icon', activeTab >= 1 ? 'active' : '']"
          />
          <span :class="['title', activeTab >= 1 ? 'active' : '']">{{$t("general.essential")}}</span>
        </div>
        <arrow
          svgHeight="40"
          svgWidth="40"
          :class="['next',activeTab >= 1 ? 'active' : '', language === 'ar' ? 'next-ar' : '']"
        />
        <div class="tab">
            <besideSeats
            svgHeight="50"
            svgWidth="50"
           :class="['icon', activeTab >= 2 ? 'active' : '']"
          />
          <span :class="['title', activeTab >= 2 ? 'active' : '']">{{$t("general.seats")}}</span>
        </div>
      </div>

      <div class="loading" v-show="loading.status && loading.step != 3">
        <div class="circles">
          <loading type="circles" />
        </div>
        <div class="status">
          <span class="item" v-if="loading.step === 1">{{$t("loading.addHallInfo")}}</span>
          <span class="item" v-if="loading.step === 2">{{$t("loading.addCorridorsAndLocked")}}</span>
        </div>
      </div>

      <div class="loading" style="padding-top: 25px" v-show="loading.step === 3">
        <div class="status">
          <addedSuccessfully>{{$t("short_texts.added")}}</addedSuccessfully>
        </div>
      </div>

      <div class="tabs__content" v-show="!loading.status">
        <div class="content">
          <info v-show="activeTab === 1" @iscorrect="checkTab1" />
          <seats v-show="activeTab === 2" class="seats" @iscorrect="checkTab2" />
        </div>

        <div class="switcher">
          <div class="btn-container">
            <submitButton
              v-if="activeTab > 1"
              color="light-green"
              :title="$t('buttons.previous')"
              @click="prevTab"
            />
          </div>
          <div class="btn-container">
            <submitButton
              v-if="activeTab < 2"
              color="green"
              :disabledClass="isDisabled ? 'disabled' : ''"
              :title="$t('buttons.next')"
              @click="nextTab"
              :isDisabled="isDisabled"
            />
          </div>
          <div
            class="btn-container add"
            v-if="tabs.tab1 && tabs.tab2 && activeTab === 2"
            @click="confirm"
          >
            <submitButton color="blue" :title="$t('general.addHall')" />
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
import info from "~/components/forms/addHall/info/";
import notification from "~/components/shared/notification";
import addedSuccessfully from "~/components/shared/addedSuccessfully";
import seats from "~/components/general/seats/";
import writeDocument from "~/components/svg/writeDocument";
import arrow from "~/components/svg/arrow";
import besideSeats from "~/components/svg/besideSeats";
export default {
  data() {
    return {
      loading: {
        status: false,
        step: 1,
      },
      error: {
        message: "",
      },
      activeTab: 1,
      tabs: {
        tab1: false,
        tab2: false,
      },
      hall_info: {
        hall_name: "",
        hall_description: "",
        hall_status: false,
      },
      rowCorridors: [],
      columnCorridors: [],
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
    addedSuccessfully,
    writeDocument,
    arrow,
    besideSeats
  },
  methods: {
    nextTab() {
      if (this.activeTab != 2) {
        this.activeTab++;
      }
    },

    prevTab() {
      if (this.activeTab != 0) {
        this.activeTab--;
      }
    },

    checkTab1(data) {
      if (data === false) {
        this.tabs.tab1 = false;
      } else {
        this.hall_info.hall_name = data.hall_name;
        this.hall_info.hall_description = data.hall_description;
        this.tabs.tab1 = true;
      }
    },

    checkTab2(data) {
      this.hall_info.rows_number = data.rowsNumber;
      this.hall_info.columns_number = data.columnsNumber;
      this.rowCorridors = data.rowCorridors.filter(
        (corridor) => corridor !== null
      );
      this.columnCorridors = data.columnCorridors.filter(
        (corridor) => corridor !== null
      );
      this.locked_seats = data.lockedSeats;
      this.tabs.tab2 = true;
    },

    mergeCorridors(hall_id) {
      // creating an array contain the columnCorridors and rowCorridors:
      let rowCorridors = this.rowCorridors.map((corridor_number) => {
        return {
          hall_id: hall_id,
          corridor_number: corridor_number,
          direction: "row",
        };
      });
      let columnCorridors = this.columnCorridors.map((corridor_number) => {
        return {
          hall_id: hall_id,
          corridor_number: corridor_number,
          direction: "column",
        };
      });
      this.corridors = [...columnCorridors, ...rowCorridors];
    },

    alterLockedSeats(hall_id) {
      let updatedArray = this.locked_seats.map((lockedSeat) => {
        return {
          hall_id,
          row: lockedSeat.row,
          column: lockedSeat.column,
        };
      });
      this.locked_seats = updatedArray;
    },

    async addHallInfo() {
      const [hall, hall_error] = await handle(
        this.$api.post("halls/addhall", this.hall_info)
      );
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

    async addingCorridors(hall_id) {
      if (this.corridors.length === 0) {
        return true;
      }
      const [corridors, corridors_error] = await handle(
        this.$api.post("corridors/addCorridors", { corridors: this.corridors })
      );
      if (corridors) {
        return true;
      } else {
        await handle(
          this.$api({
            method: "DELETE",
            url: "halls/deleteHall",
            data: { hall_id },
          })
        );

        this.loading.status = false;
        if (!corridors_error.response || !corridors_error.response.status) {
          this.error.message = this.$i18n.t("errors.500");
        } else {
          switch (corridors_error.response.status) {
            case 400:
              this.error.message = this.$i18n.t("errors.400");
              break;
            case 401:
              this.error.message = this.$i18n.t("errors.401");
              break;
            default:
              this.error.message = this.$i18n.t("errors.500");
          }
        }
        return false;
      }
    },

    async addingLockedSeats(hall_id) {
      if (this.locked_seats.length === 0) {
        return true;
      }
      const [lockedSeats, lockedSeats_error] = await handle(
        this.$api.post("lockedSeats/lockSeats", { seats: this.locked_seats })
      );
      if (lockedSeats) {
        return true;
      } else {
        await handle(
          this.$api({
            method: "DELETE",
            url: "halls/deleteHall",
            data: { hall_id },
          })
        );
        this.loading.status = false;
        if (!lockedSeats_error.response || !lockedSeats_error.response.status) {
          this.error.message = this.$i18n.t("errors.500");
        } else {
          switch (lockedSeats_error.response.status) {
            case 400:
              this.error.message = this.$i18n.t("errors.400");
              break;
            case 401:
              this.error.message = this.$i18n.t("errors.401");
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
      const addInfo = await this.addHallInfo();
      if (addInfo) {
        const hall_id = addInfo.data.data.hall_id;
        this.loading.step = 2;
        this.mergeCorridors(hall_id);
        this.alterLockedSeats(hall_id);
        const addCorridors = await this.addingCorridors(hall_id);
        if (addCorridors) {
          const addLockedSeats = await this.addingLockedSeats(hall_id);
          if (addLockedSeats) {
            this.loading.step = 3;
          }
        }
      }
    },
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    isDisabled() {
      const tab = this.activeTab;
      let status = true;
      switch (tab) {
        case 1:
          this.tabs.tab1 ? (status = false) : (status = true);
          break;
        case 2:
          this.tabs.tab2 ? (status = false) : (status = true);
          break;
        default:
          break;
      }
      return status;
    },
    getAccountData() {
      return this.$store.getters.getAccountData;
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />