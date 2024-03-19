export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto extends LoginDto {
  firstName: string
  lastName: string
}

export interface AuthResponseDto {
  token: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
}
