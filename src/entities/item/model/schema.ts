import { z } from 'zod';

export const itemUnitSchema = z.object({
  id: z.string(),
  name: z.string(),
  short: z.string(),
});

export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  current_balance: z.number(),
  sort_order: z.number(),
  is_archived: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  unit_id: z.string(),
  unit: itemUnitSchema,
});

export const itemsSchema = z.array(itemSchema);

export const createItemSchema = z.object({
  name: z.string().trim().min(1, 'Введіть назву'),
  description: z.string().trim().nullable().optional(),
  unit_id: z.string().min(1, 'Оберіть одиницю виміру'),
  sort_order: z.number().optional(),
});

export const updateItemSchema = z.object({
  name: z.string().trim().min(1, 'Введіть назву').optional(),
  description: z.string().trim().nullable().optional(),
  unit_id: z.string().min(1, 'Оберіть одиницю виміру').optional(),
  sort_order: z.number().optional(),
  is_archived: z.boolean().optional(),
});

export type Item = z.infer<typeof itemSchema>;
export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
