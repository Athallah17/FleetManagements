export function generateCode(prefix = '') {
  return (
    prefix +
    Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()
  )
}