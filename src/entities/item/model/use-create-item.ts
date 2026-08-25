import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createItem } from '../api/create-item';
import { itemKeys } from './query-keys';
import type { CreateItemDto } from './schema';

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateItemDto) => createItem(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
}
