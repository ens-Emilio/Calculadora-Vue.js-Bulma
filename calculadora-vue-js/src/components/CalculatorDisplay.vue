<template>
  <div class="card calculator-display-card has-text-white">
    <div class="content">
      <p class="subtitle is-4" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ expression }}</p>
      <h2 class="title" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ currentValue }}</h2>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentValue: { type: String, required: true },
  expression: { type: String, required: false }
})
</script>

<style scoped>
.title { transition: all 0.3s ease; }
</style>
