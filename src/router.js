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
    {
        path     : '/reservation',
        name     : 'reservation',
        component: () => import('./views/Reservation.vue')
    },
    {
        path     : '/lottery',
        name     : 'lottery',
        component: () => import('./views/lottery.vue')
    },
];

const configRouter = CONFIG.BASE.ROUTER || [];
const item         = configRouter[ CONFIG.BASE.ROOT || 0 ];

if (item && item.name) {
    let index = routes.findIndex(e => e.name === item.name);
    if (~index) routes[ index ].alias = '/';
}
else {
    routes[ 0 ].alias = '/'
}

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
})
