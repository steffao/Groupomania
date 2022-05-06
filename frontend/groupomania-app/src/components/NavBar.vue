
<template>

    <!-- Navbar Logged In-->
    <nav v-if="token">
        <div class="w3-top">
            <div class="w3-bar w3-theme-d2 w3-left-align w3-large">                
                <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4">
                    <img class="w3-margin-right" src="../assets//images/groupomania_logo/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania" style="max-height: 20px">
                </a>
                <div class="w3-dropdown-hover w3-hide-small w3-right">
                    <button class="w3-button w3-padding-large" title="User Settings"><i class="fa fa-user"></i></button>     
                    <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:180px">
                        <button @click="logoutUser" class="w3-bar-item w3-button">Déconnexion</button>                
                        <button @click="logoutUser" class="w3-bar-item w3-button">Supprimer votre compte utilisateur</button>                
                    </div>
                </div>            
            </div>
        </div>
    </nav>

    <!-- Navbar Logged Out-->
    <nav v-else>        
        <div class="w3-top">
            <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
                <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" @click="toggleMenu"><i class="fa fa-bars"></i></a>
                <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4">
                    <img class="w3-margin-right" src="../assets//images/groupomania_logo/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania" style="max-height: 20px">
                </a>
                <router-link to="/login" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Connexion</router-link>
                <router-link to="/signup" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Inscription</router-link>                
            </div>
        </div>
        <!-- Navbar on small screens -->
        <div id="submenu" :class="{ 'w3-show': isToggled }" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large w3-below-submenu">
            <router-link to="/login" class="w3-bar-item w3-button w3-padding-large">Connexion</router-link>
            <router-link to="/signup" class="w3-bar-item w3-button w3-padding-large">Inscription</router-link>
        </div>        
    </nav>
    
</template>

<style>
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
            isToggled : false,
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
            
        },
        toggleMenu : function() {
            if (this.isToggled){
                    this.isToggled = false
                } else {
                    this.isToggled = true;
                    
                }

        }
    }
}   
</script>