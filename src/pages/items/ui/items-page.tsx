import { useCallback, useState } from 'react';

import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import {
  SortableItem,
  type SortableRenderItemProps,
} from 'react-native-reanimated-dnd';

import {
  type Item,
  useGetArchivedItems,
  useGetItems,
  useReorderItems,
} from '@/entities/item';
import { AddItemSheet } from '@/features/add-item';
import { ArchivedItemsCard } from '@/features/archive-items';
import { Plus } from '@/shared/assets/svg';
import { ROUTES } from '@/shared/config/routes';
import { ButtonBase } from '@/shared/ui/button-base';
import { EmptyView } from '@/shared/ui/empty-view';
import { ErrorView } from '@/shared/ui/error-view';
import { LoadingView } from '@/shared/ui/loading-view';
import { PageTitle } from '@/shared/ui/page-title';
import { SortableList } from '@/shared/ui/sortable-list';
import { Text } from '@/shared/ui/text';
import { AppHeader } from '@/widgets/header';

import { ItemRow } from './item-row';

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
  const reorderItemsMutation = useReorderItems();

  const handleDrop = useCallback(
    (_id: string, _position: number, allPositions?: Record<string, number>) => {
      if (!allPositions) return;

      const count = items.length;
      const ordered = new Array<Item>(count);
      const seenPositions = new Set<number>();

      for (const item of items) {
        const pos = allPositions[item.id];
        if (
          pos === undefined ||
          pos < 0 ||
          pos >= count ||
          seenPositions.has(pos)
        ) {
          return;
        }
        seenPositions.add(pos);
        ordered[pos] = item;
      }

      if (seenPositions.size !== count) {
        return;
      }

      const reorderedItems: Item[] = ordered.map((item, index) => ({
        ...item,
        sort_order: (index + 1) * 10,
      }));

      reorderItemsMutation.mutate(reorderedItems);
    },
    [items, reorderItemsMutation],
  );

  const renderItem = useCallback(
    (props: SortableRenderItemProps<Item>) => {
      const { item, id, positions, itemsCount, ...rest } = props;

      return (
        <SortableItem
          key={id}
          id={id}
          data={item}
          positions={positions}
          itemsCount={itemsCount}
          onDrop={handleDrop}
          {...rest}
        >
          <ItemRow
            id={id}
            item={item}
            itemsCount={itemsCount}
            positions={positions}
            onPress={() => {
              setEditingItem(item);
              setIsAddOpen(true);
            }}
          />
        </SortableItem>
      );
    },
    [handleDrop],
  );

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
              radiusClassName='rounded-12'
              className='flex-row items-center gap-1.5 px-3 py-2.5'
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

        {isLoading && <LoadingView />}

        {isError && (
          <ErrorView
            message='Не вдалося завантажити товари.'
            isRetrying={isRefetching}
            onRetry={() => void refetch()}
          />
        )}

        {!isLoading && !isError && items.length > 0 && (
          <View className='mb-6 overflow-visible'>
            <SortableList
              key={items.map((item) => item.id).sort().join(':')}
              data={items}
              itemHeight={70}
              useFlatList={false}
              renderItem={renderItem}
              scrollEnabled={false}
              style={{ backgroundColor: 'transparent', overflow: 'visible' }}
              contentContainerStyle={{ overflow: 'visible' }}
            />
          </View>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <EmptyView message='Товарів поки немає' />
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
