
<template>
    <!-- Footer -->
    <footer v-if="token" class="w3-container w3-theme-d2 w3-padding-16">
        <a href="#" class="w3-bar-item w3-button w3-padding-large">
            <img class="w3-margin-right" src="../assets//images/groupomania_logo/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania" style="max-height: 20px">
        </a>
    </footer>
    <footer v-else class="w3-container w3-theme-d2 w3-padding-16 login-footer">
        <a href="#" class="w3-bar-item w3-button w3-padding-large">
            <img class="w3-margin-right" src="../assets//images/groupomania_logo/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania" style="max-height: 20px">
        </a>
    </footer>
    
</template>

<style>
    footer {
        display: flex;
        justify-content: center;
    }
    .login-footer {
        position: absolute;
        bottom: 0;
        width: 100%;          /* Footer height */
    }
    
    
</style>

<script>
    import { mapState } from 'vuex'
    
export default {
    
    name: "FooterBar",
    
    data: function (){
        
    },
    computed : { 
        ...mapState({user:'user', token:'token'}),       
    },
    methods : {        
    }
}   
</script>