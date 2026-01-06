<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="box has-background-dark has-text-white">
            <div class="level">
              <div class="level-left">
                <h1 class="title has-text-white">Calculadora</h1>
              </div>
              <div class="level-right">
                <button class="button is-light" @click="toggleScientific">{{ scientificMode ? 'Científica' : 'Básica' }}</button>
              </div>
            </div>

            <CalculatorDisplay :current-value="currentValue" :expression="expression" />

            <div class="columns is-gapless">
              <div class="column is-three-quarters">
                <CalculatorKeyboard @press="handlePress" :scientific="scientificMode" />
              </div>
              <div class="column is-one-quarter">
                <CalculatorHistory :history="history" @clear="clearHistory" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import CalculatorDisplay from './components/CalculatorDisplay.vue'
import CalculatorKeyboard from './components/CalculatorKeyboard.vue'
import CalculatorHistory from './components/CalculatorHistory.vue'
import { useCalculator } from './composables/useCalculator'

const { currentValue, expression, history, appendNumber, appendOperator, calculate, clear, del, appendDot, applyFunction } = useCalculator()

const scientificMode = ref(false)

const toggleScientific = () => {
  scientificMode.value = !scientificMode.value
}

const handlePress = (action) => {
  switch (action.type) {
    case 'number': appendNumber(action.value); break
    case 'operator': appendOperator(action.value); break
    case 'dot': appendDot(); break
    case 'clear': clear(); break
    case 'del': del(); break
    case 'equals': calculate(); break
    case 'func': applyFunction(action.value); break
  }
}

const clearHistory = () => {
  // simple wipe of history in composable
  history.value = []
}
</script>

<style>
.box { transition: all 0.2s ease; }
.title { margin-bottom: 0.5rem; }
</style>
