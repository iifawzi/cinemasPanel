<template>
    <div class="inputField">
        <input @input="$emit('input', $event.target.value)" v-bind="$attrs" class="input" />
    </div>
</template>


<script>
export default {
    
}
</script>


<style src="./style.scss" lang="scss" scoped />