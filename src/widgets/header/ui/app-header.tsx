import type { ReactNode } from 'react';

import { Pressable, View } from 'react-native';

import { Arrow, BoxItems } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

interface AppHeaderProps {
  className?: string;
  onBackPress?: () => void;
  rightAction?: ReactNode;
  title?: string;
}

export function AppHeader({
  className,
  onBackPress,
  rightAction,
  title = 'Облік товару',
}: AppHeaderProps) {
  return (
    <View
      className={cn(
        'h-14 border-b border-border bg-surface px-4',
        className,
      )}
    >
      <View className='relative h-full w-full max-w-2xl flex-row items-center justify-center self-center'>
        {onBackPress && (
          <Pressable
            accessibilityLabel='Назад'
            accessibilityRole='button'
            className='absolute left-0 h-10 w-10 items-center justify-center rounded-12 active:scale-[0.92]'
            hitSlop={8}
            onPress={onBackPress}
          >
            <Arrow className='-rotate-90 text-green' height={24} width={24} />
          </Pressable>
        )}

        <View className='flex-row items-center gap-2.5'>
          <View className='h-8 w-8 items-center justify-center rounded-8 bg-green'>
            <BoxItems className='text-white' height={18} width={18} />
          </View>

          <Text className='font-bold text-[18px] text-text-primary'>{title}</Text>
        </View>

        {rightAction && (
          <View className='absolute right-0 items-center justify-center'>
            {rightAction}
          </View>
        )}
      </View>
    </View>
  );
}
