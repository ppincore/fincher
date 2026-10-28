import { getSelectOptionsFromEnum } from '@shared/lib/utils/enum';
import { ChipTheme } from '@shared/ui/Chip';

export enum TransactionType {
  EXPENSE = 'Expense',
  INCOME = 'Income',
  // SET = 'Set',
}

export const TransactionChipTheme: Record<TransactionType, ChipTheme> = {
  [TransactionType.EXPENSE]: 'danger',
  [TransactionType.INCOME]: 'successful',
};

export const transactionOptions = getSelectOptionsFromEnum(TransactionType);

export const formId = 'transactionEditor';
export const FormId = { FILTER: 'transactionsFilter' } as const;
