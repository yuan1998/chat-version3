<template>
    <div id="y-chat-footer">
        <div class="footer-wrapper" style="display: none;">
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
                <div class=" form-input active">
                    <div class="phone-icon-inner"
                         v-if="icon === 'camera'"
                         @click="clickInputFile">
                        <img src="@/assets/camera-red.png" alt="" class="mc-img">
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
                           id="form-input">
                    <button type="submit"
                            class="send-text">
                        发送
                    </button>
                </div>
            </form>
            <div style="height: 5vw;display: block;" v-if="inputFocus"></div>
        </div>
        <form class="footer-big-input" :style="{
            paddingBottom: (inputFocus ? '10vw' : '2vw')
        }" @submit.prevent="handleSubmit">
            <div class="footer-input">
                <textarea type="text"
                          :placeholder="textPlaceholder"
                          @blur="inputFocus = false"
                          @focus="handleTextFocus"
                          v-model="superInput"
                          ref="input"></textarea>
            </div>
            <div class="footer-button">
                <button type="submit" class="send-text" v-if="buttonText" v-html="buttonText"></button>
                <button v-else
                        type="submit"
                        class="send-text">
                    <i class="my-icon-fasong"></i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import anime                                    from 'animejs'
    import { mapGetters, mapMutations, mapActions } from 'vuex'

    const placeholderCache = CONFIG.CHAT_PAGE.PLACEHOLDER_TEXT;
    export default {
        data() {
            return {
                inputFocus     : false,
                icon           : CONFIG.THEME.FOOTER_ICON || 'camera',
                tel            : CONFIG.BASE.TEL,
                firstText      : CONFIG.CHAT.FIRST_TEXT,
                buttonText     : CONFIG.CHAT.SEND_BUTTON_TEXT,
                firstEnter     : true,
                sayed          : false,
                textPlaceholder: '',
                len            : 0,
            }
        },
        mounted() {
            this.$bus.$on('input-blur', () => {
                this.$refs.input.blur();
            });
            this.textTransition();

            if (CONFIG.CHAT_PAGE.KEYWORD_TO_INPUT && !CONFIG.CHAT.SELECT_START) {
                this.changeInput(CONFIG.KEYWORD);
            }
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
                return this.isChat ? (this.firstEnter ? this.firstText : '请输入您的问题') : '在线咨询';
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
            handleTextFocus() {
                if (!this.isChat) {
                    this.handleInputClick();
                }
                this.$nextTick(() => {
                    this.handleFocus();
                })
            },
            textTransition() {
                anime({
                    targets : this,
                    len     : [ 0, placeholderCache.length ],
                    round   : 1,
                    update  : ({ animatables }) => {
                        let val              = animatables[ 0 ].target.len;
                        this.textPlaceholder = placeholderCache.substring(0, val);
                    },
                    complete: () => {
                        setTimeout(() => {
                            this.textTransition();
                        }, CONFIG.CHAT_PAGE.TEXT_DELAY)
                    },
                    duration: placeholderCache.length * CONFIG.CHAT_PAGE.TEXT_DURATION,
                    easing  : 'linear',
                })
            },
            handleInputClick() {
                this.$router.push('/chat');
                this.$refs.input.focus();
                if (!this.sayed) {
                    this.sayed = true;
                    this.filterMessage({
                        message: CONFIG.MESSAGE.NO_SAY_MESSAGE
                    })
                }
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

                if (value === '' && this.firstEnter) {
                    value = this.placeholder;
                }

                if (value !== '') {
                    this.firstEnter && (this.firstEnter = false);
                    this.sendText({
                        value,
                    });
                }

                this.superInput = '';
            }
        }
    }
</script>
