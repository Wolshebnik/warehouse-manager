import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { Text } from '@/shared/ui/text';

export interface ErrorViewProps {
  className?: string;
  isRetrying?: boolean;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorView({
  message = 'Не вдалося завантажити дані.',
  retryText = 'Повторити',
  isRetrying = false,
  onRetry,
  className,
}: ErrorViewProps) {
  return (
    <View
      className={cn(
        'mb-6 items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8',
        className,
      )}
    >
      <Text className='mb-4 text-center font-normal text-[14px] text-text-muted'>
        {message}
      </Text>

      {Boolean(onRetry) && (
        <ButtonLoader
          appearance='outline'
          variant='green'
          loading={isRetrying}
          onPress={onRetry}
        >
          {retryText}
        </ButtonLoader>
      )}
    </View>
  );
}
