
<template>
    <form @submit="createPost">
        <div v-if="errors.length > 0" class="form__errors">
            <p>Formulaire incorrect. Veuillez corriger la ou les erreur(s) suivantes</p>
            <ul> 
                <li v-for="(error,index) in errors" :key="index">{{ error }}</li> 
            </ul>
        </div>
        <input type="text" placeholder="Donner un titre à votre publication" v-model="newPost.title">
        <input type="text" placeholder="Rédiger votre publication" v-model="newPost.content">
        <input type="file" id="media" name="media" accept="image/png, image/jpeg, image/mpg, image/gif, video/mp4" @change="onFileSelected">
        <button type="submit">Publier</button>
    </form>
    
    <article v-for="(post,index) in posts" :key="index">           
        <div>{{post.id}}</div>           
        <div>{{post.User.first_name}} {{post.User.last_name}}</div>
        <div>{{post.title}}</div>
        <div>{{post.content}}</div>   
         
    </article>
</template>

<style>
a {
    text-decoration: none;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
    name: "PostsList",
    
    data: function (){
        return{   
            posts : [],
            errors : [],
            newPost : {
                content : '',
                title : '',
                userId : '',
                attachment: ''
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
        this.getAllPosts()
    },
    methods : {
        onFileSelected : function (e) {
            console.log(e);
            this.selectedFile= e.target.files[0]

        },
        checkPostForm: function () {
            this.errors = [];
            if (!this.newPost.title) {
                this.errors.push('Veuillez saisir une titre de publication');
            }
            if (!this.newPost.content) {
                this.errors.push('Veuillez saisir une publication');
            }

            if (!this.errors.length) {
                return true;
            }
            return false
        },
        createPost : function(e){
            e.preventDefault();
            
            console.log(this.selectedFile)
            
            const formData = new FormData()
            formData.append('media', this.selectedFile)
            formData.append('post', JSON.stringify(this.newPost))
            console.log(formData)
            this.newPost.userId = this.user.id
            if (this.checkPostForm()) {
                console.log(this.newPost)
                const apiUrl = 'http://localhost:3000/api/posts'
                fetch(apiUrl, {
                    method: 'post',
                    headers: {
                    //'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${this.token}`,
                    },
                    //body: JSON.stringify(this.newPost),
                    //file: {attachment : formData},
                })
                
                .then(res => res.json())
                .then( res => {
                        if (res.error ) {
                            this.errors.push(res.error)

                        } else {
                            this.getAllPosts()
                        }
                    })
                .catch(responseError => this.errors.push(responseError.error));

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
                })
            .catch(responseError => this.errors.push(responseError.error));                        
        }  
    }
}   
</script>