<template>
    <AwesomePicker @close="pickerClose"
                   @confirm="pickerConfirm"
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
            pickerClose() {
                // this.showFooter(true)
            },
            pickerConfirm(val) {

                val = val[ 0 ].value;

                this.handleSendItem(val);
            },
            handleSendItem(val) {
                let message = {
                    value    : val,
                    type     : 'right',
                    animation: 'right-default'
                };
                history.go(-1);
                this.$emit('send-item', message, this.item.next);
                window.removeEventListener('popstate', this.handlePopState.bind(this));

            },
            handlePopState() {
                let { picker } = this.$refs;

                if (picker.display) {
                    pushHistory();
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
                testData: [
                    Array.from({ length: 100 }, (value, index) => `${1 + index}岁`),
                ],
                anchor  : [
                    {
                        index: 19
                    }
                ],
            }
        },

    }
</script>
