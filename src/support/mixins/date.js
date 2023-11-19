export function date(format = null) {
  return new Date().toISOString().split('T')[0]
}
