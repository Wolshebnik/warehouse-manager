import { View } from 'react-native';

import { Arrow } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

export type StatCardType = 'income' | 'expense';
export type StatCardSize = 'default' | 'compact';

export interface StatCardProps {
  amount: string;
  className?: string;
  radiusClassName?: string;
  size?: StatCardSize;
  title: string;
  type: StatCardType;
}

const cardBgClassNames: Record<StatCardType, string> = {
  expense: 'border-red-border bg-red-tint',
  income: 'border-green-border bg-green-tint',
};

const iconBgClassNames: Record<StatCardType, string> = {
  expense: 'bg-red-soft',
  income: 'bg-green-soft',
};

const textClassNames: Record<StatCardType, string> = {
  expense: 'text-red',
  income: 'text-green',
};

const cardSizeClassNames: Record<StatCardSize, string> = {
  compact: 'p-2.5',
  default: 'p-4',
};

const iconSizeClassNames: Record<StatCardSize, string> = {
  compact: 'mr-2 h-8 w-8',
  default: 'mr-3 h-11 w-11',
};

const titleSizeClassNames: Record<StatCardSize, string> = {
  compact: 'mb-0.5 font-medium text-[11px]',
  default: 'mb-0.5 font-medium text-[13px]',
};

const amountSizeClassNames: Record<StatCardSize, string> = {
  compact: 'font-bold text-[16px]',
  default: 'font-bold text-[19px]',
};

const iconSizes: Record<StatCardSize, number> = {
  compact: 18,
  default: 20,
};

export function StatCard({
  amount,
  className,
  radiusClassName = 'rounded-20',
  size = 'default',
  title,
  type,
}: StatCardProps) {
  const isIncome = type === 'income';

  return (
    <View
      className={cn(
        'flex-1 flex-row items-center border shadow-card',
        radiusClassName,
        cardSizeClassNames[size],
        cardBgClassNames[type],
        className,
      )}
    >
      <View
        className={cn(
          'items-center justify-center rounded-full',
          iconSizeClassNames[size],
          iconBgClassNames[type],
        )}
        style={{ borderRadius: 9999 }}
      >
        <Arrow
          className={cn(isIncome && 'rotate-180', textClassNames[type])}
          height={iconSizes[size]}
          width={iconSizes[size]}
        />
      </View>

      <View className='flex-1'>
        <Text
          className={cn(
            titleSizeClassNames[size],
            textClassNames[type],
          )}
        >
          {title}
        </Text>

        <Text
          className={cn(
            amountSizeClassNames[size],
            textClassNames[type],
          )}
        >
          {amount}
        </Text>
      </View>
    </View>
  );
}
