<template>
    <button  @click="deleteComment(comment)">Supprimer le commentaire</button> 
</template>

<style>
    a {
        text-decoration: none;
    }
    </style>
    
    <script>
    import { mapState } from 'vuex'
    
    export default {
        name: "DeleteCommentButton",
        props: ['post','comment'],
        
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
            deleteComment: function(comment){
                this.postId = this.post.id
                this.commentId = comment.id
                this.userId = comment.User.id
                console.log(this.commentId)

                if(this.isAdmin || comment.User.id == this.user.id) {
                    
                    const apiUrl = 'http://localhost:3000/api/posts'
                    fetch(`${apiUrl}/comments/${this.commentId}`, {
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
                                    this.$emit('CommentDeleted') // Event vers parent                              
                                }
                        })
                    .catch(responseError => alert(responseError.error ? responseError.error : responseError));

                }
            },
        }
    }   
    </script>