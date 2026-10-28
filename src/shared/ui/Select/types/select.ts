import { ChangeEvent, SelectHTMLAttributes } from 'react';

export type HTMLSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'onChange' | 'value'
>;

export type SelectOnChange<ValueT> = (
  value: ValueT,
  event: ChangeEvent<HTMLSelectElement>,
) => void;

export interface SelectOption<ValueT> {
  value: ValueT;
  label: string;
}
