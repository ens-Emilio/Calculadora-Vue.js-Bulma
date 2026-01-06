import { ref, watchEffect } from 'vue'
import { safeEvaluate } from '../utils/math'

export function useCalculator() {
  const currentValue = ref('0')
  const expression = ref('')
  const history = ref([])

  const pushToExpression = (s) => {
    if (expression.value === '' && s === '0') {
      currentValue.value = '0'
      return
    }
    expression.value += String(s)
    currentValue.value = expression.value
  }

  const appendNumber = (num) => {
    if (currentValue.value === '0') currentValue.value = String(num)
    pushToExpression(num)
  }

  const appendDot = () => {
    // simple guard
    if (!expression.value.endsWith('.')) pushToExpression('.')
  }

  const appendOperator = (op) => {
    if (!expression.value) return
    if (/[+\-*/]$/.test(expression.value)) {
      expression.value = expression.value.slice(0, -1) + op
    } else {
      pushToExpression(op)
    }
    currentValue.value = expression.value
  }

  const clear = () => {
    expression.value = ''
    currentValue.value = '0'
  }

  const del = () => {
    expression.value = expression.value.slice(0, -1)
    currentValue.value = expression.value || '0'
  }

  const applyFunction = (fn) => {
    try {
      const val = safeEvaluate(expression.value || currentValue.value)
      let result = val
      if (fn === 'sqrt') result = Math.sqrt(val)
      if (fn === 'sin') result = Math.sin(val)
      if (fn === 'cos') result = Math.cos(val)
      if (fn === 'tan') result = Math.tan(val)
      expression.value = String(parseFloat(result.toFixed(10)))
      currentValue.value = expression.value
      history.value.unshift({ expr: fn + '(' + val + ')', result: expression.value })
    } catch (e) {
      currentValue.value = 'Error'
      setTimeout(() => clear(), 1200)
    }
  }

  const calculate = () => {
    try {
      const result = safeEvaluate(expression.value)
      history.value.unshift({ expr: expression.value, result })
      expression.value = String(parseFloat(result.toFixed ? result.toFixed(10) : result))
      currentValue.value = expression.value
    } catch (e) {
      currentValue.value = 'Error'
      setTimeout(() => clear(), 1200)
    }
  }

  // persist history (limit 50)
  watchEffect(() => {
    try {
      localStorage.setItem('calc_history', JSON.stringify(history.value.slice(0, 50)))
    } catch (e) { /* ignore */ }
  })

  // hydrate
  try {
    const saved = JSON.parse(localStorage.getItem('calc_history') || '[]')
    if (Array.isArray(saved)) history.value = saved
  } catch (e) {}

  return { currentValue, expression, history, appendNumber, appendOperator, appendDot, clear, del, calculate, applyFunction }
}
