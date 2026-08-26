import { useMemo } from 'react';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { ItemMovementCard, useGetDayMovements } from '@/entities/item';
import {
  ExportDayMovementsReportView,
  useExportDayMovementsReport,
} from '@/features/export-day-movements-report';
import { Screenshot } from '@/shared/assets/svg';
import { formatFullDate, formatMovementTime } from '@/shared/lib/date';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';
import { EmptyView } from '@/shared/ui/empty-view';
import { ErrorView } from '@/shared/ui/error-view';
import { LoadingView } from '@/shared/ui/loading-view';
import { PageTitle } from '@/shared/ui/page-title';
import { Text } from '@/shared/ui/text';
import { AppHeader } from '@/widgets/header';

import { groupDayMovements } from '../model/group-day-movements';
import { DayMovementGroupCard } from './day-movement-group-card';

interface HistoryDayPageProps {
  date?: string;
}

export function HistoryDayPage({ date: propDate }: HistoryDayPageProps) {
  const router = useRouter();
  const params = useLocalSearchParams<{ date?: string }>();
  const dateStr =
    propDate || (Array.isArray(params.date) ? params.date[0] : params.date) || '';

  const {
    exportRef,
    exportReport,
    generatedAt,
    isExporting,
  } = useExportDayMovementsReport();

  const title = useMemo(() => formatFullDate(dateStr), [dateStr]);

  const {
    data: movements = [],
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetDayMovements(dateStr);

  const movementGroups = useMemo(
    () => groupDayMovements(movements),
    [movements],
  );

  return (
    <View className='flex-1 bg-background'>
      <AppHeader
        onBackPress={() => router.back()}
        rightAction={
          <Pressable
            accessibilityLabel='Експорт операцій за день'
            accessibilityRole='button'
            disabled={isExporting || isLoading || isError}
            className='h-10 w-10 items-center justify-center active:scale-[0.92]'
            onPress={() => void exportReport()}
          >
            {isExporting ? (
              <CircularProgressLoader color='#2E7D32' size='small' />
            ) : (
              <Screenshot className='text-green' height={40} width={40} />
            )}
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
        <PageTitle
          title={title}
          className='mb-4'
        />

        {!isLoading &&
          !isError &&
          movementGroups.map((group) => (
            <DayMovementGroupCard key={group.id} group={group} />
          ))}

        {isLoading && <LoadingView />}

        {isError && (
          <ErrorView
            message='Не вдалося завантажити операції за день.'
            isRetrying={isRefetching}
            onRetry={() => void refetch()}
          />
        )}

        {!isLoading && !isError && movements.length === 0 && (
          <EmptyView message='Операцій за цей день не знайдено' />
        )}

        {!isLoading && !isError && movements.length > 0 && (
          <Text className='mb-2 font-bold text-[16px] text-text-primary'>
            Усі операції за день
          </Text>
        )}

        {!isLoading &&
          !isError &&
          movements.map((movement) => (
            <ItemMovementCard
              key={movement.id}
              className='mb-1.5'
              movement={movement}
              showDate={false}
              title={movement.item?.name ?? 'Товар'}
              time={formatMovementTime(movement.created_at)}
              unit={movement.item?.unit?.short || movement.item?.unit?.name || ''}
            />
          ))}
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
        <ExportDayMovementsReportView
          ref={exportRef}
          dateStr={dateStr}
          generatedAt={generatedAt}
          groups={movementGroups}
          movements={movements}
        />
      </View>
    </View>
  );
}
