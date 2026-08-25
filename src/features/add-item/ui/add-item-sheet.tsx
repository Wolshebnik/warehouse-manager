import { type Item } from '@/entities/item';
import { BottomSheet } from '@/shared/ui/bottom-sheet';

import { AddItemForm } from './add-item-form';

interface AddItemSheetProps {
  isOpen: boolean;
  item?: Item | null;
  onClose: () => void;
  onRestored?: () => void;
  restoreOnly?: boolean;
}

export function AddItemSheet({
  isOpen,
  item,
  onClose,
  onRestored,
  restoreOnly = false,
}: AddItemSheetProps) {
  let title = 'Додати товар';
  if (restoreOnly) {
    title = 'Відновити товар';
  } else if (item) {
    title = 'Редагувати товар';
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <AddItemForm
        key={`${item?.id ?? 'new'}-${isOpen ? 'open' : 'closed'}`}
        item={item}
        onCancel={onClose}
        onRestored={onRestored}
        restoreOnly={restoreOnly}
      />
    </BottomSheet>
  );
}
