import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Dayjs } from '@/shared/lib/date';

import { dayMovementsQueryOptions } from './query-keys';

export function useGetDayMovements(date?: string | number | Date | Dayjs) {
  return useQuery({
    ...dayMovementsQueryOptions(date),
    placeholderData: keepPreviousData,
    enabled: Boolean(date),
  });
}
