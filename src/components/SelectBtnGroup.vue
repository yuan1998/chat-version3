<template>
    <div class="select-btn-group">
        <div class="item-wrap"
             v-for="(each , index) in selectItems"
             :style="!each.show &&'opacity:0;'"
             :key="index">
            <div class="item"
                 :class="!selected && className(each)"
                 :ref="'item' + index"
                 @click="handleSelectItem('item' + index ,each)">
                <p>{{ each.value }}</p>
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
            handleSelectItem(ref, item) {
                if (this.selected || !item) {
                    return;
                }
                this.selected = !this.selected;
                item.type     = 'right';
                item.el       = this.$refs[ ref ];
                if (item.event) {
                    this.$emit(item.event, item);
                    return
                }

                const next = item.next || this.item.next;

                this.$emit('send-item', item, next);
            },
            className(item) {
                let { className, theme } = item;
                console.log('className :', className);
                return (className || '') + ' ' + this.item.theme
            }
        },
        computed: {
            selectItems() {
                return this.item.data.items;
            },

        }
    }
</script>
