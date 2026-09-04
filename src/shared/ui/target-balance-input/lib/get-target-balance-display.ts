import { formatQuantity } from '@/shared/lib/format-number';

import type { TargetBalanceInputType } from '../target-balance-input';

interface TargetBalanceDisplayParams {
  amount: string;
  currentBalance: number;
  isFocused: boolean;
  targetBalance: string;
  type: TargetBalanceInputType;
}
interface TargetBalanceDisplay {
  calculatedTarget: number;
  displayedTarget: string;
}

const targetCalculators: Record<
  TargetBalanceInputType,
  (currentBalance: number, amount: number) => number
> = {
  expense: (currentBalance, amount) => currentBalance - amount,
  income: (currentBalance, amount) => currentBalance + amount,
};

function parseNumber(value: string) {
  const parsedValue = Number(value.replace(',', '.'));

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function formatDisplayedTarget(hasAmount: boolean, calculatedTarget: number) {
  return hasAmount ? formatQuantity(calculatedTarget) : '';
}

export function getTargetBalanceDisplay({
  amount,
  currentBalance,
  isFocused,
  targetBalance,
  type,
}: TargetBalanceDisplayParams): TargetBalanceDisplay {
  const parsedAmount = parseNumber(amount);
  const hasAmount = amount.trim().length > 0 && parsedAmount !== null;

  const calculatedTarget =
    parsedAmount === null
      ? currentBalance
      : targetCalculators[type](currentBalance, parsedAmount);

  const displayedTarget = isFocused
    ? targetBalance
    : formatDisplayedTarget(hasAmount, calculatedTarget);

  return { calculatedTarget, displayedTarget };
}
