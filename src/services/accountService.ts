import { API_CONFIG } from '../config/constants'
import type { AccountRegistrationRequest, AccountRegistrationResponse, ApiErrorResponse } from '../types/account'

export class AccountRegistrationError extends Error {
  readonly code: string
  readonly fields: Record<string, string>

  constructor(error: ApiErrorResponse) {
    super(error.message)
    this.name = 'AccountRegistrationError'
    this.code = error.code
    this.fields = error.fields ?? {}
  }
}

export async function registerAccount(payload: AccountRegistrationRequest): Promise<AccountRegistrationResponse> {
  const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.accountRegistration}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const fallback: ApiErrorResponse = {
      code: 'REGISTRATION_FAILED',
      message: 'No fue posible crear la cuenta. Inténtalo nuevamente.',
    }
    const error = await response.json().catch(() => fallback) as ApiErrorResponse
    throw new AccountRegistrationError({ ...fallback, ...error })
  }

  return response.json() as Promise<AccountRegistrationResponse>
}
