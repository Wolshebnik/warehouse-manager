import type { ReactNode } from 'react';

import { Pressable, type PressableProps, View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

import {
  type ButtonAppearance,
  type ButtonSize,
  type ButtonVariant,
  buttonSizeTextClassNames,
  outlineRippleColors,
  outlineTextClassNames,
  outlineVariantClassNames,
  solidTextClassNames,
  solidVariantClassNames,
} from './button-appearance';

export type { ButtonAppearance, ButtonSize, ButtonVariant };

export interface ButtonBaseProps extends Omit<
  PressableProps,
  'android_ripple' | 'style'
> {
  appearance?: ButtonAppearance;
  children?: ReactNode;
  size?: ButtonSize;
  textClassName?: string;
  variant?: ButtonVariant;
}

const RADIUS_MAP: Record<string, number> = {
  'rounded-full': 9999,
  'rounded-3xl': 24,
  'rounded-24': 24,
  'rounded-2xl': 16,
  'rounded-20': 20,
  'rounded-16': 16,
  'rounded-xl': 12,
  'rounded-12': 12,
  'rounded-10': 10,
  'rounded-lg': 8,
  'rounded-md': 6,
  'rounded-sm': 4,
};

function getBorderRadiusFromClassName(className?: string): number {
  if (!className) return 12;
  for (const [key, val] of Object.entries(RADIUS_MAP)) {
    if (className.includes(key)) return val;
  }
  return 12;
}

export function ButtonBase({
  children,
  className,
  variant = 'green',
  appearance = 'solid',
  size = 'md',
  textClassName,
  ...props
}: ButtonBaseProps) {
  const isOutline = appearance === 'outline';
  const borderRadius = getBorderRadiusFromClassName(className);

  return (
    <View style={{ borderRadius, overflow: 'hidden' }}>
      <Pressable
        className={cn(
          'items-center justify-center rounded-12 px-4 py-3',
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
