import { Pressable, View } from 'react-native';

import { Calendar as CalendarIcon, Chevron } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { type Dayjs, formatMonthName } from '@/shared/lib/date';
import { Text } from '@/shared/ui/text';

export interface MonthSelectorProps {
  className?: string;
  month: string | Dayjs;
  onNextMonth?: () => void;
  onPrevMonth?: () => void;
  onResetMonth?: () => void;
  variant?: 'card' | 'plain';
}

export function MonthSelector({
  className,
  month,
  onNextMonth,
  onPrevMonth,
  onResetMonth,
  variant = 'plain',
}: MonthSelectorProps) {
  const monthText = typeof month === 'string' ? month : formatMonthName(month);

  return (
    <View
      className={cn(
        'flex-row items-center justify-between',
        variant === 'card' &&
          'rounded-20 border border-border bg-surface p-3 shadow-card',
        className,
      )}
    >
      <Pressable
        accessibilityLabel='Попередній місяць'
        accessibilityRole='button'
        className='h-9 w-9 items-center justify-center overflow-hidden rounded-full active:opacity-70'
        android_ripple={{
          borderless: false,
          color: 'rgba(0, 0, 0, 0.08)',
        }}
        hitSlop={4}
        onPress={onPrevMonth}
      >
        <Chevron className='rotate-90 text-text-primary' height={18} width={18} />
      </Pressable>

      <Pressable
        accessibilityLabel='Поточний місяць'
        accessibilityRole='button'
        className='flex-row items-center gap-2 active:opacity-70'
        hitSlop={8}
        onPress={onResetMonth}
      >
        <CalendarIcon className='text-text-primary' height={18} width={18} />
        <Text className='font-bold text-[16px] text-text-primary'>
          {monthText}
        </Text>
      </Pressable>

      <Pressable
        accessibilityLabel='Наступний місяць'
        accessibilityRole='button'
        className='h-9 w-9 items-center justify-center overflow-hidden rounded-full active:opacity-70'
        android_ripple={{
          borderless: false,
          color: 'rgba(0, 0, 0, 0.08)',
        }}
        hitSlop={4}
        onPress={onNextMonth}
      >
        <Chevron className='-rotate-90 text-text-primary' height={18} width={18} />
      </Pressable>
    </View>
  );
}
