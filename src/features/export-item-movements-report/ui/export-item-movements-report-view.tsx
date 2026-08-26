import { forwardRef } from 'react';
import { View } from 'react-native';

import {
  ItemBalanceCard,
  ItemMovementCard,
  type StockMovement,
} from '@/entities/item';
import { BoxItems, Calendar, Pin } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { formatExportTimestamp } from '@/shared/lib/date';
import { Text } from '@/shared/ui/text';

export interface ExportItemMovementsReportViewProps {
  balance: number;
  className?: string;
  filterLabel?: string;
  generatedAt?: string | number | Date;
  itemName: string;
  month: string;
  movements: StockMovement[];
  unit?: string;
}

export const ExportItemMovementsReportView = forwardRef<
  View,
  ExportItemMovementsReportViewProps
>(function ExportItemMovementsReportView(
  {
    balance,
    className,
    filterLabel = 'Всі рухи',
    generatedAt,
    itemName,
    month,
    movements,
    unit,
  },
  ref,
) {
  return (
    <View
      ref={ref}
      collapsable={false}
      className={cn('w-[390px] bg-background p-4', className)}
    >
      <View className='mb-4 items-center'>
        <View className='mb-2 h-12 w-12 items-center justify-center rounded-12 bg-green'>
          <BoxItems className='text-white' height={24} width={24} />
        </View>
        <Text className='font-bold text-[18px] text-text-primary'>
          Облік товару
        </Text>
        <View className='mt-1 flex-row items-center gap-1'>
          <Pin className='text-text-muted' height={14} width={14} />
          <Text className='font-medium text-[13px] text-text-muted'>
            Магазин: Захисників України, 7/8
          </Text>
        </View>
      </View>

      <ItemBalanceCard
        balance={balance}
        className='mb-4'
        title={itemName}
        unit={unit}
      />

      <View className='mb-4 flex-row items-center justify-between rounded-16 border border-border bg-surface px-4 py-3'>
        <View className='flex-row items-center gap-2'>
          <Calendar className='text-green' height={18} width={18} />
          <Text className='font-bold text-[15px] text-text-primary'>
            {month}
          </Text>
        </View>

        <View className='rounded-8 bg-green-soft px-2.5 py-1'>
          <Text className='font-semibold text-[13px] text-green'>
            {filterLabel}
          </Text>
        </View>
      </View>

      <View className='mb-2'>
        {movements.length === 0 && (
          <View className='items-center justify-center rounded-16 border border-border bg-surface py-8'>
            <Text className='font-medium text-[15px] text-text-muted'>
              Рухів за вибраним фільтром не знайдено
            </Text>
          </View>
        )}

        {movements.map((movement) => (
          <ItemMovementCard
            key={movement.id}
            className='mb-3'
            movement={movement}
            unit={unit || ''}
          />
        ))}
      </View>

      <View className='border-t border-border pt-4 flex-row items-center justify-center gap-1.5'>
        <Calendar className='text-text-muted' height={16} width={16} />
        <Text className='text-[12px] text-text-muted'>
          Сформовано {formatExportTimestamp(generatedAt)}
        </Text>
      </View>
    </View>
  );
});
