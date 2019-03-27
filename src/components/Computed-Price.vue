<template>
    <div class="loop-price-wrapper model-fixed-class">
        <div class="loop-price">
            <div class="loop-header-cover" style="padding-bottom:5vw;">
                <img src="@/assets/header-2.png" alt="" class="mc-img">
            </div>
            <div class="loop-wrapper">
                <p class="loop-box">
                    <span class="price-item" v-for="(item,index) in randomPrice">
                        <img :key="index" :src="images[item]" alt="" class="mw-img-i">
                    </span>
                </p>
            </div>
            <form class="comment-form" @submit.prevent="handleCommentSubmit">
                <label class="comment-form-item " :class="error.name && 'error'">
                            <span class="label-text">
                                姓名（已加密）
                            </span>
                    <input type="text" autocomplete="off" name="name" v-model="form.name"
                           @blur="validatorName">
                    <span class="error-message">
                            {{ error.name }}
                        </span>
                </label>
                <label class="comment-form-item" :class="error.phone && 'error'">
                        <span class="label-text">
                            电话（已加密）
                        </span>
                    <input type="text" autocomplete="off" name="phone" v-model="form.phone"
                           @blur="validatorPhone">
                    <span class="error-message">
                            {{ error.phone }}
                        </span>
                </label>
                <div class="form-tips">
                    <p>
                        <span class="q">*</span>以上顾客信息仅用于本次报价及相关咨询，我院不会泄露
                        给任何第三方或者用于其他用途。
                    </p>
                </div>
                <div class="btn-group">
                    <button type="submit" class="get-price-btn ">
                        获取报价到手机
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import image1         from '../assets/1.png'
    import image2         from '../assets/2.png'
    import image3         from '../assets/3.png'
    import image4         from '../assets/4.png'
    import image5         from '../assets/5.png'
    import image6         from '../assets/6.png'
    import image7         from '../assets/7.png'
    import image8         from '../assets/8.png'
    import image9         from '../assets/9.png'
    import image0         from '../assets/0.png'
    import image_         from '../assets/sm.png'

    export default {
        props  : {
            getOptions: Array,
            show      : Boolean
        },
        data() {
            return {
                images     : {
                    '1': image1,
                    '2': image2,
                    '3': image3,
                    '4': image4,
                    '5': image5,
                    '6': image6,
                    '7': image7,
                    '8': image8,
                    '9': image9,
                    '0': image0,
                    '*': image_,
                },
                form       : {
                    name : '',
                    phone: '',
                },
                error      : {
                    phone: '',
                    name : '',
                },
                cachePrice : '',
                price      : '**51',
                randomPrice: '10000',
            }
        },
        mounted() {
            this.computePrice();
        },
        methods: {
            ...mapActions({
                $modal  : "Controller/$modal",
                sendText: 'Bridge/sendText'
            }),
            randomNumber(min, max) {
                return Math.floor((Math.random() * (max - min))) + min;
            },
            replaceAt(str, index, replacement) {
                return str.substr(0, index) + replacement + str.substr(index + replacement.length);
            },
            computePrice() {
                if (!this.countInterval) {
                    this.countInterval = setInterval(() => {
                        let text = this.randomNumber(100000, 999999) + '';

                        if (this.cachePrice) {
                            text = this.replaceAt(text, 0, this.cachePrice);

                            if (this.cachePrice === this.price) {
                                clearInterval(this.countInterval);
                            }
                        }
                        this.randomPrice = text;
                    }, 30);
                }
            },
            validatorPhone() {
                const val = this.form.phone;
                let msg   = '';

                if (!val) {
                    msg = '电话不能为空.';
                }
                else if (!(/^1[34578]\d{9}$/.test(val))) {
                    msg = '电话格式有误.';
                }
                this.error.phone = msg;
            },
            validatorName() {
                const val = this.form.name;
                let msg   = '';
                if (!val) {
                    msg = '姓名不能为空.';
                }

                this.error.name = msg;
            },
            handleCommentSubmit() {
                this.validatorName();
                this.validatorPhone();

                if (this.error.name || this.error.phone) {
                    return;
                }


                this.$emit('submit', this.formInfo);
            },
        },
        computed: {
            formInfo () {
                return `姓名 : ${this.form.name} <br/> 电话 : ${this.form.phone} <br/> `;
            }
        }
    }
</script>
