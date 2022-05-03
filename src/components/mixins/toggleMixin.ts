import {defineComponent} from "vue";

export default defineComponent({
    emits: ['update:show'],
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideModal() {
            this.$emit('update:show', false)
        }
    }
})