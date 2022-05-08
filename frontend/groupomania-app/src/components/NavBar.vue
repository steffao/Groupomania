<template>

    <!-- Navbar Logged In-->
    <nav v-if="token">
        <div class="gm-top">
            <div class="gm-bar gm-theme-d2 gm-left-align gm-large">
                <a href="#" class="gm-bar-item gm-button gm-padding-large gm-theme-d4">
                    <img class="gm-margin-right"
                        src="../assets//images/groupomania_logo/icon-left-font-monochrome-white.svg"
                        alt="Logo de Groupomania" style="max-height: 20px">
                </a>
                <div class="gm-dropdown-hover gm-right">
                    <button class="gm-button gm-padding-large" title="User Settings"><span
                            class="user-full-name">{{user.firstName}} {{user.lastName}} &nbsp;</span><i
                            class="fa fa-user"></i></button>
                    <div class="gm-dropdown-content gm-card-4 gm-bar-block">
                        <button class="user-full-name gm-bar-item gm-button" disabled>{{user.firstName}}
                            {{user.lastName}} &nbsp;</button>
                        <button @click="logoutUser" class="gm-bar-item gm-button">
                            <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp; Déconnexion
                        </button>
                        <DeleteUserButton />
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Navbar Logged Out-->
    <nav v-else>
        <div class="gm-top">
            <div class="gm-bar gm-theme-d2 gm-left-align gm-large">
                <a class="gm-bar-item gm-button gm-hide-medium gm-hide-large gm-right gm-padding-large gm-hover-white gm-large gm-theme-d2"
                    @click="toggleMenu"><i class="fa fa-bars"></i></a>
                <a href="#" class="gm-bar-item gm-button gm-padding-large gm-theme-d4">
                    <img class="gm-margin-right"
                        src="../assets//images/groupomania_logo/icon-left-font-monochrome-white.svg"
                        alt="Logo de Groupomania" style="max-height: 20px">
                </a>

                <router-link to="/login" class="gm-bar-item gm-button gm-hide-small gm-padding-large gm-hover-white">
                    Connexion</router-link>
                <router-link to="/signup" class="gm-bar-item gm-button gm-hide-small gm-padding-large gm-hover-white">
                    Inscription</router-link>
            </div>
        </div>
        <!-- Navbar on small screens -->
        <div id="submenu" :class="{ 'gm-show': isToggled }"
            class="gm-bar-block gm-theme-d2 gm-hide gm-hide-large gm-hide-medium gm-large gm-below-submenu">
            <router-link to="/login" class="gm-bar-item gm-button gm-padding-large">Connexion</router-link>
            <router-link to="/signup" class="gm-bar-item gm-button gm-padding-large">Inscription</router-link>
        </div>
    </nav>

</template>

<style scoped>
    @media only screen and (max-width: 424px) {
        .user-full-name {

            display: none;
        }
    }
</style>

<script>
    import { mapState } from 'vuex'
    import DeleteUserButton from './/DeleteUserButton.vue'

    export default {
        name: "NavBar",
        components: {
            DeleteUserButton
        },

        data: function () {
            return {
                email: '',
                password: '',
                errors: [],
                isToggled: false,
            }
        },
        computed: {
            ...mapState({ user: 'user', token: 'token' }),
            isAdmin: function () {
                return this.$store.getters.IS_USER_ISADMIN_GETTER
            }
        },
        methods: {
            logoutUser: function () {

                this.$store.dispatch('resetState');
                this.$router.push('/login')

            },
            toggleMenu: function () {
                if (this.isToggled) {
                    this.isToggled = false
                } else {
                    this.isToggled = true;

                }

            }
        }
    }   
</script>