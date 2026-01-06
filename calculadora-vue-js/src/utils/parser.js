export function sanitize(expr) {
  // remove any character that's not a digit, operator, dot or paren
  return String(expr).replace(/[^0-9+\-*/().\s]/g, '')
}
