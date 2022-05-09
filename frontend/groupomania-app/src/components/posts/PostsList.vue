<template>
    <!-- Middle Column -->


    <PostCreator @postCreated="getAllPosts" />
    <article v-for="(post,index) in posts" :key="index" class="gm-container gm-card gm-white gm-round gm-margin"><br>
        <span class="gm-right gm-opacity">{{getTimeAgo(post.created_at)}}</span>
        <span class="full-name-color" >{{post.User.first_name}} {{post.User.last_name}}</span>
        <h2>{{post.title}}</h2>
        <hr class="gm-clear">
        <p>{{post.content}}</p>
        <div class="gm-row-padding" style="margin:0 -16px">
            <div v-if="post.media_url" class="gm-half">
                <video v-if="post.media_url.endsWith('mp4')" :src="post.media_url" alt="" style="width: 75%"
                    controls></video>
                <img v-else :src="post.media_url" alt="" style="width:75%">
            </div>
        </div>
        <hr class="gm-clear">
        <CommentsList :post="post" />
        <DeletePostButton v-if="isAdmin || post.User.id == user.id" @postDeleted="getAllPosts" :post="post" />
    </article>
    <!-- End Middle Column -->
</template>

<style scoped>
    .full-name-color{
        color : rgb(209, 70, 82)
    }
</style>

<script>
    import { mapState } from 'vuex'
    import PostCreator from './PostCreator.vue'
    import DeletePostButton from './DeletePostButton.vue'
    import CommentsList from '../comments/CommentsList.vue'
    import {  formatDistanceToNowStrict  } from 'date-fns'
    import {  fr  } from 'date-fns/locale'

    export default {
        name: "PostsList",
        components: {
            PostCreator,
            DeletePostButton,
            CommentsList

        },
        data: function () {
            return {
                posts: [],             
            }
        },
        computed: {
            ...mapState({ user: 'user', token: 'token' }),
            isAdmin: function () {
                return this.$store.getters.IS_USER_ISADMIN_GETTER
            },            
        },
        mounted() {            
            this.getAllPosts()
        },
        methods: {
            getTimeAgo: function (postCreatedAt) {
                const renderFormatDistance = 
                    'il y a ' + formatDistanceToNowStrict(new Date(postCreatedAt), {addSuffix:false,locale : fr});
                
                return renderFormatDistance
            },
            getAllPosts: function () {
                const apiUrl = 'http://localhost:3000/api/posts'
                fetch(apiUrl, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`,
                    },
                })
                    .then(res => res.json())
                    .then(posts => {
                        this.posts = posts;
                    })
                    .catch(responseError => this.errors.push(responseError.error));
            }
        }
    }   
</script>