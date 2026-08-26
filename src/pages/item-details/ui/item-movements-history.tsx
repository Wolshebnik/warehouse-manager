import { View } from 'react-native';

import {
  ItemMovementCard,
  type StockMovement,
} from '@/entities/item';
import { ButtonBase } from '@/shared/ui/button-base';
import { EmptyView } from '@/shared/ui/empty-view';
import { Text } from '@/shared/ui/text';

interface ItemMovementsHistoryProps {
  className?: string;
  itemName?: string;
  movements: StockMovement[];
  onShowAllPress?: () => void;
  unit?: string;
}

export function ItemMovementsHistory({
  className,
  itemName,
  movements,
  onShowAllPress,
  unit,
}: ItemMovementsHistoryProps) {
  return (
    <View className={className}>
      <View className='mb-3 flex-row items-center justify-between gap-2'>
        <Text
          className='flex-1 font-bold text-[16px] text-text-primary'
          numberOfLines={1}
        >
          Рухи за цей місяць
        </Text>

        {Boolean(onShowAllPress) && (
          <ButtonBase
            accessibilityLabel='Показати всі рухи'
            appearance='solid'
            variant='green'
            size='sm'
            radiusClassName='rounded-full'
            className='h-8 shrink-0 px-3.5 py-0'
            onPress={onShowAllPress}
          >
            Всі рухи
          </ButtonBase>
        )}
      </View>

      {movements.length === 0 && (
        <EmptyView message='Рухів ще немає' />
      )}

      {movements.map((movement) => (
        <ItemMovementCard
          key={movement.id}
          className='mb-1.5'
          movement={movement}
          title={itemName}
          unit={unit}
        />
      ))}
    </View>
  );
}
