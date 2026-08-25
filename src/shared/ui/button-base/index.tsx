import type { ReactNode } from 'react';

import { Pressable, type PressableProps } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

import {
  type ButtonVariant,
  type ButtonAppearance,
  outlineRippleColors,
  outlineTextClassNames,
  outlineVariantClassNames,
  solidTextClassNames,
  solidVariantClassNames,
} from './button-appearance';

export interface ButtonBaseProps extends Omit<PressableProps, 'android_ripple' | 'style'> {
  children?: ReactNode;
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
}

export function ButtonBase({
  children,
  className,
  variant = 'green',
  appearance = 'solid',
  ...props
}: ButtonBaseProps) {
  return (
    <Pressable
      className={cn(
        'items-center justify-center overflow-hidden rounded-12 px-4 py-3 active:scale-[0.98]',
        appearance === 'outline' && 'border',
        appearance === 'solid'
          ? solidVariantClassNames[variant]
          : outlineVariantClassNames[variant],
        className,
      )}
      android_ripple={{
        color:
          appearance === 'solid'
            ? 'rgba(255, 255, 255, 0.24)'
            : outlineRippleColors[variant],
      }}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          className={cn(
            'font-semibold text-[15px] leading-[22px]',
            appearance === 'solid'
              ? solidTextClassNames[variant]
              : outlineTextClassNames[variant],
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
