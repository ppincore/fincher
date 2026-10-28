import { Currency } from '@shared/const/money';
import * as yup from 'yup';

export const entityFormSchema = yup.object({
  name: yup.string().required('Name is required'),
  currency: yup
    .mixed<Currency>()
    .oneOf(Object.values(Currency), 'Invalid currency')
    .required('Currency is required'),

  balance: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsed = parseFloat(originalValue.replace(',', '.'));
        return Number.isNaN(parsed) ? undefined : parsed;
      }
      return value;
    })
    .typeError('Balance must be a number')
    .min(0, 'Balance must be at least 0')
    .test(
      'max-2-decimals',
      'No more than 2 digits after decimal',
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    )
    .required('Balance is required'),
});
