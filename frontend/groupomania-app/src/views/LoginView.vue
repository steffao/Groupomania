
<template>
    <article class="login_details">
        <h1>Connexion</h1>
            
        <form action="">
            <input type="email" placeholder="Votre email" v-model="email">
            <input type="password" placeholder="Votre mot de passe" v-model="password">
            <button type="submit">SE CONNECTER</button>
        </form>
        <div>Vous n'avez pas encore de compte? <router-link to="/signup">Créer un compte</router-link></div>
    </article>
</template>

<style>
a {
    text-decoration: none;
}
</style>

<script>

    export default {
        name: "LoginView",
        
        data: function (){
    return{
        
        email:'',
        password:'',
    }
},

}
    
</script>