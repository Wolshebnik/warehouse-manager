import { Pressable } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { type Dayjs } from '@/shared/lib/date';
import { Text } from '@/shared/ui/text';

export interface CalendarDayButtonProps {
  date: Dayjs;
  isCurrentMonth: boolean;
  isSelected: boolean;
  onPress: () => void;
}

function getDayTextClassName(isSelected: boolean, isCurrentMonth: boolean): string {
  if (isSelected) {
    return 'font-semibold text-white';
  }
  if (isCurrentMonth) {
    return 'font-medium text-text-primary';
  }
  return 'font-regular text-neutral';
}

export function CalendarDayButton({
  date,
  isCurrentMonth,
  isSelected,
  onPress,
}: CalendarDayButtonProps) {
  return (
    <Pressable
      accessibilityLabel={date.format('D MMMM YYYY')}
      accessibilityRole='button'
      className={cn(
        'h-9 w-9 items-center justify-center rounded-full active:opacity-75',
        isSelected ? 'bg-green' : 'bg-transparent',
      )}
      hitSlop={4}
      onPress={onPress}
    >
      <Text
        className={cn(
          'text-[15px]',
          getDayTextClassName(isSelected, isCurrentMonth),
        )}
      >
        {date.format('D')}
      </Text>
    </Pressable>
  );
}

