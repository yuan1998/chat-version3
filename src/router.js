import Vue    from 'vue'
import Router from 'vue-router'

Vue.use(Router);

let routes = [
    {
        path     : '/home',
        name     : 'home',
        component: () => import('./views/Home.vue')
    },
    {
        path     : '/price',
        name     : 'price',
        component: () => import('./views/Price.vue')
    },
    {
        path     : '/chat',
        name     : 'chat',
        component: () => import('./views/Chat.vue')
    },
    {
        path     : '/concat',
        name     : 'concat',
        component: () => import('./views/Concat.vue')
    },
];

if (CONFIG && routes[ (CONFIG.BASE.ROOT || 0) ]) {
    routes[ CONFIG.BASE.ROOT ].alias = '/'
}

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
})
