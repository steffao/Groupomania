
<template>
    <nav v-if="token">
        <div>Bonjour {{user.firstName}}  !</div>
        <button @click="logoutUser">Logout</button>
    </nav>
    <nav v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
    </nav>
</template>

<style>
a {
    text-decoration: none;
}
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