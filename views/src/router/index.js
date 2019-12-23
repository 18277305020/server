import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( '@/views/Home.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import( '@/views/member/List.vue'),
            }
        ]
    },
    {
        path: '/login',
        component: () => import( '@/views/login/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
