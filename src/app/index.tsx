import { Pressable, View } from 'react-native';

import { Plus } from '@/shared/assets/svg';
import { AppHeader } from '@/widgets/header';

export default function HomePage() {
  return (
    <View className='flex-1 bg-background'>
      <AppHeader
        rightAction={
          <Pressable className='h-10 w-10 items-center justify-center rounded-12 border border-green active:scale-[0.96]'>
            <Plus className='text-green' height={20} width={20} />
          </Pressable>
        }
      />
    </View>
  );
}
