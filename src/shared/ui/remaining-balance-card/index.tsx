import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

export type RemainingBalanceCardType = 'income' | 'expense';
export interface RemainingBalanceCardProps {
  amount: number;
  className?: string;
  title: string;
  type: RemainingBalanceCardType;
  unit: string;
}

const cardClassNames: Record<RemainingBalanceCardType, string> = {
  expense: 'border-red-border bg-red-tint',
  income: 'border-green-border bg-green-tint',
};

const textClassNames: Record<RemainingBalanceCardType, string> = {
  expense: 'text-red',
  income: 'text-green',
};

export function RemainingBalanceCard({
  amount,
  className,
  title,
  type,
  unit,
}: RemainingBalanceCardProps) {
  return (
    <View
      className={cn(
        'flex-row items-center justify-between gap-2 rounded-16 border p-3',
        cardClassNames[type],
        className,
      )}
    >
      <Text className='font-medium text-[13px] text-text-muted'>{title}</Text>
      <View className='flex-row items-baseline gap-1.5'>
        <Text
          className={cn(
            'font-bold text-[26px] leading-7',
            textClassNames[type],
          )}
        >
          {amount.toLocaleString('uk-UA')}
        </Text>

        <Text className={cn('font-bold text-[16px]', textClassNames[type])}>
          {unit}
        </Text>
      </View>
    </View>
  );
}
