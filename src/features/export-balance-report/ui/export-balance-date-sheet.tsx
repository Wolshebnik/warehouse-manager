import { useState } from 'react';
import { View } from 'react-native';

import { dayjs, type Dayjs } from '@/shared/lib/date';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { ButtonBase } from '@/shared/ui/button-base';
import { Calendar } from '@/shared/ui/calendar';

export interface ExportBalanceDateSheetProps {
  isOpen: boolean;
  isExporting?: boolean;
  onClose: () => void;
  onConfirm: (date: Dayjs) => void;
}

export function ExportBalanceDateSheet({
  isOpen,
  isExporting,
  onClose,
  onConfirm,
}: ExportBalanceDateSheetProps) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => dayjs());

  const handleConfirm = () => {
    onConfirm(selectedDate);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title='Дата для скріншота'
    >
      <View className='mb-4'>
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </View>

      <ButtonBase
        disabled={isExporting}
        variant='green'
        onPress={handleConfirm}
      >
        Сформувати скріншот
      </ButtonBase>
    </BottomSheet>
  );
}
