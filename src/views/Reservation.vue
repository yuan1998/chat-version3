<template>
    <div class="y-chat-page page-item reservation-page">
        <div class="panel-header">
            <div class=" panel-title">
                <p>
                    选择预约时间
                </p>
            </div>
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
                <div v-if="currentExpert.length > 0"
                     class="item-wrap expert-item"
                     v-for="(item , index) in currentExpert"
                     :key="index">
                    <div class="content">
                        <div class="avatar"></div>
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
                                <p class="text" >
                                    <span class="red">当天限号{{ item.limit }}位.</span> 余号 : <span class="red">{{ item.last }}</span>
                                </p>
                                <div class="button"
                                     :class="(item.isReservation && item.last > 0) && 'disabled'"
                                     @click="handleReservationClick(item)">
                                    {{ item.isReservation ? '已' : '' }}预约
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>当天没有出诊的医生</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment                 from 'moment';
    import Storage                from "../utily/Storage";
    import { cloneOf, randomNum } from "../utily/util";

    const expertData = {
        'lyf': {
            name    : '李永峰',
            position: '院长',
            head    : '首席专家',
            avatar  : '',
            point   : '对口腔颌面外科、种植牙手术及术后的美容牙修复、口腔内科、口腔美容修复及正畸、牙周及黏膜病等疑难病症的治疗具备较高水平。',
            options : {
                limit: {
                    min: 5,
                    max: 10,
                }
            }
        },
        'gjf': {
            name    : '郭军锋',
            position: '',
            head    : '资深医师',
            avatar  : '',
            point   : '对口腔粘膜病、牙体牙髓疾病、无痛微创中低位阻生智齿拔除、口腔颌面部炎症外伤及牙周疾病的鉴别诊断与治疗具有较高水平。',
            options : {
                limit: {
                    min: 5,
                    max: 10,
                }
            }
        },
        'wcy': {
            name    : '王朝彦',
            position: '',
            head    : '主治医师',
            avatar  : '',
            point   : '对儿童、成年人牙列拥挤，牙列稀疏，牙槽骨前突，反颌等口腔畸形的矫治，精通MBT直丝弓牙矫治技术，儿童牙齿畸形的早期干预，自锁托槽及隐形矫治。',
            options : {
                limit: {
                    min: 5,
                    max: 10,
                }
            }
        },
        'sr': {
            name    : '尚荣',
            position: '',
            head    : '资深医师',
            avatar  : '',
            point   : '牙体牙髓病、牙周病的治疗，现代根管治疗，牙列缺损的综合性修复，高端牙齿美容及外科拔牙术。',
            options : {
                limit: {
                    min: 5,
                    max: 10,
                }
            }
        },
        'qq': {
            name    : '乔迁',
            position: '',
            head    : '儿牙医师',
            avatar  : '',
            point   : '儿童口腔疾病的治疗与预防，各种牙体牙髓疾病的治疗和后期修复。',
            options : {
                limit: {
                    min: 5,
                    max: 10,
                }
            }
        },
    };

    const EXPERTNAME = 'STORAGE_EXPERT';

    export default {
        data() {
            return {
                days         : [],
                expert       : {},
                storageExpert: {},
                current      : ''
            }
        },
        computed: {
            currentExpert() {
                return this.expert[ this.current ] || [];
            }
        },
        mounted() {
            Storage.clear();
            this.storageExpert = Storage.getItem(EXPERTNAME) || this.storageExpert;
            this.initDays();
        },
        methods : {
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
                return arr;
            },
            handleReservationClick(item) {
                console.log('item :', this.currentExpert);
                if (this.hasReservation(item.key)) {
                    return;
                }
                item.last -= 1;
                item.isReservation = true;
                this.reservated(item.key);
                this.setStorageExpert();
            },
            reservated( key ,date = this.current) {
                Storage.setItem(date + key, true);
            },
            hasReservation(key, date = this.current) {
                return !!Storage.getItem(date + key);
            },
            handleClickDay(item) {
                this.current = item.date;
            }
        }
    }
</script>

<style scoped>

</style>
