import { sanitize } from './parser'

export function safeEvaluate(expr) {
  if (!expr || typeof expr !== 'string') throw new Error('Invalid expression')
  const cleaned = sanitize(expr)
  // whitelist digits, operators and parentheses
  if (!/^[0-9+\-*/().\s]+$/.test(cleaned)) throw new Error('Invalid characters')
  // safer Function usage with strict
  // eslint-disable-next-line no-new-func
  const fn = new Function('"use strict"; return (' + cleaned + ')')
  const result = fn()
  if (typeof result !== 'number' || !isFinite(result)) throw new Error('Invalid result')
  return result
}
