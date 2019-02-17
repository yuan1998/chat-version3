<template>
    <transition name="slide-up">
        <div class="model-container model-fixed-class" v-if="model.show">
            <div class="model-panel">
                <div class="model-body">
                    <div class="model-text">
                        {{ model.text }}
                    </div>
                </div>
                <div class="model-footer">
                    <button class="confirm-btn" @click="$hideAll">确认</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                model: 'Controller/model'
            })
        },
        methods : {
            ...mapActions({
                $hideAll: 'Controller/$hideAll'
            }),
        }
    }
</script>
