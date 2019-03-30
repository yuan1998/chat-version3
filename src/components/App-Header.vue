<template>
    <div id="y-chat-header">
        <div class="header-bar">
            <div class="header-bar-title">
                <div class="header-back header-icon">
                    <div class="icon-img" style="width: 5vw;" onclick="history.go(-1)">
                        <img src="@/assets/back-icon.png" alt="" class="mc-img">
                    </div>
                </div>
                <div class="header-center" v-if="logoText" v-html="logoText"></div>
                <div class="header-center" v-else>
                    <div class="logo-img">
                        <img :src="logoImg" alt="" class="mc-img">
                    </div>
                </div>
                <div class="header-tel header-icon" v-if="showTel">
                    <a class="icon-img" style="width: 6vw;display: inline-block;" :href="'tel:' + tel">
                        <img src="@/assets/tel.png" alt="" class="mc-img">
                    </a>
                </div>
            </div>
        </div>
        <div class="nav-bar ">
            <div class="test-item" :style="{width: `${itemWidth}vw`}" ref="animate">
                <svg t="1552893791945" class="icon" style="" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2524" xmlns:xlink="http://www.w3.org/1999/xlink"
                     width="250" height="86" viewBox="0 0 250 86">
                    <path d="M0 86 A15 15, 0 0 0 15 71 T15 40 A40 40, 0 0 1 55 0 T195 0 A40 40, 0 0 1 235 40 T235 71 A15 15, 0 0 0 250 86 Z"
                          stroke="none" fill="#fff"></path>
                </svg>
            </div>
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
        <!--<div class="nav-empty"></div>-->
    </div>
</template>

<script>
    import anime from 'animejs';
    import logo  from '@/assets/logo.png';

    export default {
        data() {
            return {
                routerList  : CONFIG.BASE.ROUTER,
                tel         : CONFIG.BASE.TEL,
                showTel     : CONFIG.BASE.SHOW_TEL,
                firstAnimate: true,
                logoText    : CONFIG.BASE.HEADER_LOGO,
                logoImg     : logo,
            }
        },
        computed: {
            itemWidth() {
                return 100 / (this.routerList.length || 0);
            }
        },
        methods : {
            findRouteIndex(name) {
                return this.routerList.findIndex(e => e.name === name);
            },
            getBasisValue(name) {
                return {
                    index  : this.findRouteIndex(name),
                    val    : this.itemWidth,
                    animate: this.$refs.animate,
                }
            },
            navigationAnimate(name) {
                let { index, val, animate } = this.getBasisValue(name);

                anime({
                    targets   : animate,
                    translateX: val * index + 'vw',
                    duration  : 400,
                    easing    : 'easeInOutQuart'
                })
            },
            firstNavigation(name) {
                let { index, val, animate } = this.getBasisValue(name);

                this.firstAnimate = false;
                anime({
                    targets   : animate,
                    translateX: {
                        value   : val * index + 'vw',
                        duration: 0,
                        easing  : 'linear'
                    },
                    translateY: [ '100%', 0 ],
                    scale     : {
                        value   : [ 0, 1 ],
                        duration: 400,
                        easing  : 'easeOutBack'
                    },
                    duration  : 600,
                    easing    : 'easeInOutQuint'

                })


            }
        },
        watch   : {
            '$route.name'(val) {
                if (this.firstAnimate) {
                    this.firstNavigation(val);
                }
                else {
                    this.navigationAnimate(val);
                }

            }
        },
    }
</script>

<style scoped lang="less">
    .test-item {
        position: absolute;
        /*bottom: 2vw;*/
        bottom: 0;
        width: 25vw;
        left: 0;
        display: flex;
        padding: 0 1vw;
        align-items: center;
        justify-content: center;
        transform: scale(0);
        border-bottom: 1px solid #f13354;

        .i-c {
            height: 6vw;
            flex: auto;
            background-image: linear-gradient(135deg, #ec008c, #f43f3b);;
            border-radius: 3vw;
            box-shadow: 3px 3px 10px rgba(255, 255, 255, 0.28);
            /*display: none; */
        }
        svg {
            display: none;
        }
    }

    .nav-empty {
        height: 4vw;
    }
</style>
