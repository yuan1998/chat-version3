<template>
    <div class="y-chat-page page-item price-page">
        <div class="ask-wrapper">
            <div class="ask-cover" style="padding-top: 4.1vw;">
                <img src="@/assets/2-1.jpg" alt="" class="mc-img">
            </div>
            <div class="ask-item"
                 v-for="(item , index) in getOptions"
                 :key="index">
                <div class="title">
                    {{ index + 1 }}、{{ item.title }}
                </div>
                <div class="radio-group">
                    <label class="radio-item"
                           v-for="(each , i) in item.options"
                           :key="i">
                        <input type="radio"
                               :name="index"
                               v-model="item.value"
                               :value="each">
                        <span class="radio-text">
                                        {{ each }}
                                    </span>
                    </label>
                </div>
            </div>
            <div class="ask-button"
                 :class="!showAskButton && 'disabled'">
                <button @click="openComputedPriceModel">
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
    import { mapActions } from 'vuex'
    import ComputePrice   from '../components/Computed-Price'
    import { cloneOf }    from "../utily/util";


    export default {
        components: {
            ComputePrice,
        },
        beforeRouteLeave(to, from, next) {
            if (this.showCommentForm) {
                this.showCommentForm = false;
                next(false);
            }
            else {
                next();
            }
        },
        data() {
            return {
                showCommentForm: false,
                renderQuestion : [],
                question       : cloneOf(CONFIG.QUESTION)
            }
        },
        methods   : {
            ...mapActions({
                $model  : 'Controller/$model',
                sendText: 'Bridge/sendText'
            }),
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
                this.$model({
                    content: '提交成功,我们会在3小时内联系您.请留意'
                })
            },
            openComputedPriceModel() {
                if (this.showAskButton) {
                    this.showCommentForm = true;
                }
                else {
                    this.$model({
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
            }
        },
        computed  : {
            showAskButton() {
                return this.selectOption && !this.showCommentForm;
            },
            getOptions: {
                cache: false,
                get  : function () {
                    let arr = [this.question.age];
                    this.question.sex && arr.push(this.question.sex);
                    this.question.current && arr.push(this.question.current);

                    return arr.concat(this.getQuestionTree(this.question.current.value))
                }
            },
            selectOption() {
                return this.getOptions.findIndex(function (item) {
                    return !item.value;
                }) === -1;
            }
        }
    }
</script>

