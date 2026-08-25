import { supabase } from '@/shared/api/supabase';
import { type CreateUnitDto, createUnitSchema } from '../model/schema';

export async function createUnit(dto: CreateUnitDto): Promise<void> {
  const validated = createUnitSchema.parse(dto);

  const { error } = await supabase
    .from('units')
    .insert(validated);

  if (error) {
    throw error;
  }
}

