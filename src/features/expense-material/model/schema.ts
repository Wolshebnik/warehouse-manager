import { z } from 'zod';

export const expenseFormSchema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, 'Вкажіть кількість для списання')
    .refine((val) => {
      const num = Number(val.replace(',', '.'));
      return !isNaN(num) && num > 0;
    }, 'Введіть коректне число більше 0'),
  comment: z.string().trim().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;
