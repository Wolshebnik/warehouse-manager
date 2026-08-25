import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { type Item, useGetArchivedItems } from '@/entities/item';
import { AddItemSheet } from '@/features/add-item';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';
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

        {isLoading && (
          <View className='items-center justify-center py-12'>
            <CircularProgressLoader color='#257521' size='large' />
          </View>
        )}

        {isError && (
          <View className='items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8'>
            <Text className='mb-4 text-center font-normal text-[14px] text-text-muted'>
              Не вдалося завантажити архів товарів.
            </Text>
            <ButtonLoader
              appearance='outline'
              variant='green'
              loading={isRefetching}
              onPress={() => void refetch()}
            >
              Повторити
            </ButtonLoader>
          </View>
        )}

        {!isLoading && !isError && items.length > 0 && (
          <View className='overflow-hidden rounded-16 border border-border bg-surface shadow-card'>
            {items.map((item, index) => (
              <Pressable
                key={item.id}
                className={cn(
                  'flex-row items-center justify-between px-4 py-4 active:bg-neutral-soft',
                  index < items.length - 1 && 'border-b border-border',
                )}
                onPress={() => setSelectedItem(item)}
              >
                <Text className='flex-1 pr-4 font-medium text-[16px] text-text-primary'>
                  {item.name}
                </Text>
                <Text className='font-medium text-[15px] text-text-muted'>
                  {item.unit.short || item.unit.name}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <View className='items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8'>
            <Text className='font-normal text-[14px] text-text-muted'>Архів порожній</Text>
          </View>
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
