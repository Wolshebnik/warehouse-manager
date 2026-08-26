import { useMemo, useState } from 'react';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import {
  ItemBalanceCard,
  ItemMovementCard,
  useItemById,
} from '@/entities/item';
import {
  ExportItemMovementsReportView,
  useExportItemMovementsReport,
} from '@/features/export-item-movements-report';
import { Screenshot } from '@/shared/assets/svg';
import { ROUTES } from '@/shared/config/routes';
import { dayjs, formatMonthName, getMonthDateRange } from '@/shared/lib/date';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';
import { EmptyView } from '@/shared/ui/empty-view';
import { ErrorView } from '@/shared/ui/error-view';
import { LoadingView } from '@/shared/ui/loading-view';
import { MonthSelector } from '@/shared/ui/month-selector';
import { AppHeader } from '@/widgets/header';

import {
  ItemMovementsFilterPills,
  type MovementFilterType,
} from './item-movements-filter-pills';

interface ItemMovementsPageProps {
  itemId?: string;
}

export function ItemMovementsPage({ itemId }: ItemMovementsPageProps) {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const id =
    itemId ?? (Array.isArray(params.id) ? params.id[0] : params.id) ?? '';

  const {
    exportRef,
    exportReport,
    generatedAt,
    isExporting,
  } = useExportItemMovementsReport();

  const [filter, setFilter] = useState<MovementFilterType>('all');
  const [selectedDate, setSelectedDate] = useState(() => dayjs());

  const dateRange = useMemo(
    () => getMonthDateRange(selectedDate),
    [selectedDate],
  );

  const monthTitle = useMemo(
    () => formatMonthName(selectedDate),
    [selectedDate],
  );

  const handlePrevMonth = () => {
    setSelectedDate((prev) => prev.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setSelectedDate((prev) => prev.add(1, 'month'));
  };

  const handleResetMonth = () => {
    setSelectedDate(dayjs());
  };

  const {
    data: item,
    isError,
    isFetching,
    isLoading,
    isRefetching,
    refetch,
  } = useItemById(id, dateRange);

  const filteredMovements = useMemo(() => {
    const movements = item?.movements ?? [];
    if (filter === 'all') {
      return movements;
    }
    return movements.filter((m) => m.type === filter);
  }, [filter, item?.movements]);

  return (
    <View className='flex-1 bg-background'>
      <AppHeader
        onBackPress={() => router.replace(ROUTES.ITEM_DETAILS(id))}
        title='Всі рухи'
        rightAction={
          item && (
            <Pressable
              accessibilityLabel='Експорт рухів'
              accessibilityRole='button'
              disabled={isExporting}
              className='h-10 w-10 items-center justify-center active:scale-[0.92]'
              onPress={() => void exportReport()}
            >
              {isExporting ? (
                <CircularProgressLoader color='#2E7D32' size='small' />
              ) : (
                <Screenshot className='text-green' height={40} width={40} />
              )}
            </Pressable>
          )
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
        <View className='w-full max-w-2xl self-center'>
          {isLoading && !item && <LoadingView />}

          {isError && !item && (
            <ErrorView
              message='Не вдалося завантажити дані рухів.'
              isRetrying={isRefetching}
              onRetry={() => void refetch()}
            />
          )}

          {item && (
            <View>
              <ItemBalanceCard
                title={item.name}
                balance={item.current_balance}
                unit={item.unit?.short || item.unit?.name}
              />

              <ItemMovementsFilterPills selected={filter} onSelect={setFilter} />

              <MonthSelector
                className='mb-4'
                month={monthTitle}
                variant='card'
                onNextMonth={handleNextMonth}
                onPrevMonth={handlePrevMonth}
                onResetMonth={handleResetMonth}
              />

              {isFetching && <LoadingView className='py-8' />}

              {!isFetching && filteredMovements.length === 0 && (
                <EmptyView message='Рухів за вибраним фільтром не знайдено' />
              )}

              {!isFetching &&
                filteredMovements.length > 0 &&
                filteredMovements.map((movement) => (
                  <ItemMovementCard
                    key={movement.id}
                    movement={movement}
                    title={item.name}
                    unit={item.unit?.short || item.unit?.name || ''}
                  />
                ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View
        pointerEvents='none'
        style={{
          position: 'absolute',
          left: -9999,
          top: 0,
          opacity: 0,
        }}
      >
        {item && (
          <ExportItemMovementsReportView
            ref={exportRef}
            balance={item.current_balance}
            filterLabel={
              filter === 'income'
                ? 'Прихід'
                : filter === 'expense'
                  ? 'Списання'
                  : 'Всі рухи'
            }
            generatedAt={generatedAt}
            itemName={item.name}
            month={monthTitle}
            movements={filteredMovements}
            unit={item.unit?.short || item.unit?.name}
          />
        )}
      </View>
    </View>
  );
}
