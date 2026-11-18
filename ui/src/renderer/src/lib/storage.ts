/** Safe storage helpers that never throw on QuotaExceededError or disabled storage. */

const memoryStore = new Map<string, string>()

export function safeStorageGet(key: string): string | null {
  try {
    const val = localStorage.getItem(key)
    if (val !== null) return val
  } catch {
    // blocked or unavailable
  }
  try {
    const val = sessionStorage.getItem(key)
    if (val !== null) return val
  } catch {
    // blocked or unavailable
  }
  return memoryStore.get(key) ?? null
}

export function safeStorageSet(key: string, value: string): void {
  memoryStore.set(key, value)
  try {
    localStorage.setItem(key, value)
    return
  } catch {
    // QuotaExceededError or blocked
  }
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // blocked
  }
}

export function safeStorageRemove(key: string): void {
  memoryStore.delete(key)
  try {
    localStorage.removeItem(key)
  } catch {}
  try {
    sessionStorage.removeItem(key)
  } catch {}
}
