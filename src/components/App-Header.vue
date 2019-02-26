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
                title     : CONFIG.BASE.TITLE || '西安画美整形医院',
                routerList: CONFIG.BASE.ROUTER
            }
        },
    }
</script>
