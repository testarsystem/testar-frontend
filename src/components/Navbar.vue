<template>
    <div class="navbar">
        <nav>
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo center">{{title}}</a>
                <ul class="left">
                    <li><a href="#" @click="openSidenav" ><i class="material-icons">menu</i></a></li>
                </ul>
            </div>    
        </nav>
        <ul id="slide-out" class="sidenav" ref="mysidenav">
            <li>
                <div class="user-view">                    
                    <i class="material-icons account-icon">account_circle</i>
                    <span class="name">John Doe</span>
                    <span class="email">jdandturk@gmail.com</span>                                
                </div>
            </li>
            <hr class="list-divider">
            <li><a href="#">First Link</a></li>
            <li><a href="#">Second Link</a></li>
            <li><a href="#">Third Link</a></li>
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
        }
    },
    methods: {
        openSidenav() {
            var instance = M.Sidenav.getInstance(this.$refs['mysidenav'])
            instance.open()
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
</style>