import { supabase } from '@/shared/api/supabase';

import { createItemSchema } from '../model/schema';

export async function createItem(dto: CreateItemInput): Promise<void> {
  const validated = createItemSchema.parse(dto);

  const { error } = await supabase.from('items').insert(validated);

  if (error) {
    throw error;
  }
}

type CreateItemInput = Parameters<typeof createItemSchema.parse>[0];
