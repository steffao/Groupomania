
<template>
    <!-- Middle Column -->
    
    
    <PostCreator @postCreated="getAllPosts"/>        
    <article v-for="(post,index) in posts" :key="index" class="w3-container w3-card w3-white w3-round w3-margin"><br>          
        <span class="w3-right w3-opacity">1 min</span>
        <div>{{post.User.first_name}} {{post.User.last_name}}</div>
        <h2>{{post.title}}</h2>
        
        <hr class="w3-clear">
        <p>{{post.content}}</p>
        <div class="w3-row-padding" style="margin:0 -16px">
            <div  v-if="post.media_url" class="w3-half">
            <video v-if="post.media_url.endsWith('mp4')" :src="post.media_url" alt="" style="width: 75%" controls></video>
            <img v-else :src="post.media_url" alt="" style="width:75%">
            </div>              
        </div>
        <hr class="w3-clear">
        <CommentsList :post="post"/>     
        <DeletePostButton v-if="isAdmin || post.User.id == user.id" @postDeleted="getAllPosts" :post="post" />
    </article>           
      <!-- End Middle Column -->
</template>

<style scoped >
    

</style>

<script>
import { mapState } from 'vuex'
import PostCreator from './PostCreator.vue'
import DeletePostButton from './DeletePostButton.vue'
import CommentsList from './CommentsList.vue'

export default {
    name: "PostsList",
    components : {
        PostCreator,
        DeletePostButton,
        CommentsList
        
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