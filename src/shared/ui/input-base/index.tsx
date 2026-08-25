import type { ReactNode } from 'react';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { TextInput, type TextInputProps, useWindowDimensions, View } from 'react-native';

import { cn } from '@/shared/lib/cn';

import { Text } from '../text';

export interface InputBaseProps extends TextInputProps {
  bottomSheet?: boolean;
  error?: string;
  label?: string;
  labelColor?: string;
  required?: boolean;
  rightElement?: ReactNode;
  variant?: 'green' | 'red';
}

export function InputBase({
  error,
  label,
  labelColor = '#FFFFFF',
  bottomSheet = false,
  className,
  required,
  rightElement,
  multiline,
  variant = 'green',
  ...props
}: InputBaseProps) {
  const hasError = Boolean(error);
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth > 640;

  const InputComponent = bottomSheet && !isWide ? BottomSheetTextInput : TextInput;

  const isRed = variant === 'red';
  const borderClassName = hasError
    ? 'border-red border-[1.5px] bg-red-tint/30'
    : isRed
      ? 'border-[#E5B8B6]'
      : 'border-green';

  const labelColorClassName = hasError
    ? 'text-red font-bold'
    : isRed
      ? 'text-red'
      : 'text-green';

  const inputClassName = cn(
    'pl-4',
    rightElement ? 'pr-2' : 'pr-4',
    'text-[16px] text-text-primary',
    'outline-none',
    'placeholder:text-text-muted',
    props.editable === false && 'bg-neutral-soft text-text-muted',
    multiline && 'py-3',
  );

  return (
    <View className={cn('w-full', label && 'pt-2.5', className)}>
      {label ? (
        <View
          className={cn(
            'relative flex-row items-center rounded-12 border',
            multiline ? 'min-h-[96px] items-start' : 'h-14',
            borderClassName,
          )}
        >
          <View
            className='absolute -top-2.5 left-3 z-10 flex-row items-center px-1'
            style={{ backgroundColor: labelColor }}
          >
            <Text className={cn('text-[12px]', labelColorClassName)}>
              {label}
            </Text>

            {required && (
              <Text className='ml-0.5 text-[12px] text-red'>*</Text>
            )}
          </View>

          <InputComponent
            multiline={multiline}
            className={cn(inputClassName, 'flex-1')}
            textAlignVertical={multiline ? 'top' : 'center'}
            {...props}
          />

          {Boolean(rightElement) && (
            <View className='pr-4 items-center justify-center'>
              {rightElement}
            </View>
          )}
        </View>
      ) : (
        <View
          className={cn(
            'flex-row items-center rounded-12 border',
            multiline ? 'min-h-[96px] items-start' : 'h-14',
            borderClassName,
          )}
        >
          <InputComponent
            multiline={multiline}
            className={cn(inputClassName, 'flex-1')}
            textAlignVertical={multiline ? 'top' : 'center'}
            {...props}
          />
          {Boolean(rightElement) && (
            <View className='pr-4 items-center justify-center'>
              {rightElement}
            </View>
          )}
        </View>
      )}

      {hasError && (
        <Text className='ml-1 mt-1 text-[12px] text-red'>{error}</Text>
      )}
    </View>
  );
}

