import { forwardRef } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';

import type { Item } from '@/entities/item';
import { BoxItems, Calendar, Pin } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { formatExportTimestamp, formatFullDate } from '@/shared/lib/date';
import { Text } from '@/shared/ui/text';

import { ExportBalanceReportCard } from './export-balance-report-card';

export interface ExportBalanceReportViewProps {
  className?: string;
  generatedAt?: string | number | Date;
  items: Item[];
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const ExportBalanceReportView = forwardRef<View, ExportBalanceReportViewProps>(
  function ExportBalanceReportView(
    { className, generatedAt, items, onLayout },
    ref,
  ) {
    const activeItems = items
      .filter((item) => !item.is_archived)
      .sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name));
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
        <View className='mb-4 items-center'>
          <View className='mb-2 h-12 w-12 items-center justify-center rounded-12 bg-green'>
            <BoxItems className='text-white' height={24} width={24} />
          </View>
          <Text className='font-bold text-[18px] text-text-primary'>
            Облік товару
          </Text>
        </View>

        <View className='mb-6 items-center'>
          <Text className='mb-1 text-center font-bold text-[20px] leading-6 text-text-primary'>
            {formatFullDate(generatedAt)}
          </Text>

          <View className='mb-2 flex-row items-center gap-1'>
            <Pin className='text-text-muted' height={14} width={14} />
            <Text className='font-medium text-[14px] text-text-muted'>
              Магазин: Захисників України, 7/8
            </Text>
          </View>

          <Text className='font-medium text-[16px] text-text-muted'>
            Поточні залишки
          </Text>
        </View>

        <View className='mb-2'>
          {activeItems.map((item, index) => (
            <ExportBalanceReportCard
              key={item.id}
              colorIndex={index}
              item={item}
              className='mb-3'
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
  },
);
