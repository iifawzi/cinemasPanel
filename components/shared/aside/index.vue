<template>
    <aside :class="['aside',getAsideStatus === true || isAsideHovered === true ? 'opened' : 'closed', isAsideHovered === true && getAsideStatus === false ? 'fixed' : '']" @mouseenter="$store.dispatch('dashboard/toggleHover')" @mouseleave="$store.dispatch('dashboard/toggleHover')">

    </aside>
</template>

<script>
export default {
    computed: {
        getAsideStatus(){
           return this.$store.getters['dashboard/getAsideStatus'];
        },
        isAsideHovered(){
           return this.$store.getters['dashboard/isAsideHovered'];
        }
    }
}
</script>

<style src='./style.scss' lang='scss' scoped />