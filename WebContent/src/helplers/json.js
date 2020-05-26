export function parseJSON (value) {
  try {
    return JSON.parse(value)
  } catch (err) {
    return null
  }
}
