<template>
  
  <div id="app">
    <!-- Header -->
    <NavBar />
    <!-- Page Container -->
    <main class="w3-container w3-content" style="max-width:1400px;margin-top:80px">
      <div class="w3-row">
        <router-view />
      </div>      
    </main>   
  </div>
  
  
  
</template>

<style lang="css">
  @import '../src/assets/style/style.css';
  @import url("https://www.w3schools.com/lib/w3-theme-blue-grey.css");
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
  
  


</style>
<script>
import NavBar from './components/NavBar.vue'
import {getCookie} from './utils/cookie.js'

export default {
  components : {
    NavBar
  },
  created () {
    const rawUserData = getCookie('userData')
    if (rawUserData) {      

      const userData = JSON.parse(rawUserData)
      
      if (typeof(userData) == 'object' && userData.user && userData.token) {        
        this.$store.dispatch('updateUserData',userData)    
      }      
    }
  },
}
  
</script>