import { View } from 'react-native';

import { type Dayjs } from '@/shared/lib/date';

import { CalendarDayButton } from './calendar-day-button';
import { CalendarDayMarkers, type CalendarMarkerType } from './calendar-day-markers';

interface CalendarDayCellProps {
  date: Dayjs;
  isCurrentMonth: boolean;
  isSelected: boolean;
  markers?: CalendarMarkerType[];
  onPress: () => void;
}

export function CalendarDayCell({
  date,
  isCurrentMonth,
  isSelected,
  markers = [],
  onPress,
}: CalendarDayCellProps) {
  return (
    <View className='relative h-9 w-9 items-center justify-center'>
      <CalendarDayButton
        date={date}
        isCurrentMonth={isCurrentMonth}
        isSelected={isSelected}
        onPress={onPress}
      />
      {Boolean(isCurrentMonth && markers.length > 0) && (
        <CalendarDayMarkers markers={markers} />
      )}
    </View>
  );
}
