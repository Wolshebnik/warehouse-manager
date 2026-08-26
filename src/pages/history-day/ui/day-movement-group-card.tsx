import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { StatCard } from '@/shared/ui/stat-card';
import { Text } from '@/shared/ui/text';

import type { DayMovementGroup } from '../model/group-day-movements';

interface DayMovementGroupCardProps {
  className?: string;
  group: DayMovementGroup;
}

export function DayMovementGroupCard({
  group,
  className,
}: DayMovementGroupCardProps) {
  return (
    <View
      className={cn(
        'mb-2 rounded-20 border border-border bg-surface p-3 shadow-card',
        className,
      )}
    >
      <Text className='mb-2 font-bold text-[16px] text-text-primary'>
        {group.itemName}
      </Text>

      <View className='flex-row gap-2'>
        <StatCard
          radiusClassName='rounded-10'
          size='compact'
          type='income'
          title='Приходи'
          amount={`+${group.income.toLocaleString('uk-UA')} ${group.unit}`}
        />
        <StatCard
          radiusClassName='rounded-10'
          size='compact'
          type='expense'
          title='Списання'
          amount={`−${group.expense.toLocaleString('uk-UA')} ${group.unit}`}
        />
      </View>
    </View>
  );
}
