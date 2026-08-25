import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { type GetItemByIdOptions } from '../api/get-item-by-id';
import { itemDetailQueryOptions } from './query-keys';

export function useItemById(id: string, options?: GetItemByIdOptions) {
  return useQuery({
    ...itemDetailQueryOptions(id, options),
    placeholderData: keepPreviousData,
    enabled: Boolean(id),
  });
}

export const useGetItem = useItemById;
