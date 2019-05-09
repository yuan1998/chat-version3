const CONFIG = {
    BASE            : {
        // 接入类型, 在 TYPE_OPTIONS 中定义
        TYPE            : 'cd_swt',
        // 接入对话的标识
        PAGE_TAG        : '###88888_00000',
        // 默认页 :0-3
        ROOT            : 1,
        // 页面标题
        WEB_TITLE       : '西安画美',
        // 头部LOGO
        HEADER_LOGO     : {
            // IMG 优先级大于 TEXT.
            IMG: 'http://47.92.132.225:7026/zt/zx-comprehensive-center/img/logo.9952d203.png',
            TEXT: '',
        },
        // 电话,页面内一些电话功能的电话号码
        TEL             : '029-88828888',
        // 是否显示页面右上角电话图标
        SHOW_TEL        : true,
        // 显示底部聊天框的页面.
        SHOW_FOOTER_LIST: [ 'chat' ],
        // 导航栏显示和页面位置
        //            首页      案例     聊天      报价          预约           抽奖      联系我们(表单)
        // 所有页面: ['home' , 'case' , 'chat' , 'price' , 'reservation' , 'lottery',   'concat'];
        ROUTER          : [
            //例:
            /**
                {
                    // 导航栏显示的文字
                   title: '医院简介',
                   // 页面的name.
                   name : 'home',
                   // 和name一致.
                   path : '/home'
                },
             */
            {
                title: '医院简介',
                name : 'home',
                path : '/home'
            },
            {
                title: '臻美案例',
                name : 'case',
                path : '/case'
            },
            {
                title: '在线预约',
                name : 'chat',
                path : '/chat'
            },
            {
                title: '项目报价',
                name : 'price',
                path : '/price'
            },
        ]
    },
    THEME           : {
        // 页面主题 : ['blue' , 'red']
        COLOR      : 'red',
    },
    TYPE_OPTIONS    : {
        kq    : {
            type  : 'kst',
            domain: 'https://vipk16-hztk11.kuaishang.cn/',
            id    : 982318,
            fi    : 118952,
            cas   : 116432,
        },
        kq_xxl: {
            type  : 'kst',
            domain: 'https://vipk16-hztk11.kuaishang.cn/',
            id    : 982318,
            fi    : 127324,
            cas   : 116432,
        },
        zx    : {
            type  : 'kst',
            domain: 'https://vipk16-hztk11.kuaishang.cn/',
            id    : 553487,
            fi    : 118951,
            cas   : 116431,
        },
        cd_swt: {
            type: 'swt',
            js  : 'http://mqy.zoosnet.net/JS/LsJS.aspx?siteid=MQY16279901&lng=cn'
        },
        cq_swt: {
            type: 'swt',
            js  : 'http://mqy.zoosnet.net/JS/LsJS.aspx?siteid=NAC28268335&lng=cn'
        },
    },
    // 消息配置
    MESSAGE         : {
        // 初始对话
        INIT_MESSAGE         : [
            {
                type      : 'advertising',
                maxWidth  : true,
                notPadding: true,
                //border : true,
                value     : 'http://m.xaylmr.vip/zt/hm-zh/images/b_zh_mbp.png',
            },
            {
                type      : 'broadcast',
                title     : '近期优惠',
                scrollToMe: true,
                data      : [
                    '画美，用心服务每一位求美者',
                    '精彩源于美丽，蝶变始于画美',
                    '画美整形，真实案例展示，蜕变人生'
                ],
            },
            {
                type: 'advertisings',
                data: [
                    {
                        value      : 'http://m.xaylmr.vip/zt/hm-zh/images/hd1.jpg',
                        sendMessage: '双眼皮优惠',
                    },
                    {
                        value      : 'http://m.xaylmr.vip/zt/hm-zh/images/hd2.jpg',
                        sendMessage: '瘦脸针优惠',
                    },
                    {
                        value      : 'http://m.xaylmr.vip/zt/hm-zh/images/hd3.jpg',
                        sendMessage: '祛斑优惠',
                    },
                ]
            },
            {
                type     : 'left',
                animation: 'left-default',
                value    : '您好，在的!',
            },
            {
                type     : 'left',
                animation: 'left-default',
                value    : '亲,您多大年龄？请描述一下您的具体情况，我给您做科学的分析和建议',
                duration : 888,
            },
        ],
        AUTO_SAY_MESSAGE     : [
            {
                type     : 'left',
                animation: 'left-default',
                value    : '还有在关注对话吗?',
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
        QUESTION : [
            {
                title  : '您多大年龄了呢?',
                options: [
                    '18以下',
                    '18-35岁',
                    '35-45岁',
                    '45岁以上',
                ],
                value  : '',
            },
            {
                title  : '您的性别是?',
                options: [
                    '男',
                    '女',
                ],
                value  : '',
            },
            {
                value  : '',
                title  : "您想咨询哪方面的问题呢?",
                options: [
                    {
                        value   : '眼部',
                        children: [
                            {
                                value  : '',
                                title  : '您想咨询眼部的什么问题呢?',
                                options: [
                                    {
                                        value   : '双眼皮',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您希望用哪种方式呢?',
                                                options: [
                                                    '埋线', '切开', '三点', '眼综合'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        value   : '眼袋',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您希望用哪种方式祛眼袋呢?',
                                                options: [
                                                    '内切', '外切'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        value   : '开眼角',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您想咨询哪种眼角方式呢?',
                                                options: [
                                                    '内眼角', '外眼角'
                                                ]
                                            }
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        value   : '鼻部',
                        children: [
                            {
                                value  : '',
                                title  : '您想咨询有关鼻部的哪些问题呢?',
                                options: [
                                    {
                                        value   : '隆鼻',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您想咨询哪种隆鼻方式呢?',
                                                options: [
                                                    '膨体', '硅胶', '自体脂肪', '玻尿酸'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        value   : '鼻修复',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您鼻部存在什么问题需要修复呢?',
                                                options: [
                                                    '假体突出', '假体移位', '假体取出', '其他'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        value   : '鼻矫正',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您目前鼻部有什么问题?',
                                                options: [
                                                    '鹰钩鼻', '驼峰鼻', '宽鼻', '其他'
                                                ]
                                            }
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        value   : '皮肤',
                        children: [
                            {
                                value  : '',
                                title  : '您想咨询皮肤的哪些问题呢？',
                                options: [
                                    {
                                        value   : '祛斑',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您想咨询皮肤的哪些问题呢？',
                                                options: [
                                                    '黄褐斑', '晒斑', '老年斑', '其他'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        value   : '祛痘',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您想通过什么方式祛痘？',
                                                options: [
                                                    '微针', '激光', '果酸焕肤', '其他'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        value   : '美白嫩肤',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您当前皮肤存在什么问题？',
                                                options: [
                                                    '毛孔粗大', '黑头多', '红血丝', '皱纹'
                                                ]
                                            }
                                        ]
                                    },
                                    '其他'
                                ]
                            }
                        ]
                    },
                    {
                        value   : '面部',
                        children: [
                            {
                                value  : '',
                                title  : '您想咨询面部的哪些问题呢?',
                                options: [
                                    {
                                        value   : '丰额头',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您希望改善额头用哪种方式呢?',
                                                options: [
                                                    '假体', '玻尿酸', '自体脂肪', '其他'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        value   : '垫下巴',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您改善下巴希望用哪种方式呢?',
                                                options: [
                                                    '假体', '玻尿酸', '自体脂肪', '其他'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        value   : '改变脸型',
                                        children: [
                                            {
                                                value  : '',
                                                title  : '您想通过哪种方式来改变脸型呢?',
                                                options: [
                                                    '注射瘦脸', '立体磨销', '面部吸脂', '其他'
                                                ]
                                            }
                                        ]
                                    },
                                    '其他'
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
    },
    // 聊天页的配置
    CHAT_PAGE       : {
        // 是否开启选择模式
        SELECT_START    : false,
        // 模式类型 : [ 'items' ]
        SELECT_TYPE     : 'items',
        // 未发送过消息时,输入框默认内容.
        FIRST_TEXT      : '',
        // 按钮 文字
        SEND_BUTTON_TEXT: '发送',
        // 开启超时自动问候
        AUTO_SAY        : true,
        // 问候秒数
        AUTO_SAY_DELAY  : 10000,
        // 左侧 头像
        AVATAR          : 'http://xl.xahmyy.com/zt/xxl-hm-syp/images/avatar_mbp.png',
        // 将 关键词 输入到输入框
        KEYWORD_TO_INPUT: false,
        // 未输入时显示的文字.
        PLACEHOLDER_TEXT: '请输入问题，10秒内获取答案！',
        // 文字闪动间隔
        TEXT_DURATION   : 45,
        // 文字完全显示后等待时间
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
    CASE_PAGE       : {
        DATA: [
            {
                name  : '李雪',
                career: '艺术生',
                text  : {
                    title     : '小清新<br>双眼皮',
                    text1     : '开启素颜美眼时代',
                    text2     : '灵动自然，是想要的撩人利器',
                    cover_text: '她的主治医师是谁'
                },
                img   : {
                    cover: 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_01.png',
                    diff : 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_011.png'
                }
            },
            {
                name  : '陈娜',
                career: '美妆店主',
                text  : {
                    title     : '自然<br>生态鼻',
                    text1     : '全鼻精雕 美出真我',
                    text2     : '精致立体 自然和谐',
                    cover_text: '她的主治医师是谁'
                },
                img   : {
                    cover: 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_02.png',
                    diff : 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_022.png'
                }
            },
            {
                name  : '毛毛',
                career: '主播',
                text  : {
                    title     : '维密定制<br>美胸术',
                    text1     : '大女人 真女神',
                    text2     : '性感魅力指数直线上升',
                    cover_text: '她的主治医师是谁'
                },
                img   : {
                    cover: 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_03.png',
                    diff : 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_033.png'
                }
            },
            {
                name  : '小敏',
                career: '教师',
                text  : {
                    title     : '线雕提升',
                    text1     : '紧肤除皱 提拉回春',
                    text2     : '不做出一些改变<br>永远不知道自己有多美',
                    cover_text: '她的主治医师是谁'
                },
                img   : {
                    cover: 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_04.png',
                    diff : 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_044.png'
                }
            },
            {
                name  : '杨明雪',
                career: '大学生',
                text  : {
                    title     : '画美<br>OS祛斑',
                    text1     : '祛斑嫩肤  还原肌底',
                    text2     : '解锁少女 颜值时刻在线',
                    cover_text: '她的主治医师是谁'
                },
                img   : {
                    cover: 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_05.png',
                    diff : 'http://47.92.132.225:7026/zt/hm-zh/images/case_zh_055.png'
                }
            },


        ]
    },
    SELECT_ITEMS    : {
        hello: {
            type   : 'select-item-group',
            title  : '关键字',
            theme  : 'blue',
            next   : 'age',
            message: [
                {
                    type      : 'advertising',
                    maxWidth  : true,
                    notPadding: true,
                    //border: true,
                    // notBorder : true,
                    value     : 'http://xl.xahmyy.com/zt/xxl-hm-syp/images/b_syp_mbp.jpg',
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
            type   : 'select-item-group',
            title  : '年龄',
            theme  : 'blue',
            message: [
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

    },
};
