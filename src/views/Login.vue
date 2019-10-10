<template>
    <div class="login row">
        <h3>Вход</h3>
        <div class="col m6 l3 s8 offset-m3 offset-s2" id="loginForm">
            <Alert type="danger" v-if="error"></Alert>
            <div class="row">
                <div class="input-field col s12">
                    <input id="username" type="text" class="validate">
                    <label for="username">Логин или email</label>
                </div>
                <div class="input-field col s12">
                    <input id="password" type="password" class="validate">
                    <label for="password">Пароль</label>
                </div>
            </div>
            <div class="row">
                <button class="waves-effect waves-light btn" id="loginFormBtn">Войти</button>
            </div>
            <div class="row">
                <p>Нет учетной записи? <router-link to="register">Зарегистрироваться</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
    name: "LoginView",
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
#loginForm{
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
}

@media screen and (min-width: 992px){
    #loginForm {
        margin-left: 37.5%;
    }
}

#loginFormBtn
{
    margin: 1.2rem auto;
}
</style>
