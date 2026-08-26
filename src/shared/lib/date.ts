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

export interface DayDateRange {
  endDate: string;
  startDate: string;
}

export function getDayDateRange(
  date?: string | number | Date | Dayjs,
  offsetHours: number = KYIV_UTC_OFFSET_HOURS,
): DayDateRange {
  const dateStr =
    typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? date
      : (date ? (dayjs.isDayjs(date) ? date : dayjs(date)) : dayjs.utc().utcOffset(offsetHours)).format('YYYY-MM-DD');

  const sign = offsetHours >= 0 ? '+' : '-';
  const offset = `${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:00`;

  return {
    startDate: dayjs.utc(`${dateStr}T00:00:00${offset}`).toISOString(),
    endDate: dayjs.utc(`${dateStr}T23:59:59.999${offset}`).toISOString(),
  };
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

export function formatMovementDay(
  date: string | number | Date | Dayjs,
  offsetHours: number = KYIV_UTC_OFFSET_HOURS,
): string {
  return dayjs.utc(date).utcOffset(offsetHours).format('DD.MM');
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

export function formatFullDate(
  date?: string | number | Date | Dayjs,
  offsetHours: number = KYIV_UTC_OFFSET_HOURS,
): string {
  if (typeof date === 'string') {
    const match = date.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) {
      return dayjs(match[1]).format('D MMMM YYYY');
    }
  }
  const base = date ? (dayjs.isDayjs(date) ? date : dayjs(date)) : dayjs.utc();
  const d = base.utcOffset(offsetHours);
  return d.format('D MMMM YYYY');
}

export function formatMovementTime(
  date: string | number | Date | Dayjs,
  offsetHours: number = KYIV_UTC_OFFSET_HOURS,
): string {
  return dayjs.utc(date).utcOffset(offsetHours).format('HH:mm');
}

export function formatExportTimestamp(
  date?: string | number | Date | Dayjs,
  offsetHours: number = KYIV_UTC_OFFSET_HOURS,
): string {
  const base = date ? (dayjs.isDayjs(date) ? date : dayjs(date)) : dayjs.utc();
  const d = base.utcOffset(offsetHours);
  return d.format('DD.MM.YYYY [о] HH:mm');
}

export { dayjs, type Dayjs };
