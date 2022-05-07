<template>
    <form id="commentForm" @submit="createComment">
        <div v-if="errors.length > 0" class="form__errors">
            <p>Formulaire incorrect. Veuillez corriger la ou les erreur(s) suivantes</p>
            <ul> 
                <li v-for="(error,index) in errors" :key="index">{{ error }}</li> 
            </ul>
        </div>
        <div class="post-comment">
            <input type="text" placeholder="Répondre" v-model="newComment.content" class="w3-border w3-padding">
            <button type="submit">Publier</button>
        </div>        
    </form>
    <hr class="w3-clear">
</template>

<style>
    .post-comment {
        display: flex;
        flex-direction: column;
    }   

</style>
    
<script>
    import { mapState } from 'vuex'
    
    export default {
        name: "CommentCreator",
        
        data: function (){
            return{ 
                errors : [],
                newComment : {
                    content : '',
                    postId: '',
                    userId : '',
                    
                },
            }
        },
        props: ['post'],
        computed : {
            ...mapState({user:'user', token:'token'}),
            isAdmin : function() {
                return this.$store.getters.IS_USER_ISADMIN_GETTER
            }
        },
        mounted() {
        },
        methods : {
            test : function(e) {
                e.preventDefault();
                console.log(this.post)
            },
            checkCommentForm: function () {
                this.errors = [];                
                if (!this.newComment.content) {
                    this.errors.push('Veuillez saisir une publication');
                }
                if (!this.errors.length) {
                    return true;
                }
                return false
            },
            createComment : function(e){
                e.preventDefault();
                this.newComment.userId = this.user.id
                this.newComment.postId = this.post.id
                console.log(this.newComment)
                
                           
                if (this.checkCommentForm()) {
                    const apiUrl = `http://localhost:3000/api/posts/${this.post.id}/comments`
                    fetch(apiUrl, {
                        method: 'post',
                        headers: {
                            'Authorization' : `Bearer ${this.token}`,
                            'Content-Type' : 'application/json',},
                        body: JSON.stringify(this.newComment),                    
                    })                
                    .then(res => res.json())
                    .then( res => {
                            if (res.error ) {
                                this.errors.push(res.error)
    
                            } else {
                                this.$emit('commentCreated') // Event vers parent
                                this.newComment = {
                                    content : '',
                                    title : '',
                                    userId : '',
                                }
                                
                                document.getElementById('commentForm').reset() // Clear form
                            }
                    })
                    .catch(responseError => this.errors.push(responseError.error ? responseError.error : responseError));
                }
            },
        }
    }   
    </script>