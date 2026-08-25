import { supabase } from '@/shared/api/supabase';

import { updateItemSchema, type UpdateItemDto } from '../model/schema';

export async function updateItem(id: string, dto: UpdateItemDto): Promise<void> {
  const validated = updateItemSchema.parse(dto);
  const { error } = await supabase.from('items').update(validated).eq('id', id);

  if (error) {
    throw error;
  }
}

export function archiveItem(id: string): Promise<void> {
  return updateItem(id, { is_archived: true });
}

export function restoreItem(id: string): Promise<void> {
  return updateItem(id, { is_archived: false });
}
