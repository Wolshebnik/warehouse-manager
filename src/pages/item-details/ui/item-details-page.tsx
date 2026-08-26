import { useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { ItemBalanceCard, useItemById } from '@/entities/item';
import { ExpenseMaterialSheet } from '@/features/expense-material';
import { IncomeMaterialSheet } from '@/features/income-material';
import { ROUTES } from '@/shared/config/routes';
import { getMonthDateRange } from '@/shared/lib/date';
import { EmptyView } from '@/shared/ui/empty-view';
import { ErrorView } from '@/shared/ui/error-view';
import { LoadingView } from '@/shared/ui/loading-view';
import { AppHeader } from '@/widgets/header';

import { ItemActionCard } from './item-action-card';
import { ItemMovementsHistory } from './item-movements-history';

interface ItemDetailsPageProps {
  itemId?: string;
}

export function ItemDetailsPage({ itemId }: ItemDetailsPageProps) {
  const router = useRouter();
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const params = useLocalSearchParams<{ id?: string }>();
  const id = itemId ?? (Array.isArray(params.id) ? params.id[0] : params.id) ?? '';

  const dateRange = useMemo(() => getMonthDateRange(), []);

  const {
    data: item,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useItemById(id, dateRange);

  return (
    <View className='flex-1 bg-background'>
      <AppHeader
        onBackPress={() => router.replace(ROUTES.HOME)}
        title={item?.name || 'Товар'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
        <View className='w-full max-w-2xl self-center'>
          {isLoading && <LoadingView />}

          {isError && (
            <ErrorView
              message='Не вдалося завантажити дані товару.'
              isRetrying={isRefetching}
              onRetry={() => void refetch()}
            />
          )}

          {!isLoading && !isError && !item && (
            <EmptyView message='Товар не знайдено' />
          )}

          {!isLoading && !isError && item && (
            <View>
              <ItemBalanceCard
                balance={item.current_balance}
                unit={item.unit?.short || item.unit?.name}
              />

              <View className='mb-6 flex-row gap-3'>
                <ItemActionCard
                  type='income'
                  onPress={() => setIsIncomeOpen(true)}
                />
                <ItemActionCard
                  type='expense'
                  onPress={() => setIsExpenseOpen(true)}
                />
              </View>

              <ItemMovementsHistory
                itemName={item.name}
                movements={item.movements}
                unit={item.unit?.short || item.unit?.name || ''}
                onShowAllPress={() => router.replace(ROUTES.ITEM_MOVEMENTS(id))}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <IncomeMaterialSheet
        isOpen={isIncomeOpen}
        item={item}
        onClose={() => setIsIncomeOpen(false)}
      />

      <ExpenseMaterialSheet
        isOpen={isExpenseOpen}
        item={item}
        onClose={() => setIsExpenseOpen(false)}
      />
    </View>
  );
}
