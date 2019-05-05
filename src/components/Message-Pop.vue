<template>
    <component v-if="typeName"
               :is="typeName"
               ref="message"
               :item="item"
               :value="value"
               :avatar="avatar"
               :type="type"
               :animation-name="animationName"
               :prev-type="prevType"
               :class="{
            [`message-${type}`] : true,
            'max-width' : item.maxWidth,
            'not-padding' : item.notPadding,
         }"/>
</template>

<script>
    import { mapActions } from 'vuex'
    import Broadcast      from '../components/message/broadcast';
    import Time           from '../components/message/time';
    import Pop            from '../components/message/pop';
    import Advertising    from '../components/message/advertising';
    import Advertisings   from '../components/message/advertisings';

    export default {
        components: {
            broadcast_cp   : Broadcast,
            time_cp        : Time,
            pop_cp         : Pop,
            advertising_cp : Advertising,
            advertisings_cp: Advertisings,
        },
        props     : {
            item         : Object,
            type         : String,
            value        : [ String, Object ],
            avatar       : {
                type   : Boolean,
                default: false
            },
            animationName: String,
            prevType     : [ String, null, undefined ]
        },
        mounted() {
            this.item.scrollToMe && this.scrollToMe();
        },
        data() {
            return {
                typeList: {
                    'left'        : 'pop_cp',
                    'right'       : 'pop_cp',
                    'time'        : 'time_cp',
                    'advertising' : 'advertising_cp',
                    'advertisings': 'advertisings_cp',
                    'broadcast'   : 'broadcast_cp',
                }
            }
        },
        computed  : {
            typeName() {
                return this.typeList[ this.type ];
            }
        },
        methods   : {
            ...mapActions({
                sendText: 'Bridge/sendText',
            }),
            scrollToMe() {
                let delay = this.item.scrollDelay || 5000;

                setTimeout(() => {
                    let item = this.$refs.message.$el;
                    this.$emit('scroll-to-me', item.offsetTop);
                }, delay)
            },
        }
    }
</script>
