<template>
    <button type="button" @click="getAllComments">Commentaires</button>
</template>

<style>
    a {
        text-decoration: none;
    }
    </style>
    
    <script>
    import { mapState } from 'vuex'
    
    export default {
        name: "CommentsWrapper",
        props: ['post'],        
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
            getAllComments : function(){
                console.log(this.post)
            },
           
        }
    }   
    </script>