import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';

export type CalendarMarkerType = 'green' | 'red' | 'income' | 'expense';

interface CalendarDayMarkersProps {
  markers?: CalendarMarkerType[];
}

export function CalendarDayMarkers({ markers = [] }: CalendarDayMarkersProps) {
  const hasIncome = markers.includes('income') || markers.includes('green');
  const hasExpense = markers.includes('expense') || markers.includes('red');

  if (!hasIncome && !hasExpense) {
    return null;
  }

  if (hasIncome && hasExpense) {
    return (
      <View pointerEvents='none' className='absolute inset-0'>
        <View className='absolute -bottom-1.5 left-0.5 h-3 w-3 rounded-full border-2 border-surface bg-green' />
        <View className='absolute -bottom-1.5 right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-red' />
      </View>
    );
  }

  return (
    <View
      pointerEvents='none'
      className='absolute -bottom-1.5 inset-x-0 items-center justify-center'
    >
      <View
        className={cn(
          'h-3 w-3 rounded-full border-2 border-surface',
          hasIncome ? 'bg-green' : 'bg-red',
        )}
      />
    </View>
  );
}

