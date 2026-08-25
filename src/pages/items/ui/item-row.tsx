import { TouchableOpacity, View } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { type Item } from '@/entities/item';
import { Text } from '@/shared/ui/text';

interface ItemRowProps {
  id: string;
  item: Item;
  itemsCount: number;
  onPress: () => void;
  positions: SharedValue<{ [id: string]: number }>;
}

export function ItemRow({
  id,
  item,
  itemsCount,
  onPress,
  positions,
}: ItemRowProps) {
  const animatedCardStyle = useAnimatedStyle(() => {
    const currentPos = positions.value[id];
    const isFirst = currentPos === 0;
    const isLast = currentPos === itemsCount - 1;

    return {
      borderTopLeftRadius: isFirst ? 16 : 0,
      borderTopRightRadius: isFirst ? 16 : 0,
      borderBottomLeftRadius: isLast ? 16 : 0,
      borderBottomRightRadius: isLast ? 16 : 0,
      borderTopWidth: isFirst ? 1 : 0,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#DADFDB',
      backgroundColor: '#FFFFFF',
    };
  });

  return (
    <Animated.View
      style={animatedCardStyle}
      className='h-[70px]'
    >
      <TouchableOpacity
        activeOpacity={0.7}
        className='h-full flex-row items-center justify-between px-4'
        onPress={onPress}
      >
        <View className='flex-1 justify-center pr-4'>
          <Text
            className='font-medium text-[16px] text-text-primary'
            numberOfLines={1}
          >
            {item.name}
          </Text>
          {item.description && (
            <Text
              className='mt-0.5 font-normal text-[13px] text-text-muted'
              numberOfLines={1}
            >
              {item.description}
            </Text>
          )}
        </View>

        <Text className='font-medium text-[15px] text-text-muted'>
          {item.unit.short || item.unit.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
