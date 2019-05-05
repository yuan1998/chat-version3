<template>
    <div class='y-chat-page page-item case-page'>
        <div class="case-wrapper flex column">
            <CaseItem v-for="(item , index) in data" :key="index" :item="item"/>
        </div>
    </div>
</template>
<script>
    import CaseItem from '../components/Case/Case-item';

    export default {
        components: {
            CaseItem
        },
        data() {
            return {
                data: CONFIG.CASE_PAGE.DATA,
            }
        }
    }
</script>

<style scoped lang="less">
    .case-page {
        background-color: #f3f3f3;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .case-wrapper {
        padding-top: 2.5vw;
        padding-bottom: 5vw;
    }

</style>
