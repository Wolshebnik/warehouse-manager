import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

export interface PageTitleProps {
  className?: string;
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <View className={cn('gap-1', className)}>
      <Text className='font-bold text-[24px] leading-8 text-text-primary'>
        {title}
      </Text>
      {subtitle && (
        <Text className='font-normal text-[14px] leading-5 text-text-muted'>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
