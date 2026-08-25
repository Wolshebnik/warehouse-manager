import { queryOptions } from '@tanstack/react-query';

import { type GetItemByIdOptions, getItemById } from '../api/get-item-by-id';
import { getArchivedItems, getItems } from '../api/get-items';

export const itemKeys = {
  all: ['items'] as const,
  archived: ['items', 'archived'] as const,
  detail: (id: string, options?: GetItemByIdOptions) =>
    ['items', 'detail', id, options] as const,
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
