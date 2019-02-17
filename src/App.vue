<template>
    <div id="app">
        <div class="m-container">
            <div id="message-container">
                <AppHeader></AppHeader>
                <div id="y-chat-page-container">
                    <transition name="fade">
                        <keep-alive>
                            <router-view/>
                        </keep-alive>
                    </transition>
                </div>
                <transition name="slide-up-y">
                    <AppFooter v-show="showFooter"></AppFooter>
                </transition>
            </div>
        </div>
        <Y-Mask></Y-Mask>
        <Model></Model>
    </div>
</template>

<script>
    import AppHeader      from "./components/App-Header"
    import AppFooter      from "./components/App-Footer"
    import Mask           from "./components/Mask"
    import Model          from "./components/Model"
    import {checkReferrer} from './utily/referrer'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            AppHeader,
            AppFooter,
            Model,
            'Y-Mask': Mask,
        },
        mounted() {
            CONFIG.WEB_TITLE && (document.title = CONFIG.WEB_TITLE);
            CONFIG.KST_JS && $('head').append($(CONFIG.KST_JS));

            let keyword = checkReferrer();
            CONFIG.KST_PAGE_TAG = `${CONFIG.KST_PAGE_TAG}${keyword ? `_关键字:${keyword}` : ''}`;
        },
        computed  : {
            ...mapGetters({
                showFooter: 'Controller/showFooter',
            })
        }
    }
</script>

<style lang="less">
</style>
