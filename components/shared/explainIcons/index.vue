<template>
  <div class="explainIcons">
    <div class="content">
      <div class="item">
        <div class="icon">
          <seat />
        </div>
        <span class="desc">{{$t('general.availableSeat')}}</span>
      </div>
      <div class="item">
        <div class="icon">
          <seat color="closed" />
        </div>
        <span class="desc">{{$t('general.lockedSeat')}}</span>
      </div>
      <div class="item">
        <div class="icon">
          <i class="fas fa-walking corridor-icon walking"></i>
        </div>
        <span class="desc">{{$t('general.corridor')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import seat from "~/components/shared/seat";
export default {
  components: {
    seat,
  },
};
</script>

<style src="./style.scss" lang='scss' scoped/>