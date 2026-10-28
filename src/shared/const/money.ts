import { getSelectOptionsFromEnum } from '@shared/lib/utils/enum';

export enum Currency {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
  JPY = 'JPY',
  CNY = 'CNY',
  BYN = 'BYN',
}

export const CurrencySymbols: Record<Currency, string> = {
  [Currency.RUB]: '₽',
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.JPY]: '¥',
  [Currency.CNY]: 'CN¥',
  [Currency.BYN]: 'Br',
};

export const currencyOptions = getSelectOptionsFromEnum(Currency);
