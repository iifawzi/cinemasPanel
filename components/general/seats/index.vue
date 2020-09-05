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
              <div class="box">
                <div class="function" @click.stop="clicked = ''">
                  <span class="icon">
                    <i class="fas fa-window-close close"></i>
                  </span>
                </div>
                <div
                  class="function"
                  v-if="hallInfo.rowsNumber != 1"
                  @click.stop="deleteRow(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-minus-circle red"></i>
                  </span>
                  <span class="name">Delete</span>
                </div>
                <div
                  class="function"
                  v-if=" key != 'corridor' && index+1 != 1  && index+1 != hallInfo.rowsNumber && checkNotRowCorridor(index+1-1) && checkNotRowCorridor(index+1+1)"
                  @click.stop="convertToCorridor(index+1)"
                >
                  <span class="icon">
                    <i class="fas fa-exchange-alt blue"></i>
                  </span>
                  <span class="name">Convert To Corridor</span>
                </div>
                <div class="function" v-if=" key === 'corridor'"  @click.stop="convertToRow(index+1)">
                  <span class="icon">
                    <i class="fas fa-exchange-alt blue"></i>
                  </span>
                  <span class="name">Convert To Row</span>
                </div>
                <div class="function" v-if="key === 'corridor'"  @click.stop="addRowAbove(index+1)">
                  <span class="icon">
                    <i class="fas fa-arrow-up green"></i>
                  </span>
                  <span class="name">Add Row Above</span>
                </div>
                <div class="function"  @click.stop="addRowBelow(index+1)">
                  <span class="icon">
                    <i :class="[key === 'corridor' ? 'fas fa-arrow-down' : 'fas fa-arrows-alt-v' ,'pink']"></i>
                  </span>
                  <span class="name">{{key === 'corridor' ? 'Add Row Below'  : 'Add Row'}}</span>
                </div>
                <div class="function" v-if=" key != 'corridor' && checkNotRowCorridor(index+1-1) && index+1 != 1">
                  <span class="icon">
                    <i class="fas fa-walking orange"></i>
                  </span>
                  <span class="name">Add Corridor Above</span>
                </div>
                <div class="function" v-if=" key != 'corridor' && checkNotRowCorridor(index+1+1)  && index+1 != hallInfo.rowsNumber">
                  <span class="icon">
                    <i class="fas fa-walking green-2"></i>
                  </span>
                  <span class="name">Add Corridor Below</span>
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
              @click="clicked = 'c'+index"
            >
              <div class="options" v-if="clicked === 'c'+index"></div>

              <span
                :class="['number', checkNotCorridor(index+1) === false ? 'fas fa-walking corridor-icon' : '']"
              >{{checkNotCorridor(index+1) ? columnNumber() : ""}}</span>
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
let startNumber = 1;
export default {
  mounted() {
    startNumber = 1;
  },
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
      console.log("called");
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
    columnNumber() {
      if (
        startNumber >
        this.hallInfo.columnNumber - this.hallInfo.columnCorridors.length
      ) {
        startNumber = 1;
      }
      return startNumber++;
    },

     //
     // using `index+1` when calling the below functions because index starts from 0
     //

    deleteRow(rowNumber) {
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
    convertToCorridor(rowNumber){
      this.hallInfo.rowCorridors.push(rowNumber);
    },
    convertToRow(rowNumber){
      const corridorIndex = this.hallInfo.rowCorridors.indexOf(rowNumber);
      if (corridorIndex > -1){
      this.hallInfo.rowCorridors.splice(corridorIndex,1);
      }
    },
    addRowAbove(rowNumber){
      this.hallInfo.rowsNumber++;
      this.hallInfo.rowCorridors = [
        ...this.hallInfo.rowCorridors.map((corridorNumber) => {
          if (corridorNumber > rowNumber || corridorNumber === rowNumber) {
            // if we are adding a row where there will be an corridors below it. 
            // OR who call this function is corridor, so we will shift this corridor one step
            corridorNumber++; // shift each corridor one step down.
            return corridorNumber;
          }else {
            return corridorNumber;
          }
        }),
      ];
    },
    addRowBelow(rowNumber){
      this.hallInfo.rowsNumber++;
      this.hallInfo.rowCorridors = [
        ...this.hallInfo.rowCorridors.map((corridorNumber) => {
          if (corridorNumber > rowNumber) {
            // if we are adding a row where there will be an corridors below it. 
            corridorNumber++; // shift each corridor one step down.
            return corridorNumber;
          }else {
            return corridorNumber;
          }
        }),
      ];
    },
    
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />
