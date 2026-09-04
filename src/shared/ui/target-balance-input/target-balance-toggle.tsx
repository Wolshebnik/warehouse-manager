import { View } from 'react-native';

import { ButtonBase } from '@/shared/ui/button-base';

import type { TargetBalanceInputType } from './target-balance-input';

export interface TargetBalanceToggleProps {
  isOpen: boolean;
  onPress: () => void;
  type: TargetBalanceInputType;
}

export function TargetBalanceToggle({
  isOpen,
  onPress,
  type,
}: TargetBalanceToggleProps) {
  return (
    <View className='flex-1 self-stretch'>
      <ButtonBase
        appearance='outline'
        className='min-h-[48px] self-stretch w-full px-1'
        onPress={onPress}
        size='sm'
        textClassName='text-[12px] leading-4'
        variant={type === 'income' ? 'green' : 'red'}
      >
        {isOpen ? 'Сховати' : 'Калькулятор'}
      </ButtonBase>
    </View>
  );
}
