<template>
    <div id="app" :class="'theme-' + theme" class="m-container">
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
        <Y-Mask></Y-Mask>
        <Modal></Modal>
    </div>
</template>

<script>
    import AppHeader         from "./components/App-Header"
    import AppFooter         from "./components/App-Footer"
    import Mask              from "./components/Mask"
    import Modal             from "./components/Modal"
    import { checkReferrer } from './utily/referrer'
    import { mapGetters }    from 'vuex'

    export default {
        components: {
            AppHeader,
            AppFooter,
            Modal,
            'Y-Mask': Mask,
        },
        data() {
            return {
                theme: CONFIG.THEME.COLOR || 'blue',
            }
        },
        created() {
            CONFIG.KEYWORD       = checkReferrer();
            CONFIG.BASE.PAGE_TAG = `${CONFIG.BASE.PAGE_TAG}_${CONFIG.KEYWORD ? `关键字:${CONFIG.KEYWORD}` : '没有关键字'}`;
        },
        mounted() {
            CONFIG.BASE.WEB_TITLE && (document.title = CONFIG.BASE.WEB_TITLE);

            this.generateChatOptions();
        },
        methods   : {
            generateChatOptions() {
                let item = CONFIG.CHAT_OPTIONS[ CONFIG.BASE.TYPE ];
                if (!item) {
                    console.warn('[Fail] CHAT Options not Found.');
                    return;
                }

                CONFIG.CHAT_OPTION = item;
                if (typeof this[ `${item.type}Generate` ] === 'function') {
                    this[ `${item.type}Generate` ](item);
                }
            },
            kstGenerate(option) {
                let js  = `${option.domain}bs/ks.j?cI=${option.id}&fI=${option.fi}&ism=1`;
                let url = `${option.domain}bs/im.htm?cas=${option.cas}___${option.id}&fi=${option.fi}`;

                $('<script>', {
                    src    : js,
                    type   : "text/javascript",
                    charset: "utf-8"
                }).appendTo($('head'));
                CONFIG.CHAT_OPTION.url = url;
            },
            swtGenerate(option) {
                document.writeln(`<script onload="LR_showminiDiv=LR_showminiDiv2=function(){};LR_sidexists=2;LR_showminiDiv_no=true;LR_Floaters[2].pms['html']='123'" language="javascript" src="${option.js}&float=0"><\/script>`);
                // document.writeln('');
            }
        },
        computed  : {
            ...mapGetters({
                showFooter: 'Controller/showFooter',
            })
        },
    }
</script>

<style lang="less">
</style>
