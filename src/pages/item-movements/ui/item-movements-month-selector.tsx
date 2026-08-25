import { Pressable, View } from 'react-native';

import { Calendar, Chevron } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

interface ItemMovementsMonthSelectorProps {
  className?: string;
  month: string;
  onNextMonth?: () => void;
  onPrevMonth?: () => void;
}

export function ItemMovementsMonthSelector({
  month,
  onPrevMonth,
  onNextMonth,
  className,
}: ItemMovementsMonthSelectorProps) {
  return (
    <View
      className={cn(
        'mb-4 flex-row items-center justify-between rounded-20 border border-border bg-surface p-3',
        className,
      )}
    >
      <Pressable
        accessibilityLabel='Попередній місяць'
        accessibilityRole='button'
        className='h-9 w-9 items-center justify-center rounded-full active:bg-neutral-soft'
        onPress={onPrevMonth}
      >
        <Chevron className='rotate-90 text-text-primary' height={18} width={18} />
      </Pressable>

      <View className='flex-row items-center'>
        <Calendar className='mr-2.5 text-text-muted' height={20} width={20} />
        <Text className='font-bold text-[16px] text-text-primary'>
          {month}
        </Text>
      </View>

      <Pressable
        accessibilityLabel='Наступний місяць'
        accessibilityRole='button'
        className='h-9 w-9 items-center justify-center rounded-full active:bg-neutral-soft'
        onPress={onNextMonth}
      >
        <Chevron className='-rotate-90 text-text-primary' height={18} width={18} />
      </Pressable>
    </View>
  );
}
