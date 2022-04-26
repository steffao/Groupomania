<template>
    <article class="signup_details">		
		<h1>Inscription</h1>		
		<form @submit="submitForm" action="/" method="post">
            <div v-if="errors.length > 0" class="form__errors">
                <p>Formulaire incorrect. Veuillez corriger la ou les erreur(s) suivantes</p>
                <ul> 
                    <li v-for="(error,index) in errors" :key="index">{{ error }}</li> 
                </ul>
            </div>
			<input type="text" placeholder="Prénom" v-model="user.firstName">
			<input type="text" placeholder="Nom" v-model="user.lastName">
			<input type="email" placeholder="Votre email" v-model="user.email">
			<input type="password" placeholder="Votre mot de passe" v-model="user.password">
			<button type="submit" >CRÉER UN COMPTE</button>
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
            user : {
                firstName:'',
                lastName:'',
                email:'',
                password:'',

            },
            errors: [],
        }
	},
    computed : {
        isAuthenticated : function() {
            return this.$store.getters.IS_USER_AUTHENTICATE_GETTER
        },
        isAdmin : function() {
            return this.$store.getters.IS_USER_ISADMIN_GETTER
        }
    },
    methods: {
        checkForm: function () {
            this.errors = [];
            if (!this.user.firstName) {
                this.errors.push("Prénom non saisi");
            } else if (!this.validFirstName(this.user.firstName)){
                this.errors.push("Le prénom n'est pas valide")
            }
            
            if (!this.user.lastName) {
                this.errors.push('Nom non saisi');
            } else if (!this.validLastName(this.user.lastName)) {
                this.errors.push('Le nom saisi n\'est pas valide');
            }

            if (!this.user.email) {
                this.errors.push('Email non saisi');
            } else if (!this.validEmail(this.user.email)) {
                this.errors.push('L\'adresse email saisie n\'est pas valide');
            }

            if (!this.user.password) {
                this.errors.push('Mot de passe non saisi');
            } else if (!this.validPassword(this.user.password)) {
                this.errors.push('Le mot de passe doit contenir au minimum : 1 majuscule, 1 miniscule, 1 chiffre, 1 caractère spécial. 8 caractères minimum');
            }

            if (!this.errors.length) {   
                return true;
            }
            return false    
        },
        
        validFirstName: function (firstName) {
            var re = /^[a-zA-Z-' ]+$/;
            return re.test(firstName);
        },
        validLastName: function (lastName) {
            var re = /^[a-zA-Z-' ]+$/;
            return re.test(lastName);
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPassword: function (password) {
            var re = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
            return re.test(password);
        },
        
        submitForm: function (e){
            e.preventDefault();
            if (this.checkForm() == true){
                const apiUrl = 'http://localhost:3000/api/auth/signup'
                fetch(apiUrl, {
                    method: 'post',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(this.user)
                })   
                .then( userData => {
                        this.$store.dispatch('updateUserData',userData)
                        console.log(userData)
                    })
                .catch(responseError => this.errors.push(responseError.error));
            }
            
        }
    }
        
}
</script>