import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type HTMLRadioButtonProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange' | 'value' | 'size' | 'checked'
>;

export type OnChangeRadioButton = (
  value: boolean,
  e: React.ChangeEvent<HTMLInputElement>,
) => void;
