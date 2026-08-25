import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reorderItems } from '../api/reorder-items';
import { itemKeys } from './query-keys';
import { type Item } from './schema';

export function useReorderItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reorderedItems: Item[]) =>
      reorderItems(
        reorderedItems.map(({ id, sort_order }) => ({ id, sort_order })),
      ),
    onMutate: async (reorderedItems: Item[]) => {
      await queryClient.cancelQueries({ queryKey: itemKeys.all, exact: true });

      const previousItems = queryClient.getQueryData<Item[]>(itemKeys.all);

      queryClient.setQueryData<Item[]>(itemKeys.all, reorderedItems);

      return { previousItems };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(itemKeys.all, context.previousItems);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: itemKeys.all, exact: true });
    },
  });
}
