export function formatQuantity(value: number): string {
  return new Intl.NumberFormat('uk-UA', {
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
    useGrouping: true,
  }).format(value);
}
