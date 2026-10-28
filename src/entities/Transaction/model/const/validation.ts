import * as yup from 'yup';
import { TransactionType } from './const';

const baseFormSchema = yup.object({
  transactionType: yup
    .mixed<TransactionType>()
    .oneOf(Object.values(TransactionType))
    .required('Transaction type is required'),
  dateTime: yup.date(),
  description: yup.string().optional(),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required')
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsed = parseFloat(originalValue.replace(',', '.'));
        return Number.isNaN(parsed) ? undefined : parsed;
      }
      return value;
    })
    .min(0, 'Amount must be at least 0')
    .test(
      'max-2-decimals',
      'No more than 2 digits after decimal',
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
    ),
  accountId: yup.string(),
});

const incomeFormSchema = baseFormSchema.shape({
  transactionType: yup.mixed<TransactionType>().oneOf([TransactionType.INCOME]),
  source: yup.string().required('Source is required'),
});

const expenseFormSchema = baseFormSchema.shape({
  transactionType: yup
    .mixed<TransactionType>()
    .oneOf([TransactionType.EXPENSE]),
  fn: yup.number().typeError('FN must be a number').optional(),
  fp: yup.number().typeError('FP must be a number').optional(),
  fd: yup.number().typeError('FD must be a number').optional(),
});

export const entityFormSchema = yup.lazy((value: any) => {
  switch (value?.transactionType) {
    case TransactionType.INCOME:
      return incomeFormSchema;
    case TransactionType.EXPENSE:
      return expenseFormSchema;
    default:
      return baseFormSchema;
  }
});

export const filterFormSchema = yup.object({
  dateTime: yup.date(),
  accountId: yup.string(),
});
