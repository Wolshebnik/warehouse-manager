import { supabase } from '@/shared/api/supabase';
import { type Dayjs, getDayDateRange } from '@/shared/lib/date';

import { type DayMovementItem, dayMovementsSchema } from '../model/schema';

export async function getDayMovements(
  date?: string | number | Date | Dayjs,
): Promise<DayMovementItem[]> {
  const range = getDayDateRange(date);

  const { data, error } = await supabase
    .from('stock_movements')
    .select(`
      id,
      item_id,
      type,
      quantity,
      description,
      created_at,
      item:items (
        id,
        name,
        unit:units (
          id,
          name,
          short
        )
      )
    `)
    .gte('created_at', range.startDate)
    .lte('created_at', range.endDate)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return dayMovementsSchema.parse(data ?? []);
}
