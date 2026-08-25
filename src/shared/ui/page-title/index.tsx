import type { ReactNode } from 'react';

import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

export interface PageTitleProps {
  className?: string;
  rightAction?: ReactNode;
  subtitle?: string;
  title: string;
}

export function PageTitle({
  title,
  subtitle,
  className,
  rightAction,
}: PageTitleProps) {
  return (
    <View
      className={cn(
        rightAction && 'flex-row items-start justify-between gap-4',
        !rightAction && 'gap-1',
        className,
      )}
    >
      <View className='flex-1 gap-1'>
        <Text className='font-bold text-[24px] leading-6 text-text-primary'>
          {title}
        </Text>
        {subtitle && (
          <Text className='font-normal text-[14px] leading-5 text-text-muted'>
            {subtitle}
          </Text>
        )}
      </View>

      {rightAction}
    </View>
  );
}
