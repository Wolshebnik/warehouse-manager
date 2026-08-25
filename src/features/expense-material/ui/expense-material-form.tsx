import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import {
  type Item,
  type ItemDetails,
  useCreateExpense,
} from '@/entities/item';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { InputBase } from '@/shared/ui/input-base';
import { Text } from '@/shared/ui/text';

import {
  type ExpenseFormData,
  expenseFormSchema,
} from '../model/schema';

interface ExpenseMaterialFormProps {
  item?: Item | ItemDetails | null;
  onCancel: () => void;
  onSuccess?: () => void;
}

export function ExpenseMaterialForm({
  item,
  onCancel,
  onSuccess,
}: ExpenseMaterialFormProps) {
  const { mutateAsync: createExpenseMutation, isPending } = useCreateExpense();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const unit = item?.unit?.short || item?.unit?.name || '';
  const currentBalance = item?.current_balance ?? 0;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      amount: '',
      comment: '',
    },
  });

  const amountValue = useWatch({ control, name: 'amount' });
  const parsedAmount = Number((amountValue || '0').replace(',', '.'));
  const remainingBalance = !isNaN(parsedAmount)
    ? currentBalance - parsedAmount
    : currentBalance;

  const onSubmit = async (data: ExpenseFormData) => {
    if (!item) {
      return;
    }
    setSubmitError(null);
    try {
      const quantity = Number(data.amount.replace(',', '.'));
      await createExpenseMutation({
        itemId: item.id,
        quantity,
        description: data.comment || undefined,
      });
      onSuccess?.();
      onCancel();
    } catch {
      setSubmitError('Не вдалося зберегти списання. Спробуйте ще раз.');
    }
  };

  return (
    <View className='gap-4 py-2'>
      <Controller
        control={control}
        name='amount'
        render={({ field: { onChange, value } }) => (
          <InputBase
            bottomSheet
            variant='red'
            label={`Кількість, ${unit}`}
            placeholder='0'
            keyboardType='decimal-pad'
            value={value}
            onChangeText={onChange}
            error={errors.amount?.message}
            required
            rightElement={
              <Text className='font-medium text-[16px] text-text-primary'>
                {unit}
              </Text>
            }
          />
        )}
      />

      <Controller
        control={control}
        name='comment'
        render={({ field: { onChange, value } }) => (
          <InputBase
            bottomSheet
            multiline
            variant='red'
            label='Коментар'
            placeholder='Наприклад: Переведено до другого магазину'
            value={value ?? ''}
            onChangeText={onChange}
            error={errors.comment?.message}
          />
        )}
      />

      <View className='rounded-16 border border-red-border bg-red-tint p-3'>
        <Text className='mb-0.5 font-medium text-[13px] text-text-muted'>
          Залишок після списання
        </Text>
        <View className='flex-row items-baseline gap-1.5'>
          <Text className='font-bold text-[26px] leading-7 text-red'>
            {remainingBalance.toLocaleString('uk-UA')}
          </Text>
          <Text className='font-bold text-[16px] text-red'>{unit}</Text>
        </View>
      </View>

      {Boolean(submitError) && (
        <Text className='text-center text-[13px] text-red'>{submitError}</Text>
      )}

      <ButtonLoader
        variant='red'
        loading={isPending}
        loaderColor='#FFFFFF'
        loaderSize='small'
        className='w-full py-3.5'
        onPress={handleSubmit(onSubmit)}
      >
        Списати
      </ButtonLoader>
    </View>
  );
}
