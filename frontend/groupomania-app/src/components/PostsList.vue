
<template>
    <PostCreator @postCreated="getAllPosts"/>
    
    <article v-for="(post,index) in posts" :key="index">           
        <div>{{post.id}}</div>           
        <div>{{post.User.first_name}} {{post.User.last_name}}</div>
        <div>{{post.title}}</div>
        <div>{{post.content}}</div>
        <img :src="post.attachment" alt="">   
         
    </article>
</template>

<style>
a {
    text-decoration: none;
}
</style>

<script>
import { mapState } from 'vuex'
import PostCreator from './PostCreator.vue'

export default {
    name: "PostsList",
    components : {
        PostCreator
    },
    
    data: function (){
        return{   
            posts : [],
        }
    },
    computed : {
        ...mapState({user:'user', token:'token'}),
        isAdmin : function() {
            return this.$store.getters.IS_USER_ISADMIN_GETTER
        }
    },
    mounted() {
        this.getAllPosts()
    },
    methods : {
        getAllPosts: function (){            
            const apiUrl = 'http://localhost:3000/api/posts'
            fetch(apiUrl, {
                method: 'get',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${this.token}`,
                },                       
            })
            .then(res => res.json()) 
                .then( posts => {
                    this.posts = posts;             
                })
            .catch(responseError => this.errors.push(responseError.error));                        
        }  
    }
}   
</script>