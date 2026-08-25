import { type Item, type ItemDetails } from '@/entities/item';
import { BottomSheet } from '@/shared/ui/bottom-sheet';

import { IncomeMaterialForm } from './income-material-form';

interface IncomeMaterialSheetProps {
  isOpen: boolean;
  item?: Item | ItemDetails | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function IncomeMaterialSheet({
  isOpen,
  item,
  onClose,
  onSuccess,
}: IncomeMaterialSheetProps) {
  const sheetTitle = item?.name ? `Додати ${item.name}` : 'Додати матеріал';

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={sheetTitle}
    >
      <IncomeMaterialForm
        key={`${item?.id ?? 'item'}-${isOpen ? 'open' : 'closed'}`}
        item={item}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </BottomSheet>
  );
}
