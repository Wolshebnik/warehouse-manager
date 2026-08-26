import type { MonthMovement } from '@/entities/item';
import { dayjs, KYIV_UTC_OFFSET_HOURS } from '@/shared/lib/date';
import type { CalendarMarkerType } from '@/shared/ui/calendar';

export function getCalendarMarkers(
  movements: MonthMovement[],
): Record<string, CalendarMarkerType[]> {
  const dayMap: Record<string, { hasExpense: boolean; hasIncome: boolean }> = {};

  for (const movement of movements) {
    const dayKey = dayjs
      .utc(movement.created_at)
      .utcOffset(KYIV_UTC_OFFSET_HOURS)
      .format('YYYY-MM-DD');

    if (!dayMap[dayKey]) {
      dayMap[dayKey] = { hasIncome: false, hasExpense: false };
    }

    if (movement.type === 'income') {
      dayMap[dayKey].hasIncome = true;
    } else if (movement.type === 'expense') {
      dayMap[dayKey].hasExpense = true;
    }
  }

  const markers: Record<string, CalendarMarkerType[]> = {};

  for (const [dayKey, flags] of Object.entries(dayMap)) {
    const dayMarkers: CalendarMarkerType[] = [];
    if (flags.hasIncome) {
      dayMarkers.push('income');
    }
    if (flags.hasExpense) {
      dayMarkers.push('expense');
    }
    if (dayMarkers.length > 0) {
      markers[dayKey] = dayMarkers;
    }
  }

  return markers;
}
