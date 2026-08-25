import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createExpense,
  createIncome,
  type CreateStockMovementParams,
} from '../api/apply-stock-movement';
import { itemKeys } from './query-keys';

export function useCreateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateStockMovementParams) => createIncome(params),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: itemKeys.all });
      void queryClient.invalidateQueries({
        queryKey: ['items', 'detail', variables.itemId],
      });
    },
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateStockMovementParams) => createExpense(params),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: itemKeys.all });
      void queryClient.invalidateQueries({
        queryKey: ['items', 'detail', variables.itemId],
      });
    },
  });
}
