const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

if (!configuredApiBaseUrl) {
  throw new Error('La variable VITE_API_BASE_URL no está definida.')
}

export const API_CONFIG = {
  baseUrl: configuredApiBaseUrl.replace(/\/$/, ''),
  endpoints: {
    accountRegistration: '/api/v1/accounts',
    login: '/api/v1/auth/login',
  },
} as const

export const APP_ROUTES = {
  auth: '/',
  dashboard: '/app',
} as const

export const STORAGE_KEYS = {
  authenticatedSession: 'win-amateur:authenticated-session',
  deviceId: 'win-amateur:device-id',
  temporarySession: 'win-amateur:temporary-session',
} as const

export const FORM_CONSTRAINTS = {
  personNameMaxLength: 100,
  countryCodeLength: 2,
  documentNumberMaxLength: 60,
  emailMaxLength: 254,
  usernameMaxLength: 100,
  passwordMinLength: 8,
  passwordMaxLength: 72,
} as const

export const VALIDATION_PATTERNS = {
  countryCode: '[A-Za-z]{2}',
  password: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,72}',
} as const

export const DOCUMENT_TYPES = [
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'TI', label: 'Tarjeta de identidad' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'PASS', label: 'Pasaporte' },
  { value: 'OTRO', label: 'Otro' },
] as const

export const MAX_BIRTH_DATE = new Date().toISOString().slice(0, 10)
