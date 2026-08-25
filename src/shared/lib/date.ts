import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/uk';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.locale('uk');

export const KYIV_UTC_OFFSET_HOURS = 3;

export interface MonthDateRange {
  endDate: string;
  startDate: string;
}

export function getMonthDateRange(
  date?: string | number | Date | Dayjs,
  offsetHours: number = KYIV_UTC_OFFSET_HOURS,
): MonthDateRange {
  const base = date ? (dayjs.isDayjs(date) ? date : dayjs(date)) : dayjs.utc();
  const d = base.utcOffset(offsetHours);
  return {
    startDate: d.startOf('month').toISOString(),
    endDate: d.endOf('month').toISOString(),
  };
}

export function formatMovementDate(
  date: string | number | Date | Dayjs,
  offsetHours: number = KYIV_UTC_OFFSET_HOURS,
): string {
  return dayjs.utc(date).utcOffset(offsetHours).format('D MMM, HH:mm');
}

export function formatMonthName(
  date?: string | number | Date | Dayjs,
  offsetHours: number = KYIV_UTC_OFFSET_HOURS,
): string {
  const base = date ? (dayjs.isDayjs(date) ? date : dayjs(date)) : dayjs.utc();
  const d = base.utcOffset(offsetHours);
  const formatted = d.format('MMMM YYYY');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export { dayjs };
