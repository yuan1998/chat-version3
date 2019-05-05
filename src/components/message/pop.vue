<template>
    <div class="message-item-wrapper" v-show="show">
        <div v-if="showAvatar" class="message-avatar" ref="avatar">
            <div class="avatar">
                <img referrerpolicy="no-referrer" :src="avatarUrl" alt="" class="mc-img">
            </div>
        </div>
        <div class="message-text">
            <p v-html="value" ref="text"></p>
        </div>
    </div>
</template>

<script>
    import anime             from 'animejs'
    import { elementOffset } from "../../utily/util";

    export default {
        props   : [ 'item', 'value', 'type', 'prevType', 'avatar', 'animationName' ],
        data() {
            return {
                show     : true,
                avatarUrl: CONFIG.CHAT_PAGE.AVATAR,
            }
        },
        computed: {
            showAvatar() {
                return this.avatar || (!this.avatar && this.type === 'left');
            },
            hiddenAvatar() {
                return this.type === 'left' && this.prevType === 'left';
            }
        },
        mounted() {
            this.checkAnime();
        },
        methods : {
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

<style scoped>

</style>
