import {
  type DayMovementItem,
  type Item,
  type ItemDetails,
  type StockMovement,
} from '@/entities/item';
import { BottomSheet } from '@/shared/ui/bottom-sheet';

import { EditStockMovementForm } from './edit-stock-movement-form';

interface MovementItemInfo {
  current_balance?: number;
  id?: string;
  name?: string;
  unit?: { id?: string; name: string; short: string } | null;
}

export interface EditStockMovementSheetProps {
  isOpen: boolean;
  item?: Item | ItemDetails | MovementItemInfo | null;
  movement?: StockMovement | DayMovementItem | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EditStockMovementSheet({
  isOpen,
  item,
  movement,
  onClose,
  onSuccess,
}: EditStockMovementSheetProps) {
  if (!movement) {
    return null;
  }

  const itemName =
    item?.name ||
    ('item' in movement && movement.item?.name) ||
    '';
  const isIncome = movement.type === 'income';
  const actionTitle = isIncome ? 'Редагувати прихід' : 'Редагувати списання';
  const sheetTitle = itemName ? `${actionTitle}: ${itemName}` : actionTitle;

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={sheetTitle}
    >
      <EditStockMovementForm
        key={`${movement.id}-${isOpen ? 'open' : 'closed'}`}
        item={item}
        movement={movement}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </BottomSheet>
  );
}
