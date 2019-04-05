<template>
    <div class="y-chat-page page-item concat-page">
        <div class="concat-content">
            <div class="concat-cover">
                <img src="@/assets/4-1.jpg" alt="" class="mc-img">
            </div>
            <div class="concat-tip">
                <p>
                    由于当前咨询人数较多，请留下您的电话号码和姓名
                </p>
                <p>
                    我们客服会在三小时内给你回复...
                </p>
            </div>
            <form class="concat-form" @submit.prevent="handleCommentSubmit">
                <label class="comment-form-item " :class="error.name && 'error'">
                                <span class="label-text">
                                    姓名 :
                                </span>
                    <input type="text" autocomplete="off" name="name" v-model="form.name"
                           @blur="validatorName">
                    <span class="error-message">
                                    {{ error.name }}
                                </span>
                </label>
                <label class="comment-form-item" :class="error.phone && 'error'">
                                <span class="label-text">
                                    电话 :
                                </span>
                    <input type="text" autocomplete="off" name="phone" v-model="form.phone"
                           @blur="validatorPhone">
                    <span class="error-message">
                                    {{ error.phone }}
                                </span>
                </label>
                <label class="comment-form-item" :class="error.phone && 'error'">
                                <span class="label-text textarea">
                                    请描述您牙齿状况 :
                                </span>
                    <textarea name="comment" autocomplete="off" v-model="form.comment"></textarea>
                </label>
                <div class="concat-form-btn-group">
                    <button class="submit-btn">
                        提交
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                form : {
                    name   : '',
                    phone  : '',
                    comment: '',
                },
                error: {
                    name   : '',
                    phone  : '',
                    comment: '',
                },
            }
        },
        methods : {
            ...mapActions({
                sendText: 'Bridge/sendText',
                $modal  : 'Controller/$modal'
            }),
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

                this.sendText({
                    value  : this.getConcatText,
                    display: false
                });

                this.$modal({
                    content: '提交成功,我们会在3小时内联系您.请留意'
                })
            },
        },
        computed: {
            getConcatText() {
                return [
                    '### 消息来源于 `联系我们` 页面表单',
                    '姓名 : ',
                    this.form.name,
                    "<br/>",
                    '电话 : ',
                    this.form.phone,
                    "<br/>",
                    '留言 : ',
                    this.form.comment,
                    "<br/>",
                ].join('');
            }
        }
    }
</script>

