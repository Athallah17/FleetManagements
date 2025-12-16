
export function log(message, meta = {}) {
  const timestamp = new Date().toISOString()

  console.log(
    `[${timestamp}] ${message}`,
    Object.keys(meta).length ? meta : ''
  )
}

export function error(message, meta = {}) {
  const timestamp = new Date().toISOString()

  console.error(
    `[${timestamp}] ERROR: ${message}`,
    Object.keys(meta).length ? meta : ''
  )
}
