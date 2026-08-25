import { Pressable, View } from 'react-native';

import { Arrow } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

export type ItemActionType = 'income' | 'expense';
interface ItemActionCardProps {
  className?: string;
  onPress?: () => void;
  subtitle?: string;
  title?: string;
  type: ItemActionType;
}

export function ItemActionCard({
  type,
  title,
  subtitle,
  onPress,
  className,
}: ItemActionCardProps) {
  const isIncome = type === 'income';
  const displayTitle = title ?? (isIncome ? 'Прихід' : 'Списання');
  const displaySubtitle =
    subtitle ??
    (isIncome ? 'Додати матеріал на склад' : 'Списати матеріал зі складу');

  return (
    <Pressable
      accessibilityLabel={displayTitle}
      accessibilityRole='button'
      className={cn(
        'flex-1 items-center justify-center overflow-hidden rounded-20 border p-4 active:scale-[0.98]',
        isIncome
          ? 'border-green-border bg-green-tint'
          : 'border-red-border bg-red-tint',
        className,
      )}
      onPress={onPress}
    >
      <View
        className={cn(
          'mb-2.5 h-11 w-11 items-center justify-center rounded-full',
          isIncome ? 'bg-green' : 'bg-red',
        )}
      >
        <Arrow
          className={cn(isIncome && 'rotate-180', 'text-white')}
          height={22}
          width={22}
        />
      </View>

      <Text
        className={cn(
          'mb-1 text-center font-bold text-[17px]',
          isIncome ? 'text-green' : 'text-red',
        )}
      >
        {displayTitle}
      </Text>

      <Text className='text-center font-normal text-[13px] text-text-muted leading-4'>
        {displaySubtitle}
      </Text>
    </Pressable>
  );
}
