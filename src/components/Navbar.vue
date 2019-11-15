<template>
    <div class="navbar">
        <nav>
            <div class="nav-wrapper">
                <router-link to="/" class="brand-logo center">{{title}}</router-link>
                <ul class="left">
                    <li><a href="#" @click="openSidenav" ><i class="material-icons">menu</i></a></li>
                </ul>
            </div>    
        </nav>
        <ul id="slide-out" class="sidenav" ref="mysidenav">
            <li>
                <div class="user-view">                    
                    <i class="material-icons account-icon">account_circle</i>
                    <span class="name">{{user.name}}</span>
                    <span class="email">{{user.username}}</span>                                
                </div>
            </li>
            <hr class="list-divider">
            <li><a @click="goToTests">Tests</a></li>
            <li><a @click="goToMyCompetitions">My competitions</a></li>
            <li><a href="#">Third Link</a></li>
            <li><a @click="logout">Logout</a></li>
        </ul>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: {
        title: {
            type: String,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        openSidenav() {  
            let elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems);
            this.$emit('getUser')         
            let instance = M.Sidenav.getInstance(this.$refs['mysidenav'])
            instance.open()
        },
        closeSidenav() {
            let instance = M.Sidenav.getInstance(this.$refs['mysidenav'])
            instance.close()            
        },
        goToTests() {
            this.closeSidenav();
            this.$router.push({name: 'tests'})
        },
        goToMyCompetitions() {
            this.closeSidenav();
            this.$router.push({name: 'myCompetitions'})
        },
        logout() {
            this.$store.dispatch('users/logoutUser')
        }
    }
}
</script>

<style>
.navbar nav{
    background-color: var(--primary-color);
}
.sidenav .user-view {
    display: block;   
}
.sidenav .user-view .name {
    margin: 0 !important;
    font-weight: bold !important;
}
.sidenav .user-view .account-icon{
    font-size: 3rem;
    position: relative;
    top: .5rem;
}
.sidenav a {
    cursor: pointer;
}
</style>