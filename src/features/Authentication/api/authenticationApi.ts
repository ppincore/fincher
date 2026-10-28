import { rtkApi } from '@shared/api/rtkApi';
import {
  AuthenticationData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
} from '../model/types/authentication';

const authenticationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    authByEmail: build.mutation<LoginResponse, AuthenticationData>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterData>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    confirmEmail: build.mutation<void, { token: string }>({
      query: (body) => ({
        url: '/auth/email-confirm',
        method: 'POST',
        body,
      }),
    }),
    sendResetPasswordEmail: build.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/auth/password-reset',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: build.mutation<void, { token: string; password: string }>({
      query: (body) => ({
        url: '/auth/password-reset-confirm',
        method: 'POST',
        body,
      }),
    }),
  }),
});

const useAuthByEmail = authenticationApi.useAuthByEmailMutation;
const useRegister = authenticationApi.useRegisterMutation;
const useConfirmEmail = authenticationApi.useConfirmEmailMutation;
const useSendResetPasswordEmail =
  authenticationApi.useSendResetPasswordEmailMutation;
const useResetPassword = authenticationApi.useResetPasswordMutation;

export {
  useAuthByEmail,
  useRegister,
  useConfirmEmail,
  useSendResetPasswordEmail,
  useResetPassword,
};
