
export default {
    namespaced: true,
    state: {
        showFooter: true,
        showMask: false,
        showModel: false,
        modelContent: '',
    },
    mutations: {
        showFooter(state , value) {
            state.showFooter = value;
        },
        showMask(state , value) {
            state.showMask = value;
        },
        showModel(state , value) {
            state.showModel = value;
        },
        modelContent(state , value) {
            state.modelContent = value;
        },
    },
    actions: {
        $model({commit} , {
            content,
            show = true
        }) {
            commit('showMask' , show);
            commit('modelContent' , content);
            commit('showModel' , show);
        },
        $hideAll({dispatch}){
            dispatch('$model', {
                content: '',
                show: false
            });
        },
    },
    getters: {
        showFooter(state) {
            return state.showFooter
        },
        showModel(state) {
            return state.showModel
        },
        showMask(state) {
            return state.showMask
        },
        model(state) {
            return {
                text: state.modelContent,
                show: state.showModel
            }
        }
    }
}
