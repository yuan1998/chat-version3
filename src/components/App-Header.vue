<template>
    <div id="y-chat-header">
        <div class="header-bar">
            <div class="header-bar-title">
                <div class="logo-text">
                    {{ title }}
                </div>
            </div>
        </div>
        <div class="nav-bar">
            <div class="nav-item"
                 v-for="item in routerList"
                 :key="item.path"
                 :class="$route.name === item.name && 'active'"
                 @click="$router.push(item.path)">
                <p>
                    {{ item.title }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: CONFIG.BASE.TITLE || '西安画美整形医院',
                routerList: [
                    {
                        title: '医院简介',
                        name: 'home',
                        path: '/home'
                    },
                    {
                        title: '项目报价',
                        name: 'price',
                        path: '/price'
                    },
                    {
                        title: '在线预约',
                        name: 'chat',
                        path: '/chat'
                    },
                    {
                        title: '联系我们',
                        name: 'concat',
                        path: '/concat'
                    },
                ]
            }
        },
    }
</script>
