<template>
    <div class="reservation-form">
        <div ref="circleEl" class="animation-c circle" :style="animateStyle">
            <div class=" center-form-container">
                <div class="back-icon hidden" ref="backIcon">
                    <div class="icon-wrap " @click="outAnimate">
                        <svg t="1552893791945" class="icon" style="" viewBox="0 0 1025 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="2524" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="50.048828125" height="50">
                            <defs></defs>
                            <path d="M533.353412 682.285176c0-0.030118 0.060235-0.060235 0.060235-0.090353C533.172706 682.194824 533.142588 682.224941 533.353412 682.285176zM40.176941 555.008l314.398118 314.398118c27.045647 27.045647 70.927059 27.045647 97.942588 0 27.045647-26.985412 27.045647-70.866824 0-97.912471l-196.186353-196.216471 665.630118 0c38.249412 0 69.240471-31.021176 69.240471-69.240471 0-38.279529-31.021176-69.270588-69.240471-69.270588L256.361412 436.766118l196.186353-196.186353c27.045647-27.015529 27.045647-70.927059 0-97.942588C439.024941 129.114353 421.285647 122.337882 403.546353 122.337882c-17.709176 0-35.448471 6.776471-48.941176 20.299294L40.176941 457.065412C13.101176 484.111059 13.101176 527.932235 40.176941 555.008z"
                                  p-id="2525" fill="#4d555d"></path>
                        </svg>
                    </div>
                </div>
                <div class="expert-cover">
                    <div class="expert-i hidden" ref="cover">
                        <img :src="item.cover" alt="" class="mc-img ">
                    </div>
                </div>
                <div class="form-container ">
                    <div ref="formContainer" class="content hidden">
                        <div ref="formContent" class="">
                            <div class="title ">
                                <div class="name ">
                                    <span ref="name">{{ item.name }}</span>
                                </div>
                                <div class="position">
                                    <span ref="position">{{ item.head }}</span>
                                </div>
                            </div>
                            <p class="info">
                            <span class="info-font hidden" ref="infoFont" v-for="(n , i) in item.point" :key="i">
                                {{ n }}
                            </span>
                            </p>
                            <form class="form-el ">
                                <div class="field-wrap ">
                                    <div class="field-input hidden">
                                        <div class="field-icon">
                                            <i class="my-icon-name"></i>
                                        </div>
                                        <input class="input-el" v-model="form.name" type="text" placeholder="请输入姓名">
                                    </div>
                                    <div class="error-text">

                                    </div>
                                </div>
                                <div class="field-wrap  ">
                                    <div class="field-input hidden">
                                        <div class="field-icon">
                                            <i class="my-icon-tel"></i>
                                        </div>
                                        <input class="input-el" v-model="form.phone" type="text"
                                               placeholder="请输入电话号码 (已加密)">
                                    </div>
                                    <div class="error-text"></div>
                                </div>
                                <div class="field-wrap ">
                                    <div class="field-input hidden">
                                        <div class="field-icon">
                                            <i class="my-icon-shoushu"></i>
                                        </div>
                                        <div @click="openPicker('projectPicker')" class="input-el"
                                             :class="!form.project && 'pl'">
                                            {{ form.project || '请选择项目' }}
                                        </div>
                                    </div>
                                    <div class="error-text"></div>
                                </div>
                            </form>
                            <div class="button-group ">
                                <div @click="handleSubmit" ref="button" class="button hidden">
                                    预约
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AwesomePicker @confirm="pickerConfirm"
                       ref="projectPicker"
                       textTitle="请选择项目"
                       :maskHide="false"
                       :hideCancel="true"
                       :data="projectPickerData"/>
    </div>
</template>

<script>
    import { mapActions }                 from 'vuex';
    import anime                          from 'animejs'
    import AwesomePicker                  from '@/components/Picker'
    import Validator                      from '../utily/validator';
    import { elementOffset, pushHistory } from '../utily/util';

    const vd = {
        rules   : {
            name   : {
                required: true
            },
            phone  : {
                required: true,
                tel     : true
            },
            project: {
                required: true,
            }
        },
        messages: {
            name   : {
                required: '姓名不能为空'
            },
            phone  : {
                required: '手机号码不能为空',
                tel     : '请输入正确的手机号码'
            },
            project: {
                required: '项目不能为空',
            }
        },
    };

    export default {
        props     : {
            offset : {
                type: [ Object, null ],
            },
            item   : {
                type: [ Object, null ],
                default(val) {
                    return val || {};
                }
            },
            current: String
        },
        components: {
            AwesomePicker,
        },
        computed  : {
            animateStyle() {
                let { offset, width } = this;
                return {
                    'clip-path'        : `circle(${width} at ${offset.left} ${offset.top})`,
                    '-webkit-clip-path': `circle(${width} at ${offset.left} ${offset.top})`,
                }
            },
        },
        mounted() {
            this.circleBig();

            this.$nextTick(() => {
                window.addEventListener('popstate', this.handlePopState.bind(this));

            });
        },
        data() {
            return {
                show             : false,
                showMask         : false,
                currentPicker    : '',
                selfOffset       : null,
                width            : 0,
                validator        : null,
                projectPickerData: CONFIG.RESERVATION_PAGE.PROJECTS,
                form             : {
                    name : '',
                    phone: '',
                },
                cacheIndex       : {
                    projectPicker: 0,
                }
            }
        },
        methods   : {
            ...mapActions({
                $modal  : "Controller/$modal",
                sendText: 'Bridge/sendText'
            }),
            getValidator() {
                if (!this.validator) {
                    this.validator = new Validator(vd.rules, vd.messages);
                }

                return this.validator;
            },
            handlePopState() {
                if (this.currentPicker) {
                    this.handleStateBack();
                }
                else {
                    this.outAnimate();
                    window.removeEventListener('popstate', this.handlePopState.bind(this));
                }
            },
            handleStateBack() {
                let picker = this.$refs[ this.currentPicker ];
                if (!picker) {
                    return;
                }

                picker.hide();
            },
            openPicker(name) {
                let picker = this.$refs[ name ];
                if (!picker) {
                    return
                }
                this.currentPicker = name;
                pushHistory();
                picker.show();
            },
            pickerConfirm(val) {
                let value = val[ 0 ].value;

                let name = this.currentPicker.replace('Picker', '');
                this.$set(this.form, name, value);
                this.currentPicker = '';
                history.go(-1);
            },
            circleBig() {
                anime({
                    targets : this,
                    width   : '150%',
                    easing  : 'linear',
                    duration: 500,
                    complete: () => {
                        this.startAnimate();
                    }
                })
            },
            startAnimate() {
                let { backIcon, formContainer, name, position, infoFont, button, cover } = this.$refs;
                let fields                                                               = $('.reservation-form .field-input');

                let tl     = anime.timeline({
                    easing  : 'linear',
                    duration: 500,
                });
                let formTl = tl.add({
                    targets   : backIcon,
                    opacity   : {
                        value   : 1,
                        easing  : 'linear',
                        duration: 1000
                    },
                    translateX: [ '-150%', 0 ],
                    translateY: [ '-150%', 0 ],
                    duration  : 1000,
                    easing    : 'easeOutCirc'
                }).add({
                    targets   : formContainer,
                    translateY: [ '100%', 0 ],
                    opacity   : {
                        value   : 1,
                        easing  : 'linear',
                        duration: 800
                    },
                    duration  : 900,
                    easing    : 'easeOutCirc'
                }, 200).add({
                    targets : cover,
                    opacity : 1,
                    // translateY: [ '16vw', 0 ],
                    duration: 600,
                    easing  : 'easeInOutCubic',
                }, '-=600');

                formTl.add({
                    targets   : name,
                    marginLeft: [ '-31vw', 0 ],
                    duration  : 500,
                    easing    : 'easeInOutCubic',
                }, '-=700').add({
                    targets   : position,
                    translateY: [ '-6vw', 0 ],
                    duration  : 500,
                    easing    : 'easeInOutCubic',
                }, '-=150');

                formTl.add({
                    targets   : infoFont,
                    opacity   : 1,
                    translateY: [ '-1vw', 0 ],
                    translateX: [ '-1vw', 0 ],
                    delay     : anime.stagger(7),
                    duration  : 500,
                    easing    : 'easeInOutCubic',
                }, '-=450').add({
                    targets : fields.toArray(),
                    opacity : 1,
                    width   : [ 0, '100%' ],
                    delay   : anime.stagger(200),
                    duration: 300,
                    easing  : 'easeInOutCubic',
                }, '-=500').add({
                    targets   : button,
                    opacity   : 1,
                    translateY: [ '10vw', 0 ],
                    duration  : 500,
                    easing    : 'easeInOutCubic',
                }, '-=200');

            },
            outAnimate() {
                let { formContent, formContainer, backIcon, cover } = this.$refs;

                let tl = anime.timeline({
                    easing  : 'linear',
                    duration: 500,
                });

                tl.add({
                    targets : formContent,
                    opacity : 0,
                    duration: 300,
                }).add({
                    targets   : formContainer,
                    opacity   : {
                        value   : 0,
                        easing  : 'linear',
                        duration: 600
                    },
                    translateY: '100%',
                    duration  : 500,
                    easing    : 'easeInCirc'
                }, 0).add({
                    targets   : backIcon,
                    opacity   : {
                        value   : 0,
                        easing  : 'linear',
                        duration: 500
                    },
                    translateX: '-150%',
                    translateY: '-150%',
                    duration  : 500,
                    easing    : 'easeInCirc'
                }, 0).add({
                    targets : cover,
                    opacity : 0,
                    duration: 500,
                    easing  : 'easeInOutCubic',
                }, 0).add({
                    targets : this,
                    width   : 0,
                    easing  : 'linear',
                    duration: 400,
                    complete: () => {
                        this.$emit('close-me');
                    }
                }, '-=200')
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
                    '### 该信息来自 `预约页面`',
                    `用户预约了专家 ${this.item.name}`,
                    `预约时间是 ${this.date}`,
                    `预约的项目是 : ${this.form.project}`,
                    '请及时联系客户',
                    `姓名 : ${this.form.name}`,
                    `电话 : ${this.form.phone}`,
                ];

                this.sendText({
                    value  : arr.join('<br />'),
                    display: false
                });

                this.$modal({
                    content: '预约成功,我们会在3小时内联系您.以确认具体时间.'
                });
                history.go(-1);
                this.$emit('reservated', this.item.key);
                this.outAnimate();
            }
        }
    }
</script>
