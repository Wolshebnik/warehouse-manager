import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import {
  type DayMovementItem,
  type Item,
  type ItemDetails,
  type StockMovement,
  useUpdateStockMovement,
} from '@/entities/item';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { InputBase } from '@/shared/ui/input-base';
import { RemainingBalanceCard } from '@/shared/ui/remaining-balance-card';
import { Text } from '@/shared/ui/text';

import {
  type EditStockMovementFormData,
  editStockMovementFormSchema,
} from '../model/schema';

interface MovementItemInfo {
  current_balance?: number;
  id?: string;
  name?: string;
  unit?: { id?: string; name: string; short: string } | null;
}

interface EditStockMovementFormProps {
  item?: Item | ItemDetails | MovementItemInfo | null;
  movement: StockMovement | DayMovementItem;
  onCancel: () => void;
  onSuccess?: () => void;
}

export function EditStockMovementForm({
  item,
  movement,
  onCancel,
  onSuccess,
}: EditStockMovementFormProps) {
  const { mutateAsync: updateMovementMutation, isPending } = useUpdateStockMovement();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const movementItem = 'item' in movement ? movement.item : undefined;
  const unit =
    item?.unit?.short ||
    item?.unit?.name ||
    movementItem?.unit?.short ||
    movementItem?.unit?.name ||
    '';
  const currentBalance = item?.current_balance ?? 0;
  const isIncome = movement.type === 'income';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditStockMovementFormData>({
    resolver: zodResolver(editStockMovementFormSchema),
    defaultValues: {
      amount: String(movement.quantity),
      comment: movement.description ?? '',
    },
  });

  const amountValue = useWatch({ control, name: 'amount' });
  const parsedAmount = Number((amountValue || '0').replace(',', '.'));

  const calculatedBalance = isIncome
    ? (!isNaN(parsedAmount)
        ? currentBalance - movement.quantity + parsedAmount
        : currentBalance)
    : (!isNaN(parsedAmount)
        ? currentBalance + movement.quantity - parsedAmount
        : currentBalance);

  const onSubmit = async (data: EditStockMovementFormData) => {
    const itemId = movement.item_id || item?.id;
    if (!itemId) {
      return;
    }

    setSubmitError(null);
    try {
      const newQuantity = Number(data.amount.replace(',', '.'));
      await updateMovementMutation({
        movementId: movement.id,
        itemId,
        type: movement.type,
        previousQuantity: movement.quantity,
        newQuantity,
        description: data.comment || undefined,
      });
      onSuccess?.();
      onCancel();
    } catch {
      setSubmitError('Не вдалося оновити операцію. Спробуйте ще раз.');
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
            variant={isIncome ? 'green' : 'red'}
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
            variant={isIncome ? 'green' : 'red'}
            label='Коментар'
            placeholder={
              isIncome
                ? 'Наприклад: Приймання від постачальника'
                : 'Наприклад: Переведено до другого магазину'
            }
            value={value ?? ''}
            onChangeText={onChange}
            error={errors.comment?.message}
          />
        )}
      />

      <RemainingBalanceCard
        amount={calculatedBalance}
        title={isIncome ? 'Залишок після приходу' : 'Залишок після списання'}
        type={isIncome ? 'income' : 'expense'}
        unit={unit}
      />

      {Boolean(submitError) && (
        <Text className='text-center text-[13px] text-red'>{submitError}</Text>
      )}

      <ButtonLoader
        variant={isIncome ? 'green' : 'red'}
        loading={isPending}
        loaderColor='#FFFFFF'
        loaderSize='small'
        className='w-full py-3.5'
        onPress={handleSubmit(onSubmit)}
      >
        Зберегти
      </ButtonLoader>
    </View>
  );
}
