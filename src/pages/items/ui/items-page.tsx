import { useState } from 'react';

import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { type Item, useGetArchivedItems, useGetItems } from '@/entities/item';
import { AddItemSheet } from '@/features/add-item';
import { ArchivedItemsCard } from '@/features/archive-items';
import { Plus } from '@/shared/assets/svg';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';
import { ButtonBase } from '@/shared/ui/button-base';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';
import { PageTitle } from '@/shared/ui/page-title';
import { Text } from '@/shared/ui/text';
import { AppHeader } from '@/widgets/header';

export function ItemsPage() {
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const {
    data: items = [],
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetItems();
  const { data: archivedItems = [] } = useGetArchivedItems();

  return (
    <View className='flex-1 bg-background'>
      <AppHeader
        onBackPress={() => router.replace(ROUTES.SETTINGS)}
        title='Товари'
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
        <PageTitle
          title='Товари'
          subtitle='Список товарів для обліку'
          className='mb-6'
          rightAction={
            <ButtonBase
              variant='green'
              accessibilityLabel='Додати товар'
              accessibilityRole='button'
              className='flex-row items-center gap-1.5 rounded-12 px-3 py-2.5'
              onPress={() => {
                setEditingItem(null);
                setIsAddOpen(true);
              }}
            >
              <Plus className='text-white' height={18} width={18} />
              <Text className='font-semibold text-[14px] leading-[18px] text-white'>
                Додати товар
              </Text>
            </ButtonBase>
          }
        />

        {isLoading && (
          <View className='mb-6 items-center justify-center py-12'>
            <CircularProgressLoader color='#257521' size='large' />
          </View>
        )}

        {isError && (
          <View className='mb-6 items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8'>
            <Text className='mb-4 text-center font-normal text-[14px] text-text-muted'>
              Не вдалося завантажити товари.
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
          <View className='mb-6 overflow-hidden rounded-16 border border-border bg-surface shadow-card'>
            {items.map((item, index) => (
              <Pressable
                key={item.id}
                className={cn(
                  'flex-row items-center justify-between px-4 py-4 active:bg-neutral-soft',
                  index < items.length - 1 && 'border-b border-border',
                )}
                onPress={() => {
                  setEditingItem(item);
                  setIsAddOpen(true);
                }}
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
          <View className='mb-6 items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8'>
            <Text className='font-normal text-[14px] text-text-muted'>
              Товарів поки немає
            </Text>
          </View>
        )}

        {archivedItems.length > 0 && (
          <ArchivedItemsCard count={archivedItems.length} />
        )}
      </ScrollView>

      <AddItemSheet
        isOpen={isAddOpen}
        item={editingItem}
        onClose={() => setIsAddOpen(false)}
      />
    </View>
  );
}
