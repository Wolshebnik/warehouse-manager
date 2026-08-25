import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { BoxItems, Scales } from '@/shared/assets/svg';
import { ROUTES } from '@/shared/config/routes';
import { PageTitle } from '@/shared/ui/page-title';
import { Text } from '@/shared/ui/text';
import { AppHeader } from '@/widgets/header';

export function SettingsPage() {
  const router = useRouter();

  return (
    <View className='flex-1 bg-background'>
      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
        <PageTitle
          title='Настройки'
          subtitle='Параметры приложения и склада'
          className='mb-6'
        />

        <Pressable
          accessibilityLabel='Товари'
          accessibilityRole='button'
          className='mb-4 flex-row items-center gap-3.5 rounded-16 border border-border bg-surface p-4 shadow-card active:scale-[0.98] active:opacity-90'
          onPress={() => router.push(ROUTES.SETTINGS_ITEMS)}
        >
          <View className='h-12 w-12 items-center justify-center rounded-12 bg-green-soft'>
            <BoxItems className='text-green' height={26} width={26} />
          </View>

          <View className='flex-1 gap-1'>
            <Text className='font-semibold text-[16px] leading-5 text-text-primary'>
              Товари
            </Text>
            <Text className='font-normal text-[13px] leading-4 text-text-muted'>
              Список товарів для обліку
            </Text>
          </View>
        </Pressable>

        <Pressable
          accessibilityLabel='Одиниці виміру'
          accessibilityRole='button'
          className='flex-row items-center gap-3.5 rounded-16 border border-border bg-surface p-4 shadow-card active:scale-[0.98] active:opacity-90'
          onPress={() => router.push(ROUTES.SETTINGS_UNITS)}
        >
          <View className='h-12 w-12 items-center justify-center rounded-12 bg-green-soft'>
            <Scales className='text-green' height={26} width={26} />
          </View>

          <View className='flex-1 gap-1'>
            <Text className='font-semibold text-[16px] leading-5 text-text-primary'>
              Одиниці виміру
            </Text>
            <Text className='font-normal text-[13px] leading-4 text-text-muted'>
              Список кг, шт, грн, $
            </Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

