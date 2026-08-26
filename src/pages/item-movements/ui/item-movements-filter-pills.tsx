import { ScrollView, View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { ButtonBase } from '@/shared/ui/button-base';

export type MovementFilterType = 'all' | 'income' | 'expense';

interface FilterOption {
  label: string;
  value: MovementFilterType;
}

const FILTER_OPTIONS: FilterOption[] = [
  { label: 'Всі', value: 'all' },
  { label: 'Прихід', value: 'income' },
  { label: 'Списання', value: 'expense' },
];

interface ItemMovementsFilterPillsProps {
  className?: string;
  onSelect: (value: MovementFilterType) => void;
  selected: MovementFilterType;
}

export function ItemMovementsFilterPills({
  selected,
  onSelect,
  className,
}: ItemMovementsFilterPillsProps) {
  return (
    <View className={cn('mb-4', className)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='flex-row gap-2'
      >
        {FILTER_OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <ButtonBase
              key={option.value}
              accessibilityLabel={option.label}
              accessibilityState={{ selected: isSelected }}
              appearance={isSelected ? 'solid' : 'outline'}
              variant='green'
              size='sm'
              radiusClassName='rounded-12'
              className={cn(
                'px-4 py-2',
                !isSelected && 'border-border bg-surface',
              )}
              textClassName={cn(
                'font-medium text-[14px]',
                isSelected ? 'font-semibold text-white' : 'text-text-primary',
              )}
              onPress={() => onSelect(option.value)}
            >
              {option.label}
            </ButtonBase>
          );
        })}
      </ScrollView>
    </View>
  );
}

