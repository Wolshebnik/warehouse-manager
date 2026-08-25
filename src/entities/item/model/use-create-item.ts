import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createItem } from '../api/create-item';
import { itemKeys } from './query-keys';
import type { CreateItemDto, Item } from './schema';

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateItemDto) => {
      const items = queryClient.getQueryData<Item[]>(itemKeys.all) ?? [];
      const maxSortOrder = items.reduce(
        (max, item) => Math.max(max, item.sort_order ?? 0),
        0,
      );
      const sort_order = dto.sort_order ?? (items.length > 0 ? maxSortOrder + 10 : 10);

      return createItem({
        ...dto,
        sort_order,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
}
