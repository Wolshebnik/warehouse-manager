import { forwardRef } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';

import {
  type DayMovementItem,
  ItemMovementCard,
} from '@/entities/item';
import { type DayMovementGroup } from '@/pages/history-day/model/group-day-movements';
import { DayMovementGroupCard } from '@/pages/history-day/ui/day-movement-group-card';
import { Calendar, Pin } from '@/shared/assets/svg';
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
  onLayout?: (event: LayoutChangeEvent) => void;
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
    onLayout,
  },
  ref,
) {
  const dateTitle = formatFullDate(dateStr);
  const layoutKey = generatedAt
    ? String(new Date(generatedAt).getTime())
    : undefined;

  return (
    <View
      ref={ref}
      key={layoutKey}
      collapsable={false}
      className={cn('w-[390px] bg-surface px-5 py-6', className)}
      onLayout={onLayout}
    >
      <View className='mb-6 items-center'>
        <Text className='mb-1 text-center font-bold text-[20px] leading-6 text-text-primary'>
          {dateTitle}
        </Text>

        <View className='mb-2 flex-row items-center gap-1'>
          <Pin className='text-text-muted' height={14} width={14} />
          <Text className='font-medium text-[14px] text-text-muted'>
            Магазин: Захисників України, 7/8
          </Text>
        </View>

        <Text className='font-medium text-[16px] text-text-muted'>
          Операції за день
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
