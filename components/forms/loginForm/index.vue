<template>
    <form class="loginForm">
        <div class="input--container">
        <inputField type="text" autofocus placeholder="Username" required autocomplete="on" />
        </div>
         <div class="input--container">
        <inputField type="password"  placeholder="Password" required autocomplete="on"/>
        </div>
    </form>
</template>


<script>
import inputField from  "~/components/shared/inputField"
export default {
    components: {
        inputField,
    }
}
</script>

<style src="./style.scss" lang="scss" scoped />
