<template>
    <div class="broadcast-wrapper ">
        <div class="title">
            {{ item.title }}
        </div>
        <div class="icon">
            <div class="icon-el">
                <img src="@/assets/tishi.gif" alt="" class="mc-img">
            </div>
        </div>
        <div class="content">
            <transition-group tag="div" name="slide-change" >
                <div :key="current" class="message-item">
                    {{ message }}
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    export default {
        props   : {
            item: Object,
        },
        data() {
            return {
                current: 0,
            }
        },
        computed: {
            message() {
                let data = this.item.data || [];
                return data[ this.current ];
            },
            duration() {
                return this.item.duration || 2000;
            }
        },
        methods : {
            changeItem() {
                let data = this.item.data || [];
                let len  = data.length;

                if (this.current === len - 1) {
                    this.current = 0;
                }
                else {
                    this.current++;
                }
            },
            changeTimeout () {
                setTimeout(() => {
                    this.changeItem();
                    this.changeTimeout();
                } ,this.duration);
            }
        },
        mounted() {
            this.changeTimeout();
            console.log('this.item :', this.item);
        }
    }
</script>

<style scoped lang="less">

    .message-item {
        position: absolute;
    }

    .slide-change-enter-active,.slide-change-leave-active {
        transition: all 500ms;
    }

    .slide-change-enter {
        transform: translateY(8vw);
        opacity: 0;
    }

    .slide-change-leave-to {
        transform: translateY(-8vw);
        opacity: 0;
    }


</style>
