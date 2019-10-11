<template>
    <div class="login row">
        <h3>Вход</h3>
        <div class="col m6 l3 s8 offset-m3 offset-s2" id="loginForm">
            <Alert type="danger" v-if="error">{{error}}</Alert>
            <div class="row">
                <div class="input-field col s12">
                    <input id="username" type="text" class="validate" v-model="authData.testar" @keyup="usernameKeyUpHandler($event)">
                    <label for="username">Логин или email</label>
                </div>
                <div class="input-field col s12">
                    <input id="password" type="password" class="validate" v-model="authData.password" ref="passwordInput" @keyup="passwordKeyUpHandler($event)">
                    <label for="password">Пароль</label>
                </div>
            </div>
            <div class="row">
                <button class="waves-effect waves-light btn" id="loginFormBtn" @click="loginClickHandler">Войти</button>
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
    name: 'LoginView',
    components : {
        Alert
    },
    data(){
        return{
            error: '',
            authData: {
                testar: '',
                password: ''
            }
        }
    },
    methods: {
        usernameKeyUpHandler(e){
            if (e.keyCode == 13) {
                this.$refs.passwordInput.focus();
            }
        },
        passwordKeyUpHandler(e){
            if (e.keyCode == 13) {
                this.loginClickHandler();
            }
        },
        loginClickHandler(){
            this.authData.testar = this.authData.testar.trim();
            if (this.authData.testar.length < 1 || this.authData.password.length < 1)
            {
                this.error = "Пустые поля!";
                this.authData.password = '';
            }
            else{
                this.$store.dispatch('users/loginUser',this.authData)
                .then(()=>{
                    this.$router.replace({path: this.$route.query.redirect || '/'});
                })
                .catch(err=>{
                    this.error = err.message;
                    this.authData.password = '';
                })
            }
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
