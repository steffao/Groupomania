// ./components/LoginPage.vue
<script>
export default {
	name: 'LoginPage',
	components: {
		
	},
	data: function (){
		return{
			message: 'Connexion',
			email:'',
			password:'',
		}
	},
	methods: {
          
      }
}
</script>

<template>
    <article class="login_details">
		<h1>{{message}}</h1>
			
		<form action="">
			<input type="email" placeholder="Votre email" v-model="email">
			<input type="password" placeholder="Votre mot de passe" v-model="password">
			<button type="submit">SE CONNECTER</button>
		</form>
		<p>Vous n'avez pas encore de compte?<a href="./SignupPage.vue" >Créer un compte</a></p>
		
    </article>
</template>

<style>
	a {
		text-decoration: none;
	}
</style>