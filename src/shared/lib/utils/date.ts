export function formatDateTime(input: string | Date): string {
  const date = new Date(input);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // месяцы с 0
  const year = date.getFullYear().toString().slice(2); // последние 2 цифры
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
