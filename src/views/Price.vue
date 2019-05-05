<template>
    <div class="y-chat-page page-item price-page">
        <div class="ask-wrapper">
            <div class="ask-cover" style="padding-top: 4.1vw;">
                <img referrerpolicy="no-referrer" :src="config.ASK_COVER" alt="" class="mc-img">
            </div>
            <div class="ask-item"
                 v-for="(item , index) in getOptions"
                 :key="index">
                <div class="title">
                   {{ index + 1 }}. {{ item.title }}
                </div>
                <Radio :items="item.options" v-model="item.value"></Radio>
            </div>
            <div class="ask-button"
                 :class="!showAskButton && 'disabled'">
                <button @click="openComputedPriceModal">
                    计算项目费用
                </button>
            </div>
        </div>
        <transition name="fade">
            <div class="mask-container" v-if="showCommentForm"></div>
        </transition>
        <transition name="slide-up">
            <ComputePrice :show.sync="showCommentForm"
                          @submit="handleSubmit"
                          v-if="showCommentForm"></ComputePrice>
        </transition>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import ComputePrice   from '../components/Computed-Price';
    import { cloneOf }    from "../utily/util";
    import Radio          from '../components/radio'


    export default {
        components: {
            ComputePrice,
            Radio
        },
        data() {
            return {
                showCommentForm: false,
                renderQuestion : [],
                question       : cloneOf(CONFIG.PRICE_PAGE.QUESTION),
                config         : CONFIG.PRICE_PAGE,
                data           : {},
            }
        },
        mounted() {
            this.question = this.parseQuestion(this.question);
        },
        methods   : {
            ...mapActions({
                $modal  : 'Controller/$modal',
                sendText: 'Bridge/sendText'
            }),
            parseQuestion(data) {
                return data.map((item) => {
                    item.options = item.options.map((option) => {
                        if (typeof option === 'string') {
                            option = {
                                value: option,
                            }
                        }

                        if (option.children && option.children.length) {
                            option.children = this.parseQuestion(option.children);
                        }

                        return option;
                    });
                    return item;
                })
            },
            handleRadioChange(item) {
            },
            handleSubmit(form) {
                let arr = [];
                this.getOptions.forEach(function (item) {
                    arr.push(`${item.title} : ${item.value} <br />`);
                });

                arr.push(form || '');

                this.sendText({
                    value  : arr.join(''),
                    display: false
                });

                this.showCommentForm = false;
                this.$modal({
                    content: '提交成功,我们会在3小时内联系您.请留意'
                })
            },
            openComputedPriceModal() {
                if (this.showAskButton && !this.showCommentForm) {
                    this.showCommentForm = true;
                }
                else {
                    this.$modal({
                        content: '请选择',
                    });
                }
            },
            getQuestionTree(value, arr) {
                arr        = arr || [];
                const item = this.question[ value ];

                if (item) {
                    arr     = arr.concat(item);
                    let key = '';
                    item.forEach(function (each) {
                        key += each.value;
                    });
                    return this.getQuestionTree(key, arr);
                }

                return arr;
            },
            parseSelectQuestion(data, arr = []) {
                data.forEach((item) => {
                    arr.push(item);
                    if (item.value && item.options) {
                        let cache = item.options.find(e => e.value === item.value);
                        (cache && cache.children) && this.parseSelectQuestion(cache.children, arr);
                    }
                });
                return arr;
            }
        },
        computed  : {
            showAskButton() {
                return this.selectOption;
            },
            getOptions() {
                return this.parseSelectQuestion(this.question);
            },
            selectOption() {
                return this.getOptions.findIndex(function (item) {
                    return !item.value;
                }) === -1;
            }
        }
    }
</script>

