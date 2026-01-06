<template>
  <aside class="menu history-menu">
    <p class="menu-label">Histórico</p>
    <ul class="menu-list history-list">
      <li v-for="(item, idx) in history" :key="idx">
        <div>
          <small>{{ item.expr }}</small>
          <div class="has-text-white">= {{ item.result }}</div>
        </div>
      </li>
    </ul>
    <div class="mt-3">
      <button class="button is-small is-danger" @click="$emit('clear')">Limpar</button>
    </div>
  </aside>
</template>

<script setup>
defineProps({ history: { type: Array, default: () => [] } })
</script>

<style scoped>
.menu { background: transparent; }
.menu-label { color: #fff; }
</style>
