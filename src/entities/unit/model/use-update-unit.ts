import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUnit } from '../api/update-unit';
import { unitKeys } from './query-keys';
import type { UpdateUnitDto } from './schema';

export function useUpdateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateUnitDto }) => updateUnit(id, dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: unitKeys.all });
    },
  });
}
