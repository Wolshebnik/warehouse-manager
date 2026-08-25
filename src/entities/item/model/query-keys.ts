import { queryOptions } from '@tanstack/react-query';

import { getArchivedItems, getItems } from '../api/get-items';

export const itemKeys = {
  all: ['items'] as const,
  archived: ['items', 'archived'] as const,
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
