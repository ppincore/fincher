import { User } from '@entities/User';

export interface AuthenticationData {
  email: string;
  password: string;
}

export interface RegisterData extends AuthenticationData {}

export interface RegisterFormData extends RegisterData {
  passwordConfirm: string;
  username: string;
}

export interface LoginResponse {
  accessToken?: string;
  profile: User;
}

export interface RegisterResponse {
  email?: string;
}
