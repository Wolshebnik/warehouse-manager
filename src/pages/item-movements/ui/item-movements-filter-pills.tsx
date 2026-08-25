import { Pressable, ScrollView, View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

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
            <Pressable
              key={option.value}
              accessibilityRole='button'
              accessibilityState={{ selected: isSelected }}
              className={cn(
                'rounded-12 px-4 py-2',
                isSelected
                  ? 'bg-green'
                  : 'border border-border bg-surface active:bg-neutral-soft',
              )}
              onPress={() => onSelect(option.value)}
            >
              <Text
                className={cn(
                  'font-medium text-[14px]',
                  isSelected ? 'text-white font-semibold' : 'text-text-primary',
                )}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
