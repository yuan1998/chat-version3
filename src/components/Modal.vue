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
                    <button class="confirm-btn" @click="handleConfirm" v-if="model.showConfirm">
                        {{ model.confirmText }}
                    </button>
                    <button class="cancel-btn" @click="handleCancel" v-if="model.showCancel">
                        {{ model.cancelText }}
                    </button>
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
            handleConfirm() {
                let fun = this.model.confirm;

                if (typeof fun === 'function') {
                    fun();
                }

                this.$hideAll();
            },
            handleCancel() {
                let fun = this.model.cancel;

                if (typeof fun === 'function') {
                    fun();
                }
                this.$hideAll();
            },

        }
    }
</script>
