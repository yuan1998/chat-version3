<template>
    <div class="y-chat-page page-item chat-page">
        <div id="y-chat-main" ref="chat" :style="selectModule && 'overflow: hidden;'">
            <div class="main-content-wrapper"
                 ref="chat-wrapper"
                 :style=" wrapperHeight && 'minHeight:' + wrapperHeight + 'px'">
                <MessagePop :key="index"
                            :ref="item.type + '_message'"
                            :item="item"
                            :value="item.value"
                            :type="item.type"
                            :prev-type="messageType(index - 1)"
                            :animation-name="item.animation"
                            @scroll-to-me="handleScrollToMe"
                            v-for="(item , index) in messageList">
                </MessagePop>
            </div>
        </div>
        <template v-if="currentSelectItem && currentSelectItem.noTransition">
            <div class="select-btn-container" v-if="currentSelectItem && showSelect">
                <component :is="currentSelectItem.type"
                           :item="currentSelectItem"
                           @compute-price="handleComputePrice"
                           @send-item="handleSendItem"/>
            </div>
        </template>
        <transition v-else name="slide-up-y">
            <div class="select-btn-container" v-if="currentSelectItem && showSelect">
                <component :is="currentSelectItem.type"
                           :item="currentSelectItem"
                           @compute-price="handleComputePrice"
                           @send-item="handleSendItem"/>
            </div>
        </transition>
        <div class="unread-count"
             @click="scrollBottom"
             v-if="unreadCount > 0">
            {{ unreadCount }}
        </div>
        <transition name="fade">
            <div class="mask-container" v-if="showComputePrice"></div>
        </transition>
        <transition name="slide-up">
            <ComputePrice :show.sync="showComputePrice"
                          ref="price"
                          @submit="handleSubmit"
                          v-if="showComputePrice"></ComputePrice>
        </transition>
    </div>
</template>

<script>
    import { cloneOf, pushHistory, oneOf }          from '@/utily/util'
    import MessagePop                               from '@/components/Message-Pop'
    import SelectBtnGroup                           from '@/components/SelectBtnGroup'
    import ComputePrice                             from '@/components/Computed-Price'
    import SelectInput                              from '@/components/SelectInput'
    import SelectPicker                             from '@/components/SelectPicker'
    import { mapMutations, mapActions, mapGetters } from "vuex"
    import anime                                    from 'animejs'

    export default {
        components: {
            MessagePop,
            ComputePrice,
            'select-item-group': SelectBtnGroup,
            'select-input'     : SelectInput,
            'select-picker'    : SelectPicker,
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (vm.gBridge) {
                    if (vm.selectStart) {
                        vm.selectStart = false;
                    }

                }
                // 通过 `vm` 访问组件实例
            })
        },
        data() {
            return {
                selectStart      : CONFIG.CHAT.SELECT_START || false,
                type             : CONFIG.CHAT.SELECT_TYPE || 'default',
                showJump         : false,
                showComputePrice : false,
                selectModule     : false,
                selectValues     : [],
                currentSelectItem: null,
                showSelect       : false,
                wrapperHeight    : 0,
                unreadCount      : 0,
                selectItems      : cloneOf(CONFIG.SELECT_ITEMS),
                messages         : [],
                testData         : [
                    Array.from({ length: 100 }, (value, index) => `${1 + index}岁`),
                ],
                anchor           : [
                    {
                        index: 19
                    }
                ],
                bridge           : null,
                questionData     : [],
            }
        },

        mounted() {
            const el = this.$refs.chat;
            el.addEventListener('scroll', () => {
                const val = el.scrollHeight - (el.clientHeight + el.scrollTop);
                if (val < 20 && this.unreadCount !== 0) {
                    this.unreadCount = 0;
                }
            });

            this.$bus.$on('scroll-bottom', (val) => {
                this.scrollBottom(val);
            });

            window.addEventListener('resize', () => {
                this.scrollBottom();
            });

            this.initChatMessage();
        },
        computed: {
            ...mapGetters({
                gBridge : 'Bridge/bridge',
                gMessage: 'Bridge/message',
                input   : 'Form/input',
                query   : 'Form/query'
            }),
            messageList() {
                return this.messages.concat(this.gMessage);
            }
        },
        methods : {
            ...mapMutations({
                showFooter   : 'Controller/showFooter',
                changeInput  : "Form/input",
                addMonitor   : "Bridge/addMonitor",
                removeMonitor: "Bridge/removeMonitor"
            }),
            ...mapActions({
                aBridge      : 'Bridge/bridge',
                sendText     : 'Bridge/sendText',
                filterMessage: 'Bridge/filterMessage'
            }),
            handleScrollToMe(val) {
                console.log('val :', val);
                this.wrapperHeight = val + this.$refs.chat.clientHeight;
                this.scrollBottom();
            },
            addConfigMessage(name) {
                let data = CONFIG.MESSAGE;
                data[ name ] && this.filterMessage({
                    message: data[ name ]
                });
            },
            handlePriceClose() {
                this.showComputePrice = false;
                this.endSelect('用户在 报价界面 点击了返回', this.$refs.price.formInfo);
                this.addConfigMessage('CHAT_ITEM_END_MESSAGE');
            },
            handleComputePrice() {
                this.showComputePrice = true;
                pushHistory();
                window.addEventListener('popstate', this.browserBack.bind(this))
            },
            browserBack() {
                if (this.showComputePrice) {
                    this.handlePriceClose();
                }
                else {
                    window.history.go(-1);
                }
                window.removeEventListener('popstate', this.browserBack.bind(this));
            },
            handleSubmit(form) {
                this.showComputePrice = false;
                this.endSelect('', form);
                this.addConfigMessage('CHAT_SUBMIT_MESSAGE');
            },
            initChatMessage() {
                if (!this.gBridge) {
                    if (!this.selectStart || !oneOf([ 'default', 'items' ], this.type)) {
                        this.type = 'default';
                    }
                }
                else {
                    this.type = 'default';
                }

                this[ this.type + 'Module' ]();
            },
            defaultModule() {
                if (this.gMessage.length === 0) {
                    this.addConfigMessage('INIT_MESSAGE');
                }
            },
            itemsModule() {
                this.showFooter(false);
                this.nextSelectItems('hello');
            },
            hideSelect() {
                this.currentSelectItem = null;
                this.showSelect        = false;
            },
            messageDuration(arr) {
                let duration = 0;

                arr.forEach((item) => {
                    duration += item.duration || 0;
                });

                return duration || 800
            },
            specialItemValue(value) {
                switch (value) {
                    case 'CONFIG_KEYWORD':
                        return CONFIG.KEYWORD || '口腔问题';
                        break;
                }
                return value;
            },
            cloneItem(next) {
                let result = cloneOf(this.selectItems[ next ]);
                if (result.data && result.data.items) {
                    result.data.items.forEach((item) => {
                        item.value = this.specialItemValue(item.value);
                    });
                }
                return result;
            },
            nextSelectItems(next) {
                this.hideSelect();

                let result = null;
                if (next) {
                    this.scrollToLastRight();
                    result = this.cloneItem(next);
                }

                setTimeout(() => {
                    this.currentSelectItem = result;
                    this.switchSelectItem();
                }, this.currentSelectItem ? 500 : 0);
            },
            switchSelectItem() {
                const item = this.currentSelectItem;

                if (!item) {
                    this.addConfigMessage('CHAT_ITEM_END_MESSAGE');
                    return;
                }

                setTimeout(() => {
                    this.showSelect = true;
                }, this.messageDuration(item.message))
            },
            scrollToLastRight() {
                let message = this.$refs[ 'right_message' ];

                message = Array.isArray(message) && message[ message.length - 1 ];
                if (!message) {
                    return;
                }

                const el = $(message.$el);

                let offset = el.offset();

                const top          = offset.top - el.parent().offset().top;
                this.wrapperHeight = ($(this.$refs.chat).outerHeight()) + (top - el.outerHeight() * 1.6);

                this.$nextTick(() => {
                    this.scrollBottom(top);
                })
            },
            endSelect(prefix, ...arg) {
                let result = prefix ? `###${prefix} <br/>` : '### ';

                if (this.selectValues.length !== 0) {
                    let arr = this.selectValues;
                    arr     = arr.concat(arg || []);

                    this.sendText({
                        value  : result + arr.join('<br />'),
                        display: false
                    });
                }
                setTimeout(() => {
                    this.hideSelect();
                    this.wrapperHeight = 0;
                    this.showFooter(true);
                }, 1400)
            },
            handleSendItem(item, next, display = true) {
                const current = this.currentSelectItem;

                display && this.filterMessage({
                    message: item,
                    pass   : true,
                });

                this.selectValues.push(current.title + ' : ' + item.value);

                if (!next) {
                    this.endSelect();
                }
                setTimeout(() => {
                    this.nextSelectItems(next);
                }, 1100);
            },
            isScroll() {
                const el  = this.$refs.chat,
                      val = el.scrollHeight - (el.clientHeight + el.scrollTop);

                if (val < 30) {
                    this.$nextTick(() => {
                        this.scrollBottom();
                    })
                }
                else {
                    !this.selectModule && this.unreadCount++;
                }
            },
            scrollBottom(position) {
                const el = this.$refs.chat;
                anime({
                    targets  : el,
                    scrollTop: position || el.scrollHeight,
                    duration : 500,
                    easing   : 'easeInOutQuad'
                });
            },
            messageType(index) {
                return this.messages[ index ] && this.messages[ index ].type;
            },
            handleJump() {
                this.hideSelect();
                this.endSelect('该用户选择了跳过.');
            }
        },
        watch   : {
            currentSelectItem(val) {
                if (!val) {
                    return;
                }
                this.filterMessage({
                    message: val.message,
                })
            },
            messageList() {
                this.isScroll();
            }
        }
    }
</script>
