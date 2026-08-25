import { type Item, type ItemDetails } from '@/entities/item';
import { BottomSheet } from '@/shared/ui/bottom-sheet';

import { ExpenseMaterialForm } from './expense-material-form';

interface ExpenseMaterialSheetProps {
  isOpen: boolean;
  item?: Item | ItemDetails | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ExpenseMaterialSheet({
  isOpen,
  item,
  onClose,
  onSuccess,
}: ExpenseMaterialSheetProps) {
  const sheetTitle = item?.name ? `Списати ${item.name}` : 'Списати матеріал';

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={sheetTitle}
    >
      <ExpenseMaterialForm
        key={`${item?.id ?? 'item'}-${isOpen ? 'open' : 'closed'}`}
        item={item}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </BottomSheet>
  );
}
