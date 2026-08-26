import { queryOptions } from '@tanstack/react-query';

import type { Dayjs } from '@/shared/lib/date';

import { getDayMovements } from '../api/get-day-movements';
import { type GetItemByIdOptions, getItemById } from '../api/get-item-by-id';
import { getArchivedItems, getItems } from '../api/get-items';
import { getMonthMovements } from '../api/get-month-movements';

export const itemKeys = {
  all: ['items'] as const,
  archived: ['items', 'archived'] as const,
  dayMovements: (date?: string | number | Date | Dayjs) =>
    ['items', 'movements', 'day', String(date ?? '')] as const,
  detail: (id: string, options?: GetItemByIdOptions) =>
    ['items', 'detail', id, options] as const,
  monthMovements: (date?: string | number | Date | Dayjs) =>
    ['items', 'movements', 'month', String(date ?? '')] as const,
};

export function itemQueryOptions() {
  return queryOptions({
    queryKey: itemKeys.all,
    queryFn: getItems,
  });
}

export function archivedItemQueryOptions() {
  return queryOptions({
    queryKey: itemKeys.archived,
    queryFn: getArchivedItems,
  });
}

export function itemDetailQueryOptions(
  id: string,
  options?: GetItemByIdOptions,
) {
  return queryOptions({
    queryKey: itemKeys.detail(id, options),
    queryFn: () => getItemById(id, options),
  });
}

export function dayMovementsQueryOptions(
  date?: string | number | Date | Dayjs,
) {
  return queryOptions({
    queryKey: itemKeys.dayMovements(date),
    queryFn: () => getDayMovements(date),
  });
}

export function monthMovementsQueryOptions(
  date?: string | number | Date | Dayjs,
) {
  return queryOptions({
    queryKey: itemKeys.monthMovements(date),
    queryFn: () => getMonthMovements(date),
  });
}
