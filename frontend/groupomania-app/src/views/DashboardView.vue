
<template>
    <div>Bonjour {{user.firstName}}!</div>
</template>

<style>
a {
    text-decoration: none;
}
</style>

<script>

export default {
    name: "DashboardView",
    
    data: function (){
        return{   
            email:'',
            password:'',
            errors: [],
        }
    },
    computed : {
        user : function() {
            return this.$store.getters.GET_USER_DATA_GETTER
        },
        isAdmin : function() {
            return this.$store.getters.IS_USER_ISADMIN_GETTER
        }
    },
}   
</script>