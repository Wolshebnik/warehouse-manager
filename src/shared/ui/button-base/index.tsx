import type { ReactNode } from 'react';

import { Pressable, type PressableProps, View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

import {
  type ButtonAppearance,
  type ButtonSize,
  type ButtonVariant,
  buttonSizeContainerClassNames,
  buttonSizeTextClassNames,
  outlineRippleColors,
  outlineTextClassNames,
  outlineVariantClassNames,
  solidTextClassNames,
  solidVariantClassNames,
} from './button-appearance';

export type { ButtonAppearance, ButtonSize, ButtonVariant };
export type ButtonShape = 'default' | 'circle';

export interface ButtonBaseProps extends Omit<
  PressableProps,
  'android_ripple' | 'style'
> {
  appearance?: ButtonAppearance;
  children?: ReactNode;
  radiusClassName?: string;
  size?: ButtonSize;
  shape?: ButtonShape;
  textClassName?: string;
  variant?: ButtonVariant;
}

export function ButtonBase({
  children,
  className,
  variant = 'green',
  appearance = 'solid',
  radiusClassName = 'rounded-12',
  size = 'md',
  shape = 'default',
  textClassName,
  ...props
}: ButtonBaseProps) {
  const isOutline = appearance === 'outline';
  const buttonRadiusClassName = shape === 'circle' ? 'rounded-full' : radiusClassName;
  const buttonShadowClassName = isOutline
    ? undefined
    : 'shadow-card';

  return (
    <View className={buttonRadiusClassName}>
      <Pressable
        className={cn(
          'items-center justify-center',
          buttonRadiusClassName,
          buttonShadowClassName,
          buttonSizeContainerClassNames[size],
          isOutline && 'border',
          appearance === 'solid'
            ? solidVariantClassNames[variant]
            : outlineVariantClassNames[variant],
          className,
        )}
        android_ripple={{
          borderless: false,
          color: isOutline
            ? outlineRippleColors[variant]
            : 'rgba(255, 255, 255, 0.24)',
        }}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text
            className={cn(
              'font-semibold',
              buttonSizeTextClassNames[size],
              appearance === 'solid'
                ? solidTextClassNames[variant]
                : outlineTextClassNames[variant],
              textClassName,
            )}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    </View>
  );
}
