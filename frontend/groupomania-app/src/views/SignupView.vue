<template>
    <div class="gm-row-padding">
        <div class="gm-col m12">
            <div class="gm-card gm-round gm-white">
                <article class="login_details">
                    <h1>Inscription</h1>
                    <form @submit="submitForm" action="/" method="post">
                        <div v-if="errors.length > 0" class="form__errors">
                            <p class="error-list-theme">Formulaire incorrect. Veuillez corriger la ou les erreur(s)
                                suivantes</p>
                            <ul>
                                <li v-for="(error,index) in errors" :key="index" class="error-list-theme">{{ error }}
                                </li>
                            </ul>
                        </div>
                        <input type="text" placeholder="Prénom" v-model="user.firstName"
                            class="gm-border gm-padding gm-margin-bottom">
                        <input type="text" placeholder="Nom" v-model="user.lastName"
                            class="gm-border gm-padding gm-margin-bottom">
                        <input type="email" placeholder="Email" v-model="user.email"
                            class="gm-border gm-padding gm-margin-bottom">
                        <input type="password" placeholder="Mot de passe contenant : 1 majuscule, 1 miniscule, 1 chiffre, 1 caractère spécial. 8 caractères minimum" v-model="user.password"
                            class="gm-border gm-padding gm-margin-bottom">
                        <button type="submit" class="gm-button gm-theme">CRÉER UN COMPTE</button>
                    </form>
                    <div>Vous avez déjà un compte?
                        <router-link to="/login" class="switch-to-signup-theme">Se connecter</router-link>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<style>
    article {
        padding: 16px;
    }
    form {
        display: flex;
        /* flex-wrap: wrap; */
        justify-content: space-around;
        flex-direction: column;
        margin-bottom: 5px;
    }
    .switch-to-signup-theme {
        color: rgb(209, 70, 82)
    }
    .switch-to-signup-theme:hover {
        font-weight: bold;
        text-decoration-line: underline;
    }
    .error-list-theme {
        color: rgb(255, 36, 30) !important;
    }
</style>

<script>
    export default {
        name: "SignupView",
        data: function () {
            return {
                user: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                },
                errors: [],
            }
        },
        computed: {
            isAuthenticated: function () {
                return this.$store.getters.IS_USER_AUTHENTICATE_GETTER
            },
            isAdmin: function () {
                return this.$store.getters.IS_USER_ISADMIN_GETTER
            }
        },
        methods: {
            checkForm: function () {
                this.errors = [];
                if (!this.user.firstName) {
                    this.errors.push("Prénom non saisi");
                } else if (!this.validFirstName(this.user.firstName)) {
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
                return firstName.trim() ? re.test(firstName) : false;
            },
            validLastName: function (lastName) {
                var re = /^[a-zA-Z-' ]+$/;
                return lastName.trim() ? re.test(lastName) : false;
            },
            validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            validPassword: function (password) {
                var re = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
                return re.test(password);
            },

            submitForm: function (e) {
                e.preventDefault();
                if (this.checkForm() == true) {
                    const apiUrl = 'http://localhost:3000/api/auth/signup'
                    fetch(apiUrl, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(this.user)
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.error) {
                                this.errors.push(res.error)

                            } else {
                                this.$store.dispatch('updateUserData', res);
                                this.$router.push('/'); //cf. router/index.js check authentication
                                console.log(res)
                            }
                        })
                        .catch(responseError => this.errors.push(responseError.error));
                }
            }
        }
    }
</script>