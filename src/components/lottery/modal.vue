<template>
    <div class="lottery-result-container " v-if="visible">
        <transition name="fade">
            <div v-if="show" class="mask-container"></div>
        </transition>
        <transition name="scale-in">
            <div class="lottery-result " v-if="show">
                <div class="container">
                    <div class="bg">
                        <img src="@/assets/lottery-result.png" alt="" class="mc-img">
                    </div>
                    <div class="content">
                        <div class="title">
                            <div class="t1">
                                恭喜您获得
                            </div>
                            <div class="t2">
                                价值{{ item.price }}元的{{ item.name }}项目优惠券
                            </div>
                        </div>
                        <form class="form-content"
                              @submit.prevent="handleSubmit">
                            <div class="tip">
                                温馨提示：填写表单后可领取优惠券，关闭则视为放弃
                            </div>
                            <div class="form">
                                <div class="form-field">
                                    <div class="form-input">
                                        <div class="field-label">
                                            <i class="my-icon-name"></i>
                                        </div>
                                        <input type="text" name="name" v-model="form.name" placeholder="请输入您的姓名">
                                    </div>
                                </div>
                                <div class="form-field">
                                    <div class="form-input">
                                        <div class="field-label">
                                            <i class="my-icon-tel"></i>
                                        </div>
                                        <input type="text" placeholder="请输入您的电话号码 (已加密)" v-model="form.phone"
                                               name="phone">
                                    </div>
                                </div>
                            </div>
                            <div class="tip">
                                注：我们会妥善保管您提交的信息，未经本人允许，绝不外露
                            </div>
                            <div class="form-button-group">
                                <button type="submit" class="form-button">
                                    立即领取
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import anime          from 'animejs';
    import Validator      from '../../utily/validator';

    const rules = {
        name : {
            required: true,
        },
        phone: {
            required: true,
            tel     : true,
        }
    };

    const message = {
        name : {
            required: '请输入姓名',
        },
        phone: {
            required: '请输入手机号码',
            tel     : '请输入正确的手机号码',
        },
    };

    export default {
        data() {
            return {
                form     : {
                    name : '',
                    phone: '',
                },
                validator: null
            }
        },
        props  : {
            visible: Boolean,
            show   : Boolean,
            item   : Object
        },
        mounted() {
            // this.startAnimate();
        },
        methods: {
            ...mapActions({
                $modal  : "Controller/$modal",
                sendText: 'Bridge/sendText'
            }),
            startAnimate() {
                let { mask, modal } = this.$refs;

                let tl = anime.timeline({
                    easing  : 'linear',
                    duration: 500,
                });

                tl.add({
                    targets: modal,
                    scale  : [ .3, 1 ],
                    opacity: [ 0, 1 ],
                    easing : 'easeOutBack'
                }).add({
                    targets: mask,
                    opacity: [ 0, 1 ],
                }, 0)
            },
            outAnimate() {
                let { mask, modal } = this.$refs;

                let tl = anime.timeline({
                    easing  : 'linear',
                    duration: 500,
                });

                tl.add({
                    targets: modal,
                    scale  : [ 1, 5 ],
                    opacity: [ 1, 0 ],
                    easing : 'easeOutQuint'
                }).add({
                    targets: mask,
                    opacity: [ 1, 0 ],
                }, 0)
            },
            getValidator() {
                if (!this.validator) {
                    this.validator = new Validator(rules, message);
                }

                return this.validator;
            },
            handleSubmit() {

                let validator = this.getValidator();
                if (!validator.checkForm(this.form)) {
                    const error = validator.errorList[ 0 ];
                    this.$modal({
                        content: error.msg
                    });
                    return;
                }

                let arr = [
                    '### 该信息来自页面抽奖',
                    `用户抽中了 ${this.item.price} 元的 ${this.item.name}`,
                    '请及时联系客户',
                    `姓名 : ${this.form.name}`,
                    `电话 : ${this.form.phone}`,
                ];

                this.sendText({
                    value  : arr.join('<br />'),
                    display: false
                });

                this.$modal({
                    content: '提交成功,我们会在3小时内联系您.请留意'
                })

                this.$emit('close-me');
            }
        }
    }
</script>
