import { Pressable, ScrollView, View } from 'react-native';

import { MOCK_CATEGORIES } from '@/entities/category';
import { Plus } from '@/shared/assets/svg';
import { CategoryCard } from '@/shared/ui/category-card';
import { PageTitle } from '@/shared/ui/page-title';
import { AppHeader } from '@/widgets/header';

export function HomePage() {
  return (
    <View className='flex-1 bg-background'>
      <AppHeader
        rightAction={
          <Pressable
            accessibilityLabel='Добавить'
            accessibilityRole='button'
            className='h-10 w-10 items-center justify-center rounded-12 border border-green active:scale-[0.94]'
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

        {MOCK_CATEGORIES.map((category, index) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            amount={category.amount}
            unit={category.unit}
            colorIndex={index}
            className='mb-3'
          />
        ))}
      </ScrollView>
    </View>
  );
}
