<template>
    <button  @click="deletePost(post)">Supprimer la publication</button> 
</template>

<style>
    a {
        text-decoration: none;
    }
    </style>
    
    <script>
    import { mapState } from 'vuex'
    //import PostsList from './PostsList.vue'
    
    export default {
        name: "DeletePostButton",
        props: ['post'],
        
        data: function (){
            return{ 
                errors : [],                
            }
        },
        computed : {
            ...mapState({user:'user', token:'token'}),
            isAdmin : function() {
                return this.$store.getters.IS_USER_ISADMIN_GETTER
            }
        },
        mounted() {
        },
        methods : {
            deletePost: function(post){
            this.postId = post.id
            this.userId = post.User.id

            if(this.isAdmin || post.User.id == this.user.id) {
                
                const apiUrl = 'http://localhost:3000/api/posts'
                fetch(`${apiUrl}/${this.postId}`, {
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
                                this.$emit('postDeleted') // Event vers parent                              
                            }
                    })
                    .catch(responseError => alert(responseError.error ? responseError.error : responseError));

            }
            

        },
        }
    }   
    </script>