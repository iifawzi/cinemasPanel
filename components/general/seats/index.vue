<template>
  <div class="seats">
    <div class="content">
      <div class="info">
        <explainIcons />
      </div>
      <div class="screen">{{$t("general.screen")}}</div>
      <div class="data">
        <!-- Rows Numbers -->
        <div :class="['rowsNumbers', 'rowsNumbers-'+language]">
          <div class="rowNumber"></div>
          <div
            v-for="({uniqueRowNumber,name,realRowNumber}) of seatsArray"
            :key="'rowNumber-'+uniqueRowNumber"
            class="rowNumber"
            @click="clicked = 'rowNumber-'+uniqueRowNumber"
          >
            <span
              :class="['key', , name === 'RowCorridor' ? 'fas fa-walking corridor-icon' : '']"
            >{{name === 'RowCorridor' ? '' : name}}</span>
            <!-- Row Options -->
            <div
              :class="['options', 'options-'+language]"
              v-if="clicked === 'rowNumber-'+uniqueRowNumber"
            >
              <div :class="['arrow', 'arrow-'+language]"></div>
              <div :class="['box', 'box-'+language]">
                <div :class="['closeIconContainer', 'closeIconContainer-'+language]">
                  <i
                    :class="['far fa-window-close closeIcon', 'closeIcon-'+language]"
                    @click.stop="clicked = ''"
                  ></i>
                </div>
                <!-- Delete Row Component -->
                <div
                  :class="['function', 'function-'+language]"
                  v-if="hallInfo.rowsNumber != 1"
                  @click.stop="deleteRow(uniqueRowNumber,realRowNumber)"
                >
                  <span class="icon">
                    <i class="fas fa-minus-circle red"></i>
                  </span>
                  <span class="name">{{$t("general.delete")}}</span>
                </div>
                <!-- Convert Row To Corridor -->
                <div
                  :class="['function', 'function-'+language]"
                  v-if="name != 'RowCorridor' && uniqueRowNumber != 1  && uniqueRowNumber != hallInfo.rowsNumber && !isThisRowCorridor(uniqueRowNumber-1) &&  !isThisRowCorridor(uniqueRowNumber+1)"
                  @click.stop="convertRowToCorridor(uniqueRowNumber,realRowNumber)"
                >
                  <span class="icon">
                    <i class="fas fa-exchange-alt blue"></i>
                  </span>
                  <span class="name">{{$t("functions.convertToCorridor")}}</span>
                </div>
                <!--  -->
                <!-- Add Row Above -->
                <div
                  v-if="name != 'RowCorridor'"
                  :class="['function', 'function-'+language]"
                  @click.stop="addRow(uniqueRowNumber,realRowNumber,'above')"
                >
                  <span class="icon">
                    <i class="fas fa-arrow-up green"></i>
                  </span>
                  <span class="name">{{$t("functions.addRowAbove")}}</span>
                </div>
                <!-- Add Row below -->
                <div
                  v-if="name != 'RowCorridor'"
                  :class="['function', 'function-'+language]"
                  @click.stop="addRow(uniqueRowNumber,realRowNumber,'below')"
                >
                  <span class="icon">
                    <i class="fas fa-arrow-down pink"></i>
                  </span>
                  <span class="name">{{$t("functions.addRowBelow")}}</span>
                </div>
                <!-- Add Corridor Above -->
                <div
                  :class="['function', 'function-'+language]"
                  v-if="name != 'RowCorridor' && !isThisRowCorridor(uniqueRowNumber-1) && uniqueRowNumber != 1"
                  @click.stop="addCorridor(uniqueRowNumber,'above')"
                >
                  <span class="icon">
                    <i class="fas fa-walking orange"></i>
                  </span>
                  <span class="name">{{$t("functions.addCorridorAbove")}}</span>
                </div>
                <!-- Add Corridor Below -->
                <div
                  :class="['function', 'function-'+language]"
                  v-if="name != 'RowCorridor' && !isThisRowCorridor(uniqueRowNumber+1) && uniqueRowNumber+1 <= hallInfo.rowsNumber"
                  @click.stop="addCorridor(uniqueRowNumber,'below')"
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
              v-for="({uniqueColumnNumber,status,seatColumn}) of seatsArray[0]['seats']"
              :key="'columnNumber-'+uniqueColumnNumber"
              class="columnNumber"
              @click.stop="clicked = 'columnNumber-'+uniqueColumnNumber"
            >
              <span
                :class="['number', status === 'columnCorridor' ? 'fas fa-walking corridor-icon' : '']"
              >{{status === 'columnCorridor' ? '' : seatColumn}}</span>

              <div
                :class="['options', 'options-'+language]"
                v-if="clicked === 'columnNumber-'+uniqueColumnNumber"
              >
                <div :class="['arrow', 'arrow-'+language]"></div>
                <div :class="['box', 'box-'+language]" :dir="language === 'ar' ? 'rtl' : 'ltr'">
                  <div :class="['closeIconContainer', 'closeIconContainer-'+language]">
                    <i
                      :class="['far fa-window-close closeIcon', 'closeIcon-'+language]"
                      @click.stop="clicked = ''"
                    ></i>
                  </div>
                  <!-- Delete Column -->
                  <div
                    :class="['function', 'function-'+language]"
                    v-if="hallInfo.columnsNumber != 1"
                    @click.stop="deleteColumn(uniqueColumnNumber,seatColumn)"
                  >
                    <span class="icon">
                      <i class="fas fa-minus-circle red"></i>
                    </span>
                    <span class="name">{{$t("general.delete")}}</span>
                  </div>
                  <!-- Convert Column To Corridor -->
                  <div
                    :class="['function', 'function-'+language]"
                    v-if="status != 'columnCorridor'  && !isThisColumnCorridor(uniqueColumnNumber-1) && !isThisColumnCorridor(uniqueColumnNumber+1) && uniqueColumnNumber != 1  && uniqueColumnNumber != hallInfo.columnsNumber"
                    @click.stop="convertColumnToCorridor(uniqueColumnNumber,seatColumn)"
                  >
                    <span class="icon">
                      <i class="fas fa-exchange-alt blue"></i>
                    </span>
                    <span class="name">{{$t("functions.convertToCorridor")}}</span>
                  </div>
                  <!-- Add Column before -->
                  <div
                    v-if="status != 'columnCorridor'"
                    :class="['function', 'function-'+language]"
                    @click.stop="addColumn(uniqueColumnNumber,seatColumn,'before')"
                  >
                    <span class="icon">
                      <i
                        :class="['green', language === 'en' ?  'fas fa-arrow-left' : 'fas fa-arrow-right']"
                      ></i>
                    </span>
                    <span class="name">{{$t("functions.addColumnBefore")}}</span>
                  </div>
                  <!-- Add Column after -->
                  <div
                    v-if="status != 'columnCorridor'"
                    :class="['function', 'function-'+language]"
                    @click.stop="addColumn(uniqueColumnNumber,seatColumn,'after')"
                  >
                    <span class="icon">
                      <i
                        :class="['pink', language === 'en' ?  'fas fa-arrow-right' : 'fas fa-arrow-left']"
                      ></i>
                    </span>
                    <span class="name">{{$t("functions.addColumnAfter")}}</span>
                  </div>
                  <!-- Add Corridor before -->
                  <div
                    :class="['function', 'function-'+language]"
                    v-if="status != 'columnCorridor'  && !isThisColumnCorridor(uniqueColumnNumber-1) && uniqueColumnNumber+1 != 1"
                    @click.stop="addColumnCorridor(uniqueColumnNumber,'before')"
                  >
                    <span class="icon">
                      <i class="fas fa-walking orange"></i>
                    </span>
                    <span class="name">{{$t("functions.addCorridorBefore")}}</span>
                  </div>
                  <!-- Add Corridor after -->
                  <div
                    :class="['function', 'function-'+language]"
                    v-if="status != 'columnCorridor'  && !isThisColumnCorridor(uniqueColumnNumber+1)  && uniqueColumnNumber+1 <= hallInfo.columnsNumber"
                    @click.stop="addColumnCorridor(uniqueColumnNumber,'after')"
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
          <!--  -->
          <!-- Seats -->
          <div
            v-for="({uniqueRowNumber,seats}) of seatsArray"
            :key="'row-'+uniqueRowNumber"
            class="row"
          >
            <div
              v-for="({uniqueColumnNumber,status,seatRow,seatColumn}) of seats"
              :key="uniqueRowNumber+'-'+uniqueColumnNumber"
              :class="['seat--container', 'seat-margin-'+language]"
            >
              <seat
                v-if="status != 'columnCorridor'"
                @click="clicked = uniqueRowNumber+'-'+uniqueColumnNumber"
                :color="status === 'closed' ? 'closed' : ''"
              />
              <!-- Seat Options -->
              <div class="options" v-if="clicked === uniqueRowNumber+'-'+uniqueColumnNumber">
                <div :class="['arrow', 'arrow-'+language]"></div>
                <div :class="['box', 'box-'+language]">
                  <!-- Dismiss icon -->
                  <div :class="['closeIconContainer', 'closeIconContainer-'+language]">
                    <i
                      :class="['far fa-window-close closeIcon', 'closeIcon-'+language]"
                      @click.stop="clicked = ''"
                    ></i>
                  </div>
                  <!--  -->
                  <!-- Toggle The Seat function  -->
                  <div
                    :class="['function', 'function-'+language]"
                    @click.stop="toggleSeatStatus(seatRow,seatColumn)"
                  >
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
import explainIcons from "~/components/shared/explainIcons/";
import letters from "~/helpers/letters.js";
import seats from "~/helpers/seats.js";
import {
  isThisRowCorridor,
  deleteRow,
  convertRowToCorridor,
  addRow,
  addCorridor,
} from "./rowFunctions";
import {
  deleteColumn,
  addColumn,
  isThisColumnCorridor,
  convertColumnToCorridor,
  addColumnCorridor,
} from "./columnFunctions";
export default {
  mounted(){
 if (this.dbHallData){
   const dbHallData = this.dbHallData
   this.hallInfo.rowsNumber = dbHallData.rows_number;
   this.hallInfo.columnsNumber = dbHallData.columns_number;
   this.hallInfo.columnCorridors = dbHallData.column_corridors;
   this.hallInfo.rowCorridors = dbHallData.row_corridors;
   this.hallInfo.lockedSeats = dbHallData.lockedSeats;
 }
  },
  data() {
    return {
      clicked: "",
      hallInfo:{
                rowsNumber: 9,
                columnsNumber: 26,
                rowCorridors:[3,6],
                columnCorridors: [5,9,15,20],
                lockedSeats:[{
                    row: 1,
                    column: 2,
                }],
            }
    };
  },
    props: {
    dbHallData: {
      type: Object,
    }
  },
  components: {
    seat,
    explainIcons,
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
      this.$emit("iscorrect", this.hallInfo);
      return updatedSeats;
    },
  },
  methods: {
    // Row Functions
    isThisRowCorridor,
    deleteRow,
    convertRowToCorridor,
    addRow,
    addCorridor,
    // column Functions
    isThisColumnCorridor,
    deleteColumn,
    convertColumnToCorridor,
    addColumn,
    addColumnCorridor,

    toggleSeatStatus(realRowNumber, realColumnNumber) {
      this.clicked = "";
      const index = this.hallInfo.lockedSeats.findIndex(
        (locked) =>
          locked.row === realRowNumber && locked.column === realColumnNumber
      );
      if (index > -1) {
        this.hallInfo.lockedSeats.splice(index, 1);
      } else {
        this.hallInfo.lockedSeats.push({
          row: realRowNumber,
          column: realColumnNumber,
        });
      }
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />
