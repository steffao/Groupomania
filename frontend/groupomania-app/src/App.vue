<template>
  <div id="app">
    <NavBar />
    
  </div>
  
  <router-view />
</template>

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