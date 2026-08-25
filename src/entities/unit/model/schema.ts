import { z } from 'zod';

export const unitSchema = z.object({
  id: z.string(),
  name: z.string(),
  short: z.string(),
});

export const unitsSchema = z.array(unitSchema);

export const createUnitSchema = z.object({
  name: z.string().trim().min(1, 'Введіть назву'),
  short: z.string().trim().min(1, 'Введіть скорочення'),
});

export const updateUnitSchema = z.object({
  name: z.string().trim().min(1, 'Введіть назву').optional(),
  short: z.string().trim().min(1, 'Введіть скорочення').optional(),
});

export type Unit = z.infer<typeof unitSchema>;
export type CreateUnitDto = z.infer<typeof createUnitSchema>;
export type UpdateUnitDto = z.infer<typeof updateUnitSchema>;
