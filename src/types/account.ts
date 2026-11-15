export interface AccountRegistrationRequest {
  firstName: string
  middleName: string | null
  firstSurname: string
  secondSurname: string | null
  documentCountry: string
  documentType: string
  documentNumber: string
  birthDate: string | null
  email: string
  username: string
  password: string
}

export interface AccountRegistrationResponse {
  personId: string
  userAccountId: string
  email: string
  status: string
  createdAt: string
}

export interface ApiErrorResponse {
  code: string
  message: string
  fields?: Record<string, string>
  timestamp?: string
}
