import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { type Unit, useGetUnits } from '@/entities/unit';
import { AddUnitSheet } from '@/features/add-unit';
import { Plus } from '@/shared/assets/svg';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';
import { ButtonBase } from '@/shared/ui/button-base';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';
import { PageTitle } from '@/shared/ui/page-title';
import { Text } from '@/shared/ui/text';
import { AppHeader } from '@/widgets/header';

export function UnitsPage() {
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const {
    data: units = [],
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetUnits();

  return (
    <View className='flex-1 bg-background'>
      <AppHeader
        onBackPress={() => router.replace(ROUTES.SETTINGS)}
        title='Одиниці виміру'
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
        <PageTitle
          title='Одиниці виміру'
          subtitle='Список одиниць для товарів'
          className='mb-6'
        />

        {isLoading && (
          <View className='mb-6 items-center justify-center py-12'>
            <CircularProgressLoader color='#257521' size='large' />
          </View>
        )}

        {isError && (
          <View className='mb-6 items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8'>
            <Text className='mb-4 text-center font-normal text-[14px] text-text-muted'>
              Не вдалося завантажити одиниці виміру.
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

        {!isLoading && !isError && units.length > 0 && (
          <View className='mb-6 overflow-hidden rounded-16 border border-border bg-surface shadow-card'>
            {units.map((unit, index) => (
              <Pressable
                key={unit.id}
                className={cn(
                  'flex-row items-center justify-between px-4 py-4',
                  index < units.length - 1 && 'border-b border-border',
                )}
                onPress={() => {
                  setEditingUnit(unit);
                  setIsAddOpen(true);
                }}
              >
                <Text className='font-medium text-[16px] text-text-primary'>
                  {unit.name}
                </Text>
                <Text className='font-medium text-[15px] text-text-muted'>
                  {unit.short}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {!isLoading && !isError && units.length === 0 && (
          <View className='mb-6 items-center justify-center rounded-16 border border-dashed border-border bg-surface p-8'>
            <Text className='font-normal text-[14px] text-text-muted'>
              Одиниць виміру поки немає
            </Text>
          </View>
        )}

        <ButtonBase
          variant='green'
          className='mb-8 w-full flex-row items-center justify-center gap-2 py-3.5'
          onPress={() => {
            setEditingUnit(null);
            setIsAddOpen(true);
          }}
        >
          <Plus className='text-white' height={18} width={18} />
          <Text className='font-semibold text-[15px] text-white'>
            Додати одиницю
          </Text>
        </ButtonBase>
      </ScrollView>

      <AddUnitSheet
        isOpen={isAddOpen}
        unit={editingUnit}
        onClose={() => setIsAddOpen(false)}
      />
    </View>
  );
}



