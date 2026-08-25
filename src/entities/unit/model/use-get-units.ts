import { useQuery } from '@tanstack/react-query';

import { unitQueryOptions } from './query-keys';

export function useGetUnits() {
  return useQuery(unitQueryOptions());
}
