import { Currency, CurrencySymbols } from '@shared/const/money';
import { formatAmount } from './numbers';

export function formatMoneyNumber(num: number, currency?: Currency) {
  const currencySymbol = currency ? ` ${CurrencySymbols[currency]}` : '';
  const amount = formatAmount(num);
  return `${amount}${currencySymbol}`;
}
