import { useQuery } from '@tanstack/react-query';

import { archivedItemQueryOptions, itemQueryOptions } from './query-keys';

export function useGetItems() {
  return useQuery(itemQueryOptions());
}

export function useGetArchivedItems() {
  return useQuery(archivedItemQueryOptions());
}
