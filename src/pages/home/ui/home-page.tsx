import { useState } from 'react';

import { Pressable, ScrollView, View } from 'react-native';

import { useGetItems } from '@/entities/item';
import { AddItemSheet } from '@/features/add-item';
import { Plus } from '@/shared/assets/svg';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { CategoryCard } from '@/shared/ui/category-card';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';
import { PageTitle } from '@/shared/ui/page-title';
import { Text } from '@/shared/ui/text';
import { AppHeader } from '@/widgets/header';

export function HomePage() {
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
            accessibilityLabel='Добавить'
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
          title='Остатки'
          subtitle='Текущее состояние склада'
          className='mb-4'
        />

        {isLoading && (
          <View className='mb-6 items-center justify-center py-12'>
            <CircularProgressLoader color='#257521' size='large' />
          </View>
        )}

        {isError && (
          <View className='mb-6 items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8'>
            <Text className='mb-4 text-center font-normal text-[14px] text-text-muted'>
              Не удалось загрузить остатки.
            </Text>
            <ButtonLoader
              appearance='outline'
              variant='green'
              loading={isRefetching}
              onPress={() => void refetch()}
            >
              Повторить
            </ButtonLoader>
          </View>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <View className='mb-6 items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8'>
            <Text className='font-normal text-[14px] text-text-muted'>
              Товаров пока нет
            </Text>
          </View>
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
