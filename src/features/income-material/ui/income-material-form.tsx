import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import {
  type Item,
  type ItemDetails,
  useCreateIncome,
} from '@/entities/item';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { InputBase } from '@/shared/ui/input-base';
import { RemainingBalanceCard } from '@/shared/ui/remaining-balance-card';
import {
  TargetBalanceInput,
  TargetBalanceToggle,
} from '@/shared/ui/target-balance-input';
import { Text } from '@/shared/ui/text';

import {
  type IncomeFormData,
  incomeFormSchema,
} from '../model/schema';

interface IncomeMaterialFormProps {
  item?: Item | ItemDetails | null;
  onCancel: () => void;
  onSuccess?: () => void;
}

export function IncomeMaterialForm({
  item,
  onCancel,
  onSuccess,
}: IncomeMaterialFormProps) {
  const { mutateAsync: createIncomeMutation, isPending } = useCreateIncome();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const unit = item?.unit?.short || item?.unit?.name || '';
  const currentBalance = item?.current_balance ?? 0;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IncomeFormData>({
    resolver: zodResolver(incomeFormSchema),
    defaultValues: {
      amount: '',
      comment: '',
    },
  });

  const amountValue = useWatch({ control, name: 'amount' });
  const parsedAmount = Number((amountValue || '0').replace(',', '.'));
  const calculatedBalance = !isNaN(parsedAmount)
    ? currentBalance + parsedAmount
    : currentBalance;

  const onSubmit = async (data: IncomeFormData) => {
    if (!item) {

      return;
    }
    setSubmitError(null);
    try {
      const quantity = Number(data.amount.replace(',', '.'));
      await createIncomeMutation({
        itemId: item.id,
        quantity,
        description: data.comment || undefined,
      });
      onSuccess?.();
      onCancel();
    } catch {
      setSubmitError('Не вдалося зберегти прихід. Спробуйте ще раз.');
    }
  };

  return (
    <View className='gap-2 py-2'>
      <Controller
        control={control}
        name='amount'
        render={({ field: { onChange, value } }) => (
          <InputBase
            bottomSheet
            variant='green'
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

      <TargetBalanceInput
        key={isCalculatorOpen ? 'open' : 'closed'}
        amount={amountValue}
        currentBalance={currentBalance}
        isOpen={isCalculatorOpen}
        onQuantityChange={(value) =>
          setValue('amount', value, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        type='income'
        unit={unit}
      />

      <Controller
        control={control}
        name='comment'
        render={({ field: { onChange, value } }) => (
          <InputBase
            bottomSheet
            multiline
            variant='green'
            label='Коментар'
            placeholder='Наприклад: Приймання від постачальника'
            value={value ?? ''}
            onChangeText={onChange}
            error={errors.comment?.message}
          />
        )}
      />

      <RemainingBalanceCard
        amount={calculatedBalance}
        title='Залишок після приходу'
        type='income'
        unit={unit}
      />

      {Boolean(submitError) && (
        <Text className='text-center text-[13px] text-red'>{submitError}</Text>
      )}

      <View className='flex-row gap-2'>
        <TargetBalanceToggle
          isOpen={isCalculatorOpen}
          onPress={() => setIsCalculatorOpen((isOpen) => !isOpen)}
          type='income'
        />
        <View className='flex-[2]'>
          <ButtonLoader
            variant='green'
            loading={isPending}
            loaderColor='#FFFFFF'
            loaderSize='small'
            className='w-full py-3.5'
            onPress={handleSubmit(onSubmit)}
          >
            Додати
          </ButtonLoader>
        </View>
      </View>
    </View>
  );
}
