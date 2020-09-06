<template>
  <div class="seats" dir="ltr">
    <div class="content">
      <div class="screen">{{$t("general.screen")}}</div>
      <div class="data">
        <div class="rowsNumbers">
          <div class="rowNumber"></div>
          <div
            v-for="({key},index) of seatsArray"
            :key="index"
            class="rowNumber"
            @click="clicked = 'r'+index"
          >
            <div class="options" v-if="clicked === 'r'+index">
              <div class="arrow"></div>
              <div :class="['box', 'box-'+language]" :dir="language === 'ar' ? 'rtl' : 'ltr'">
                <div class="function" @click.stop="clicked = ''">
                  <span :class="['closeIcon', 'closeIcon-'+language]">
                    <i class="far fa-window-close close"></i>
                  </span>
                </div>
                <!-- Delete Row Component -->
                <div
                  class="function"
                  v-if="hallInfo.rowsNumber != 1"
                  @click.stop="deleteRow(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-minus-circle red"></i>
                  </span>
                  <span class="name">{{$t("general.delete")}}</span>
                </div>
                <!-- Convert Row To Corridor -->
                <div
                  class="function"
                  v-if=" key != 'corridor' && index+1 != 1  && index+1 != hallInfo.rowsNumber && checkNotRowCorridor(index+1-1) && checkNotRowCorridor(index+1+1)"
                  @click.stop="convertToCorridor(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-exchange-alt blue"></i>
                  </span>
                  <span class="name">{{$t("functions.convertToCorridor")}}</span>
                </div>
                 <!-- Convert Corridor To Row -->
                <div
                  class="function"
                  v-if=" key === 'corridor'"
                  @click.stop="convertToRow(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-exchange-alt blue"></i>
                  </span>
                  <span class="name">{{$t("functions.convertToRow")}}</span>
                </div>
                <!-- Add Row Above -->
                <div class="function" v-if="key === 'corridor'" @click.stop="addRowAbove(index+1)">
                  <span class="icon">
                    <i class="fas fa-arrow-up green"></i>
                  </span>
                  <span class="name">{{$t("functions.addRowAbove")}}</span>
                </div>
                <!-- Add Row below -->
                <div class="function" @click.stop="addRowBelow(index+1)">
                  <span class="icon">
                    <i
                      :class="[key === 'corridor' ? 'fas fa-arrow-down' : 'fas fa-arrows-alt-v' ,'pink']"
                    ></i>
                  </span>
                  <span
                    class="name"
                  >{{key === 'corridor' ? $t("functions.addRowBelow") : $t("functions.addRow")}}</span>
                </div>
                <!-- Add Corridor After -->
                <div
                  class="function"
                  v-if=" key != 'corridor' && checkNotRowCorridor(index+1-1) && index+1 != 1"
                  @click.stop="addCorridor(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-walking orange"></i>
                  </span>
                  <span class="name">{{$t("functions.addCorridorAbove")}}</span>
                </div>
                <!-- Add Corridor Below -->
                <div
                  class="function"
                  v-if=" key != 'corridor' && checkNotRowCorridor(index+1+1)  && index+1 != hallInfo.rowsNumber"
                  @click.stop="addCorridor(index+1+1)"
                >
                  <span class="icon">
                    <i class="fas fa-walking green-2"></i>
                  </span>
                  <span class="name">{{$t("functions.addCorridorBelow")}}</span>
                </div>
              </div>
            </div>
            <div
              :class="['key', , key === 'corridor' ? 'fas fa-walking corridor-icon' : '']"
            >{{key === 'corridor' ? '' : key}}</div>
          </div>
        </div>
        <div class="seats--container">
          <div :class="['columnsNumbers']">
            <div
              v-for="(seat,index) of seatsArray[0]['seats']"
              :key="index"
              class="columnNumber"
              @click.stop="clicked = 'c'+index"
            >
              <span
                :class="['number', checkNotCorridor(index+1) === false ? 'fas fa-walking corridor-icon' : '']"
              >{{checkNotCorridor(index+1) ? seat.substr(1) : ""}}</span>

              <div class="options" v-if="clicked === 'c'+index">
                              <div class="arrow"></div>
              <div :class="['box', 'box-'+language]" :dir="language === 'ar' ? 'rtl' : 'ltr'">
                <div class="function" @click.stop="clicked = ''">
                  <span :class="['closeIcon', 'closeIcon-'+language]">
                    <i class="far fa-window-close close"></i>
                  </span>
                </div> 
<!-- Delete Column Button -->
                <div
                  class="function"
                  v-if="hallInfo.columnsNumber != 1"
                  @click.stop="deleteColumn(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-minus-circle red"></i>
                  </span>
                  <span class="name">{{$t("general.delete")}}</span>
                </div>
  <!-- Convert Corridor To Column -->
                <div
                  class="function"
                  v-if="!checkNotCorridor(index+1)"
                  @click.stop="convertToColumn(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-exchange-alt blue"></i>
                  </span>
                  <span class="name">{{$t("functions.convertToColumn")}}</span>
                </div>
                 <!-- Convert Column To Corridor -->
                <div
                  class="function"
                  v-if="checkNotCorridor(index+1) && index+1 != 1  && index+1 != hallInfo.columnsNumber && checkNotCorridor(index+1-1) && checkNotCorridor(index+1+1)"
                  @click.stop="convertColumnToCorridor(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-exchange-alt blue"></i>
                  </span>
                  <span class="name">{{$t("functions.convertToCorridor")}}</span>
                </div>
                  <!-- Add Column before -->
                <div class="function" v-if="!checkNotCorridor(index+1)" @click.stop="addColumnBefore(index+1)">
                  <span class="icon">
                    <i class="fas fa-arrow-left green"></i>
                  </span>
                  <span class="name">{{$t("functions.addColumnBefore")}}</span>
                </div>
                 <!-- Add Column after -->
                     <div class="function" @click.stop="addColumnAfter(index+1)">
                  <span class="icon">
                    <i
                      :class="[!checkNotCorridor(index+1) ? 'fas fa-arrow-right' : 'fas fa-arrows-alt-h' ,'pink']"
                    ></i>
                  </span>
                  <span
                    class="name"
                  >{{!checkNotCorridor(index+1) ? $t("functions.addColumnAfter") : $t("functions.addColumn")}}</span>
                </div>
                <!-- Add Corridor before -->
                <div
                  class="function"
                  v-if="checkNotCorridor(index+1) && checkNotCorridor(index+1-1) && index+1 != 1"
                  @click.stop="addColumnCorridor(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-walking orange"></i>
                  </span>
                  <span class="name">{{$t("functions.addCorridorBefore")}}</span>
                </div>
                <!-- Add Corridor after -->
                <div
                  class="function"
                  v-if="checkNotCorridor(index+1) && checkNotCorridor(index+1+1)  && index+1 != hallInfo.columnsNumber"
                  @click.stop="addColumnCorridor(index+1+1)"
                >
                  <span class="icon">
                    <i class="fas fa-walking green-2"></i>
                  </span>
                  <span class="name">{{$t("functions.addCorridorAfter")}}</span>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div v-for="({seats},index) of seatsArray" :key="index" class="row">
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
      this.clicked = '';
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
      this.clicked = '';
      this.hallInfo.rowCorridors.push(rowNumber);
    },
    convertToRow(rowNumber) {
      this.clicked = '';
      const corridorIndex = this.hallInfo.rowCorridors.indexOf(rowNumber);
      if (corridorIndex > -1) {
        this.hallInfo.rowCorridors.splice(corridorIndex, 1);
      }
    },
    addRowAbove(rowNumber) {
      this.clicked = '';
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
      this.clicked = '';
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
      this.clicked = '';
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
      this.clicked = '';
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
      this.clicked = '';
      this.hallInfo.rowCorridors.push(rowNumber);
    },
    convertToColumn(columnNumber) {
      this.clicked = '';
      const corridorIndex = this.hallInfo.columnCorridors.indexOf(columnNumber);
      if (corridorIndex > -1) {
        this.hallInfo.columnCorridors.splice(corridorIndex, 1);
      }
    },
        convertColumnToCorridor(columnNumber) {
          this.clicked = '';
      this.hallInfo.columnCorridors.push(columnNumber);
    },
    addColumnBefore(columnNumber) {
      this.clicked = '';
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
      this.clicked = '';
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
      this.clicked = '';
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
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />
