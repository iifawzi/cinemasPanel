<template>
  <div class="seats" dir="ltr">
    <div class="content">
      <div class="screen">{{$t("general.screen")}}</div>
      <div class="data">
        <div class="rowsNumbers">
          <div class="rowNumber"></div>
          <div v-for="{key} of seatsArray" :key="key" class="rowNumber">
            <span class="options">
              <i class="fas fa-sort-up"></i>
            </span>
            <span
              :class="['key', , key === undefined ? 'fas fa-walking corridor-icon' : '']"
            >{{key === undefined ? '' : key}}</span>
          </div>
        </div>
        <div class="seats--container">
          <div :class="['columnsNumbers']">
            <div
              v-for="(seat,index) of seatsArray[0]['seats']"
              :key="index"
              class="columnNumber"
            >
              <span class="options">
              <i class="fas fa-sort-up"></i>
            </span>
           <span :class="['number', checkNotCorridor(index+1) === false ? 'fas fa-walking corridor-icon' : '']"> {{checkNotCorridor(index+1) ? columnNumber() : ""}}</span>
            </div>
          </div>
          <div v-for="{key,seats} of seatsArray" :key="key" class="row">
            <div
              v-for="(val,index) of seats"
              :key="val != 0 ? val : val+Math.random()*1000"
              :class="['seat--container', 'seat-margin-'+language, checkNotCorridor(index+1) ? '' : 'row-corridor']"
            >
              <seat v-if="checkNotCorridor(index+1)" :color="val === 0 ? 'closed' : ''" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import seat from "~/components/shared/seat/";
import letters from "~/helpers/letters.js";
import seats from "~/helpers/seats.js";
let startNumber = 1;
export default {
  mounted() {
    startNumber = 1;
  },

  props: {
    hallInfo: {
      type: Object,
      required: true,
    },
  },
  components: {
    seat,
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    seatsArray() {
      const lettersToUse = letters(this.hallInfo.rowsNumber);
      const updatedSeats = seats(
        lettersToUse,
        this.hallInfo.rowsNumber,
        this.hallInfo.columnNumber,
        this.hallInfo.rowCorridors,
        this.hallInfo.columnCorridors,
        this.hallInfo.lockedSeats
      );
      return updatedSeats;
    },
  },
  methods: {
    checkNotCorridor(corridorNumber) {
      if (this.hallInfo.columnCorridors.includes(corridorNumber)) {
        return false;
      } else {
        return true;
      }
    },
    columnNumber() {
      if (
        startNumber >
        this.hallInfo.columnNumber - this.hallInfo.columnCorridors.length
      ) {
        startNumber = 1;
      }
      return startNumber++;
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />
