<template>
    <AwesomePicker @confirm="pickerConfirm"
                   ref="picker"
                   textTitle="请输入年龄"
                   :maskHide="false"
                   :hideCancel="true"
                   :anchor="anchor"
                   :data="testData"/>
</template>
<script>
    import AwesomePicker   from '@/components/Picker'
    import { pushHistory } from '@/utily/util'

    export default {
        props     : {
            item: Object
        },
        components: {
            AwesomePicker
        },
        methods   : {
            pickerConfirm(val) {
                val = val[ 0 ].value;

                this.disablePop = true;
                history.go(-1);
                this.handleSendItem(val)
            },
            handleSendItem(val, display = true) {
                let message = {
                    value    : val,
                    type     : 'right',
                    animation: 'right-default'
                };
                this.$emit('send-item', message, this.item.next, display);
                window.removeEventListener('popstate', this.handlePopState.bind(this));
            },
            handleBack() {
                this.$refs.picker.hide();
                let message = CONFIG.SELECT_PICKER.BACK_MESSAGE || '没有选择年龄';

                setTimeout(() => {
                    this.handleSendItem(message, !!CONFIG.SELECT_PICKER.BACK_MESSAGE)
                }, 500);
            },
            handlePopState() {
                let { picker } = this.$refs;

                if (picker.display && !this.disablePop) {
                    if (CONFIG.SELECT_PICKER.CAN_BACK) {
                        this.handleBack()
                    }
                    else {
                        pushHistory();
                    }
                }
            }
        },
        mounted() {
            let { picker } = this.$refs;

            setTimeout(() => {
                pushHistory();
                window.addEventListener('popstate', this.handlePopState.bind(this));

                picker.show();
            }, this.item.delay || 0);
        },
        data() {
            return {
                disablePop: false,
                testData  : [
                    Array.from({ length: 100 }, (value, index) => `${1 + index}岁`),
                ],
                anchor    : [
                    {
                        index: CONFIG.SELECT_PICKER.ANCHOR
                    }
                ],
            }
        },
    }
</script>
