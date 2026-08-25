import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

export interface EmptyViewProps {
  className?: string;
  message: string;
}

export function EmptyView({ message, className }: EmptyViewProps) {
  return (
    <View
      className={cn(
        'mb-6 items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8',
        className,
      )}
    >
      <Text className='font-normal text-[14px] text-text-muted'>
        {message}
      </Text>
    </View>
  );
}
