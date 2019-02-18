<template>
    <div id="y-chat-footer">
        <div class="footer-wrapper">
            <form id="chat-form"
                  class="form-wrap"
                  @submit.prevent="handleSubmit">
                <div class="form-mask"
                     @click="handleInputClick"
                     v-if="!isChat"></div>
                <input ref="fileInput"
                       style="display: none;"
                       type="file"
                       name="image"
                       accept="image/gif,image/jpeg,image/jpg,image/png"
                       @change="handleUploadImage">
                <div class="form-phone" v-if="superInput === ''">
                    <div class="phone-icon"
                         v-if="icon === 'camera'"
                         @click="clickInputFile">
                        <img src="@/assets/camera-big.png" alt="" class="mc-img">
                    </div>
                    <a class="phone-icon"
                       :href="'tel:'+ tel"
                       v-else-if="icon === 'phone'">
                        <img src="@/assets/phone-big.jpg" alt="" class="mc-img">
                    </a>
                </div>
                <div class=" form-input"
                     :class="superInput !== '' && 'active'">
                    <div class="phone-icon-inner"
                         v-if="icon === 'camera'"
                         @click="clickInputFile">
                        <img src="@/assets/camera.png" alt="" class="mc-img">
                    </div>
                    <a class="phone-icon-inner"
                       :href="'tel:'+ tel"
                       v-else-if="icon === 'phone'">
                        <img src="@/assets/phone.jpg" alt="" class="mc-img">
                    </a>
                    <input v-model="superInput"
                           autocomplete="off"
                           type="text"
                           name="message"
                           class="message-input"
                           ref="input"
                           :placeholder="placeholder"
                           @focus="handleFocus"
                           @blur="inputFocus = false"
                           id="form-input">
                    <button type="submit"
                            class="send-text">
                        发送
                    </button>
                </div>
            </form>
            <div style="height: 5vw;display: block;" v-if="inputFocus"></div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'

    export default {
        data() {
            return {
                inputFocus: false,
                icon      : CONFIG.THEME.FOOTER_ICON || 'camera',
                tel: CONFIG.BASE.TEL
            }
        },
        mounted() {
            $('body').on('touchend', (e) => {
                console.log('e.target.className :', e.target.className);
                if (e.target.className !== 'message-input') {
                    this.$refs.input.blur();
                }
            });

            this.$bus.$on('input-blur', () => {
                this.$refs.input.blur();
            })
        },
        computed: {
            ...mapGetters({
                input  : 'Form/input',
                monitor: 'Bridge/monitor'
            }),
            superInput: {
                get() {
                    return this.input;
                },
                set(value) {
                    this.changeInput(value)
                }
            },
            isChat() {
                return this.$route.name === 'chat';
            },
            placeholder() {
                return this.isChat ? '请输入' : '在线咨询';
            }
        },
        methods : {
            ...mapMutations({
                changeInput: "Form/input"
            }),
            ...mapActions({
                sendImage    : 'Bridge/sendImage',
                sendText     : 'Bridge/sendText',
                filterMessage: 'Bridge/filterMessage'
            }),
            handleInputClick() {
                this.$router.push('/chat');
                this.$refs.input.focus();
            },
            clickInputFile() {
                this.$refs.fileInput.click()
            },
            handleUploadImage(evt) {
                this.sendImage({
                    files: evt.target.files
                })
            },
            handleFocus() {
                this.inputFocus = true;
                this.$bus.$emit('scroll-bottom');
            },
            handleSubmit() {
                let value = $.trim(this.superInput);

                let condition = !this.monitor.hasOwnProperty('QUESTION');
                if (value !== '') {
                    this.sendText({
                        value,
                        send: condition
                    });

                    if (condition) {
                        this.$bus.$emit('scroll-bottom');
                    }
                }

                this.superInput = '';
            }
        }
    }
</script>

<style scoped lang="less">
    .form-mask {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 10;
    }

    .form-wrap {
        padding: 2vw (14/6.4vw);
        display: flex;
        align-items: center;
        justify-items: center;
        z-index: 0;

        .form-input {
            flex: 1;
            height: 12.65625vw;
            line-height: 12.65625vw;
            font-size: 0;
            overflow: hidden;
            .message-input {
                height: 100%;
                background-color: #ffffff;
                border-radius: 81/6.4vw;
                padding: 0 (81/6.4)/3vw;
                border: solid 0.156vw #dfe0df;
                color: #666666;
                width: 100%;
                font-size: 3.906vw;
            }
        }
        .active {
            &.form-input input {
                padding-left: 91/6.4vw;
                padding-right: 14vw;
            }
            .send-text {
                right: 4vw;
            }
            .phone-icon-inner {
                display: inline-block;
            }
        }

        .send-text {
            position: absolute;
            top: 0;
            right: -24vw;
            height: 81/6.4vw;
            line-height: 81/6.4vw;
            color: #409eff;
            font-size: 3.906vw;
            transition: right 230ms;
            background: none;
        }

        .form-phone {
            flex-basis: 91/6.4vw;
            padding-right: (14/6.4vw);
        }

        .phone-icon {
            width: 77/6.4vw;
            height: 77/6.4vw;
            background-color: #4597f4;
            border-radius: 77/6.4vw;
            overflow: hidden;
        }

        .phone-icon-inner {
            position: absolute;
            left: 16/6.4vw;
            top: (81-57)/2/6.4vw;
            width: 63/6.4vw;
            height: 57/6.4vw;
            z-index: 1;
            border-radius: 10vw;
            overflow: hidden;
            display: none;

        }
    }
</style>
