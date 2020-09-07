<template>
  <div class="seats">
    <div class="content">
      <div class="screen">{{$t("general.screen")}}</div>
      <div class="data">
        <!-- Rows Numbers -->
        <div :class="['rowsNumbers', 'rowsNumbers-'+language]">
          <div class="rowNumber"></div>
          <div
            v-for="({rowNumber,name,realRowNumber}) of seatsArray"
            :key="rowNumber"
            class="rowNumber"
            @click="clicked = rowNumber"
          >
            <span
              :class="['key', , name === 'RowCorridor' ? 'fas fa-walking corridor-icon' : '']"
            >{{name === 'RowCorridor' ? '' : name}}</span>
            <!-- Row Options -->
            <div :class="['options', 'options-'+language]" v-if="clicked === rowNumber">
              <div :class="['arrow', 'arrow-'+language]"></div>
              <div :class="['box', 'box-'+language]">
                <div class="function" @click.stop="clicked = ''">
                  <span :class="['closeIcon', 'closeIcon-'+language]">
                    <i class="far fa-window-close close"></i>
                  </span>
                </div>
                <!-- Delete Row Component -->
                <div
                  class="function"
                  v-if="hallInfo.rowsNumber != 1"
                  @click.stop="deleteRow(rowNumber,realRowNumber)"
                >
                  <span class="icon">
                    <i class="fas fa-minus-circle red"></i>
                  </span>
                  <span class="name">{{$t("general.delete")}}</span>
                </div>
                <!-- Convert Row To Corridor -->
                <div
                  class="function"
                  v-if="name != 'RowCorridor' && rowNumber != 1  && rowNumber != hallInfo.rowsNumber && !isThisRowCorridor(rowNumber-1) &&  !isThisRowCorridor(rowNumber+1)"
                  @click.stop="convertRowToCorridor(rowNumber,realRowNumber)"
                >
                  <span class="icon">
                    <i class="fas fa-exchange-alt blue"></i>
                  </span>
                  <span class="name">{{$t("functions.convertToCorridor")}}</span>
                </div>
                <!--  -->
                <!-- Convert Corridor To Row -->
                <div
                  class="function"
                  v-if="name === 'RowCorridor'"
                  @click.stop="convertCorridorToRow(rowNumber)"
                >
                  <span class="icon">
                    <i class="fas fa-exchange-alt blue"></i>
                  </span>
                  <span class="name">{{$t("functions.convertCorridorToRow")}}</span>
                </div>
                <!--  -->
                <!-- Add Row Above -->
                <div
                  v-if="name != 'RowCorridor'"
                  class="function"
                  @click.stop="addRow(rowNumber,realRowNumber,'above')"
                >
                  <span class="icon">
                    <i class="fas fa-arrow-up green"></i>
                  </span>
                  <span class="name">{{$t("functions.addRowAbove")}}</span>
                </div>
                <!-- Add Row below -->
                <div
                  v-if="name != 'RowCorridor'"
                  class="function"
                  @click.stop="addRow(rowNumber,realRowNumber,'below')"
                >
                  <span class="icon">
                    <i class="fas fa-arrow-down pink"></i>
                  </span>
                  <span class="name">{{$t("functions.addRowBelow")}}</span>
                </div>
                <!-- Add Corridor Above -->
                <div
                  class="function"
                  v-if="name != 'RowCorridor' && !isThisRowCorridor(rowNumber-1) && rowNumber != 1"
                  @click.stop="addCorridor(rowNumber,realRowNumber,'above')"
                >
                  <span class="icon">
                    <i class="fas fa-walking orange"></i>
                  </span>
                  <span class="name">{{$t("functions.addCorridorAbove")}}</span>
                </div>
                <!-- Add Corridor Below -->
                <div
                  class="function"
                  v-if="name != 'RowCorridor' && !isThisRowCorridor(rowNumber+1) && rowNumber+1 <= hallInfo.rowsNumber"
                  @click.stop="addCorridor(rowNumber,realRowNumber,'below')"
                >
                  <span class="icon">
                    <i class="fas fa-walking green-2"></i>
                  </span>
                  <span class="name">{{$t("functions.addCorridorBelow")}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="seats--container">
          <!-- Columns Numbers -->
          <div :class="['columnsNumbers','columnsNumbers-'+language ]">
            <div
              v-for="({uuid,status,seatColumn}) of seatsArray[0]['seats']"
              :key="uuid"
              class="columnNumber"
              @click.stop="clicked = uuid+'-colNumber'"
            >
              <span
                :class="['number', status === 'columnCorridor' ? 'fas fa-walking corridor-icon' : '']"
              >{{status === 'columnCorridor' ? '' : seatColumn}}</span>

              <div :class="['options', 'options-'+language]" v-if="clicked === uuid+'-colNumber'">
                <div :class="['arrow', 'arrow-'+language]"></div>
                <div :class="['box', 'box-'+language]" :dir="language === 'ar' ? 'rtl' : 'ltr'">
                  <div class="function" @click.stop="clicked = ''">
                    <span :class="['closeIcon', 'closeIcon-'+language]">
                      <i class="far fa-window-close close"></i>
                    </span>
                  </div>
                  <!-- Delete Column -->
                  <div
                    class="function"
                    v-if="hallInfo.columnsNumber != 1"
                    @click.stop="deleteColumn(uuid)"
                  >
                    <span class="icon">
                      <i class="fas fa-minus-circle red"></i>
                    </span>
                    <span class="name">{{$t("general.delete")}}</span>
                  </div>
                </div>
              </div>
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
              <seat
                v-if="status != 'columnCorridor'"
                @click="clicked = uuid"
                :color="status === 'closed' ? 'closed' : ''"
              />
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
                  <div class="function" @click.stop="toggleSeatStatus(seatRow,seatColumn)">
                    <span class="icon">
                      <i
                        :class="[status != 'closed' ? 'fas fa-ban red' : 'fas fa-check-circle green']"
                      ></i>
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
    // Rows Functions

    isThisRowCorridor(rowNumber) {
      return this.hallInfo.rowCorridors.includes(rowNumber);
    },

    moveClosedAndCorridorsBelow(rowNumber, realRowNumber, place) {
      let tempCorridors = [...this.hallInfo.rowCorridors];
      let tempLockedSeats = JSON.parse(
        JSON.stringify(this.hallInfo.lockedSeats)
      ); // DEEP COPY THE REAL ONE.

      tempCorridors = tempCorridors.map((corridorNumber) => {
        // move each corridor below
        const CorridorOperation =
          place === "above"
            ? corridorNumber >= rowNumber
            : corridorNumber > rowNumber;
        if (CorridorOperation) {
          corridorNumber++;
        }
        return corridorNumber;
      });

      tempLockedSeats = tempLockedSeats.map((locked) => {
        // move each lockedSeat Below
        const LockedSeatOperation =
          place === "above"
            ? locked.row >= realRowNumber
            : locked.row > realRowNumber;
        if (LockedSeatOperation) {
          locked.row++;
        }
        return locked;
      });

      this.hallInfo.lockedSeats = tempLockedSeats;
      this.hallInfo.rowCorridors = tempCorridors;
    },

    deleteRow(rowNumber, realRowNumber) {
      let tempCorridors = [...this.hallInfo.rowCorridors];
      let tempRowsNumber = this.hallInfo.rowsNumber;
      let tempLockedSeats = JSON.parse(
        JSON.stringify(this.hallInfo.lockedSeats)
      ); // DEEP COPY THE REAL ONE.
      let wrapNumber = 1; // this will be increased if we deleted more than one.
      // if after and before the row which will be deleted there are 'corridors', we have to delete one of them also. (no sense to have tow corridors beside each other)
      const afterMeIndex = tempCorridors.indexOf(rowNumber + 1);
      const BeforeMeIndex = tempCorridors.indexOf(rowNumber - 1);
      if (afterMeIndex != -1 && BeforeMeIndex != -1) {
        tempCorridors.splice(afterMeIndex, 1);
        tempRowsNumber--;
      }
      // if after delete, is there a corridor will be number 1 or last one. -not acceptable- (delete that corridor)
      if (rowNumber + 1 === 2 || rowNumber === this.hallInfo.rowsNumber) {
        const corridorNumber =
          rowNumber + 1 === 2
            ? tempCorridors.indexOf(rowNumber + 1)
            : tempCorridors.indexOf(rowNumber - 1);
        if (corridorNumber != -1) {
          tempCorridors.splice(corridorNumber, 1);
          wrapNumber++;
          tempRowsNumber--;
        }
      }
      // to delete all lockedSeats in the deleted Row:
      let newLockedSeats = tempLockedSeats.filter(
        (locked) => locked.row != realRowNumber
      );
      tempLockedSeats = newLockedSeats;

      // move the corridors:
      tempCorridors = tempCorridors.map((corridorNumber) => {
        if (corridorNumber > rowNumber) {
          corridorNumber -= wrapNumber; // move any corridor which exist after the one i want to delete, one step above (if i want to delete row number 5 and there's an corridor on number 7, so it will be 6 now :D)
        } else if (corridorNumber === rowNumber) {
          // if i'm deleting a corridor
          return null;
        }
        return corridorNumber;
      });

      // move the lockedSeats
      tempLockedSeats = tempLockedSeats.map((locked) => {
        if (locked.row > realRowNumber && realRowNumber != -1) {
          locked.row--;
        }
        return locked;
      });

      tempRowsNumber--;

      this.hallInfo.rowsNumber = tempRowsNumber;
      this.hallInfo.rowCorridors = tempCorridors;
      this.hallInfo.lockedSeats = tempLockedSeats;
      this.clicked = "";
    },

    convertRowToCorridor(rowNumber, realRowNumber) {
      let tempCorridors = [...this.hallInfo.rowCorridors];
      let tempLockedSeats = JSON.parse(
        JSON.stringify(this.hallInfo.lockedSeats)
      ); // DEEP COPY THE REAL ONE.
      tempCorridors.push(rowNumber);
        
      // to delete all lockedSeats in that row:
      let newLockedSeats = tempLockedSeats.filter(
        (locked) => locked.row != realRowNumber
      );
      tempLockedSeats = newLockedSeats;

        // move the lockedSeats
        tempLockedSeats = tempLockedSeats.map((locked) => {
        if (locked.row > realRowNumber) {
          locked.row--;
        }
        return locked;
      });

      this.hallInfo.rowCorridors = tempCorridors;
      this.hallInfo.lockedSeats = tempLockedSeats;
      this.clicked = "";
    },

    convertCorridorToRow(rowNumber) {
      let tempCorridors = [...this.hallInfo.rowCorridors];
      let tempLockedSeats = JSON.parse(
        JSON.stringify(this.hallInfo.lockedSeats)
      ); // DEEP COPY THE REAL ONE.
      const corridorIndex = tempCorridors.indexOf(rowNumber);
      if (corridorIndex > -1) {
        tempCorridors.splice(corridorIndex, 1);
      }

     // move the lockedSeats
        tempLockedSeats = tempLockedSeats.map((locked) => {
        if (locked.row >= rowNumber) {
          locked.row++;
        }
        return locked;
      });

      this.hallInfo.lockedSeats = tempLockedSeats;
      this.hallInfo.rowCorridors = tempCorridors;
      this.clicked = "";
    },

    addRow(rowNumber, realRowNumber, place) {
      let tempCorridors = [...this.hallInfo.rowCorridors];
      let tempLockedSeats = JSON.parse(
        JSON.stringify(this.hallInfo.lockedSeats)
      ); // DEEP COPY THE REAL ONE.
      let tempRowsNumber = this.hallInfo.rowsNumber;

      this.moveClosedAndCorridorsBelow(rowNumber, realRowNumber, place);
      tempRowsNumber++;

      this.hallInfo.rowsNumber = tempRowsNumber;
      this.clicked = "";
    },

    addCorridor(rowNumber, realRowNumber, place) {
      let tempCorridors = [...this.hallInfo.rowCorridors];
      let tempRowsNumber = this.hallInfo.rowsNumber;

      this.moveClosedAndCorridorsBelow(rowNumber, realRowNumber, place);
      tempRowsNumber++;
      if (place === "above") {
        this.hallInfo.rowCorridors.push(rowNumber);
      } else if (place === "below") {
        this.hallInfo.rowCorridors.push(rowNumber + 1);
      }

      this.hallInfo.rowsNumber = tempRowsNumber;
      this.clicked = "";
    },

    // Seat Functions
    toggleSeatStatus(rowNumber, columnNumber) {
      this.clicked = "";
      const index = this.hallInfo.lockedSeats.findIndex(
        (locked) => locked.row === rowNumber && locked.column === columnNumber
      );
      if (index > -1) {
        this.hallInfo.lockedSeats.splice(index, 1);
      } else {
        this.hallInfo.lockedSeats.push({
          row: rowNumber,
          column: columnNumber,
        });
      }
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />
