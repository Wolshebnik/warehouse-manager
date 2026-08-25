import { supabase } from '@/shared/api/supabase';

export interface CreateStockMovementParams {
  description?: string;
  itemId: string;
  quantity: number;
}

export async function createIncome(params: CreateStockMovementParams) {
  const { data, error } = await supabase
    .rpc('apply_stock_movement', {
      p_item_id: params.itemId,
      p_type: 'income',
      p_quantity: params.quantity,
      p_description: params.description ?? null,
    })
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createExpense(params: CreateStockMovementParams) {
  const { data, error } = await supabase
    .rpc('apply_stock_movement', {
      p_item_id: params.itemId,
      p_type: 'expense',
      p_quantity: params.quantity,
      p_description: params.description ?? null,
    })
    .single();

  if (error) {
    throw error;
  }

  return data;
}
