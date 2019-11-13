<template>
    <div class="login row">
        <h3>Sign in</h3>
        <div class="col" id="loginForm">
            <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
            <div class="row">
                <div class="input-field col s12">
                    <input id="username" type="text" v-model="authData.testar" @keyup="usernameKeyUpHandler($event)">
                    <label for="username">Username</label>
                </div>
                <div class="input-field col s12">
                    <input id="password" type="password" v-model="authData.password" ref="passwordInput" @keyup="passwordKeyUpHandler($event)">
                    <label for="password">Password</label>
                </div>
            </div>
            <div class="row">
                <button class="btn" id="loginFormBtn" @click="loginClickHandler">Sign in to Testar</button>
            </div>
            <div class="row">
                <p>Don't have an account? <router-link to="register">Register</router-link></p>
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
            errors: [],
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
            this.errors = []
            this.authData.testar = this.authData.testar.trim();
            if (this.authData.testar.length < 1 || this.authData.password.length < 1)
            {
                this.errors.push("Empty fields!");
                this.authData.password = '';
            }
            else{
                this.$store.dispatch('users/loginUser',this.authData)
                .then(()=>{
                    this.$router.replace({path: this.$route.query.redirect || '/'});
                })
                .catch(err=>{
                    err.forEach(item => {
                        this.errors.push(item.message)
                    });
                    this.authData.password = ''
                })
            }
        },        
    }
}
</script>

<style>
#loginForm{
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
}

#loginFormBtn
{
    margin: 1.2rem auto;
}
.login {
    min-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.login.row {
    margin-bottom: 0!important;
}
</style>
