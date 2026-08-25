import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';

export interface LoadingViewProps {
  className?: string;
  color?: string;
  size?: 'small' | 'large';
}

export function LoadingView({
  className,
  color = '#257521',
  size = 'large',
}: LoadingViewProps) {
  return (
    <View className={cn('items-center justify-center py-12', className)}>
      <CircularProgressLoader color={color} size={size} />
    </View>
  );
}
