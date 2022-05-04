<template>
    <button type="button" v-if="isVisible == false" @click="toggleComments">Afficher les commentaires</button>    
    <button type="button" v-if="isVisible == true" @click="toggleComments">Masquer les commentaires</button>
    <div class="comments__container" v-if="isVisible == true">
        <CommentCreator @commentCreated="getAllComments" :post="post"/>
        <article v-for="(comment,index) in comments" :key="index">           
            <div id="id" >{{comment.id}}</div>           
            <div >{{comment.User.first_name}} {{comment.User.last_name}}</div>      
            <div >{{comment.content}}</div>         
            <!-- <DeletePostButton v-if="isAdmin || post.User.id == user.id" @postDeleted="getAllPosts" :post="post" /> -->        
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
    
    export default {
        name: "CommentsList",
        components : {
            CommentCreator,

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