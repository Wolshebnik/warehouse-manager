import { supabase } from '@/shared/api/supabase';

export interface ReorderItemInput {
  id: string;
  sort_order: number;
}

export async function reorderItems(items: ReorderItemInput[]): Promise<void> {
  const results = await Promise.all(
    items.map(({ id, sort_order }) =>
      supabase
        .from('items')
        .update({ sort_order })
        .eq('id', id),
    ),
  );

  const failedResult = results.find((res) => res.error);
  if (failedResult?.error) {
    throw failedResult.error;
  }
}
