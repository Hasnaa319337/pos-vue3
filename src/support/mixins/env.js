export function env(key, defaultValue = null) {
  console.log(import.meta.env)
  return import.meta.env[key] || defaultValue
}
