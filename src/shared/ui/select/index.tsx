import { useState } from 'react';

import { Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Chevron } from '@/shared/assets/svg';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

export interface SelectOption<T = string | number> {
  description?: string;
  disabled?: boolean;
  label: string;
  value: T;
}

export interface SelectProps<T = string | number> {
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  labelColor?: string;
  onChange: (value: T) => void;
  options: readonly SelectOption<T>[];
  optionsMaxHeight?: number;
  placeholder?: string;
  required?: boolean;
  value?: T | null;
}

export function Select<T = string | number>({
  className,
  disabled = false,
  error,
  label,
  labelColor = '#FFFFFF',
  onChange,
  options,
  optionsMaxHeight = 140,
  placeholder,
  required,
  value,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const hasError = Boolean(error);
  const selectedOption = options.find((option) => option.value === value);
  const borderClassName = hasError ? 'border-red' : 'border-green';

  return (
    <View className={cn('w-full', label && 'pt-2.5', className)}>
      <Pressable
        accessibilityRole='combobox'
        accessibilityState={{ expanded: isOpen }}
        disabled={disabled}
        className={cn(
          'relative h-14 flex-row items-center justify-between rounded-12 border bg-surface px-4',
          borderClassName,
          disabled && 'bg-neutral-soft',
        )}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        {label && (
          <View
            className='absolute -top-2.5 left-3 z-10 flex-row items-center px-1'
            style={{ backgroundColor: labelColor }}
          >
            <Text
              className={cn(
                'text-[12px]',
                hasError ? 'text-red' : 'text-green',
              )}
            >
              {label}
            </Text>

            {required && (
              <Text className='ml-0.5 text-[12px] text-red'>*</Text>
            )}
          </View>
        )}

        <Text
          className={cn(
            'flex-1 pr-2 text-[16px]',
            selectedOption ? 'text-text-primary' : 'text-text-muted',
            disabled && 'text-text-muted',
          )}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        {!disabled && (
          <View
            style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
          >
            <Chevron
              className={hasError ? 'text-red' : 'text-green'}
              height={20}
              width={20}
            />
          </View>
        )}
      </Pressable>

      {hasError && (
        <Text className='ml-1 mt-1 text-[12px] text-red'>{error}</Text>
      )}

      {isOpen && (
        <View
          className='mt-2 overflow-hidden rounded-12 border border-green bg-surface shadow-card'
          style={{ maxHeight: optionsMaxHeight }}
        >
          <ScrollView
            bounces={false}
            disallowInterruption
            nestedScrollEnabled
            persistentScrollbar
            showsVerticalScrollIndicator
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isDisabled = Boolean(option.disabled);

              return (
                <Pressable
                  key={String(option.value)}
                  accessibilityRole='radio'
                  accessibilityState={{ selected: isSelected }}
                  disabled={isDisabled}
                  className={cn(
                    'flex-row items-center justify-between px-4 py-3',
                    index > 0 && 'border-t border-border',
                    isSelected && 'bg-green-soft',
                    !isSelected && !isDisabled && 'active:bg-neutral-soft',
                    isDisabled && 'opacity-40',
                  )}
                  onPress={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <View className='flex-1 pr-2'>
                    <Text
                      className={cn(
                        'text-[15px]',
                        isSelected ? 'font-medium text-green' : 'text-text-primary',
                      )}
                    >
                      {option.label}
                    </Text>

                    {option.description && (
                      <Text className='mt-0.5 text-[12px] text-text-muted'>
                        {option.description}
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
