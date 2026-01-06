<template>
  <div class="calc-grid">
    <div class="columns is-multiline is-mobile is-gapless">
      <div class="column is-3-desktop is-3-tablet is-6-mobile" v-for="btn in buttons" :key="btn.label">
        <CalculatorButton :label="btn.label" :value="btn.value" :type="btn.type" :variant="btn.variant" @press="$emit('press', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CalculatorButton from './CalculatorButton.vue'
import { computed } from 'vue'

const props = defineProps({ scientific: { type: Boolean, default: false } })

const baseButtons = [
  { label: '7', value: '7', type: 'number' },
  { label: '8', value: '8', type: 'number' },
  { label: '9', value: '9', type: 'number' },
  { label: 'DEL', value: 'del', type: 'del', variant: 'is-danger' },
  { label: '4', value: '4', type: 'number' },
  { label: '5', value: '5', type: 'number' },
  { label: '6', value: '6', type: 'number' },
  { label: '+', value: '+', type: 'operator', variant: 'is-warning' },
  { label: '1', value: '1', type: 'number' },
  { label: '2', value: '2', type: 'number' },
  { label: '3', value: '3', type: 'number' },
  { label: '-', value: '-', type: 'operator', variant: 'is-warning' },
  { label: '0', value: '0', type: 'number' },
  { label: '.', value: '.', type: 'dot' },
  { label: '=', value: 'equals', type: 'equals', variant: 'is-primary' },
  { label: 'C', value: 'clear', type: 'clear', variant: 'is-light' }
]

const scientificButtons = [
  { label: 'sin', value: 'sin', type: 'func' },
  { label: 'cos', value: 'cos', type: 'func' },
  { label: 'tan', value: 'tan', type: 'func' },
  { label: '√', value: 'sqrt', type: 'func' }
]

const buttons = computed(() => props.scientific ? [...scientificButtons, ...baseButtons] : baseButtons)
</script>

<style scoped>
.column { padding: 0.25rem; }
</style>
