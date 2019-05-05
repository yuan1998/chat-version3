<template>
    <div class="case-item flex flex-auto">
        <div class="case-border flex flex-auto">
            <div class="flex-auto cover">
                <img referrerpolicy="no-referrer" :src="item.img.cover" alt="" class="mc-img">
                <div class="cover-text" @click="" v-html="item.text.cover_text"></div>
            </div>
            <div class="flex-none context-info">
                <div class="project-name" v-html="item.text.title"></div>
                <div class="info">
                    <div class="text1" v-html="item.text.text1"></div>
                    <div class="line"></div>
                    <div class="text2" v-html="item.text.text2"></div>
                </div>
                <div class="diff-img">
                    <img referrerpolicy="no-referrer" :src="item.img.diff" alt="" class="mc-img">
                </div>
                <div class="name">
                    {{ item.name }}<span class="c">（{{ item.career }}）</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item']
    }
</script>

<style scoped lang="less">

    .case-item {
        padding: 2.5vw 3.15vw;

        .cover {
            height: 68.75vw;
            .cover-text {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: #fa3b4b;
                color: #fff;
                font-size: 4vw;
                line-height: 1.6;
                text-align: center;
            }
        }

        .case-border {
            border-radius: 2vw;
            background-color: #fff;
            overflow: hidden;
            box-shadow: 0 6px 15px rgba(36, 37, 38, 0.18);


        }

        .context-info {
            width: 53.31%;
            text-align: center;
            padding-top: 4vw;

            .diff-img {
                padding: 0 3.03030303vw;
            }

            .project-name {
                font-size: 8vw;
                line-height: 1.05;
                height: 17vw;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                color: #333333;
            }

            .info {
                padding-top: 1.7vw;
                padding-bottom: 2.5vw;
                .text1 {
                    color: #fa3b4b;
                    font-size: 4vw;
                    font-weight: bold;
                }
                .line {
                    width: 18.75vw;
                    height: 1px;
                    background-color: #fa3b4b;
                    margin: 1.3vw auto;
                }
                .text2 {
                    font-size: 3.125vw;
                    color: #78787a;
                }
            }
            .name {
                padding-top: 1.5vw;
                font-size: 3.75vw;
                font-weight: bold;
                color: #666666;

                span {
                    font-size: 3.125vw;
                    font-weight: normal;
                    vertical-align: baseline;
                }
            }

        }
    }


</style>
