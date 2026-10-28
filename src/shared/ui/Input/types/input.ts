import { InputHTMLAttributes } from 'react';

export type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
>;

export type OnInputChange = (
  value: string,
  e: React.ChangeEvent<HTMLInputElement>,
) => void;
