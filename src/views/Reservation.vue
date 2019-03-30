<template>
    <div class="y-chat-page page-item reservation-page">
        <div class="panel-header">
            <div class="day-nav">
                <div class="day-item"
                     @click="handleClickDay(item)"
                     :class="current === item.date && 'active'"
                     v-for="item in days"
                     :key="item.date">
                    <div class="date">
                        {{ item.date }}
                    </div>
                    <div class="day">
                        {{ item.day }}
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-body"
             v-if="Object.keys(expert).length > 0">
            <div class="panel-content">
                <transition-group :css="false"
                                  v-if="currentExpert"
                                  name="staggered-fade"
                                  class="row-wrapper"
                                  tag="div"
                                  @before-enter="BeforeEnter"
                                  @enter="Enter"
                                  @after-enter="afterEnter"
                                  @leave="Leave">
                    <div class="item-wrap expert-item"
                         v-for="(item , index) in cacheExpert"
                         :data-offset="index"
                         :key="item.key + current">
                        <div class="content">
                            <div class="expert-avatar">
                                <img :src="item.avatar" alt="" class="mc-img">
                            </div>
                            <p class="title">
                                <span class="name">{{ item.name }}</span>
                                <span class="position" v-if="item.position">({{ item.position }})</span>
                                <span class="head">{{ item.head }}</span>
                            </p>
                            <p class="description">
                                <span class="big black">擅长：</span>{{ item.point }}
                            </p>
                        </div>
                        <div class="reservation">
                            <div class="box">
                                <div class="item" :class="item.last <= 0 && 'disabled'">
                                    <p class="text">
                                        <span class="red">当天限号{{ item.limit }}位.</span> 余号 : <span class="red">{{ item.last }}</span>
                                    </p>
                                    <div class="button"
                                         :class="(hasReservation(item.key) && item.last > 0) && 'disabled'"
                                         @click="handleReservationClick(item,$event)">
                                        {{ hasReservation(item.key) ? '已' : '' }}预约
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>

                <div v-if="currentExpert.length === 0">
                    <p>当天没有出诊的医生</p>
                </div>
            </div>
        </div>
        <reservationForm v-if="showForm"
                         :offset="buttonOffset"
                         :item="formItem"
                         :date="current"
                         @reservated="reservated"
                         @close-me="handleCloseForm"/>
    </div>
</template>

<script>
    import moment                                            from 'moment';
    import anime                                             from 'animejs';
    import Storage                                           from "../utily/Storage";
    import { cloneOf, randomNum, shuffleArray, pushHistory } from "../utily/util";
    import reservationForm                                   from '../components/reservation-form'

    const expertData = CONFIG.RESERVATION_PAGE.EXPERT_DATA;
    const EXPERTNAME = 'STORAGE_EXPERT';

    export default {
        components: {
            reservationForm
        },
        data() {
            return {
                days         : [],
                expert       : {},
                storageExpert: {},
                current      : '',
                offsetDelay  : 200,
                enterWait    : 0,
                currentExpert: null,
                showForm     : false,
                formItem     : null,
                formData     : {},
                buttonOffset : null
            }
        },
        computed  : {
            cacheExpert() {
                return (this.currentExpert || []).map((item) => {
                    item.isReservation = this.hasReservation(item.key);
                    return item;
                })
            }
        },
        mounted() {
            this.storageExpert = Storage.getItem(EXPERTNAME) || this.storageExpert;
            this.initDays();
        },
        methods   : {
            handleCloseForm() {
                this.showForm = false;
            },
            initDays() {
                moment.updateLocale('en', {
                    weekdays: [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ]
                });
                let day = moment();

                for (let i = 0 ; i < 7 ; i++) {
                    let date = day.format("MM-DD");
                    this.days.push({
                        date,
                        day: i === 0 ? '今日' : day.format('dddd')
                    });
                    if (i === 0) {
                        this.current = date;
                    }
                    day = day.add(1, 'days');
                }
                this.initExpert();
            },
            initExpert() {
                this.days.forEach((item) => {
                    let date            = item.date;
                    this.expert[ date ] = this.storageExpert[ date ] || this.generateExpert(date);
                });
                this.setStorageExpert();
            },
            setStorageExpert() {
                Storage.setItem(EXPERTNAME, this.expert);
            },
            generateExpert(date) {
                let arr  = [];
                let data = cloneOf(expertData);
                for (let key in data) {
                    let item           = data[ key ];
                    let options        = item.options;
                    item.key           = key;
                    item.limit         = randomNum(options.limit.max, options.limit.min);
                    item.last          = randomNum(4, 1);
                    item.isReservation = this.hasReservation(key, date);
                    arr.push(item);
                }

                return shuffleArray(arr);
            },
            handleReservationClick(item, evt) {

                if (this.hasReservation(item.key) || item.last <= 0) {
                    return;
                }

                this.formItem     = item;
                this.showForm     = true;
                this.buttonOffset = {
                    left: (evt.clientX || 0) + 'px',
                    top : (evt.clientY || 0) + 'px',
                };
                pushHistory();
            },
            reservated(key, date = this.current) {
                Storage.setItem(date + key, true);
            },
            hasReservation(key, date = this.current) {
                return !!Storage.getItem(date + key);
            },
            handleClickDay(item) {
                this.current = item.date;
            },
            Enter(el, done) {
                let index = el.dataset.offset;
                setTimeout(() => {
                    anime({
                        targets   : el,
                        opacity   : 1,
                        translateX: 0,
                        duration  : 800,
                        easing    : 'easeInOutQuad',
                        complete() {
                            done();
                        }
                    });
                }, index * this.offsetDelay + this.enterWait)
            },
            BeforeEnter(el) {
                $(el).css({
                    opacity  : 0,
                    transform: 'translateX(15vw)'
                })
            },
            afterEnter() {
                console.log('123 :', 123);
            },
            Leave(el, done) {
                anime({
                    targets   : el,
                    opacity   : 0,
                    translateX: '-=10vw',
                    duration  : 500,
                    easing    : 'easeInOutQuad',
                    complete() {
                        done();
                    }
                });
                if (this.enterWait === 0) {
                    this.enterWait = 300;
                }
            }
        },
        watch     : {
            current(val) {
                this.currentExpert = this.expert[ val ];
            }
        }
    }
</script>

<style scoped>

</style>
