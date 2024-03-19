import type { AxiosResponse } from 'axios'
import { $authApi } from '@/utils/baseHttp'
import type { AuthResponseDto, LoginDto, RegisterDto } from './dto/auth.dto'

export const login = (data: LoginDto) => {
  return $authApi.post<LoginDto, AxiosResponse<AuthResponseDto>>('/login', data)
}

export const register = (data: RegisterDto) => {
  return $authApi.post<RegisterDto, AxiosResponse<AuthResponseDto>>('/register', data)
}
