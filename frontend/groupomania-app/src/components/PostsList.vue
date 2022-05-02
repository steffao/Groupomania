
<template>
    <PostCreator @postCreated="getAllPosts"/>
    
    <article v-for="(post,index) in posts" :key="index">           
        <div id="id" data-id="post.id">{{post.id}}</div>           
        <div >{{post.User.first_name}} {{post.User.last_name}}</div>
        <div >{{post.title}}</div>
        <div >{{post.content}}</div>
        <div v-if="post.media_url">
            <video v-if="post.media_url.endsWith('mp4')" :src="post.media_url" alt=""></video>
            <img v-else :src="post.media_url" alt="">
        </div>
        <div v-if="isAdmin">
            <button v-if="post.is_active" @click="onPostSelected">Masquer la publication</button>
            <button v-if="!post.is_active" @click="onPostSelected">Afficher la publication</button>
        </div>
        
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
        onPostSelected : function (e) {
                console.log(e.target)
        },
        togglePost: function(e){
            e.preventDefault()

            if(this.isAdmin) {
                console.log(this.posts)
                
                
                //const formData = new FormData()
                //formData.append('postToggle' , postToggled)

                // const apiUrl = 'http://localhost:3000/api/posts'
                // fetch(apiUrl, {
                //     method: 'put',
                //     headers: {
                //         'Content-Type' : 'application/json',
                //         'Authorization' : `Bearer ${this.token}`,
                //         body: formData,
                //     },                       
                // })
                // .then(res => res.json())
                //     .then( res => {
                //             if (res.error ) {
                //                 alert(res.error)
    
                //             } else {
                //                 // this.$emit('postCreated') // Event vers parent
                //                 this.getAllPosts
                //                 document.getElementById('postForm').reset() // Clear form
                //             }
                //     })
                //     .catch(responseError => alert(responseError.error ? responseError.error : responseError));

            }
            

        },
        
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
                    console.log(this.posts)             
                })
            .catch(responseError => this.errors.push(responseError.error));                        
        }  
    }
}   
</script>