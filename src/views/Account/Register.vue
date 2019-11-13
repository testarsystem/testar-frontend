<template>
    <div class="register row">
        <h3>Registration</h3>
        <div class="col" id="registerForm">
            <Alert type="danger" v-if="error">{{error}}</Alert>
            <div class="row">
                <div class="input-field col s12">
                    <input id="username" type="text" v-model="authData.username">
                    <label for="username">Login</label>
                </div>
                <div class="input-field col s12">
                    <input id="name" type="text" v-model="authData.name">
                    <label for="name">Name</label>
                </div>
            </div>
            <div class="row">    
                <div class="input-field col s12">
                    <input id="password" type="password" v-model="authData.password">
                    <label for="password">Password</label>
                </div>
                <div class="input-field col s12">
                    <input id="passwordConfirm" type="password" v-model="passwordConfirm">
                    <label for="passwordConfirm">Confirm password</label>
                </div>
            </div>
            <div class="row">
                <button class="btn" id="registerFormBtn" @click="registerClickHandler">Register on Testar</button>
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
                username:'',
                name:'',
                password:''
            },
            passwordConfirm: '',
            isPasswordsMatch: null
        }
    },
    methods: {
        registerClickHandler()
        {
            this.authData.username = this.authData.username.trim();
            if (this.authData.password.length < 1 || 
                this.passwordConfirm < 1 || this.authData.username < 1 || 
                this.authData.name < 1)
            {
                this.error = "Empty fields!";
                this.authData.password = '';
                this.passwordConfirm = '';
            }
            else if(this.authData.password != this.passwordConfirm){
                this.error = "Passwords don't match!";
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
    align-items: center;
    text-align: center;
}

.register.row, .register .row {
    margin-bottom: 0!important;
}

.register .row:last-of-type {
    margin-top: 20px!important;
}
</style>
