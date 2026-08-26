import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Dayjs } from '@/shared/lib/date';

import { monthMovementsQueryOptions } from './query-keys';

export function useGetMonthMovements(date?: string | number | Date | Dayjs) {
  return useQuery({
    ...monthMovementsQueryOptions(date),
    placeholderData: keepPreviousData,
    enabled: Boolean(date),
  });
}
