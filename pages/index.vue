<template>
    <div class="authPage">
        <div class="authPage--container">
            <img alt="website logo" src="~/assets/images/logo.png" class="logo" width="130px" />
            <div class="loginForm__container">
                <loginForm/>
            </div>
        </div>
    </div>
</template>


<script>
import loginForm from  "~/components/forms/loginForm"
export default {
    components: {
        loginForm,
    }
}
</script>


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
    &--container {
        width: 350px;
        height: 400px;
        background-color: $white;
        border-radius: 15px;
        padding: 0px 40px;
        .logo {
            margin-top: 60px;
        }
        .loginForm__container {
             margin-top: 30px;
        }
    }
}
</style>