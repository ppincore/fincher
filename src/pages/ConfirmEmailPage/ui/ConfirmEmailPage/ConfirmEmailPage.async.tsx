import { FC, lazy } from 'react';
import { ConfirmEmailPageProps } from './ConfirmEmailPage';

export const ConfirmEmailPageAsync = lazy<FC<ConfirmEmailPageProps>>(
  () => import('./ConfirmEmailPage'),
);
