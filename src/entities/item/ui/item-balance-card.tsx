import { View } from 'react-native';

import { Box } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

interface ItemBalanceCardProps {
  balance: number;
  className?: string;
  title?: string;
  unit?: string;
}

export function ItemBalanceCard({
  balance,
  unit,
  title,
  className,
}: ItemBalanceCardProps) {
  const formattedBalance = balance.toLocaleString('uk-UA');
  const displayUnit = unit ? unit.toUpperCase() : '';

  return (
    <View
      className={cn(
        'relative mb-4 flex-row items-center justify-between overflow-hidden rounded-24 border border-green-border bg-surface p-5',
        className,
      )}
    >
      <View className='z-10 flex-1 pr-2'>
        {Boolean(title) && (
          <Text className='mb-1 font-bold text-[18px] text-text-primary'>
            {title}
          </Text>
        )}
        <Text className='mb-2 font-medium text-[14px] text-text-muted'>
          Поточний залишок
        </Text>
        <View className='flex-row items-baseline gap-1.5'>
          <Text className='font-bold text-[36px] leading-[40px] text-text-primary'>
            {formattedBalance}
          </Text>
          {Boolean(displayUnit) && (
            <Text className='font-bold text-[20px] leading-6.5 text-text-muted'>
              {displayUnit}
            </Text>
          )}
        </View>
      </View>

      <View className='relative h-24 w-28 items-center justify-center'>
        <View className='absolute h-24 w-24 rounded-full bg-green-soft' />
        <Box height={85} width={95} />
      </View>
    </View>
  );
}
