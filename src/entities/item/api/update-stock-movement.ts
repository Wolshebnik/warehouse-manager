import { supabase } from '@/shared/api/supabase';

import type { MovementType } from '../model/schema';

export interface UpdateStockMovementParams {
  description?: string | null;
  itemId: string;
  movementId: string;
  newQuantity: number;
  previousQuantity: number;
  type: MovementType;
}

export async function updateStockMovement({
  description,
  itemId,
  movementId,
  newQuantity,
  previousQuantity,
  type,
}: UpdateStockMovementParams): Promise<void> {
  const { error: movementError } = await supabase
    .from('stock_movements')
    .update({
      quantity: newQuantity,
      description: description?.trim() || null,
    })
    .eq('id', movementId);

  if (movementError) {
    throw movementError;
  }

  const quantityDiff = newQuantity - previousQuantity;
  if (quantityDiff !== 0) {
    const { data: itemData, error: itemFetchError } = await supabase
      .from('items')
      .select('current_balance')
      .eq('id', itemId)
      .single();

    if (itemFetchError) {
      throw itemFetchError;
    }

    const currentBalance = Number(itemData.current_balance ?? 0);
    const balanceAdjustment = type === 'income' ? quantityDiff : -quantityDiff;
    const newBalance = currentBalance + balanceAdjustment;

    const { error: itemUpdateError } = await supabase
      .from('items')
      .update({ current_balance: newBalance })
      .eq('id', itemId);

    if (itemUpdateError) {
      throw itemUpdateError;
    }
  }
}
