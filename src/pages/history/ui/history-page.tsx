import { ScrollView, View } from 'react-native';

import { PageTitle } from '@/shared/ui/page-title';
import { AppHeader } from '@/widgets/header';

export function HistoryPage() {
  return (
    <View className='flex-1 bg-background'>
      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='p-4 pb-8'
        className='flex-1'
      >
        <PageTitle
          title='История'
          subtitle='История приходов и списаний'
          className='mb-4'
        />
      </ScrollView>
    </View>
  );
}
