import { useLocalSearchParams } from 'expo-router';

import { HistoryDayPage } from '@/pages/history-day';

export default function HistoryDayRoute() {
  const { date } = useLocalSearchParams<{ date?: string }>();
  const dateStr = Array.isArray(date) ? date[0] : date;

  return <HistoryDayPage date={dateStr} />;
}
