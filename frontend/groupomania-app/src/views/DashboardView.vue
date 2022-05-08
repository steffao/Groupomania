
<template>    
    <section v-if="isAuthenticated" class="posts__list">
        <PostsList /> 
    </section>
</template>

<style>
a {
    text-decoration: none;
}
</style>

<script>
import { mapState } from 'vuex'
import PostsList from '../components/PostsList.vue'



export default {
    name: "DashboardView",
    components : {
        PostsList,
    },    
    data: function (){
        return{      
        }
    },
    computed : {
        ...mapState({user:'user', token:'token'}),
        isAuthenticated : function() {
            return this.$store.getters.IS_USER_AUTHENTICATE_GETTER
        },
        isAdmin : function() {
            return this.$store.getters.IS_USER_ISADMIN_GETTER
        },
    },
    mounted() { 
    },
    methods : { 
        
    }
    
}   
</script>