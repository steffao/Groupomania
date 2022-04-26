import store from "@/store";
import {createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path:"/login",
        name: 'LoginView',
        component: () =>
            import("../views/LoginView.vue"), // import dynamique
        meta : {auth: false}
    },
    {
        path:"/signup",
        name: 'SignupView',
        component: () =>
            import("../views/SignupView.vue"), // import dynamique
        meta : {auth: false}
    },
    {
        path:"/",
        name: 'DashboardView',
        component: () =>
            import("../views/DashboardView.vue"), // import dynamique
        meta : {requireAuth: true}
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (
        'requireAuth' in to.meta &&
        to.meta.requireAuth &&
        !store.getters.IS_USER_AUTHENTICATE_GETTER
    
    ) {console.log('ododo')
        next('/login');
    } else if (
        'requireAuth' in to.meta &&
        !to.meta.requireAuth &&
        store.getters.IS_USER_AUTHENTICATE_GETTER
    ) {
        next('/')
    } else {
        next()
    }
})

export default router;