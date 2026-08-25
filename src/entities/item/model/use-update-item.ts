import { useMutation, useQueryClient } from '@tanstack/react-query';

import { archiveItem, restoreItem, updateItem } from '../api/update-item';
import { itemKeys } from './query-keys';
import type { UpdateItemDto } from './schema';

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateItemDto }) => updateItem(id, dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
}

export function useArchiveItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
}

export function useRestoreItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
}
