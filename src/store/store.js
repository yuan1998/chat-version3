import Vue  from 'vue'
import Vuex from 'vuex'
import Bridge from './Bridge'
import Controller from './Controller'
import Form from './Form'

Vue.use(Vuex);

export default new Vuex.Store({
    modules  : {
        Bridge,
        Controller,
        Form
    },
    state    : {},
    mutations: {},
    actions  : {}
})
