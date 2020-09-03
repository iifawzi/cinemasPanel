<template>
    <div class="pageInfo">
        <div class="content">
            <span class="pagetitle">{{title}}<span class="line">|</span></span> <span class="description">{{desc}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        }
    }
}
</script>

<style src="./style.scss" lang="scss" scoped/>