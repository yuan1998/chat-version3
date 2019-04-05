import { cloneOf, oneOf } from "../utily/util";

const showList = CONFIG.BASE.SHOW_FOOTER_LIST;

const defaultModalConfig = {
    show       : false,
    text       : '',
    showConfirm: true,
    confirmText: '确认',
    confirm    : null,
    showCancel : false,
    cancelText : '',
    cancel     : null,
};

export default {
    namespaced: true,
    state     : {
        showFooter  : true,
        showMask    : false,
        showModal   : false,
        itemHide    : false,
        modelContent: '',
        modal       : cloneOf(defaultModalConfig),
    },
    mutations : {
        routeIsShow(state, route) {
            if (route === 'chat' && state.itemHide) {
                return;
            }
            state.showFooter = oneOf(route, showList);
        },
        showFooter(state, value) {
            state.showFooter = value;
            state.itemHide   = !value;
        },
        showMask(state, value) {
            state.showMask = value;
        },
        showModal(state, obj = {}) {
            state.modal = Object.assign({}, defaultModalConfig, obj);
        },
        modelContent(state, value) {
            state.modelContent = value;
        },
    },
    actions   : {
        $modal({ commit }, obj) {
            obj = Object.assign({}, obj, { show: true });

            if (obj.content) {
                obj.text = obj.content;
            }

            commit('showMask', true);
            commit('showModal', obj);
        },
        $hideAll({ commit }) {
            commit('showMask', false);
            commit('showModal');
        },
    },
    getters   : {
        showFooter(state) {
            return state.showFooter
        },
        showModal(state) {
            return state.showModal
        },
        showMask(state) {
            return state.showMask
        },
        model(state) {
            return state.modal;
        }
    }
}
