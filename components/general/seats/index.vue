<template>
  <div class="seats">
    <div class="content">
      <div class="data">
        <div class="rowsNumbers">
          <div class="rowNumber">-</div>
          <div v-for="{key} of seatsArray" :key="key" class="rowNumber">{{key}}</div>
           
        </div>
        <div class="seats--container">
                <div class="columnsNumbers">
        <div v-for="(seat,index) of seatsArray[0]['seats']" :key="index" class="columnNumber">{{index}}</div>
      </div>
          <div v-for="{key,seats} of seatsArray" :key="key" class="row">
            <div v-for="val of seats" :key="val" :class="['seat--container', 'seat-margin-'+language]">
              <seat />
            </div>
          </div>
        </div>
         <div class="rowsNumbers">
             <div class="rowNumber">-</div>
          <div v-for="{key} of seatsArray" :key="key" class="rowNumber">{{key}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import seat from "~/components/shared/seat/";
export default {
  data() {
    return {
      seatsArray: [
        {
          key: "A",
          seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4",],
        },
        "",
        {
          key: "B",
          seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4"],
        },
        {
          key: "C",
          seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4",],
        },
        {
          key: "D",
           seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4",],
        },
        {
          key: "E",
           seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4",],
        },
         "",
        {
          key: "F",
           seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4",],
        },
        {
          key: "G",
           seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4",],
        },
        {
          key: "H",
           seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4",],
        },
        {
          key: "I",
           seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4",],
        },
         "",
        {
          key: "J",
           seats: ["B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4","B1", "B2", 0, "B3", "B4",],
        },
      ],
    };
  },
  components: {
    seat,
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
  },
};
</script>

<style src='./style.scss' lang='scss' scoped />
