import type { DayMovementItem } from '@/entities/item';

export interface DayMovementGroup {
  expense: number;
  id: string;
  income: number;
  itemName: string;
  unit: string;
}

export function groupDayMovements(
  movements: DayMovementItem[],
): DayMovementGroup[] {
  const groups = new Map<string, DayMovementGroup>();

  for (const movement of movements) {
    const id = movement.item_id;
    const existing = groups.get(id);
    const unit = movement.item?.unit?.short || movement.item?.unit?.name || 'кг';

    if (existing) {
      existing.income += movement.type === 'income' ? movement.quantity : 0;
      existing.expense += movement.type === 'expense' ? movement.quantity : 0;
      if (existing.unit === 'кг' && unit !== 'кг') {
        existing.unit = unit;
      }
      continue;
    }

    groups.set(id, {
      expense: movement.type === 'expense' ? movement.quantity : 0,
      id,
      income: movement.type === 'income' ? movement.quantity : 0,
      itemName: movement.item?.name ?? 'Товар',
      unit,
    });
  }

  return Array.from(groups.values());
}
