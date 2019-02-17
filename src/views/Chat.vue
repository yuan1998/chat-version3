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
                            v-for="(item , index) in messageList">
                </MessagePop>
            </div>
        </div>
        <transition name="slide-up-y">
            <div class="select-btn-container" v-if="currentSelectItem && showSelect">
                <component :is="currentSelectItem.type"
                           :item="currentSelectItem"
                           @compute-price="handleComputePrice"
                           @send-item="handleSendItem"></component>
                <div class="jump-btn"
                     v-show="showJump"
                     @click="handleJump">
                    跳过问卷,开始咨询
                </div>
            </div>
        </transition>
        <div class="unread-count"
             @click="scrollBottom"
             v-if="unreadCount > 0">
            {{ unreadCount }}
        </div>
        <AwesomePicker @close="pickerClose"
                       @confirm="pickerConfirm"
                       ref="picker"
                       textTitle="请输入年龄"
                       :maskHide="false"
                       :hideCancel="true"
                       :anchor="anchor"
                       :data="testData"></AwesomePicker>
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
    import AwesomePicker                            from '@/components/Picker'
    import { mapMutations, mapActions, mapGetters } from "vuex"
    import anime                                    from 'animejs'

    export default {
        components: {
            MessagePop,
            AwesomePicker,
            ComputePrice,
            'select-item-group': SelectBtnGroup,
            'select-input'     : SelectInput,
        },
        data() {
            return {
                selectStart      : CONFIG.SELECT_START || false,
                type             : CONFIG.SELECT_TYPE || 'default',
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
        beforeRouteLeave(to, from, next) {
            if (this.$refs.picker.display) {
                next(false);
            } else {
                next();
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

            this.$bus.$on('scroll-bottom', () => {
                this.scrollBottom();
            });

            window.addEventListener('resize', () => {
                this.scrollBottom();
            });

            this.initChatMessage();
        },
        computed  : {
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
        methods   : {
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
            handlePriceClose() {
                this.showComputePrice = false;
                this.endSelect('用户在 报价界面 点击了返回', this.$refs.price.formInfo);
                this.filterMessage({
                    message: {
                        value    : '正在为您转接人工服务,请稍等',
                        type     : 'left',
                        animation: 'left-default'
                    }
                });
            },
            handleComputePrice() {
                this.showComputePrice = true;
                pushHistory();
                window.addEventListener('popstate', this.browserBack.bind(this))
            },
            browserBack() {
                if (this.showComputePrice) {
                    this.handlePriceClose();
                } else {
                    window.history.go(-1);
                }
                window.removeEventListener('popstate', this.browerBack.bind(this));
            },
            handleSubmit(form) {
                this.showComputePrice = false;
                this.endSelect('', form);
                this.filterMessage({
                    message: {
                        value    : '好的,给你回电',
                        type     : 'left',
                        animation: 'left-default'
                    }
                });
            },
            pickerClose() {
                this.showFooter(true)
            },
            pickerConfirm(val) {
                this.removeMonitor('QUESTION');
                this.showFooter(true);

                val = val[ 0 ].value;
                this.questionData.push(val);

                this.sendText({
                    send : false,
                    value: val
                });

                this.sendText({
                    display: false,
                    value  : this.questionData.join('<br/>')
                });
            },
            initChatMessage() {
                if (!this.gBridge) {
                    if (!this.selectStart || !oneOf([ 'default', 'question', 'items' ], this.type)) {
                        this.type = 'default';
                    }
                }

                this[ this.type + 'Module' ]();
            },
            defaultModule() {
                if (this.gMessage.length === 0) {
                    this.filterMessage({
                        message: {
                            value    : '你好,您的牙齿有什么问题?您可以直接询问.',
                            type     : 'left',
                            animation: 'left-default'
                        }
                    })
                }
            },
            itemsModule() {
                this.showFooter(false);
                this.nextSelectItems('hello');
            },
            questionModule() {
                this.addMonitor({
                    key  : 'QUESTION',
                    value: (text) => {
                        this.questionData.push(text);
                        setTimeout(() => {
                            this.filterMessage({
                                message: {
                                    value    : '好的,多大年龄?',
                                    type     : 'left',
                                    animation: 'left-default'
                                }
                            });
                            setTimeout(() => {
                                this.$refs.picker.show();
                                this.showFooter(false);

                                this.$bus.$emit('input-blur');
                            }, CONFIG.DEFAULT_AGE_PICKER_TIME)
                        }, 200)
                    }
                });
                this.filterMessage({
                    message: [
                        {
                            value    : '您好,在的.',
                            type     : 'left',
                            animation: 'left-default'
                        },
                        {
                            value    : CONFIG.DEFAULT_MESSAGE,
                            type     : 'left',
                            animation: 'left-default',
                            duration : 500,
                        }
                    ]
                });
                this.changeInput(this.query);
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
                let result = cloneOf(this.selectItems[ next ]) ;
                result.data.items.forEach((item) => {
                    item.value = this.specialItemValue(item.value);
                });
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
                    this.filterMessage({
                        message: {
                            value    : '请稍等,正在为你连接专家.',
                            type     : 'left',
                            animation: 'left-default'
                        }
                    });
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
                let result = prefix ? `${prefix} <br/>` : '';

                if (this.selectValues.length !== 0) {
                    let arr = this.selectValues;
                    arr     = arr.concat(arg || []);

                    this.sendText({
                        value  : result + arr.join('<br />'),
                        display: false
                    });
                }

                this.hideSelect();

                setTimeout(() => {
                    this.wrapperHeight = 0;
                    this.showFooter(true);
                }, 1400)
            },
            handleSendItem(item, next) {
                const current = this.currentSelectItem;

                this.filterMessage({
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
        watch     : {
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
