<template>
    <div class="reservation-form" v-if="display">
        <div class="mask mask-container" v-if="showMask"></div>
        <div class="model-fixed-class center-form-container"
             @click="show = !show">
            <div ref="bg" class="bg"></div>
            <div class="content">
                <div class=" lorem">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem doloribus dolorum eos ex,
                    exercitationem fuga id ipsam laborum, nulla pariatur praesentium, quos ratione sed soluta veniam
                    veritatis. Dolor, velit.
                </div>
                <div class=" lorem">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem doloribus dolorum eos ex,
                    exercitationem fuga id ipsam laborum, nulla pariatur praesentium, quos ratione sed soluta veniam
                    veritatis. Dolor, velit.
                </div>
                <div class=" lorem">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem doloribus dolorum eos ex,
                    exercitationem fuga id ipsam laborum, nulla pariatur praesentium, quos ratione sed soluta veniam
                    veritatis. Dolor, velit.
                </div>
                <div class=" lorem">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem doloribus dolorum eos ex,
                    exercitationem fuga id ipsam laborum, nulla pariatur praesentium, quos ratione sed soluta veniam
                    veritatis. Dolor, velit.
                </div>
                <div class="lorem">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem doloribus dolorum eos ex,
                    exercitationem fuga id ipsam laborum, nulla pariatur praesentium, quos ratione sed soluta veniam
                    veritatis. Dolor, velit.
                </div>
                <div class=" lorem">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem doloribus dolorum eos ex,
                    exercitationem fuga id ipsam laborum, nulla pariatur praesentium, quos ratione sed soluta veniam
                    veritatis. Dolor, velit.
                </div>
                <div class=" lorem">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem doloribus dolorum eos ex,
                    exercitationem fuga id ipsam laborum, nulla pariatur praesentium, quos ratione sed soluta veniam
                    veritatis. Dolor, velit.
                </div>
                <div class="button-group">
                    <div ref="button" class="button">
                        预约
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import anime             from 'animejs'
    import { elementOffset } from '../utily/util';

    export default {
        props  : {
            display: {
                type   : Boolean,
                default: false,
            },
            form   : {
                type: Object,
                default(val) {
                    return val || {};
                }
            },
            offset : {
                type: [ Object, null ],
            }
        },
        mounted() {

        },
        data() {
            return {
                show      : false,
                showMask  : false,
                selfOffset: null,
            }
        },
        methods: {
            initStyle() {
                $([ '.lorem' ]).css({
                    opacity: 0,
                });
            },
            handleShow() {
                const { bg , button}   = this.$refs;
                const { x, y } = this.offset;
                const lorems   = $('.lorem');


                $(button).css({
                    opacity: 0
                });

                lorems.css({
                    opacity: 0,
                });

                $(bg).css({
                    top : `${y}px`,
                    left: `${x}px`,
                });
                console.log('lorems :', lorems);

                let line = anime.timeline({
                    duration: 1050
                });


                line.add({
                    targets: bg,
                    opacity: {
                        value: 1,
                        duration: 500
                    },
                    scale  : (window.outerHeight * 2) / 4,
                    easing : 'easeOutExpo',
                }).add({
                    targets: lorems.toArray(),
                    opacity: 1,
                    delay  : anime.stagger(200, { start: 300 })
                })
            }
        },
        watch  : {
            display(val) {
                if (val && this.offset) {
                    this.$nextTick(() => {
                        this.handleShow();
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
