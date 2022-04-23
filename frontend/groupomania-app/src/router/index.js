import {createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path:"/login",
        name: 'LoginView',
        component: () =>
            import("../views/LoginView.vue") // import dynamique
    },
    {
        path:"/signup",
        name: 'SignupView',
        component: () =>
            import("../views/SignupView.vue") // import dynamique
    },
    {
        path:"/",
        name: 'DashboardView',
        component: () =>
            import("../views/DashboardView.vue") // import dynamique
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;