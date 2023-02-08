<template>
  <base-field :title="title" :error="error">
    <textarea
      class="form__input"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="change"
    />
  </base-field>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin]
}
</script>