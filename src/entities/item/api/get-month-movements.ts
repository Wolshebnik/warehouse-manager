import { supabase } from '@/shared/api/supabase';
import { type Dayjs, getMonthDateRange } from '@/shared/lib/date';

import { type MonthMovement, monthMovementsSchema } from '../model/schema';

export async function getMonthMovements(
  date?: string | number | Date | Dayjs,
): Promise<MonthMovement[]> {
  const range = getMonthDateRange(date);

  const { data, error } = await supabase
    .from('stock_movements')
    .select('id, type, created_at')
    .gte('created_at', range.startDate)
    .lte('created_at', range.endDate);

  if (error) {
    throw error;
  }

  return monthMovementsSchema.parse(data ?? []);
}
