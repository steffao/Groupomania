<template>
    <!-- Footer -->
    <footer v-if="token" class="gm-container gm-theme-d2 gm-padding-16">
        <a href="#" class="gm-bar-item gm-button gm-padding-large">
            <img class="gm-margin-right" src="../../assets/images/groupomania_logo/icon-left-font-monochrome-white.svg"
                alt="Logo de Groupomania" style="max-height: 20px">
        </a>
    </footer>
    <footer v-else class="gm-container gm-theme-d2 gm-padding-16 login-footer">
        <a href="#" class="gm-bar-item gm-button gm-padding-large">
            <img class="gm-margin-right" src="../../assets/images/groupomania_logo/icon-left-font-monochrome-white.svg"
                alt="Logo de Groupomania" style="max-height: 20px">
        </a>
    </footer>

</template>

<style scoped>
    footer {
        display: flex;
        justify-content: center;
    }
    .login-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
</style>

<script>
    import { mapState } from 'vuex'

    export default {

        name: "FooterBar",

        data: function () {

        },
        computed: {
            ...mapState({ user: 'user', token: 'token' }),
        },
        methods: {
        }
    }   
</script>