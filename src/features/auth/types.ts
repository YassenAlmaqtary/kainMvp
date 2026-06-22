/** Login form state & validation errors */
export interface LoginFormData {
  userName: string
  password: string
  rememberMe: boolean
}

export interface FormErrors {
  userName?: string
  password?: string
}

export type { LoginCredentials, User } from '@/shared/types/user'
