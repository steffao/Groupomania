
<template>   
    <article class="login_details">
        <h1>Connexion</h1>     
        <form @submit="submitForm" action="/" method="post">
            <div v-if="errors.length > 0" class="form__errors">
                <p>Formulaire incorrect. Veuillez corriger la ou les erreur(s) suivantes</p>
                <ul> 
                    <li v-for="(error,index) in errors" :key="index">{{ error }}</li> 
                </ul>
            </div>
            <input type="email" placeholder="Votre email" v-model="user.email">
            <input type="password" placeholder="Votre mot de passe" v-model="user.password">
            <button type="submit">SE CONNECTER</button>
        </form>
        <div>Vous n'avez pas encore de compte? 
            <router-link to="/signup">Créer un compte</router-link>
        </div>
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
            user:{
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
            if (!this.user.email) {
                this.errors.push('Email non saisi');
            } else if (!this.validEmail(this.user.email)) {
                this.errors.push('L\'adresse email saisie n\'est pas valide');
            }

            if (!this.user.password) {
                this.errors.push('Mot de passe non saisi');
            }

            if (!this.errors.length) {
                return true;
            }
            return false
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        submitForm: function (e){
            e.preventDefault();
            if (this.checkForm() == true){
                const apiUrl = 'http://localhost:3000/api/auth/login'
                fetch(apiUrl, {
                    method: 'post',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(this.user)
                })
                .then(res => res.json()) 
                    .then( userData => {
                        this.$store.dispatch('updateUserData',userData);
                        this.$router.push('/'); //cf. router/index.js check authentication
                        console.log(userData)
                        
                    })
                .catch(responseError => this.errors.push(responseError.error));
            }
            
        }
    },
}
    
</script>