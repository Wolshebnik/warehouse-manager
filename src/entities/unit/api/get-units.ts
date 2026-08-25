import { supabase } from '@/shared/api/supabase';
import { type Unit, unitsSchema } from '../model/schema';

export async function getUnits(): Promise<Unit[]> {
  const { data, error } = await supabase
    .from('units')
    .select('id, name, short');

  if (error) {
    throw error;
  }

  return unitsSchema.parse(data ?? []);
}
