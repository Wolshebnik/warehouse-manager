import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { useGetItems } from '@/entities/item';
import {
  ExportBalanceDateSheet,
  ExportBalanceReportView,
  useExportBalanceReport,
} from '@/features/export-balance-report';
import { Screenshot } from '@/shared/assets/svg';
import { ROUTES } from '@/shared/config/routes';
import { CategoryCard } from '@/shared/ui/category-card';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';
import { EmptyView } from '@/shared/ui/empty-view';
import { ErrorView } from '@/shared/ui/error-view';
import { LoadingView } from '@/shared/ui/loading-view';
import { PageTitle } from '@/shared/ui/page-title';
import { AppHeader } from '@/widgets/header';

export function HomePage() {
  const router = useRouter();
  const [isDateSheetOpen, setIsDateSheetOpen] = useState(false);
  const {
    exportRef,
    exportReport,
    generatedAt,
    handleLayout,
    isExporting,
    reportDate,
  } = useExportBalanceReport();
  const {
    data: items = [],
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetItems();

  return (
    <View className='flex-1 bg-background'>
      <AppHeader
        rightAction={
          <Pressable
            accessibilityLabel='Експорт'
            accessibilityRole='button'
            disabled={isExporting}
            className='h-10 w-10 items-center justify-center active:scale-[0.92]'
            onPress={() => setIsDateSheetOpen(true)}
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
        <View className='w-full max-w-2xl self-center'>
          <PageTitle
            title='Залишки'
            subtitle='Поточний стан складу'
            className='mb-4'
          />

          {isLoading && <LoadingView />}

          {isError && (
            <ErrorView
              message='Не вдалося завантажити залишки.'
              isRetrying={isRefetching}
              onRetry={() => void refetch()}
            />
          )}

          {!isLoading && !isError && items.length === 0 && (
            <EmptyView message='Товарів поки немає' />
          )}

          {!isLoading &&
            !isError &&
            items.map((item, index) => (
              <CategoryCard
                key={item.id}
                title={item.name}
                amount={item.current_balance > 0 ? item.current_balance : null}
                unit={item.unit?.short || item.unit?.name || 'кг'}
                colorIndex={index}
                className='mb-3'
                onPress={() => router.push(ROUTES.ITEM_DETAILS(item.id))}
              />
            ))}
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
        <ExportBalanceReportView
          ref={exportRef}
          generatedAt={generatedAt}
          items={items}
          onLayout={handleLayout}
          reportDate={reportDate}
        />
      </View>

      <ExportBalanceDateSheet
        isExporting={isExporting}
        isOpen={isDateSheetOpen}
        onClose={() => setIsDateSheetOpen(false)}
        onConfirm={(date) => void exportReport(date)}
      />
    </View>
  );
}

