<template>
    <button type="button" v-if="isVisible == false" @click="toggleComments" id="comments-btn"
        class="gm-button gm-theme-d2 gm-margin-bottom">
        <i class="fa fa-comment"></i> Afficher les commentaires
    </button>
    <button type="button" v-if="isVisible == true" @click="toggleComments" id="comments-btn"
        class="gm-button gm-theme-d2 gm-margin-bottom">
        <i class="fa fa-comment"></i> Masquer les commentaires
    </button>
    <div class="comments__container" v-if="isVisible == true">

        <article v-for="(comment,index) in comments" :key="index">
            <article class="comment-bubble">
                <span class="gm-right gm-opacity">{{getTimeAgo(comment.created_at)}}</span>
                <h3><b>{{comment.User.first_name}} {{comment.User.last_name}}</b></h3>
                <div>{{comment.content}}</div>
            </article>

            <DeleteCommentButton v-if="isAdmin || comment.User.id == user.id" @commentDeleted="getAllComments"
                :post="post" :comment="comment" />
        </article>
        <CommentCreator @commentCreated="getAllComments" :post="post" />
    </div>
</template>

<style scoped>
    .comment-bubble {
        padding: 8px;
        margin-bottom: 8px;
        border-radius: 10px;
        background-color: rgb(193, 211, 236);
    }

    @media screen and (max-width: 601px) {
        #comments-btn {
            width: 100%;
            text-overflow: ellipsis;

        }
    }
</style>

<script>
    import { mapState } from 'vuex'
    import CommentCreator from './CommentCreator.vue'
    import DeleteCommentButton from './DeleteCommentButton.vue'
    import {  formatDistanceToNowStrict  } from 'date-fns'
    import {  fr  } from 'date-fns/locale'


    export default {
        name: "CommentsList",
        components: {
            CommentCreator,
            DeleteCommentButton,
        },
        props: ['post'],
        data: function () {
            return {
                errors: [],
                comments: [],
                isVisible: false,
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
            toggleComments: function () {
                if (this.isVisible) {
                    this.isVisible = false
                } else {
                    this.isVisible = true;
                    this.getAllComments()
                }
            },
            getTimeAgo: function (commentCreatedAt) {
                const renderFormatDistance = 
                    'il y a ' + formatDistanceToNowStrict(new Date(commentCreatedAt), {addSuffix:false,locale : fr});
                
                return renderFormatDistance
            },

            getAllComments: function () {
                const apiUrl = `http://localhost:3000/api/posts/${this.post.id}/comments`
                fetch(apiUrl, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`,
                    },
                })
                    .then(res => res.json())
                    .then(comments => {
                        this.comments = comments;
                    })
                    .catch(responseError => this.errors.push(responseError.error));
            }
        },
    }       
</script>