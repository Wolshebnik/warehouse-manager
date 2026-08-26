import { useMemo, useState } from 'react';

import { View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { dayjs, type Dayjs } from '@/shared/lib/date';
import { MonthSelector } from '@/shared/ui/month-selector';
import { Text } from '@/shared/ui/text';

import { CalendarDayCell } from './ui/calendar-day-cell';
import { type CalendarMarkerType } from './ui/calendar-day-markers';

export type { CalendarMarkerType } from './ui/calendar-day-markers';

export interface CalendarProps {
  className?: string;
  currentMonth?: Dayjs | string | Date;
  markers?: Record<string, CalendarMarkerType[]>;
  onMonthChange?: (month: Dayjs) => void;
  onSelectDate?: (date: Dayjs) => void;
  selectedDate?: Dayjs | string | Date | null;
}

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'] as const;
const CALENDAR_WEEKS_COUNT = 6;
const CALENDAR_DAYS_COUNT = CALENDAR_WEEKS_COUNT * 7;

export function Calendar({
  className,
  currentMonth: controlledMonth,
  markers,
  onMonthChange,
  onSelectDate,
  selectedDate: controlledSelectedDate,
}: CalendarProps) {
  const [internalSelectedDate, setInternalSelectedDate] = useState<Dayjs | null>(() => dayjs());

  const selectedDate = useMemo(() => {
    if (controlledSelectedDate === undefined) {
      return internalSelectedDate;
    }
    if (!controlledSelectedDate) {
      return null;
    }
    return dayjs.isDayjs(controlledSelectedDate)
      ? controlledSelectedDate
      : dayjs(controlledSelectedDate);
  }, [controlledSelectedDate, internalSelectedDate]);

  const [internalMonth, setInternalMonth] = useState<Dayjs>(() => {
    if (selectedDate) {
      return selectedDate.startOf('month');
    }
    return dayjs().startOf('month');
  });

  const currentMonth = useMemo(() => {
    if (!controlledMonth) {
      return internalMonth;
    }
    return dayjs.isDayjs(controlledMonth) ? controlledMonth : dayjs(controlledMonth);
  }, [controlledMonth, internalMonth]);

  const days = useMemo(() => {
    const startOfMonth = currentMonth.startOf('month');
    const startDayOfWeek = (startOfMonth.day() + 6) % 7;
    const startDate = startOfMonth.subtract(startDayOfWeek, 'day');

    const result: Dayjs[] = [];
    for (let i = 0; i < CALENDAR_DAYS_COUNT; i++) {
      result.push(startDate.add(i, 'day'));
    }
    return result;
  }, [currentMonth]);

  const weeks = useMemo(() => {
    const rows: Dayjs[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }
    return rows;
  }, [days]);

  const handlePrevMonth = () => {
    const prev = currentMonth.subtract(1, 'month');
    if (!controlledMonth) {
      setInternalMonth(prev);
    }
    onMonthChange?.(prev);
  };

  const handleNextMonth = () => {
    const next = currentMonth.add(1, 'month');
    if (!controlledMonth) {
      setInternalMonth(next);
    }
    onMonthChange?.(next);
  };

  const handleResetMonth = () => {
    const todayMonth = dayjs().startOf('month');
    if (!controlledMonth) {
      setInternalMonth(todayMonth);
    }
    onMonthChange?.(todayMonth);
  };

  const handleSelectDate = (date: Dayjs) => {
    if (controlledSelectedDate === undefined) {
      setInternalSelectedDate(date);
    }
    if (!controlledMonth && !date.isSame(currentMonth, 'month')) {
      setInternalMonth(date.startOf('month'));
    }
    onSelectDate?.(date);
  };

  return (
    <View
      className={cn(
        'rounded-20 border border-border bg-surface p-4 shadow-card',
        className,
      )}
    >
      <MonthSelector
        className='mb-4'
        month={currentMonth}
        onNextMonth={handleNextMonth}
        onPrevMonth={handlePrevMonth}
        onResetMonth={handleResetMonth}
      />

      <View className='mb-3 flex-row justify-between'>
        {WEEK_DAYS.map((day) => (
          <View key={day} className='flex-1 items-center'>
            <Text className='font-medium text-[13px] text-text-muted'>
              {day}
            </Text>
          </View>
        ))}
      </View>

      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} className='mb-2 flex-row justify-between'>
          {week.map((date) => {
            const isCurrentMonth = date.isSame(currentMonth, 'month');
            const isSelected = Boolean(selectedDate && date.isSame(selectedDate, 'day'));
            const dateKey = date.format('YYYY-MM-DD');
            const dayMarkers = markers?.[dateKey] ?? [];

            return (
              <View key={dateKey} className='flex-1 items-center'>
                <CalendarDayCell
                  date={date}
                  isCurrentMonth={isCurrentMonth}
                  isSelected={isSelected}
                  markers={dayMarkers}
                  onPress={() => handleSelectDate(date)}
                />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
