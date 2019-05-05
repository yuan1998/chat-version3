<template>
    <div class="message-item-wrapper">
        <div>
            {{ value.format('HH:mm:ss') }}
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'value' ]
    }
</script>

<style scoped>

</style>
