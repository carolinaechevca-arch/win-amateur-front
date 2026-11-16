export interface LoginRequest {
  email: string
  password: string
  deviceId?: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  sessionId: string
  personId: string
  userAccountId: string
  email: string
  status: string
}
