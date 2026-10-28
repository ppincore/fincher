import { FC, lazy } from 'react';
import { ResetPasswordPageProps } from './ResetPasswordPage';

export const ResetPasswordPageAsync = lazy<FC<ResetPasswordPageProps>>(
  () => import('./ResetPasswordPage'),
);
