<template>
    <div class="message-item-wrapper "
         v-show="show"
         :class="{
            [`message-${type}`] : true,
            'max-width' : item.maxWidth,
            'not-padding' : item.notPadding,
         }" ref="message">
        <template v-if="type === 'time'">
            <div>
                {{ value.format('HH:mm:ss') }}
            </div>
        </template>
        <template v-else-if="type === 'broadcast'">
            <Broadcast :item="item"></Broadcast>
        </template>
        <template v-else-if="type === 'advertising'">
            <div class="advertising" :class="{
                'not-border' : item.notBorder,
            }" @click="handleMessageClick">
                <img :src="value" alt="" class="mc-img">
            </div>
        </template>
        <template v-else>
            <div v-if="showAvatar" class="message-avatar" ref="avatar">
                <div class="avatar" v-if="!hiddenAvatar">
                    <img :src="config.AVATAR" alt="" class="mc-img">
                </div>
            </div>
            <div class="message-text">
                <p v-html="value" ref="text"></p>
            </div>
        </template>
    </div>
</template>

<script>
    import anime             from 'animejs'
    import { mapActions }    from 'vuex'
    import Broadcast         from '../components/broadcast';
    import { elementOffset } from "../utily/util";

    export default {
        components: {
            Broadcast
        },
        props     : {
            item         : Object,
            type         : String,
            value        : [ String, Object ],
            avatar       : {
                type   : Boolean,
                default: false
            },
            animationName: {
                default: '',
                type   : String
            },
            prevType     : [ String, null, undefined ]
        },
        mounted() {
            this.checkAnime();

            if (this.item.scrollToMe) {
                this.scrollToMe();
            }
        },
        data() {
            return {
                show  : true,
                config: CONFIG.CHAT_PAGE,
            }
        },
        computed  : {
            showAvatar() {
                return this.avatar || (!this.avatar && this.type === 'left');
            },
            hiddenAvatar() {
                return this.type === 'left' && this.prevType === 'left';
            }
        },
        methods   : {
            ...mapActions({
                sendText: 'Bridge/sendText',
            }),
            handleMessageClick() {
                if (this.item.sendMessage && !this.item.$sended) {
                    this.$set(this.item , '$sended' , true);
                    this.sendText({
                        value: this.item.sendMessage,
                    });
                }
            },
            scrollToMe() {
                let delay = this.item.scrollDelay || 5000;

                setTimeout(() => {
                    let item = this.$refs.message;
                    this.$emit('scroll-to-me', item.offsetTop);
                }, delay)
            },
            checkAnime() {
                switch (this.animationName) {
                    case 'left-default':
                        this.leftDefault();
                        break;
                    case 'right-default':
                        this.rightDefault();
                        break;
                    case 'right-select':
                        this.show = false;
                        this.rightSelect();
                        break;
                }
            },
            leftDefault() {
                const tl = anime.timeline({
                    easing  : 'easeOutExpo',
                    duration: 400,
                });

                tl.add({
                    targets   : this.$refs.avatar,
                    opacity   : [ 0, 1 ],
                    translateX: [ '-100%', 0 ],
                    easing    : 'easeInOutQuad'
                }).add({
                    targets: this.$refs.text,
                    opacity: [ 0, 1 ],
                    scale  : [ 0.5, 1 ],
                })
            },
            rightSelect() {
                const item       = this.item;
                const itemEl     = $(item.el);
                const itemOffset = elementOffset(item.el);

                const elOffset = elementOffset(this.$refs.text);

                itemEl.addClass('message');

                anime({
                    targets   : item.el,
                    width     : [ itemOffset.width, elOffset.width ],
                    height    : [ itemOffset.height, elOffset.height ],
                    lineHeight: [ itemOffset.height + 'px', elOffset.height + 'px' ],
                    left      : [ itemOffset.left, elOffset.left ],
                    top       : [ itemOffset.top, elOffset.top ],

                    easing  : 'easeInOutQuad',
                    duration: 1000,
                    complete: () => {
                        this.show = true;
                        item.show = false;
                    }
                });
            },
            rightDefault() {
                const el = this.$refs.text;
                $(el).css({
                    transformOrigin: 'right bottom'
                });

                anime({
                    targets : el,
                    opacity : [ 0, 1 ],
                    scale   : [ 0.5, 1 ],
                    easing  : 'easeOutExpo',
                    duration: 400,
                });
            }

        }
    }
</script>
