<template>
    <div class="gm-row-padding">
        <div class="gm-col m12">
            <div class="gm-card gm-round gm-white">
                <article class="gm-container gm-padding">
                    <form id="postForm" @submit="createPost">
                        <h1>Ajouter une publication</h1>
                        <div v-if="errors.length > 0" class="form__errors">
                            <p class="gm-opacity error-list-theme">Formulaire incorrect. Veuillez corriger la ou les
                                erreur(s) suivantes</p>
                            <ul>
                                <li v-for="(error,index) in errors" :key="index" class="error-list-theme">{{ error }}
                                </li>
                            </ul>
                        </div>
                        <input class="gm-border gm-padding gm-margin-bottom-4" type="text"
                            placeholder="Donner un titre à votre publication" v-model="newPost.title">
                        <textarea class="gm-border gm-padding gm-margin-bottom-4" type="text"
                            placeholder="Rédiger votre publication" v-model="newPost.content"></textarea>
                        <input class="gm-padding gm-margin-bottom-4 custom-file-input" type="file" id="media"
                            name="media" title=" " value=""
                            accept="image/png, image/jpeg, image/jpg, image/gif, video/mp4" @change="onFileSelected">
                        <button class="gm-button gm-theme" type="submit">
                            <i class="fa fa-pencil"></i> Publier
                        </button>
                    </form>
                </article>
            </div>
        </div>
    </div>

</template>

<style scoped>
    #postForm {
        display: flex;
        flex-direction: column;
    }

    .gm-margin-bottom-4 {
        margin-bottom: 4px;
    }

    .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
    }
    .custom-file-input::before {
        content: 'Insérer une image/vidéo';
        background-color: rgb(17, 33, 56);
        color: #fff;
        display: inline-block;
        border: 1px solid #999;
        padding: 8px 8px;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
    }
    .custom-file-input:hover::before {
        border-color: black;
    }
    .custom-file-input:active::before {
        background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }
    @media only screen and (max-width: 600px) {
        .custom-file-input::before {
            content: 'Image ou vidéo';
            display: flex;
            justify-content: center;
            text-overflow: ellipsis;
        }
    }
    .error-list-theme {
        color: rgb(255, 36, 30) !important;
    }
</style>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "PostsList",

        data: function () {
            return {
                errors: [],
                newPost: {
                    content: '',
                    title: '',
                    userId: '',

                },
            }
        },
        computed: {
            ...mapState({ user: 'user', token: 'token' }),
            isAdmin: function () {
                return this.$store.getters.IS_USER_ISADMIN_GETTER
            }
        },
        mounted() {
        },
        methods: {
            onFileSelected: function (e) {
                console.log(e);
                this.selectedFile = e.target.files[0]
            },
            checkPostForm: function () {
                this.errors = [];
                if (!this.newPost.title) {
                    this.errors.push('Veuillez saisir une titre de publication');
                }
                if (!this.newPost.content) {
                    this.errors.push('Veuillez saisir une publication');
                }
                if (this.selectedFile && this.selectedFile.size > 3145728) { // en bytes = 3MB
                    this.errors.push('Veuillez sélectionner un fichier infèrieur à 3MB');
                }

                if (!this.errors.length) {
                    return true;
                }
                return false
            },
            createPost: function (e) {
                e.preventDefault();
                this.newPost.userId = this.user.id

                const formData = new FormData()
                if (this.selectedFile) {
                    formData.append('media', this.selectedFile)
                }
                for (let key in this.newPost) {
                    formData.append(key, this.newPost[key])
                }
                if (this.checkPostForm()) {
                    const apiUrl = 'http://localhost:3000/api/posts'
                    fetch(apiUrl, {
                        method: 'post',
                        headers: { 'Authorization': `Bearer ${this.token}` },
                        body: formData,
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.error) {
                                this.errors.push(res.error)

                            } else {
                                this.$emit('postCreated') // Event vers parent
                                this.newPost = {
                                    content: '',
                                    title: '',
                                    userId: '',
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