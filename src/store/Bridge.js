import Bridge                     from '@/utily/bridge'
import moment                     from 'moment'
import { readerImage }            from '@/utily/util'
import { addImageProcess, oneOf } from "../utily/util";

const oneMin = 1000 * 60;

let firstMessage = true;

export default {
    namespaced: true,
    state     : {
        bridge  : null,
        message : [],
        prevTime: null,
        monitor : {},
    },
    mutations : {
        bridge(state, bridge) {
            state.bridge = bridge;
        },
        message(state, message) {
            state.message = message;
        },
        messageAdd(state, item) {
            state.message.push(item);
        },
        prevTime(state, item) {
            state.prevTime = item;
        },
        addMonitor(state, {
            key,
            value
        }) {
            state.monitor[ key ] = value;
        },
        removeMonitor(state, key) {
            delete state.monitor[ key ];
        },
        clearMonitor(state) {
            state.monitor = {}
        }
    },
    actions   : {
        bridge({ commit, getters, dispatch }) {
            let bridge = getters.bridge;
            if (bridge === null) {
                bridge = new Bridge({
                    make: true,
                    messageCallback(message) {
                        dispatch('filterMessage', { message, type: 'back' });
                    }
                });
                commit('bridge', bridge);
            }
            return bridge;
        },
        async sendImage({ dispatch, commit }, { files, callback }) {
            const bridge = await dispatch('bridge');

            bridge.postMessageToChild({
                sendImage: files
            });

            readerImage(files[ 0 ], (reader) => {
                const img = new Image();

                img.addEventListener('load', () => {
                    if (typeof callback === 'function') {
                        callback(reader);
                    }

                    dispatch('createTime');
                    commit('messageAdd', {
                        value    : `<img class="mw-img-i" src="${reader.result}" />`,
                        type     : 'right',
                        animation: 'right-default'
                    })
                });
                img.src = reader.result;
            })
        },
        async sendText({ commit, dispatch, getters }, {
            value,
            display = true,
            send = true
        }) {
            if (send) {
                const bridge = await dispatch('bridge');

                bridge.postMessageToChild({
                    sendMessage: value
                });
            }

            if (display) {
                dispatch('filterMessage', {
                    message: {
                        value    : value,
                        type     : 'right',
                        animation: 'right-default'
                    },
                    pass   : true
                })
            }
            dispatch('runMonitor', value);
        },
        runMonitor({ getters }, value) {
            let monitor = getters.monitor;
            let keys    = Object.keys(monitor);

            if (keys.length > 0) {
                keys.forEach((i) => {
                    let item = monitor[ i ];
                    if (typeof item === 'function') {
                        item(value);
                    }
                })
            }
        },
        filterMessage({ commit, dispatch, state }, { message, pass = false, duration = 0, type = 'default' }) {
            message = [].concat(message)
                        .filter(e => {
                            return e && e.value !== 'NOT_FOUNT_MSG';
                        });

            if (type === 'back') {
                if (firstMessage && message.length > 1) {
                    firstMessage = false;
                    return;
                }

                message = message.filter(e => !oneOf( [ 'right', 'center' ] , e.type));
            }

            console.log('message :', message);
            console.log('firstMessage :', firstMessage);

            message.forEach((item) => {
                let arr = [ 'advertising', 'broadcast' ];
                let of  = oneOf(arr, item.type);

                duration += parseInt(item.duration) || 0;
                setTimeout(() => {
                    !of && dispatch('createTime');
                    commit('messageAdd', item);
                }, duration);

            })
        },
        createTime({ getters, commit }) {
            const now = moment();
            if (getters.prevTime) {
                if (now.diff(getters.prevTime) < oneMin) {
                    return;
                }
            }

            commit('prevTime', now);
            commit('messageAdd', {
                type : 'time',
                value: now,
            })
        },
    },
    getters   : {
        bridge(state) {
            return state.bridge;
        },
        prevTime(state) {
            return state.prevTime;
        },
        message(state) {
            return state.message;
        },
        monitor(state) {
            return state.monitor;
        }
    }
}
