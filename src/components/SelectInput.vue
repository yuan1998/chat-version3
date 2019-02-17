<template>
    <div class="select-input-wrap">
        <div class="input-error">
            {{ error }}
        </div>
        <div class="send-btn">
            <div class="item-wrap">
                <button @click="handleSend($event , item.data.item)" class="item blue">{{ item.data.item.value ? item.data.item.value : '输入后点击发送'}}</button>
            </div>
        </div>
        <div class="select-input" :class="error && 'error'">
            <input @focus="error = ''" type="text" :placeholder="item.placeholder" v-model="item.data.item.value">

        </div>
    </div>
</template>

<script>
    export default {
        props   : {
            item: Object,
        },
        data() {
            return {
                error: '',
                selected: false,
            }
        },
        methods : {
            handleSend(evt, item) {
                this.validator();

                if (this.error || this.selected || !item) {
                    return;
                }
                this.selected = !this.selected;
                item.type     = 'right';
                item.el       = evt.target;

                this.$emit('send-item', item , this.item.next);
            },
            validator() {
                const value = this.item.data.item.value;
                const regex = this.item.regex ? new RegExp(this.item.regex) : null;

                if (!value) {
                    this.error = this.item.name + '不能为空';
                }
                else if (regex && !regex.test(value)) {
                    this.error = this.item.name + '格式有误';
                }
            }
        }
    }
</script>
