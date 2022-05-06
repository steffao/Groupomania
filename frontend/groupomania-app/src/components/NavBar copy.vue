
<template>

    <!-- Navbar -->
    <nav v-if="token">
        <div class="w3-top">
            <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
                <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
                <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4">
                    <img class="w3-margin-right" src="../assets//images/groupomania_logo/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania" style="max-height: 20px">
                </a>
                
                <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i class="fa fa-user"></i></a>
                
            <div class="w3-dropdown-hover w3-hide-small">
            <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-user"></i><span class="w3-badge w3-right w3-small w3-green">3</span></button>     
            <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">
                <button @click="logoutUser" class="w3-bar-item w3-button">Déconnexion</button>                
                <button @click="logoutUser" class="w3-bar-item w3-button">Supprimer votre compte utilisateur</button>                
            </div>
            </div>
            <a href="#" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
                <img src="../assets//images/kea_avatar.webp" class="w3-circle" style="height:30px;width:30px" alt="Avatar">
            </a>
            </div>
        </div>
        
        
        <button @click="logoutUser">Logout</button>
    </nav>
    
    <nav v-else>        
        <div class="w3-top">
            <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
                <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
                <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4">
                    <img class="w3-margin-right" src="../assets//images/groupomania_logo/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania" style="max-height: 35px">
                </a>
                <router-link to="/login" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Connexion</router-link>
                <router-link to="/signup" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Inscription</router-link>
                <a href="#" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
                    <img src="../assets//images/kea_avatar.webp" class="w3-circle" style="height:30px;width:30px" alt="Avatar">
                </a>
            </div>
        </div>
        <!-- Navbar on small screens -->
        <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
            <router-link to="/login" class="w3-bar-item w3-button w3-padding-large">Connexion</router-link>
            <router-link to="/signup" class="w3-bar-item w3-button w3-padding-large">Inscription</router-link>
        </div>
    </nav>
    
</template>

<style>
    @import '../assets/style/style.css';
   
    

</style>

<script>
import { mapState } from 'vuex'

export default {
    name: "NavBar",
    
    data: function (){
        return{   
            email:'',
            password:'',
            errors: [],
        }
    },
    computed : {
        ...mapState({user:'user', token:'token'}),
        isAdmin : function() {
            return this.$store.getters.IS_USER_ISADMIN_GETTER
        }
    },
    methods : {
        logoutUser : function() {
            
            this.$store.dispatch('resetState');
            this.$router.push('/login')            
            
        }
    }
}   
</script>