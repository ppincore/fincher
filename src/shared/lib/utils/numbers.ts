export function formatAmount(amount: number | string): string {
  return Number(amount).toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
