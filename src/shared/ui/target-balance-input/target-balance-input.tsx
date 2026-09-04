import { useState } from 'react';

import { formatQuantity } from '@/shared/lib/format-number';
import { InputBase } from '@/shared/ui/input-base';
import { Text } from '@/shared/ui/text';

import { getTargetBalanceDisplay } from './lib/get-target-balance-display';

export type TargetBalanceInputType = 'income' | 'expense';

export interface TargetBalanceInputProps {
  amount: string;
  currentBalance: number;
  isOpen: boolean;
  onQuantityChange: (value: string) => void;
  type: TargetBalanceInputType;
  unit: string;
}

export function TargetBalanceInput({
  amount,
  currentBalance,
  isOpen,
  onQuantityChange,
  type,
  unit,
}: TargetBalanceInputProps) {
  const [targetBalance, setTargetBalance] = useState('');
  const [targetError, setTargetError] = useState<string>();
  const [isTargetFocused, setIsTargetFocused] = useState(false);
  const { displayedTarget } = getTargetBalanceDisplay({
    amount,
    currentBalance,
    isFocused: isTargetFocused,
    targetBalance,
    type,
  });

  const handleTargetBalanceChange = (value: string) => {
    setTargetBalance(value);
    const parsedTarget = Number(value.replace(',', '.'));

    if (!Number.isFinite(parsedTarget)) {
      setTargetError(undefined);

      return;
    }

    const calculatedAmount =
      type === 'income'
        ? parsedTarget - currentBalance
        : currentBalance - parsedTarget;

    if (calculatedAmount < 0) {
      setTargetError(
        type === 'income'
          ? 'Бажаний залишок не може бути меншим за поточний'
          : 'Бажаний залишок не може бути більшим за поточний',
      );

      return;
    }

    setTargetError(undefined);
    onQuantityChange(formatQuantity(calculatedAmount));
  };

  return (
    <>
      {isOpen && (
        <InputBase
          bottomSheet
          keyboardType='decimal-pad'
          label={`Бажаний залишок, ${unit}`}
          error={targetError}
          onBlur={() => setIsTargetFocused(false)}
          onChangeText={handleTargetBalanceChange}
          onFocus={() => {
            setTargetBalance(displayedTarget);
            setIsTargetFocused(true);
          }}
          placeholder='0'
          rightElement={
            <Text className='font-medium text-[16px] text-text-primary'>
              {unit}
            </Text>
          }
          variant={type === 'income' ? 'green' : 'red'}
          value={displayedTarget}
        />
      )}
    </>
  );
}
