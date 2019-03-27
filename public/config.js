const CONFIG = {
    BASE            : {
        // 默认页 :0-4
        ROOT     : 1,
        // 头部标题
        TITLE    : '西安画美',
        // 页面标题
        WEB_TITLE: '西安画美',
        // 电话
        TEL      : '029-88828888',
        ROUTER   : [
            {
                title: '医院简介',
                name : 'home',
                path : '/home'
            },
            {
                title: '螺旋跳跃',
                name : 'lottery',
                path : '/lottery'
            },
            {
                title: '在线预约',
                name : 'chat',
                path : '/chat'
            },
            {
                title: '联系我们',
                name : 'concat',
                path : '/concat'
            },
            // {
            //     title: '预约专家',
            //     name : 'reservation',
            //     path : '/reservation'
            // },
        ]
    },
    THEME           : {
        // 页面主题 : ['blue' , 'red']
        COLOR      : 'red',
        // 聊天框图标 : ['phone' , 'camera']
        FOOTER_ICON: 'camera',
    },
    CHAT            : {
        // 是否开启选择模式
        SELECT_START: false,
        // 模式类型 : ['items']
        SELECT_TYPE : 'items',
        FIRST_TEXT  : '我想咨询双眼皮优惠',
    },
    KST             : {
        // 快商通标识
        PAGE_TAG: '###信息流-西安眼鼻中心',
        // 快商通链接
        // kq  : https://vipk16-hztk11.kuaishang.cn/bs/im.htm?cas=116432___982318&fi=118952
        // zx  : https://vipk16-hztk11.kuaishang.cn/bs/im.htm?cas=116431___553487&fi=118951
        URL     : 'https://vipk16-hztk11.kuaishang.cn/bs/im.htm?cas=116431___553487&fi=118951',
        // 快商通 js 代码
        // kq  : <script type="text/javascript" src="https://vipk16-hztk11.kuaishang.cn/bs/ks.j?cI=982318&fI=118952&ism=1" charset="utf-8"></script>
        // zx  : <script type="text/javascript" src="https://vipk16-hztk11.kuaishang.cn/bs/ks.j?cI=553487&fI=118951&ism=1" charset="utf-8"></script>
        JS      : '<script type="text/javascript" src="https://vipk16-hztk11.kuaishang.cn/bs/ks.j?cI=553487&fI=118951&ism=1" charset="utf-8"></script>',
    },
    MESSAGE         : {
        // 初始对话
        INIT_MESSAGE         : [
            {
                type      : 'advertising',
                maxWidth  : true,
                notPadding: true,
                notBorder : true,
                value     : 'http://xl.xahmyy.com/zt/xxl-hm-syp/images/b_syp_mbp.jpg',
            },
            {
                type       : 'broadcast',
                title      : '近期优惠',
                scrollToMe : true,
                scrollDelay: 4000,
                data       : [
                    '精彩源于美丽，蝶变始于画美',
                    '画美整形，真实案例展示，蜕变人生',
                    '画美整形，真实案例展示，蜕变人生',
                ]
            },
            {
                type      : 'advertising',
                maxWidth  : true,
                notPadding: true,
                notBorder : true,
                value     : 'http://ww1.sinaimg.cn/large/0076fRdzly1g16skiyc72j30k00460tf.jpg',
                sendMessage: '领取优惠劵'
            },
            {
                type     : 'left',
                animation: 'left-default',
                value    : '您好,请问有什么问题?',
            },
        ],
        NO_SAY_MESSAGE       : [
            {
                type     : 'left',
                animation: 'left-default',
                value    : '本月活动多项种项目都有优惠哟~欢迎咨询',
                duration : 1000,
            },
        ],
        // 对话中提交报价回复
        CHAT_SUBMIT_MESSAGE  : [
            {
                value    : '好的,给你回电.',
                type     : 'left',
                animation: 'left-default'
            },
        ],
        // 选择结束后回复
        CHAT_ITEM_END_MESSAGE: null,
    },
    // 年龄组件
    SELECT_PICKER   : {
        // 是否可以返回
        CAN_BACK    : true,
        // 返回后发送内容
        BACK_MESSAGE: '保密',
        // 默认选择年龄 (n+1)
        ANCHOR      : 30,
    },
    HOME_PAGE       : {
        // 开启图片首页
        ENABLED       : true,
        // 图片域名
        BASE_URL      : 'http://kst.img.xamryy.cn/',
        // 图片目录
        PATH          : '/baqi/zx-ty-image/',
        // 图片前缀
        NAME          : 'bg_',
        // 图片后缀
        EXT           : '.jpg',
        // 图片数量
        COUNT         : 27,
        // 事件,目前支持  ['router:/chat']
        EVENTS        : {
            10: {
                click: [ 'router:/chat' ]
            },
            11: {
                click: [ 'router:/chat' ]
            },
            16: {
                click: [ 'router:/chat' ]
            },
            17: {
                click: [ 'router:/chat' ]
            },
            22: {
                click: [ 'router:/chat' ]
            },
        },
        // 当 ENABLED 为 false 时应用
        // TEMPLATE 为 HTML 内容
        // TEMPLATE_STYLE 为 css 内容
        TEMPLATE      : '<h1 class="test-something">HELLO WORLD</h1>',
        TEMPLATE_STYLE: '.test-something{font-size:30px;text-align:center;padding-top:50px;}',
    },
    PRICE_PAGE      : {
        ASK_COVER: 'http://kst.img.xamryy.cn/theme/2-1-red.jpg',
    },
    CHAT_PAGE       : {
        AVATAR          : 'http://xl.xahmyy.com/zt/xxl-hm-syp/images/avatar_mbp.png',
        PLACEHOLDER_TEXT: '请输入问题，10秒内获取答案！',
        TEXT_DURATION   : 45,
        TEXT_DELAY      : 2200,
    },
    RESERVATION_PAGE: {
        PROJECTS   : [
            [
                '我是一',
                '我是2',
                '我是3',
                '我是一4',
                '我是5',
                '我是6',
                '我是7',
            ]
        ],
        EXPERT_DATA: {
            'lyf': {
                name    : '李永峰',
                position: '院长',
                head    : '首席专家',
                avatar  : 'http://ww1.sinaimg.cn/large/0076fRdzly1g184qlbog9j304f03hwed.jpg',
                cover   : 'http://ww1.sinaimg.cn/large/0076fRdzly1g182jmgxrlj30a00hsmxd.jpg',
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
                avatar  : 'http://ww1.sinaimg.cn/large/0076fRdzly1g184r6j1vkj304f03hmx1.jpg',
                cover   : 'http://ww1.sinaimg.cn/large/0076fRdzly1g182jmgxrlj30a00hsmxd.jpg',
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
                avatar  : 'http://ww1.sinaimg.cn/large/0076fRdzly1g184rdwcflj304f03hmx1.jpg',
                cover   : 'http://ww1.sinaimg.cn/large/0076fRdzly1g182jmgxrlj30a00hsmxd.jpg',
                point   : '对儿童、成年人牙列拥挤，牙列稀疏，牙槽骨前突，反颌等口腔畸形的矫治，精通MBT直丝弓牙矫治技术，儿童牙齿畸形的早期干预，自锁托槽及隐形矫治。',
                options : {
                    limit: {
                        min: 5,
                        max: 10,
                    }
                }
            },
            'sr' : {
                name    : '尚荣',
                position: '',
                head    : '资深医师',
                avatar  : 'http://ww1.sinaimg.cn/large/0076fRdzly1g184rrhgu0j304f03hjr9.jpg',
                cover   : 'http://ww1.sinaimg.cn/large/0076fRdzly1g182jmgxrlj30a00hsmxd.jpg',
                point   : '牙体牙髓病、牙周病的治疗，现代根管治疗，牙列缺损的综合性修复，高端牙齿美容及外科拔牙术。',
                options : {
                    limit: {
                        min: 5,
                        max: 10,
                    }
                }
            },
            'qq' : {
                name    : '乔迁',
                position: '',
                head    : '儿牙医师',
                avatar  : 'http://ww1.sinaimg.cn/large/0076fRdzly1g184sbm47yj304f03h0sm.jpg',
                cover   : 'http://ww1.sinaimg.cn/large/0076fRdzly1g182jmgxrlj30a00hsmxd.jpg',
                point   : '儿童口腔疾病的治疗与预防，各种牙体牙髓疾病的治疗和后期修复。',
                options : {
                    limit: {
                        min: 5,
                        max: 10,
                    }
                }
            },
        },
    },
    LOTTERY_PAGE    : {
        // 只能放8个 .
        // probability 是中奖几率 , 所有相加要 等于 1
        ITEM_DATA: [
            {
                price      : 680,
                name       : '双眼皮',
                probability: 1,
            },
            {
                price      : 4800,
                name       : '隆鼻',
                probability: 0,
            },
            {
                price      : 198,
                name       : '除皱针',
                probability: 0,
            },
            {
                price      : 458,
                name       : '瘦脸针',
                probability: 0,
            },
            {
                price      : 38,
                name       : '脱毛',
                probability: 0,
            },
            {
                price      : 680,
                name       : '祛斑',
                probability: 0,
            },
            {
                price      : 99,
                name       : '祛痘',
                probability: 0,
            },
            {
                price      : 780,
                name       : '玻尿酸',
                probability: 0,
            },
        ],
    },
    SELECT_ITEMS    : {
        hello: {
            type   : 'select-item-group',
            title  : '关键字',
            theme  : 'blue',
            next   : 'age',
            message: [
                {
                    type    : 'advertising',
                    maxWidth: true,
                    style   : 'padding:0;',
                    value   : 'http://ww1.sinaimg.cn/large/0076fRdzly1g1726zxmyyj30h80b2t9n.jpg',
                },
                {
                    type    : 'advertising',
                    maxWidth: true,
                    value   : 'http://ww1.sinaimg.cn/large/0076fRdzly1g16skiyc72j30k00460tf.jpg',
                },
                {
                    type     : 'left',
                    animation: 'left-default',
                    value    : '您好,请问有什么问题?',
                },
            ],
            data   : {
                items: [
                    {
                        value    : 'CONFIG_KEYWORD',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                    {
                        value    : '领取优惠',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },

                ]
            },
        },
        age  : {
            type        : 'select-picker',
            title       : '年龄',
            theme       : 'blue',
            noTransition: true,
            delay       : 500,
            message     : [
                {
                    type : 'advertising',
                    value: 'http://ww1.sinaimg.cn/large/0076fRdzly1g0u6puidmjj30hs09jq3z.jpg',
                },
            ],
        },

    },
    QUESTION        : {
        age    : {
            title  : '您多大年龄了呢?',
            options: [
                '18以下', '18-35岁', '35-45岁', '45岁以上'
            ],
            value  : '',
        },
        current: {
            value  : '',
            title  : "您的牙齿目前情况?",
            options: [
                '缺牙', '牙齿矫正', '牙齿修复', '牙常规'
            ]
        },
        '缺牙'   : [
            {
                value  : '',
                title  : '您的缺牙情况?',
                options: [
                    '全口缺失', '半口缺失', '多颗缺失', '单颗缺失'
                ]
            },
            {
                value  : '',
                title  : '您想通过哪种方式来补牙?',
                options: [
                    '种植牙', '全瓷牙', '烤瓷牙', '假牙'
                ]
            }
        ],
        '牙齿矫正' : [
            {
                value  : '',
                title  : '您属于下列哪种?',
                options: [
                    '地包天', '龅牙', '牙齿不齐', '其他'
                ]
            },
            {
                value  : '',
                title  : '选择您想矫正的方式?',
                options: [
                    '金属矫正', '隐形矫正', '陶瓷矫正', '其他'
                ]
            }
        ],
        '牙齿修复' : [
            {
                value  : '',
                title  : '目前您的牙齿情况是？',
                options: [
                    '断牙', '牙裂', '烂牙', '其他'
                ]
            }
        ],
        '牙常规'  : [
            {
                value  : '',
                title  : '请选择您想了解的牙齿问题?',
                options: [
                    '拔牙', '洁牙', '美白', '其他'
                ]
            }
        ]
    },
};
