import { supabase } from '@/shared/api/supabase';
import { type UpdateUnitDto, updateUnitSchema, type Unit, unitSchema } from '../model/schema';

export async function updateUnit(id: string, dto: UpdateUnitDto): Promise<Unit> {
  const validated = updateUnitSchema.parse(dto);

  const { data, error } = await supabase
    .from('units')
    .update(validated)
    .eq('id', id)
    .select('id, name, short')
    .single();

  if (error) {
    throw error;
  }

  return unitSchema.parse(data);
}
