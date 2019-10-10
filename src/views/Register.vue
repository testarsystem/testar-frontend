<template>
    <div class="register row">
        <h3>Регистрация</h3>
        <div class="col m6 l6 s8 offset-m3 offset-l3 offset-s2" id="registerForm">
            <Alert type="danger" v-if="error"></Alert>
            <div class="row">
                <div class="input-field col s12 l6">
                    <input id="email" type="email" class="validate">
                    <label for="email">Email</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="username" type="text" class="validate">
                    <label for="username">Логин</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="firstName" type="text" class="validate">
                    <label for="firstName">Имя</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="lastName" type="text" class="validate">
                    <label for="lastName">Фамилия</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="password" type="password" class="validate">
                    <label for="password">Пароль</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="passwordConfirm" type="password" class="validate">
                    <label for="passwordConfirm">Подтвердите пароль</label>
                </div>
            </div>
            <div class="row">
                <button class="waves-effect waves-light btn" id="registerFormBtn">Зарегистрироваться</button>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
    name: "RegisterView",
    components : {
        Alert
    },
    data(){
        return{
            error: ""
        }
    }
}
</script>

<style>
#registerForm{
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
}
#registerFormBtn
{
    margin: 1.2rem auto;
}
</style>
