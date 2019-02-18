const CONFIG = {
    BASE         : {
        ROOT     : 2,
        TITLE    : '西安画美',
        WEB_TITLE: '西安画美',
        TEL      : '029-87398888',
    },
    THEME        : {
        COLOR      : 'blue',
        FOOTER_ICON: 'phone',
    },
    CHAT         : {
        SELECT_START: true,
        SELECT_TYPE : 'items',
    },
    KST          : {
        URL     : 'https://vipk16-hztk11.kuaishang.cn/bs/im.htm?cas=116432___982318&fi=118952',
        PAGE_TAG: '6666_牙科',
        JS      : '<script type="text/javascript" src="https://vipk16-hztk11.kuaishang.cn/bs/ks.j?cI=982318&fI=118952&ism=1" charset="utf-8"></script>',
    },
    MESSAGE      : {
        INIT_MESSAGE         : [
            {
                value    : '您好,请问遇到了什么问题?',
                type     : 'left',
                animation: 'left-default'
            },
        ],
        CHAT_SUBMIT_MESSAGE  : [
            {
                value    : '好的,给你回电.',
                type     : 'left',
                animation: 'left-default'
            },
        ],
        CHAT_ITEM_END_MESSAGE: null,
    },
    SELECT_PICKER: {
        CAN_BACK    : true,
        BACK_MESSAGE: '保密',
        ANCHOR      : 40,
    },
    HOME_PAGE    : {
        ENABLED       : true,
        BASE_URL      : 'http://kst.img.xamryy.cn/',
        PATH          : '/baqi/hmppyyjj-images/',
        NAME          : 'bg_',
        EXT           : '.jpg',
        COUNT         : 20,
        EVENTS        : {
            13: {
                click: [ 'router:/chat' ]
            },
            17: {
                click: [ 'router:/chat' ]
            },
        },
        TEMPLATE      : '<h1 class="test-something">HELLO WORLD</h1>',
        TEMPLATE_STYLE: '.test-something{font-size:30px;text-align:center;padding-top:50px;}',
    },
    SELECT_ITEMS : {
        hello: {
            type   : 'select-item-group',
            title  : '关键字',
            theme  : 'blue',
            next   : 'age',
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
                    type     : 'left',
                    animation: 'left-default',
                    value    : '几岁?',
                },
            ],
        },

    },
    QUESTION     : {
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
