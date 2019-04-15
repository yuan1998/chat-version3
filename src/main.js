import Vue    from 'vue'
import App    from './App.vue'
import router from './router'
import store  from './store/store'
import FastClick from 'fastclick'
import Bus from './utily/bus'
import $ from 'jquery'
import './styles/app.less'

window.$ = $;

$(function() {
    FastClick.attach(document.body);
});

(/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
    // 这里加了个类型判断，因为a等元素也会触发blur事件
    ['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false)
}, true);

Bus(Vue);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    const model = store.getters['Controller/showModal'];

    store.commit('Controller/routeIsShow', to.name);
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
