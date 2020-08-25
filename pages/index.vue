<template>
    <div class="authPage">
        <div class="authPage--container">
            <img alt="website logo" src="~/assets/images/logo.png" class="logo" width="130px" />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.authPage {
    background-color: $white-1;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
    &--container {
        width: 400px;
        height: 400px;
        background-color: $white;
        border-radius: 15px;
        .logo {
            margin: 60px 40px;
        }
    }
}
</style>