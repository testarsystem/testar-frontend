<template>
  <div id="app">
    <Navbar title="Testar" v-if="showMenu" :user="user" @getUser="getUser"/>
    <router-view class="container"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  computed: {
    showMenu() {
      return this.$route.name !== 'login' && this.$route.name !== 'register';
    },
    user() {
      return this.$store.state.users.user;
    }
  },
  methods: {
    getUser() {
      this.$store.dispatch('users/decodeUser');
    }
  },
  mounted(){
    M.AutoInit();
  }
}
</script>

<style>
:root{
  --primary-color: #26a69a;
  --secondary-color: #ff7043;
  --grey: #607d8b;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.list-divider {
    height: 0;
    margin: 3px 0 4px;
    border: none;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgba(0,0,0,.12);
}

.container {
  margin-bottom: 2rem !important;
}
</style>
