import { type ReactNode, useState } from 'react';

import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  TextInput,
  type TextInputProps,
  useWindowDimensions,
  View,
} from 'react-native';

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
  onBlur,
  onFocus,
  placeholder,
  variant = 'green',
  ...props
}: InputBaseProps) {
  const hasError = Boolean(error);
  const [isFocused, setIsFocused] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth > 640;

  const inputComponents = [TextInput, BottomSheetTextInput] as const;
  const InputComponent = inputComponents[Number(bottomSheet && !isWide)];

  const borderClassName = cn(
    !hasError &&
      {
        green: 'border-green',
        red: 'border-[#E5B8B6]',
      }[variant],
    hasError && 'border-red border-[1.5px] bg-red-tint/30',
  );

  const labelColorClassName = cn(
    !hasError &&
      {
        green: 'text-green',
        red: 'text-red',
      }[variant],
    hasError && 'text-red font-bold',
  );

  const inputClassName = cn(
    'pl-4',
    rightElement ? 'pr-2' : 'pr-4',
    'text-[16px] text-text-primary',
    'outline-none',
    'placeholder:text-text-muted',
    props.editable === false && 'bg-neutral-soft text-text-muted',
    multiline && 'py-3',
  );
  const textAlignVertical: 'center' | 'top' = ['center', 'top'][
    Number(Boolean(multiline))
  ] as 'center' | 'top';

  return (
    <View className={cn('w-full', label && 'pt-2.5', className)}>
      <View
        className={cn(
          label && 'relative',
          'flex-row items-center rounded-12 border',
          ['h-14', 'min-h-[96px] items-start'][Number(Boolean(multiline))],
          borderClassName,
        )}
      >
        {label && (
          <View
            className='absolute -top-2.5 left-3 z-10 flex-row items-center px-1'
            style={{ backgroundColor: labelColor }}
          >
            <Text className={cn('text-[12px]', labelColorClassName)}>
              {label}
            </Text>

            {required && <Text className='ml-0.5 text-[12px] text-red'>*</Text>}
          </View>
        )}

        <InputComponent
          {...props}
          className={cn(inputClassName, 'flex-1')}
          multiline={multiline}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          placeholder={isFocused ? undefined : placeholder}
          textAlignVertical={textAlignVertical}
        />

        {Boolean(rightElement) && (
          <View className='items-center justify-center pr-4'>
            {rightElement}
          </View>
        )}
      </View>

      {hasError && (
        <Text className='ml-1 mt-1 text-[12px] text-red'>{error}</Text>
      )}
    </View>
  );
}
