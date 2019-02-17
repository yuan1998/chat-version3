const Item = {
    hello: {
        type   : 'select-item-group',
        title  : '什么斑',
        theme  : 'blue',
        next   : 'type',
        message: [
            {
                type     : 'left',
                animation: 'left-default',
                value    : '您目前受什么斑困扰?',
            },
        ],
        data   : {
            items: [
                {
                    value    : '黄褐斑',
                    show     : true,
                    animation: 'right-select',
                    el       : null,
                },
                {
                    value    : '雀斑',
                    show     : true,
                    animation: 'right-select',
                    el       : null,
                },
                {
                    value    : '妊娠斑',
                    show     : true,
                    animation: 'right-select',
                    el       : null,
                },
                {
                    value    : '其他斑',
                    show     : true,
                    animation: 'right-select',
                    el       : null,
                },
            ]
        },
    },

    end: {
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

    type: {
        type   : 'select-item-group',
        title  : '治疗方式',
        theme  : 'blue',
        next   : 'age',
        message: [
            {
                type     : 'left',
                animation: 'left-default',
                value    : '您希望通过哪种方式治疗?',
            },
        ],
        data   : {
            items: [
                {
                    value    : '激光',
                    show     : true,
                    animation: 'right-select',
                    el       : null,
                },
                {
                    value    : '光子嫩肤',
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

    age: {
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
};

export default Item;
