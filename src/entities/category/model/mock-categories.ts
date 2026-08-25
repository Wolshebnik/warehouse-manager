import type { CategoryStock } from './types';

export const MOCK_CATEGORIES: readonly CategoryStock[] = [
  { id: '1', name: 'Люкс', amount: 15888, unit: 'кг' },
  { id: '2', name: 'Распаровка', amount: 4700, unit: 'кг' },
  { id: '3', name: 'Категория Б', amount: null, unit: 'кг' },
  { id: '4', name: 'Категория В', amount: 5800, unit: 'кг' },
  { id: '5', name: 'Экстра', amount: 12450, unit: 'кг' },
  { id: '6', name: 'Обувь', amount: 3200, unit: 'кг' },
] as const;
