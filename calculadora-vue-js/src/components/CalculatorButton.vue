<template>
  <button :class="['button', 'calc-btn', variantClass, 'is-fullwidth']" @click="$emit('press', { type: type, value: value })">
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  type: { type: String, default: 'number' },
  variant: { type: String, default: 'is-light' }
})

const variantClass = props.variant || 'is-light'
</script>

<style scoped>
.button { font-size: 1.1rem; padding: 1rem; }
</style>
