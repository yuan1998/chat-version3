<template>
    <div class="y-chat-page page-item home-page">
        <template v-if="data">
            <div v-if="data.ENABLED" class="home-page-container">
                <div class="bg-item"
                     :key="i"
                     @click="handleClick(i)"
                     v-for=" i in data.COUNT">
                    <img :src="data.BASE_URL + data.PATH + data.NAME + i + data.EXT" alt="" class="mc-img">
                </div>
            </div>
            <template v-else>
                <div class="home-page-container"  v-html="data.TEMPLATE"></div>
                <vStyle>
                    {{ data.TEMPLATE_STYLE }}
                </vStyle>
            </template>
        </template>
        <div v-else>
            NOTHING
        </div>

    </div>
</template>

<script>
    import {parseStringMethod} from '../utily/util'
    import vStyle from '../components/v-style'

    export default {
        name   : 'home',
        components: {
            vStyle,
        },
        data() {
            return {
                data : CONFIG.HOME_PAGE
            }
        },
        methods: {
            eventItem(num) {
                let event = CONFIG.HOME_PAGE.EVENTS[ num ];
                return event ? event.click : null;
            },
            handleClick(num) {
                let event = this.eventItem(num);

                if (!event) {
                    return;
                }

                this.parseEvent(event);
            },

            parseEvent(event) {
                event = [].concat(event);

                event.forEach((item) => {
                    if (!item || typeof item !== 'string'  ) {
                        return;
                    }
                    // router:/chat|a|b|c
                    // => { method: router , params : [a,b,c] }
                    let r = parseStringMethod(item);
                    let methodName = `${r.method}_Method`;

                    if (typeof this[methodName] === 'function') {
                        this[methodName](...r.params);
                    }
                })
            },

            router_Method(path) {
                if (!path) {
                    return;
                }
                this.$router.push(path);
            },

        }
    }
</script>
