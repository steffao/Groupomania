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
        <input type="file" id="media" name="media" accept="image/png, image/jpeg, image/jpg, image/gif, video/mp4" @change="onFileSelected">
        <button type="submit">Publier</button>
    </form>
    
    <article v-for="(post,index) in posts" :key="index">           
        <div>{{post.id}}</div>           
        <div>{{post.User.first_name}} {{post.User.last_name}}</div>
        <div>{{post.title}}</div>
        <div>{{post.content}}</div>
        <img :src="post.attachment" alt="">   
         
    </article>
</template>