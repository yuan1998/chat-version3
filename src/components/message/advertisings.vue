<template>
    <div class="message-item-wrapper not-padding">
        <div class="swiper-container" :id="swiperId">
            <div class="swiper-wrapper">
                <div class="swiper-slide"
                     :key="index"
                     v-for="(each ,index) in item.data">
                    <Advertising :item="each"
                                 class="not-padding"
                                 :value="each.value" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper      from 'swiper'
    import Advertising from './advertising';

    const defaultOptions = {
        loop      : true,
        autoHeight: true,
        autoplay  : {
            delay: 2000,
        }
    };

    export default {
        components: {
            Advertising
        },
        props     : [ 'item' ],
        computed  : {
            swiperId() {
                return `swiper-${this.currentId}`;
            }
        },
        created() {
            window.swiperId = window.swiperId ? window.swiperId + 1 : 1;
            this.currentId  = window.swiperId * 1;
        },
        data() {
            return {
                currentId: 1
            }
        },
        mounted() {
            new Swiper(`#${this.swiperId}`, Object.assign({}, defaultOptions, this.item.options))
        },
        methods: {
            sendMessage() {

            }
        }

    }
</script>

<style scoped>
    .swiper-container {
        flex: auto;
    }
</style>
