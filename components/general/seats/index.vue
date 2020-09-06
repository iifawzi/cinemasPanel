<template>
  <div class="seats">
    <div class="content">
      <div class="screen">{{$t("general.screen")}}</div>
      <div class="data">
        <!-- Rows Numbers -->
        <div :class="['rowsNumbers', 'rowsNumbers-'+language]"> 
          <div class="rowNumber"></div>
          <div
            v-for="({uuid,name}) of seatsArray"
            :key="uuid"
            class="rowNumber"
            @click="clicked = uuid"
          >
            <div
              :class="['key', , name === 'RowCorridor' ? 'fas fa-walking corridor-icon' : '']"
            >{{name === 'RowCorridor' ? '' : name}}</div>
          </div>
        </div>
        <!--  -->
        <div class="seats--container">
          <!-- Columns Numbers -->
          <div :class="['columnsNumbers']">
            <div
              v-for="({uuid,status,seatColumn}) of seatsArray[0]['seats']"
              :key="uuid"
              class="columnNumber"
              @click.stop="clicked = uuid"
            >
              <span
                :class="['number', status === 'columnCorridor' ? 'fas fa-walking corridor-icon' : '']"
              >{{status === 'columnCorridor' ? '' : seatColumn}}</span>
            </div>
          </div>
          <!--  -->
          <!-- Seats -->
          <div v-for="({uuid,seats}) of seatsArray" :key="uuid" class="row">
            <div
              v-for="({uuid,status,seatRow,seatColumn}) of seats"
              :key="uuid"
              :class="['seat--container', 'seat-margin-'+language]"
            >
             <seat v-if="status != 'columnCorridor'" @click="clicked = uuid" :color="status === 'closed' ? 'closed' : ''" />
             <!-- Seat Options -->
              <div class="options" v-if="clicked === uuid">
              <div :class="['arrow', 'arrow-'+language]"></div>
              <div :class="['box', 'box-'+language]">
                <!-- Dismiss icon -->
                <div class="function" @click.stop="clicked = ''">
                  <span :class="['closeIcon', 'closeIcon-'+language]">
                    <i class="far fa-window-close close"></i>
                  </span>
                </div>
                <!--  -->
                <!-- Toggle The Seat function  -->
                <div
                  class="function"
                  @click.stop="toggleSeatStatus(seatRow,seatColumn)"
                >
                  <span class="icon">
                    <i :class="[status != 'closed' ? 'fas fa-ban red' : 'fas fa-check-circle green']"></i>
                  </span>
                  <span v-if="status != 'closed'" class="name">{{$t("general.closeSeat")}}</span>
                  <span v-else class="name">{{$t("general.openSeat")}}</span>
                </div>
                <!--  -->
              </div>
            </div>
            <!--  -->
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import seat from "~/components/shared/seat/";
import letters from "~/helpers/letters.js";
import seats from "~/helpers/seats.js";
export default {
  data() {
    return {
      clicked: "",
    };
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
        this.hallInfo.columnsNumber,
        this.hallInfo.rowCorridors,
        this.hallInfo.columnCorridors,
        this.hallInfo.lockedSeats
      );
      return updatedSeats;
    },
  },
  methods: {
    // not column corridor
    checkNotCorridor(corridorNumber) {
      // we are using (index+1) because index starts from zero.
      if (this.hallInfo.columnCorridors.includes(corridorNumber)) {
        return false;
      } else {
        return true;
      }
    },
    // not row corridor
    checkNotRowCorridor(corridorNumber) {
      // we are using (index+1) because index starts from zero.
      if (this.hallInfo.rowCorridors.includes(corridorNumber)) {
        return false;
      } else {
        return true;
      }
    },

    //
    // using `index+1` when calling the below functions because index starts from 0
    //

    // Rows Functions
    deleteRow(rowNumber) {
      this.clicked = "";
      this.hallInfo.rowsNumber--;
      this.hallInfo.rowCorridors = [
        ...this.hallInfo.rowCorridors.map((corridorNumber) => {
          if (corridorNumber > rowNumber) {
            // if we are deleting a row (not corridor) which is above the corridors
            corridorNumber--; // shift each corridor after the deleted row one step above.
            return corridorNumber;
          } else if (corridorNumber === rowNumber) {
            // if we are deleting a corridor:
            return null;
          } else {
            return corridorNumber;
          }
        }),
      ];
    },
    convertToCorridor(rowNumber) {
      this.clicked = "";
      this.hallInfo.rowCorridors.push(rowNumber);
    },
    convertToRow(rowNumber) {
      this.clicked = "";
      const corridorIndex = this.hallInfo.rowCorridors.indexOf(rowNumber);
      if (corridorIndex > -1) {
        this.hallInfo.rowCorridors.splice(corridorIndex, 1);
      }
    },
    addRowAbove(rowNumber) {
      this.clicked = "";
      this.hallInfo.rowsNumber++;
      this.hallInfo.rowCorridors = [
        ...this.hallInfo.rowCorridors.map((corridorNumber) => {
          if (corridorNumber > rowNumber || corridorNumber === rowNumber) {
            // if we are adding a row where there will be an corridors below it.
            // OR who call this function is corridor, so we will shift this corridor one step
            corridorNumber++; // shift each corridor one step down.
            return corridorNumber;
          } else {
            return corridorNumber;
          }
        }),
      ];
    },
    addRowBelow(rowNumber) {
      this.clicked = "";
      this.hallInfo.rowsNumber++;
      this.hallInfo.rowCorridors = [
        ...this.hallInfo.rowCorridors.map((corridorNumber) => {
          if (corridorNumber > rowNumber) {
            // if we are adding a row where there will be an corridors below it.
            corridorNumber++; // shift each corridor one step down.
            return corridorNumber;
          } else {
            return corridorNumber;
          }
        }),
      ];
    },
    addCorridor(newCorridorIndex) {
      // When adding corridor above we use the index of caller, (index+1), if below we use the (index+1+1)
      // explanition:
      // if we are at row number 6 and wanna add a corridor below so the number of new corridor will be 7 for and the old one will be the same. for that reason the we use (index+1+1) for new one.
      // if we are at row number 6 and wanna add a corridor above, the number of new corridor will be 6, and the old one will be 7 so we use (index+1) for the new one, and.
      this.clicked = "";
      this.hallInfo.rowsNumber++;
      this.hallInfo.rowCorridors = [
        ...this.hallInfo.rowCorridors.map((corridorNumber) => {
          if (corridorNumber > newCorridorIndex) {
            // if we are adding a corridor where there will be an corridors below it.
            corridorNumber++; // shift each corridor one step down.
            return corridorNumber;
          } else {
            return corridorNumber;
          }
        }),
      ];
      this.hallInfo.rowCorridors.push(newCorridorIndex);
    },

    // Columns Functions
    deleteColumn(columnNumber) {
      this.clicked = "";
      this.hallInfo.columnsNumber--;
      this.hallInfo.columnCorridors = [
        ...this.hallInfo.columnCorridors.map((corridorNumber) => {
          if (corridorNumber > columnNumber) {
            // if we are deleting a column (not corridor) which is before corridors
            corridorNumber--; // shift each corridor after the deleted column one step before.
            return corridorNumber;
          } else if (corridorNumber === columnNumber) {
            // if we are deleting a corridor:
            return null;
          } else {
            return corridorNumber;
          }
        }),
      ];
    },

    convertToCorridor(rowNumber) {
      this.clicked = "";
      this.hallInfo.rowCorridors.push(rowNumber);
    },
    convertToColumn(columnNumber) {
      this.clicked = "";
      const corridorIndex = this.hallInfo.columnCorridors.indexOf(columnNumber);
      if (corridorIndex > -1) {
        this.hallInfo.columnCorridors.splice(corridorIndex, 1);
      }
    },
    convertColumnToCorridor(columnNumber) {
      this.clicked = "";
      this.hallInfo.columnCorridors.push(columnNumber);
    },
    addColumnBefore(columnNumber) {
      this.clicked = "";
      this.hallInfo.columnsNumber++;
      this.hallInfo.columnCorridors = [
        ...this.hallInfo.columnCorridors.map((corridorNumber) => {
          if (corridorNumber >= columnNumber) {
            // if we are adding a column where there will be an corridors after it.
            // OR who call this function is corridor, so we will shift this corridor one step
            corridorNumber++; // shift each corridor one step right.
            return corridorNumber;
          } else {
            return corridorNumber;
          }
        }),
      ];
    },
    addColumnAfter(columnNumber) {
      this.clicked = "";
      this.hallInfo.columnsNumber++;
      this.hallInfo.columnCorridors = [
        ...this.hallInfo.columnCorridors.map((corridorNumber) => {
          if (corridorNumber > columnNumber) {
            // if we are adding a column where there will be an corridors before it.
            corridorNumber++; // shift each corridor one step left.
            return corridorNumber;
          } else {
            return corridorNumber;
          }
        }),
      ];
    },
    addColumnCorridor(newCorridorIndex) {
      // When adding corridor before we use the index of caller, (index+1), if after we use the (index+1+1)
      // explanition:
      // if we are at column number 6 and wanna add a corridor after so the number of new corridor will be 7 for and the old one will be the same. for that reason the we use (index+1+1) for new one.
      // if we are at row number 6 and wanna add a corridor before, the number of new corridor will be 6, and the old seat will be 7 so we use (index+1) for the new one, and.
      this.clicked = "";
      this.hallInfo.columnsNumber++;
      this.hallInfo.columnCorridors = [
        ...this.hallInfo.columnCorridors.map((corridorNumber) => {
          if (corridorNumber > newCorridorIndex) {
            // if we are adding a corridor where there will be an corridors after it.
            corridorNumber++; // shift each corridor one step right.
            return corridorNumber;
          } else {
            return corridorNumber;
          }
        }),
      ];
      this.hallInfo.columnCorridors.push(newCorridorIndex);
    },


    // Seat Options
    toggleSeatStatus(rowNumber,columnNumber) { 
      this.clicked = "";
      const index = this.hallInfo.lockedSeats.findIndex(locked=> locked.row === rowNumber && locked.column === columnNumber);
      if (index > -1) {
        this.hallInfo.lockedSeats.splice(index, 1);
      } else {
        this.hallInfo.lockedSeats.push({row:rowNumber,column:columnNumber});
      }
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />
