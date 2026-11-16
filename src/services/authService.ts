import { API_CONFIG } from '../config/constants'
import type { ApiErrorResponse } from '../types/account'
import type { LoginRequest, LoginResponse } from '../types/auth'

export class AuthenticationError extends Error {
  readonly code: string
  readonly fields: Record<string, string>
  readonly status: number

  constructor(error: ApiErrorResponse, status: number) {
    super(error.message)
    this.name = 'AuthenticationError'
    this.code = error.code
    this.fields = error.fields ?? {}
    this.status = status
  }
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const fallback: ApiErrorResponse = {
      code: 'AUTHENTICATION_FAILED',
      message: 'No fue posible iniciar sesión.',
    }
    const error = await response.json().catch(() => fallback) as ApiErrorResponse
    throw new AuthenticationError({ ...fallback, ...error }, response.status)
  }

  return response.json() as Promise<LoginResponse>
}
