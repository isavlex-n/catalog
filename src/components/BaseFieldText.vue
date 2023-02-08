<template>
  <base-field :title="title" :error="error">
    <input
      class="form__input"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      :type="type"
      @input="change"
    />
  </base-field>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin'
export default {
  props: {
    type: {
      default: 'text',
    }
  },
  mixins: [formFieldMixin]
}
</script>
