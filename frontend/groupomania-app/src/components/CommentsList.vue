<template>
    <button type="button" v-if="isVisible == false" @click="toggleComments" class="w3-button w3-theme-d2 w3-margin-bottom">
        <i class="fa fa-comment"></i>   Afficher les commentaires
    </button>    
    <button type="button" v-if="isVisible == true" @click="toggleComments" class="w3-button w3-theme-d2 w3-margin-bottom">
        <i class="fa fa-comment"></i>   Masquer les commentaires
    </button>
    <div class="comments__container" v-if="isVisible == true">
        <CommentCreator @commentCreated="getAllComments" :post="post"/>
        <article v-for="(comment,index) in comments" :key="index">           
            <div id="id" >{{comment.id}}</div>           
            <div >{{comment.User.first_name}} {{comment.User.last_name}}</div>      
            <div >{{comment.content}}</div>         
            <DeleteCommentButton v-if="isAdmin || comment.User.id == user.id" @commentDeleted="getAllComments" :post="post" :comment="comment" />
        </article>
    </div>  
</template>

<style>
    a {
        text-decoration: none;
    }
</style>
    
<script>
    import { mapState } from 'vuex'
    import CommentCreator from './CommentCreator.vue'
    import DeleteCommentButton from './DeleteCommentButton.vue'
    
    export default {
        name: "CommentsList",
        components : {
            CommentCreator,
            DeleteCommentButton,
        },
        props: ['post'],        
        data: function (){
            return{ 
                errors : [],
                comments: [],
                isVisible : false,
                newPost : {
                    content : '',
                    title : '',
                    userId : '',                    
                },
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
            toggleComments : function() {
                if (this.isVisible){
                    this.isVisible = false
                } else {
                    this.isVisible = true;
                    this.getAllComments()
                }
            },
            
            getAllComments : function(){
                const apiUrl = `http://localhost:3000/api/posts/${this.post.id}/comments`
                fetch(apiUrl, {
                    method: 'get',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${this.token}`,
                    },                       
                })
                .then(res => res.json()) 
                    .then( comments => {
                        this.comments = comments;             
                    })
                .catch(responseError => this.errors.push(responseError.error));                        
            }  
        },
    }       
</script>