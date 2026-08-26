import type { ReactNode } from 'react';

import { Arrow } from '@/shared/assets/svg';
import { formatMovementDay, formatMovementTime } from '@/shared/lib/date';
import { MovementSummaryCard } from '@/shared/ui/movement-summary-card';

import type { DayMovementItem, MovementType, StockMovement } from '../model/schema';

interface ItemMovementCardProps {
  className?: string;
  description?: string;
  movement: StockMovement | DayMovementItem;
  showDate?: boolean;
  time?: string;
  title?: string;
  unit?: string;
}

const movementIcons: Record<MovementType, ReactNode> = {
  expense: <Arrow className='text-red' height={18} width={18} />,
  income: <Arrow className='rotate-180 text-green' height={18} width={18} />,
};

function resolveMovementViewData(
  movement: StockMovement | DayMovementItem,
  fallbackUnit?: string,
  customTitle?: string,
  customTime?: string,
  showDate = true,
  customDescription?: string,
) {
  const type = movement.type;
  const itemInMovement = 'item' in movement ? movement.item : undefined;
  const displayTitle = customTitle ?? itemInMovement?.name ?? 'Товар';
  const time = customTime ?? formatMovementTime(movement.created_at);
  const date = showDate ? formatMovementDay(movement.created_at) : undefined;
  const description =
    customDescription ?? (movement.description?.trim() || undefined);
  const amountVal = movement.quantity.toLocaleString('uk-UA');
  const unitSuffix = fallbackUnit ? ` ${fallbackUnit}` : '';
  const prefix = type === 'income' ? '+' : '−';
  const formattedAmount = `${prefix}${amountVal}${unitSuffix}`;

  return {
    description,
    date,
    displayTitle,
    formattedAmount,
    time,
    type,
  };
}

export function ItemMovementCard({
  className,
  description: customDescription,
  movement,
  showDate = true,
  time,
  title,
  unit,
}: ItemMovementCardProps) {
  const {
    description,
    date,
    displayTitle,
    formattedAmount,
    time: displayTime,
    type,
  } = resolveMovementViewData(movement, unit, title, time, showDate, customDescription);

  return (
    <MovementSummaryCard
      amount={formattedAmount}
      className={className}
      description={description}
      date={date}
      icon={movementIcons[type]}
      time={displayTime}
      title={displayTitle}
      type={type}
    />
  );
}
