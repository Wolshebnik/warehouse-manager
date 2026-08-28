import { z } from 'zod';

export const editStockMovementFormSchema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, 'Введіть кількість')
    .refine(
      (val) => {
        const num = Number(val.replace(',', '.'));
        return !isNaN(num) && num > 0;
      },
      { message: 'Кількість повинна бути більшою за 0' },
    ),
  comment: z.string().optional(),
});

export type EditStockMovementFormData = z.infer<typeof editStockMovementFormSchema>;
