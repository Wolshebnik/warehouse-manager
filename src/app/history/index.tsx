import { View } from 'react-native';

import { AppHeader } from '@/widgets/header';
import { Text } from '@/shared/ui/text';

export default function HistoryPage() {
  return (
    <View className='flex-1 bg-background'>
      <AppHeader />
    </View>
  );
}
