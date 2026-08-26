import { View } from 'react-native';

import type { Item } from '@/entities/item';
import { BoxItems } from '@/shared/assets/svg';
import { getPastelColorByIndex } from '@/shared/config/pastel-colors';
import { cn } from '@/shared/lib/cn';
import { formatQuantity } from '@/shared/lib/format-number';
import { Text } from '@/shared/ui/text';

interface ExportBalanceReportCardProps {
  className?: string;
  colorIndex: number;
  item: Item;
}

export function ExportBalanceReportCard({
  className,
  colorIndex,
  item,
}: ExportBalanceReportCardProps) {
  const activeColor = getPastelColorByIndex(colorIndex);
  const unitText = item.unit?.short || item.unit?.name || '';
  const hasPositiveBalance = item.current_balance > 0;

  return (
    <View
      className={cn(
        'flex-row items-stretch overflow-hidden rounded-16 border bg-surface',
        className,
      )}
      style={{ borderColor: activeColor.border }}
    >
      <View
        className='w-20 items-center justify-center'
        style={{ backgroundColor: activeColor.soft }}
      >
        <BoxItems color={activeColor.primary} height={36} width={36} />
      </View>

      <View className='flex-1 justify-between px-4 py-3.5'>
        <View className='mb-2 flex-row'>
          <View
            className='rounded-6 px-2.5 py-0.5'
            style={{ backgroundColor: activeColor.soft }}
          >
            <Text
              className='font-medium text-[11px]'
              style={{ color: activeColor.primary }}
            >
              Категорія
            </Text>
          </View>
        </View>

        <View className='flex-row items-baseline justify-between'>
          <Text
            className='flex-1 pr-2 font-bold text-[18px] text-text-primary'
            numberOfLines={1}
          >
            {item.name}
          </Text>

          {hasPositiveBalance && (
            <View className='flex-row items-baseline gap-1 shrink-0'>
              <Text className='font-bold text-[20px] text-text-primary'>
                {formatQuantity(item.current_balance)}
              </Text>
              {Boolean(unitText) && (
                <Text className='font-normal text-[14px] text-text-muted'>
                  {unitText}
                </Text>
              )}
            </View>
          )}

          {!hasPositiveBalance && (
            <Text className='font-normal text-[16px] text-text-muted'>
              немає
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
