import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Arrow } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { formatMovementDate } from '@/shared/lib/date';
import { Text } from '@/shared/ui/text';

import type { MovementType, StockMovement } from '../model/schema';

interface ItemMovementCardProps {
  className?: string;
  movement: StockMovement;
  onPress?: () => void;
  unit?: string;
}

const iconBgClassNames: Record<MovementType, string> = {
  income: 'bg-green-soft',
  expense: 'bg-red-soft',
};

const amountTextClassNames: Record<MovementType, string> = {
  income: 'text-green',
  expense: 'text-red',
};

const dateTextClassNames: Record<MovementType, string> = {
  income: 'text-green',
  expense: 'text-red',
};

const movementIcons: Record<MovementType, ReactNode> = {
  income: <Arrow className='rotate-180 text-green' height={18} width={18} />,
  expense: <Arrow className='text-red' height={18} width={18} />,
};

function resolveMovementViewData(
  movement: StockMovement,
  fallbackUnit?: string,
) {
  const type = movement.type;
  const title = type === 'income' ? 'Прихід' : 'Списання';
  const meta = formatMovementDate(movement.created_at);
  const note = movement.description ?? undefined;
  const amountVal = movement.quantity.toLocaleString('uk-UA');
  const unitSuffix = fallbackUnit ? ` ${fallbackUnit}` : '';
  const prefix = type === 'income' ? '+' : '-';
  const formattedAmount = `${prefix}${amountVal}${unitSuffix}`;

  return {
    type,
    title,
    meta,
    note,
    formattedAmount,
  };
}

export function ItemMovementCard({
  movement,
  unit,
  onPress,
  className,
}: ItemMovementCardProps) {
  const { type, title, meta, note, formattedAmount } = resolveMovementViewData(
    movement,
    unit,
  );

  return (
    <Pressable
      accessibilityRole='button'
      className={cn(
        'mb-3 flex-row items-center justify-between overflow-hidden rounded-20 border border-border bg-surface p-4 active:bg-neutral-soft',
        className,
      )}
      onPress={onPress}
    >
      <View className='flex-1 flex-row items-start pr-2'>
        <View
          className={cn(
            'mr-3 h-10 w-10 shrink-0 items-center justify-center rounded-full',
            iconBgClassNames[type],
          )}
        >
          {movementIcons[type]}
        </View>

        <View className='flex-1'>
          <Text className='mb-0.5 font-bold text-[15px] text-text-primary'>
            {title}
          </Text>
          <Text
            className={cn(
              'mb-0.5 font-medium text-[13px]',
              dateTextClassNames[type],
            )}
          >
            {meta}
          </Text>
          {Boolean(note) && (
            <Text className='font-normal text-[12px] text-text-muted leading-4'>
              {note}
            </Text>
          )}
        </View>
      </View>

      <View className='shrink-0'>
        <Text className={cn('font-bold text-[15px]', amountTextClassNames[type])}>
          {formattedAmount}
        </Text>
      </View>
    </Pressable>
  );
}
