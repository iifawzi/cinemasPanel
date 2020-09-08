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
import {isThisRowCorridor,moveClosedAndCorridorsBelow,deleteRow,convertRowToCorridor,convertCorridorToRow,addRow,addCorridor} from "./rowFunctions";
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
    isThisRowCorridor,moveClosedAndCorridorsBelow,deleteRow,convertRowToCorridor,convertCorridorToRow,addRow,addCorridor,
   
   
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
