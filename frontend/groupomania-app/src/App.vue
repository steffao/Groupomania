<template>
  <div id="app">
    <!-- Header -->
    <header>
      <NavBar />
    </header>
    
    <!-- Page Container -->
    <main class="gm-container gm-content" style="max-width:1400px;margin-top:80px">
      <div class="gm-row">
        <router-view />
      </div>
    </main>
    <footer>
      
    </footer>
    <FooterBar />
  </div>
</template>

<style lang="css">
  @import '../src/assets/style/style.css';
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

  body {
    background-image: url("./assets/images/groupomania_logo/icon.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 135%;
    background-position: 185% 60%;
  }
</style>

<script>
  import NavBar from './components/navigation/NavBar.vue'
  import FooterBar from './components/navigation/FooterBar.vue'
  import { getCookie } from './utils/cookie.js'

  export default {
    components: {
      NavBar,
      FooterBar
    },
    metaInfo: {
      title: 'Groupomania'
    },
    created() {
      const rawUserData = getCookie('userData')
      if (rawUserData) {

        const userData = JSON.parse(rawUserData)

        if (typeof (userData) == 'object' && userData.user && userData.token) {
          this.$store.dispatch('updateUserData', userData)
        }
      }
    },
  }

</script>