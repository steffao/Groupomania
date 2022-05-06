<template>
    <button class="w3-bar-item w3-button" @click="deleteUser">Supprimer votre compte utilisateur</button> 
</template>

<style>
    a {
        text-decoration: none;
    }
    </style>
    
    <script>
    import { mapState } from 'vuex'
    
    export default {
        name: "DeleteUserButton",
        
        data: function (){
            return{ 
                errors : [],                
            }
        },
        computed : {
            ...mapState({user:'user', token:'token'}),
            isAuthenticated : function() {
                return this.$store.getters.IS_USER_AUTHENTICATE_GETTER
            },
        },
        mounted() {
        },
        methods : {
            deleteUser: function(){
            if(this.isAuthenticated ) {
                
                const apiUrl = 'http://localhost:3000/api/auth'
                fetch(apiUrl, {
                    method: 'delete',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${this.token}`,
                    },                       
                })
                .then(res => res.json())
                    .then( res => {
                            if (res.error ) {
                                alert(res.error)
    
                            } else {
                                //this.$emit('userDeleted')
                                this.$store.dispatch('resetState');
                                this.$router.push('/login') // Event vers parent                              
                            }
                    })
                    .catch(responseError => alert(responseError.error ? responseError.error : responseError));

            }
            

        },
        }
    }   
    </script>