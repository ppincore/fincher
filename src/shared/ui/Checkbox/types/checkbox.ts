import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type HTMLCheckboxProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange' | 'value' | 'size' | 'checked'
>;

export type OnChangeCheckbox = (
  value: boolean,
  e: React.ChangeEvent<HTMLInputElement>,
) => void;
