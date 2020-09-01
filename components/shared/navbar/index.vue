<template>
    <div class="navbar">
        <div class="navbar__contnet">
               <i class="fas fa-bars aside__button" @click="$store.dispatch('dashboard/toggleAside')"></i>
            <div class="right">
                </div>
        </div>
    </div>
</template>


<style src='./style.scss' lang='scss' scoped/>