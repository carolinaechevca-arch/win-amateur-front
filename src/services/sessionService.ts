import { STORAGE_KEYS } from '../config/constants'
import type { LoginResponse } from '../types/auth'
import type { TemporarySession } from '../types/session'

export function saveAuthenticatedSession(session: LoginResponse) {
  sessionStorage.setItem(STORAGE_KEYS.authenticatedSession, JSON.stringify(session))
}

export function getAuthenticatedSession(): LoginResponse | null {
  const storedSession = sessionStorage.getItem(STORAGE_KEYS.authenticatedSession)

  if (!storedSession) return null

  try {
    return JSON.parse(storedSession) as LoginResponse
  } catch {
    sessionStorage.removeItem(STORAGE_KEYS.authenticatedSession)
    return null
  }
}

export function getOrCreateDeviceId() {
  const storedDeviceId = sessionStorage.getItem(STORAGE_KEYS.deviceId)

  if (storedDeviceId) return storedDeviceId

  const deviceId = crypto.randomUUID()
  sessionStorage.setItem(STORAGE_KEYS.deviceId, deviceId)
  return deviceId
}

export function saveTemporarySession(session: TemporarySession) {
  sessionStorage.setItem(STORAGE_KEYS.temporarySession, JSON.stringify(session))
}

export function getTemporarySession(): TemporarySession | null {
  const storedSession = sessionStorage.getItem(STORAGE_KEYS.temporarySession)

  if (!storedSession) return null

  try {
    return JSON.parse(storedSession) as TemporarySession
  } catch {
    sessionStorage.removeItem(STORAGE_KEYS.temporarySession)
    return null
  }
}

export function clearTemporarySession() {
  sessionStorage.removeItem(STORAGE_KEYS.authenticatedSession)
  sessionStorage.removeItem(STORAGE_KEYS.deviceId)
  sessionStorage.removeItem(STORAGE_KEYS.temporarySession)
}
