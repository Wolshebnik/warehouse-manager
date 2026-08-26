import type { ReactNode } from 'react';

import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

export type MovementSummaryCardType = 'income' | 'expense';
export interface MovementSummaryCardProps {
  amount: string;
  className?: string;
  date?: string;
  description?: string;
  icon: ReactNode;
  time: string;
  title: string;
  type: MovementSummaryCardType;
}

const accentClassNames: Record<MovementSummaryCardType, string> = {
  expense: 'border-l-red',
  income: 'border-l-green',
};

const iconClassNames: Record<MovementSummaryCardType, string> = {
  expense: 'bg-red-soft',
  income: 'bg-green-soft',
};

const amountClassNames: Record<MovementSummaryCardType, string> = {
  expense: 'text-red',
  income: 'text-green',
};

export function MovementSummaryCard({
  amount,
  className,
  description,
  date,
  icon,
  time,
  title,
  type,
}: MovementSummaryCardProps) {
  const normalizedDescription = description?.trim();
  const normalizedDate = date?.trim();

  return (
    <View
      className={cn(
        'mb-3 flex-row items-center overflow-hidden rounded-12 border border-border border-l-4 bg-surface p-4 shadow-card',
        accentClassNames[type],
        className,
      )}
    >
      <View
        className={cn(
          'mr-3 h-10 w-10 shrink-0 items-center justify-center rounded-full',
          iconClassNames[type],
        )}
      >
        {icon}
      </View>

      <View className='min-w-0 flex-1 justify-center'>
        <Text
          className='mb-0.5 font-bold text-[16px] text-text-primary'
          numberOfLines={1}
        >
          {title}
        </Text>

        {Boolean(normalizedDescription) && (
          <Text className='font-normal text-[13px] text-text-muted'>
            {normalizedDescription}
          </Text>
        )}
      </View>

      <View className='mx-3 w-12 items-center justify-center'>
        {Boolean(normalizedDate) && (
          <Text
            className='mb-0.5 font-normal text-[12px] text-text-muted'
            numberOfLines={1}
          >
            {normalizedDate}
          </Text>
        )}
        <Text className='font-normal text-[12px] text-text-muted'>{time}</Text>
      </View>

      <View className='mr-3 w-px self-stretch bg-border' />

      <View className='shrink-0 justify-center'>
        <Text className={cn('font-bold text-[16px]', amountClassNames[type])}>
          {amount}
        </Text>
      </View>
    </View>
  );
}
