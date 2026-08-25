import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createUnit } from '../api/create-unit';
import { unitKeys } from './query-keys';
import type { CreateUnitDto } from './schema';

export function useCreateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateUnitDto) => createUnit(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: unitKeys.all });
    },
  });
}
