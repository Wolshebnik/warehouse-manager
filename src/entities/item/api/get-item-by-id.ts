import { supabase } from '@/shared/api/supabase';

import { type ItemDetails, itemDetailsSchema } from '../model/schema';

export interface GetItemByIdOptions {
  endDate?: string;
  startDate?: string;
}

export async function getItemById(
  id: string,
  options?: GetItemByIdOptions,
): Promise<ItemDetails> {
  let query = supabase
    .from('items')
    .select(`
      id,
      name,
      description,
      current_balance,
      sort_order,
      is_archived,
      created_at,
      updated_at,
      unit_id,
      unit:units (
        id,
        name,
        short
      ),
      movements:stock_movements (
        id,
        item_id,
        type,
        quantity,
        description,
        created_at
      )
    `)
    .eq('id', id);

  if (options?.startDate) {
    query = query.gte('stock_movements.created_at', options.startDate);
  }

  if (options?.endDate) {
    query = query.lte('stock_movements.created_at', options.endDate);
  }

  const { data, error } = await query
    .order('created_at', {
      referencedTable: 'stock_movements',
      ascending: false,
    })
    .single();

  if (error) {
    throw error;
  }

  return itemDetailsSchema.parse(data);
}
