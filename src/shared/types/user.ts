export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export interface LoginCredentials {
  userName: string
  password: string
  rememberMe: boolean
}
