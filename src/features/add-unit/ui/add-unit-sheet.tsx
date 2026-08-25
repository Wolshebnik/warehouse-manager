import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { type Unit } from '@/entities/unit';

import { AddUnitForm } from './add-unit-form';

interface AddUnitSheetProps {
  isOpen: boolean;
  onClose: () => void;
  unit?: Unit | null;
}

export function AddUnitSheet({ isOpen, onClose, unit }: AddUnitSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={unit ? 'Редагувати одиницю виміру' : 'Додати одиницю виміру'}
    >
      <AddUnitForm
        key={`${unit?.id ?? 'new'}-${isOpen ? 'open' : 'closed'}`}
        unit={unit}
        onCancel={onClose}
      />
    </BottomSheet>
  );
}
