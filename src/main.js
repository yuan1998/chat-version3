import Vue    from 'vue'
import App    from './App.vue'
import router from './router'
import store  from './store/store'
import Bus from './utily/bus'
import $ from 'jquery'
import './styles/app.less'

window.$ = $;

Bus(Vue);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    const model = store.getters['Controller/showModel'];
    if (model) {
        store.dispatch('Controller/$hideAll');
        next(false);
    }
    else {
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
