<script>
  import LoginPage from './components/LoginPage.vue'
  
  
  export default {
    name: 'App',
    components: {
      LoginPage,
    }
  }
  </script>
  
  <template>
    <div id="app">
      <nav>
        
        <a href="/about">À propos</a>
        <a href="/contact">Contact</a>
      </nav>
      <LoginPage />
    </div>
  </template>
