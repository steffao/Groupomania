<template>
    <div class="w3-row-padding">
        <div class="w3-col m12">
            <div class="w3-card w3-round w3-white">
                <article class="w3-container w3-padding">
                    <form id="postForm" @submit="createPost">
                        <div v-if="errors.length > 0" class="form__errors">
                            <p class="w3-opacity">Formulaire incorrect. Veuillez corriger la ou les erreur(s) suivantes</p>
                            <ul> 
                                <li v-for="(error,index) in errors" :key="index">{{ error }}</li> 
                            </ul>
                        </div>
                        <input class="w3-border w3-padding" type="text" placeholder="Donner un titre à votre publication" v-model="newPost.title">
                        <input class="w3-border w3-padding" type="text" placeholder="Rédiger votre publication" v-model="newPost.content">
                        <input type="file" id="media" name="media" accept="image/png, image/jpeg, image/jpg, image/gif, video/mp4" @change="onFileSelected">
                        <button class="w3-button w3-theme" type="submit">
                            <i class="fa fa-pencil"></i>    Publier</button>
                    </form>
                </article>
            </div>
        </div>

    </div>
    
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
                errors : [],
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
                if (this.selectedFile && this.selectedFile.size > 3145728 ) { // en bytes = 3MB
                    this.errors.push('Veuillez sélectionner un fichier infèrieur à 3MB');
                }
                
    
                if (!this.errors.length) {
                    return true;
                }
                return false
            },
            createPost : function(e){
                e.preventDefault();
                
                this.newPost.userId = this.user.id
                
                const formData = new FormData()
                if(this.selectedFile) {
                    formData.append('media', this.selectedFile)
                } 
                for (let key in this.newPost){
                    formData.append(key , this.newPost[key])
                }            
                if (this.checkPostForm()) {
                    const apiUrl = 'http://localhost:3000/api/posts'
                    fetch(apiUrl, {
                        method: 'post',
                        headers: {'Authorization' : `Bearer ${this.token}`},
                        body: formData,                    
                    })                
                    .then(res => res.json())
                    .then( res => {
                            if (res.error ) {
                                this.errors.push(res.error)
    
                            } else {
                                this.$emit('postCreated') // Event vers parent
                                this.newPost = {
                                    content : '',
                                    title : '',
                                    userId : '',
                                }
                                this.selectedFile = null
                                document.getElementById('postForm').reset() // Clear form
                            }
                    })
                    .catch(responseError => this.errors.push(responseError.error ? responseError.error : responseError));
                }
            },
        }
    }   
    </script>