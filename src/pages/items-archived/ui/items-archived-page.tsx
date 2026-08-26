import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { type Item, useGetArchivedItems } from '@/entities/item';
import { AddItemSheet } from '@/features/add-item';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';
import { EmptyView } from '@/shared/ui/empty-view';
import { ErrorView } from '@/shared/ui/error-view';
import { LoadingView } from '@/shared/ui/loading-view';
import { PageTitle } from '@/shared/ui/page-title';
import { Text } from '@/shared/ui/text';
import { AppHeader } from '@/widgets/header';

export function ItemsArchivedPage() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { data: items = [], isError, isLoading, isRefetching, refetch } = useGetArchivedItems();

  return (
    <View className='flex-1 bg-background'>
      <AppHeader
        onBackPress={() => router.replace(ROUTES.SETTINGS_ITEMS)}
        title='Архів товарів'
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
        <PageTitle
          title='Архів товарів'
          subtitle='Список архівованих товарів'
          className='mb-6'
        />

        {isLoading && <LoadingView />}

        {isError && (
          <ErrorView
            message='Не вдалося завантажити архів товарів.'
            isRetrying={isRefetching}
            onRetry={() => void refetch()}
          />
        )}

        {!isLoading && !isError && items.length > 0 && (
          <View className='overflow-hidden rounded-16 border border-border bg-surface shadow-card'>
            {items.map((item, index) => (
              <Pressable
                key={item.id}
                className={cn(
                  'flex-row items-center justify-between px-4 py-4',
                  index < items.length - 1 && 'border-b border-border',
                )}
                android_ripple={{
                  color: 'rgba(0, 0, 0, 0.05)',
                }}
                onPress={() => setSelectedItem(item)}
              >
                <View className='flex-1 pr-4'>
                  <Text className='font-medium text-[16px] text-text-primary'>
                    {item.name}
                  </Text>
                  {item.description && (
                    <Text className='mt-0.5 font-normal text-[13px] text-text-muted'>
                      {item.description}
                    </Text>
                  )}
                </View>
                <Text className='font-medium text-[15px] text-text-muted'>
                  {item.unit?.short || item.unit?.name || ''}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <EmptyView message='Архів порожній' />
        )}
      </ScrollView>

      <AddItemSheet
        isOpen={!!selectedItem}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        restoreOnly
        onRestored={() => {
          if (items.length <= 1) {
            router.replace(ROUTES.SETTINGS_ITEMS);
          }
        }}
      />
    </View>
  );
}
