import { forwardRef } from 'react';
import { View } from 'react-native';

import {
  type DayMovementItem,
  ItemMovementCard,
} from '@/entities/item';
import { type DayMovementGroup } from '@/pages/history-day/model/group-day-movements';
import { DayMovementGroupCard } from '@/pages/history-day/ui/day-movement-group-card';
import { BoxItems, Calendar, Pin } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import {
  formatExportTimestamp,
  formatFullDate,
  formatMovementTime,
} from '@/shared/lib/date';
import { Text } from '@/shared/ui/text';

export interface ExportDayMovementsReportViewProps {
  className?: string;
  dateStr: string;
  generatedAt?: string | number | Date;
  groups: DayMovementGroup[];
  movements: DayMovementItem[];
}

export const ExportDayMovementsReportView = forwardRef<
  View,
  ExportDayMovementsReportViewProps
>(function ExportDayMovementsReportView(
  {
    className,
    dateStr,
    generatedAt,
    groups,
    movements,
  },
  ref,
) {
  const dateTitle = formatFullDate(dateStr);

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

      <View className='mb-4 items-center'>
        <Text className='text-center font-bold text-[20px] leading-6 text-text-primary'>
          {dateTitle}
        </Text>
      </View>

      <View className='mb-4'>
        {groups.map((group) => (
          <DayMovementGroupCard key={group.id} group={group} />
        ))}
      </View>

      {movements.length > 0 && (
        <View className='mb-2'>
          <Text className='mb-2 font-bold text-[16px] text-text-primary'>
            Усі операції за день
          </Text>

          {movements.map((movement) => (
            <ItemMovementCard
              key={movement.id}
              className='mb-1.5'
              movement={movement}
              showDate={false}
              title={movement.item?.name ?? 'Товар'}
              time={formatMovementTime(movement.created_at)}
              unit={
                movement.item?.unit?.short ||
                movement.item?.unit?.name ||
                ''
              }
            />
          ))}
        </View>
      )}

      <View className='border-t border-border pt-4 flex-row items-center justify-center gap-1.5'>
        <Calendar className='text-text-muted' height={16} width={16} />
        <Text className='text-[12px] text-text-muted'>
          Сформовано {formatExportTimestamp(generatedAt)}
        </Text>
      </View>
    </View>
  );
});
