import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Archive } from '@/shared/assets/svg';
import { ROUTES } from '@/shared/config/routes';
import { Text } from '@/shared/ui/text';

interface ArchivedItemsCardProps {
  count: number;
}

export function ArchivedItemsCard({ count }: ArchivedItemsCardProps) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityLabel='Архівовані товари'
      accessibilityRole='button'
      className='mb-6 flex-row items-center gap-3.5 rounded-16 border border-border bg-surface p-4 shadow-card active:scale-[0.98] active:opacity-90'
      onPress={() => router.push(ROUTES.SETTINGS_ITEMS_ARCHIVED)}
    >
      <View className='h-12 w-12 items-center justify-center rounded-12 bg-neutral-soft'>
        <Archive className='text-text-muted' height={26} width={26} />
      </View>

      <View className='flex-1 gap-1'>
        <View className='flex-row items-center gap-2'>
          <Text className='font-semibold text-[16px] text-text-primary'>Архів</Text>
          <View className='h-5 min-w-5 items-center justify-center rounded-full bg-neutral-soft px-1'>
            <Text className='font-semibold text-[11px] text-text-muted'>{count}</Text>
          </View>
        </View>
        <Text className='font-normal text-[13px] text-text-muted'>Архівовані товари</Text>
      </View>
    </Pressable>
  );
}
