import { useMemo, useState } from 'react';

import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { useGetMonthMovements } from '@/entities/item';
import { dayjs, type Dayjs } from '@/shared/lib/date';
import { Calendar } from '@/shared/ui/calendar';
import { AppHeader } from '@/widgets/header';

import { getCalendarMarkers } from '../model/get-calendar-markers';

export function HistoryPage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(() =>
    dayjs().startOf('month'),
  );

  const { data: movements = [] } = useGetMonthMovements(currentMonth);

  const markers = useMemo(
    () => getCalendarMarkers(movements),
    [movements],
  );

  const handleSelectDate = (date: Dayjs) => {
    const dateStr = date.format('YYYY-MM-DD');
    router.push({
      pathname: '/history/[date]',
      params: { date: dateStr },
    });
  };

  return (
    <View className='flex-1 bg-background'>
      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
        <Calendar
          currentMonth={currentMonth}
          markers={markers}
          onMonthChange={setCurrentMonth}
          onSelectDate={handleSelectDate}
        />
      </ScrollView>
    </View>
  );
}

