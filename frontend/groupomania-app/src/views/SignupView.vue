<template>
    <article class="signup_details">		
		<h1>Inscription</h1>		
		<form action="">
			<input type="text" placeholder="Prénom" v-model="firstName">
			<input type="text" placeholder="Nom" v-model="lastName">
			<input type="email" placeholder="Votre email" v-model="email">
			<input type="password" placeholder="Votre mot de passe" v-model="password">
			<button type="submit">CRÉER UN COMPTE</button>
		</form>
        <div>Vous avez déjà un compte? <router-link to="/login">Se connecter</router-link></div>
		
    </article>
</template>

<style>
	a {
		text-decoration: none;
	}
</style>

<script>
   

    export default {
        name: "SignupView",
        data: function (){
		return{
			message: 'S\'inscrire',
			email:'',
			password:'',
			firstName:'',
			lastName:'',
		}
	},
        
    }
</script>