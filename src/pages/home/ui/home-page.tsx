import { useState } from 'react';

import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { useGetItems } from '@/entities/item';
import { AddItemSheet } from '@/features/add-item';
import { Plus } from '@/shared/assets/svg';
import { ROUTES } from '@/shared/config/routes';
import { CategoryCard } from '@/shared/ui/category-card';
import { EmptyView } from '@/shared/ui/empty-view';
import { ErrorView } from '@/shared/ui/error-view';
import { LoadingView } from '@/shared/ui/loading-view';
import { PageTitle } from '@/shared/ui/page-title';
import { AppHeader } from '@/widgets/header';

export function HomePage() {
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);
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
            accessibilityLabel='Додати'
            accessibilityRole='button'
            className='h-10 w-10 items-center justify-center rounded-12 border border-green active:scale-[0.94]'
            onPress={() => setIsAddOpen(true)}
          >
            <Plus className='text-green' height={20} width={20} />
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
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
      </ScrollView>

      <AddItemSheet
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
    </View>
  );
}
