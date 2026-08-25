import type { ComponentType } from 'react';
import { Pressable, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { BoxItems } from '@/shared/assets/svg';
import { type PastelColor, getPastelColorByIndex } from '@/shared/config/pastel-colors';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

export interface CategoryCardProps {
  amount?: number | string | null;
  badgeText?: string;
  className?: string;
  color?: PastelColor;
  colorIndex?: number;
  Icon?: ComponentType<SvgProps>;
  onPress?: () => void;
  title: string;
  unit?: string;
}

export function CategoryCard({
  title,
  amount,
  unit = 'кг',
  badgeText = 'Категория',
  Icon = BoxItems,
  color,
  colorIndex = 0,
  onPress,
  className,
}: CategoryCardProps) {
  const activeColor = color ?? getPastelColorByIndex(colorIndex);
  const hasAmount = amount !== null && amount !== undefined && amount !== '' && amount !== 'нет';

  const content = (
    <View
      className={cn(
        'flex-row items-stretch overflow-hidden rounded-16 border bg-surface',
        className,
      )}
      style={{ borderColor: activeColor.border }}
    >
      <View
        className='w-20 items-center justify-center'
        style={{ backgroundColor: activeColor.soft }}
      >
        <Icon color={activeColor.primary} height={36} width={36} />
      </View>

      <View className='flex-1 justify-between px-4 py-3.5'>
        <View className='mb-2 flex-row'>
          <View
            className='rounded-6 px-2.5 py-0.5'
            style={{ backgroundColor: activeColor.soft }}
          >
            <Text
              className='font-medium text-[11px]'
              style={{ color: activeColor.primary }}
            >
              {badgeText}
            </Text>
          </View>
        </View>

        <View className='flex-row items-baseline justify-between'>
          <Text
            className='flex-1 pr-2 font-bold text-[18px] text-text-primary'
            numberOfLines={1}
          >
            {title}
          </Text>

          {hasAmount ? (
            <View className='flex-row items-baseline gap-1 shrink-0'>
              <Text className='font-bold text-[20px] text-text-primary'>
                {typeof amount === 'number' ? amount.toLocaleString('ru-RU') : amount}
              </Text>
              {unit && (
                <Text className='font-normal text-[14px] text-text-muted'>
                  {unit}
                </Text>
              )}
            </View>
          ) : (
            <Text className='font-normal text-[14px] text-text-muted'>
              нет
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable className='active:scale-[0.99] active:opacity-90' onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
}
