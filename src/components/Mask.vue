<template>
    <transition name="fade">
        <div class="mask-container" v-if="showMaskWrapper"></div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                showMaskWrapper: 'Controller/showMask'
            })
        }
    }
</script>

