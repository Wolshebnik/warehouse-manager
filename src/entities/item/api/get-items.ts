import { supabase } from '@/shared/api/supabase';

import { itemsSchema } from '../model/schema';

async function getItemsByArchivedState(isArchived: boolean): Promise<import('../model/schema').Item[]> {
  const { data, error } = await supabase
    .from('items')
    .select('id, name, description, current_balance, sort_order, is_archived, created_at, updated_at, unit_id, unit:units(id, name, short)')
    .eq('is_archived', isArchived)
    .order('sort_order')
    .order('name');

  if (error) {
    throw error;
  }

  return itemsSchema.parse(data ?? []);
}

export function getItems() {
  return getItemsByArchivedState(false);
}

export function getArchivedItems() {
  return getItemsByArchivedState(true);
}
