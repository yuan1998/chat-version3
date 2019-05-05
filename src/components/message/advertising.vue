<template>
    <div class="message-item-wrapper">
        <div class="advertising" :class="{
                    'not-border' : !item.border,
                }" @click="handleSend">
            <img referrerpolicy="no-referrer" :src="value" alt="" class="mc-img">
        </div>
    </div>
</template>

<script>
    export default {
        props  : [ 'item', 'value' ],
        methods: {
            handleSend() {
                if (this.item.sendMessage && !this.item.$sended) {
                    this.$set(this.item, '$sended', true);
                    this.$store.dispatch('Bridge/sendText', {
                        value: this.item.sendMessage,
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
