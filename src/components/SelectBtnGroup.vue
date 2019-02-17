<template>
    <div class="select-btn-group">
        <div class="item-wrap"
             v-for="(each , index) in selectItems"
             :style="!each.show &&'opacity:0;'"
             :key="index">
            <div class="item" :class="item.theme" @click="handleSelectItem($event ,each)">
                {{ each.value }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props   : {
            item: Object
        },
        data() {
            return {
                selected: false,
            }
        },
        methods : {
            handleSelectItem(evt, item) {
                if (this.selected || !item) {
                    return;
                }
                this.selected = !this.selected;
                item.type     = 'right';
                item.el       = evt.target;
                if (item.event) {
                    this.$emit(item.event, item);
                    return
                }

                const next = item.next || this.item.next;

                this.$emit('send-item', item , next);
            }
        },
        computed: {
            selectItems() {
                return this.item.data.items;
            }
        }
    }
</script>
