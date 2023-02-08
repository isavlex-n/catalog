import BaseField from '@/components/BaseField.vue'
export default {
  props: ['placeholder', 'title', 'error', 'modelValue'],
  methods: {
    change(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
  components: {
    BaseField,
  },
}