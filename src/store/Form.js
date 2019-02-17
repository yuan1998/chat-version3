import { checkReferrer } from '../utily/referrer'

const query = checkReferrer() ;

export default {
    namespaced:true,
    state    : {
        query ,
        input: '',
    },
    mutations: {
        input(state, value) {
            state.input = value;
        }
    },
    getters  : {
        input(state) {
            return state.input;
        },
        query(state) {
            return state.query;
        },

    }
}
