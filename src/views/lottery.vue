<template>
    <div class="y-chat-page page-item lottery-page" :style="{
        'overflow': showModal ? 'hidden' : 'scroll'
    }">
        <div class="lottery-container">
            <div class="background-wrapper">
                <img src="@/assets/bacground-1.jpg" alt="" class="mc-img">
            </div>
            <div class="background-2">
                <img src="@/assets/bacground-2.jpg" alt="" class="mc-img">
                <div class="content">
                    <div class="item-wrap" v-for="(item , n) in lotteryItems" :key="n">
                        <div class="item " :class="lotteryResult === item.i && 'active'" v-if="!item.empty">
                            <div class="price">
                                {{ item.price }}<span class="unit">/RMB</span>
                            </div>
                            <div class="name">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="start-button" @click="handleLoopStart">
                    <img src="@/assets/start-bg.png" alt="" class="mc-img">
                    <div class="start-text">
                        <img src="@/assets/start.png" alt="" class="mc-img">
                    </div>
                </div>
            </div>
        </div>
        <Modal :visible="showModal" :show="animeModal" :item="modalItem" @close-me="closeModal"></Modal>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import anime                        from 'animejs';
    import { randomInProbability }      from "../utily/randomInProbability";
    import Modal                        from '../components/lottery/modal';
    import { pushHistory }              from "../utily/util";

    export default {
        components: {
            Modal
        },
        data() {
            return {
                showModal   : false,
                animeModal  : false,
                modalItem   : {},
                loopEnd     : false,
                obj         : CONFIG.LOTTERY_PAGE.ITEM_DATA,
                number      : 0,
                randomMethod: null,
                looping     : false,
            }
        },
        beforeRouteLeave(to, from, next) {
            if (this.showModal) {

                next(false);
            }
            else {
                next();
            }
        },
        computed  : {
            lotteryItems() {
                let obj    = this.obj;
                obj        = obj.map((item, i) => {
                    item.i = i;
                    return item;
                });
                let result = [
                    obj[ 0 ],
                    obj[ 1 ],
                    obj[ 2 ],
                    obj[ 7 ],
                    { empty: true },
                    obj[ 3 ],
                    obj[ 6 ],
                    obj[ 5 ],
                    obj[ 4 ],
                ];
                return result;
            },
            lotteryResult() {
                if (!this.number) {
                    return;
                }
                return Math.floor(this.number % 8);
            },
        },
        methods   : {
            ...mapActions({
                $modal: "Controller/$modal",
            }),
            handlePopStatus() {
                console.log('123 :', 123);
                if (this.showModal) {
                    this.$modal({
                        text       : '退出将视为放弃机会.是否要退出?',
                        showCancel : true,
                        cancel     : () => {
                            this.closeModal();
                        },
                        cancelText : '确认放弃',
                        confirmText: '继续领取',
                    });
                    pushHistory();
                }
            },
            handleLoopStart() {
                if (this.loopEnd) {
                    this.$modal({
                        content: '你已经抽过了.'
                    })
                }
                if (this.looping) {
                    return;
                }
                this.looping  = true;
                this.number   = 0;
                let index     = this.getRandomResult();
                let loopCount = Math.floor(Math.random() * 6) + 4;
                let len       = this.obj.length;
                let sum       = (loopCount * len) + index;
                let duration  = loopCount * 800;

                anime({
                    targets : this,
                    number  : sum,
                    easing  : 'cubicBezier(.45,0,.3,.99)',
                    duration,
                    complete: () => {
                        let item = this.obj[ index ];
                        this.openModal(item);
                        pushHistory();
                        window.addEventListener('popstate', this.handlePopStatus.bind(this));
                    }
                })
            },
            openModal(item) {
                this.modalItem = item;
                this.loopEnd   = true;
                this.showModal = true;
                this.$nextTick(() => {
                    this.animeModal = true;
                });

                this.$router.push('');
            },
            closeModal() {
                this.animeModal = false;
                window.removeEventListener('popstate', this.handlePopStatus.bind(this));

                setTimeout(() => {
                    this.showModal = false;
                }, 500);
            },
            initRandom() {
                this.randomMethod = randomInProbability(this.obj);
            },
            getRandomResult() {
                if (!this.randomMethod) {
                    this.initRandom();
                }
                let length = this.obj.length;
                return Math.floor(this.randomMethod() * length);
            }
        }
    }
</script>
