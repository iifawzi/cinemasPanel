<template>
  <div class="fixedDialog" @click="emitClose($event)">
    <div class="content">
        <span class="closeIcon"><i class="fas fa-times" @click="emitClose($event)"></i></span>
    <div class="slotContent">
          <slot />
    </div>
    </div>
  </div>
</template>

<script>
export default {
methods: {
    emitClose(e){
        if (e.target === e.currentTarget){
        this.$emit("askToClose");
        }
    } 
}
}
</script>

<style src="./style.scss" lang="scss" scoped />