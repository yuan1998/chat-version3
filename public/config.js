const CONFIG = {
    BASE_ROOT              : 2,
    TITLE                  : '西安画美',
    WEB_TITLE              : '西安画美',
    KST_URL                : 'https://vipk16-hztk11.kuaishang.cn/bs/im.htm?cas=116432___982318&fi=118952',
    KST_PAGE_TAG           : '6666_牙科',
    KST_JS                 : '<script type="text/javascript" src="https://vipk16-hztk11.kuaishang.cn/bs/ks.j?cI=982318&fI=118952&ism=1" charset="utf-8"></script>',
    TEL                    : '029-87398888',
    DEFAULT_MESSAGE        : '请问您要咨询什么问题?',
    DEFAULT_AGE_PICKER_TIME: 2000,
    HOME_PAGE              : {
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
    SELECT_ITEMS           : {
        hello: {
            type   : 'select-item-group',
            title  : '项目',
            theme  : 'blue',
            next   : 'age',
            message: [
                {
                    type     : 'left',
                    animation: 'left-default',
                    value    : '您希望用哪种方式祛眼袋?',
                },
            ],
            data   : {
                items: [
                    {
                        value    : '内切',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                    {
                        value    : '外切',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                    {
                        value    : '咨询了解',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                ]
            },
        },
        end  : {
            type   : 'select-item-group',
            title  : '咨询方式',
            message: [
                {
                    type     : 'left',
                    animation: 'left-default',
                    value    : '您希望哪种方式继续了解?',
                }
            ],
            data   : {
                items: [
                    {
                        value    : '在线咨询',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                    {
                        value    : '获取报价',
                        show     : true,
                        animation: 'right-select',
                        event    : 'compute-price',
                        el       : null,
                    },
                ]
            }
        },
        age  : {
            type   : 'select-item-group',
            title  : '年龄',
            theme  : 'blue',
            next   : 'sex',
            message: [
                {
                    type     : 'left',
                    animation: 'left-default',
                    value    : '您多大年龄?',
                },
            ],
            data   : {
                items: [
                    {
                        value    : '18-24岁',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                    {
                        value    : '24-34岁',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                    {
                        value    : '35-44岁',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                    {
                        value    : '45岁以上',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                ]
            }
        },

        sex: {
            type   : 'select-item-group',
            title  : '性别',
            theme  : 'blue',
            next   : 'end',
            message: [
                {
                    type     : 'left',
                    animation: 'left-default',
                    value    : '您的性别?',
                },
            ],
            data   : {
                items: [
                    {
                        value    : '男',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                    {
                        value    : '女',
                        show     : true,
                        animation: 'right-select',
                        el       : null,
                    },
                ]
            }
        }
    },
    QUESTION               : {
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
