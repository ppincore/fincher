import { ElementType } from 'react';

export interface RadioOption<ValueT = string, DataT = object> {
  value: ValueT;
  text: string;
  data?: DataT;
  disabled?: boolean;
  icon?: ElementType;
}
