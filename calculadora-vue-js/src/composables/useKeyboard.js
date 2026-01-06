import { onMounted, onUnmounted } from 'vue'

export function useKeyboard(handlers) {
  const listener = (e) => {
    const key = e.key
    if (/^[0-9]$/.test(key)) {
      e.preventDefault()
      handlers.number && handlers.number(key)
      return
    }
    if (['+', '-', '*', '/'].includes(key)) {
      e.preventDefault()
      handlers.operator && handlers.operator(key)
      return
    }
    if (key === 'Enter') {
      e.preventDefault()
      handlers.equals && handlers.equals()
      return
    }
    if (key === 'Backspace') {
      e.preventDefault()
      handlers.del && handlers.del()
      return
    }
    if (key === 'Escape') {
      e.preventDefault()
      handlers.clear && handlers.clear()
      return
    }
    if (key === '.') {
      e.preventDefault()
      handlers.dot && handlers.dot()
    }
  }

  onMounted(() => window.addEventListener('keydown', listener))
  onUnmounted(() => window.removeEventListener('keydown', listener))
}
