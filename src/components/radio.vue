<template>
    <div class="radio-group">
        <div class="radio-item"
             v-for="(each , i) in items"
             :key="i">
            <span class="radio-text" :class="value === each.value && 'active'" @click="handleRadioChange(each)">
                 {{ each.value }}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: String,
            items: Array,
        },
        data() {
            return {
                select : '',
            }
        },
        methods: {
            handleRadioChange(item) {
                this.$emit('input' , item.value);
            }
        }
    }
</script>

<style scoped>

</style>
