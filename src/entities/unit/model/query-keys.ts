import { queryOptions } from '@tanstack/react-query';

import { getUnits } from '../api/get-units';

export const unitKeys = {
  all: ['units'] as const,
};

export function unitQueryOptions() {
  return queryOptions({
    queryKey: unitKeys.all,
    queryFn: getUnits,
  });
}
