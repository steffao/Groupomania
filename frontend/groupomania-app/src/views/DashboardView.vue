
<template>
    <div>Bienvenue {{user.firstName}}  !</div>
</template>

<style>
a {
    text-decoration: none;
}
</style>

<script>
import { mapState } from 'vuex'


export default {
    name: "DashboardView",
    
    data: function (){
        return{   
            
        }
    },
    computed : {
        ...mapState({user:'user', token:'token'}),
        isAdmin : function() {
            return this.$store.getters.IS_USER_ISADMIN_GETTER
        },
    },
    
}   
</script>