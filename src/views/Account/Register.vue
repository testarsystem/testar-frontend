<template>
    <div class="register row">
        <h3>Регистрация</h3>
        <div class="col m6 l6 s8 offset-m3 offset-l3 offset-s2" id="registerForm">
            <Alert type="danger" v-if="error">{{error}}</Alert>
            <div class="row">
                <div class="input-field col s12 l6">
                    <input id="email" type="email" class="validate" v-model="authData.email">
                    <label for="email">Email</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="username" type="text" class="validate" v-model="authData.username">
                    <label for="username">Логин</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="firstName" type="text" class="validate" v-model="authData.first_name">
                    <label for="firstName">Имя</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="lastName" type="text" class="validate" v-model="authData.last_name">
                    <label for="lastName">Фамилия</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="password" type="password" class="validate" :class="{invalid : isPasswordsMatch == false}" v-model="authData.password">
                    <label for="password">Пароль</label>
                </div>
                <div class="input-field col s12 l6">
                    <input id="passwordConfirm" type="password" class="validate" :class="{invalid : isPasswordsMatch == false}" v-model="passwordConfirm" @blur="comparePasswords">
                    <label for="passwordConfirm">Подтвердите пароль</label>
                </div>
            </div>
            <div class="row">
                <button class="waves-effect waves-light btn" id="registerFormBtn" @click="registerClickHandler">Зарегистрироваться</button>
            </div>
        </div>
    </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
    name: 'RegisterView',
    components : {
        Alert
    },
    data(){
        return{
            error: '',
            authData: {
                email:'',
                username:'',
                first_name:'',
                last_name:'',
                password:''
            },
            passwordConfirm: '',
            isPasswordsMatch: null
        }
    },
    methods: {
        comparePasswords()
        {
            if(this.authData.password != this.passwordConfirm)
                this.isPasswordsMatch = false;    
            else
                this.isPasswordsMatch = true;
        },
        registerClickHandler()
        {
            this.authData.username = this.authData.username.trim();
            if (this.authData.email.length < 1 || this.authData.password.length < 1 || 
                this.passwordConfirm < 1 || this.authData.username < 1 || 
                this.authData.first_name < 1 || this.authData.last_name < 1)
            {
                this.error = "Пустые поля!";
                this.authData.password = '';
                this.passwordConfirm = '';
            }
            else if(!this.isPasswordsMatch){
                this.error = "Пароли не совпадают!";
                this.authData.password = '';
                this.passwordConfirm = '';
            }           
            else{
                this.$store.dispatch('users/registerUser',this.authData)
                .then(()=>{
                    this.$router.replace({path: this.$route.query.redirect || '/'});
                })
                .catch(err=>{
                    this.error = err.message;
                    this.authData.password = '';
                    this.passwordConfirm = '';
                })
            }
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
.register {
    min-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.register.row {
    margin-bottom: 0!important;
}
</style>
