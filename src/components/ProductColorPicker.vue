<template>
  <ul class="colors" :class="{'colors--black': isBlack}">
    <li class="colors__item" v-for="itemColor in colors" :key="itemColor.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="itemColor.id"
          @change="$emit('picked', color)"
          v-model="color"
        />
        <span
          class="colors__value"
          :style="{ backgroundColor: itemColor.code }"
        >
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors', 'isBlack'],
  emits: ['picked'],
  data() {
    return {
      color: null,
    }
  },
}
</script>