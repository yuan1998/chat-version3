const CONFIG = {
    BASE         : {
        // 默认页 :0-4
        ROOT     : 2,
        // 头部标题
        TITLE    : '西安画美',
        // 页面标题
        WEB_TITLE: '西安画美',
        // 电话
        TEL      : '029-87398888',
        ROUTER   : [
            {
                title: '医院简介',
                name : 'home',
                path : '/home'
            },
            {
                title: '项目报价',
                name : 'price',
                path : '/price'
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
        ]
    },
    THEME        : {
        // 页面主题 : ['blue' , 'red']
        COLOR      : 'blue',
        // 聊天框图标 : ['phone' , 'camera']
        FOOTER_ICON: 'phone',
    },
    CHAT         : {
        // 是否开启选择模式
        SELECT_START: true,
        // 模式类型 : ['items']
        SELECT_TYPE : 'items',
    },
    KST          : {
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
    MESSAGE      : {
        // 初始对话
        INIT_MESSAGE         : [ {
            value    : '您好,请问遇到了什么问题?',
            type     : 'left',
            animation: 'left-default'
        } ],
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
    SELECT_PICKER: {
        // 是否可以返回
        CAN_BACK    : true,
        // 返回后发送内容
        BACK_MESSAGE: '保密',
        // 默认选择年龄 (n+1)
        ANCHOR      : 30,
    },
    HOME_PAGE    : {
        // 开启图片首页
        ENABLED       : true,
        // 图片域名
        BASE_URL      : 'http://kst.img.xamryy.cn/',
        // 图片目录
        PATH          : '/baqi/hmppyyjj-images/',
        // 图片前缀
        NAME          : 'bg_',
        // 图片后缀
        EXT           : '.jpg',
        // 图片数量
        COUNT         : 20,
        // 事件,目前支持  ['router:/chat']
        EVENTS        : {
            13: {
                click: [ 'router:/chat' ]
            },
            17: {
                click: [ 'router:/chat' ]
            },
        },
        // 当 ENABLED 为 false 时应用
        // TEMPLATE 为 HTML 内容
        // TEMPLATE_STYLE 为 css 内容
        TEMPLATE      : '<h1 class="test-something">HELLO WORLD</h1>',
        TEMPLATE_STYLE: '.test-something{font-size:30px;text-align:center;padding-top:50px;}',
    },
    PRICE_PAGE: {
        ASK_COVER: 'http://kst.img.xamryy.cn/theme/2-1-red.jpg',
    },
    CHAT_PAGE: {
        AVATAR: 'http://kst.img.xamryy.cn/theme/avatar-red.png',
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
