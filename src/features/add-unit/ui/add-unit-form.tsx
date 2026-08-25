import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import {
  type CreateUnitDto,
  createUnitSchema,
  type Unit,
  useCreateUnit,
  useUpdateUnit,
} from '@/entities/unit';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { InputBase } from '@/shared/ui/input-base';
import { Text } from '@/shared/ui/text';

interface AddUnitFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
  unit?: Unit | null;
}

export function AddUnitForm({ onCancel, onSuccess, unit }: AddUnitFormProps) {
  const { mutateAsync: createUnitMutation, isPending } = useCreateUnit();
  const { mutateAsync: updateUnitMutation, isPending: isUpdatePending } = useUpdateUnit();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateUnitDto>({
    resolver: zodResolver(createUnitSchema),
    defaultValues: {
      name: unit?.name ?? '',
      short: unit?.short ?? '',
    },
  });

  const onSubmit = async (data: CreateUnitDto) => {
    try {
      if (unit) {
        await updateUnitMutation({ id: unit.id, dto: data });
      } else {
        await createUnitMutation(data);
      }
      onSuccess?.();
      onCancel();
    } catch {
      setError('root', {
        message: 'Не вдалося зберегти одиницю. Спробуйте ще раз.',
      });
    }
  };

  const isLoading = isSubmitting || isPending || isUpdatePending;

  return (
    <View className='gap-2 py-2'>
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange, value } }) => (
          <InputBase
            bottomSheet
            label='Назва'
            placeholder='наприклад: Кілограми'
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
            required
          />
        )}
      />

      <Controller
        control={control}
        name='short'
        render={({ field: { onChange, value } }) => (
          <InputBase
            bottomSheet
            label='Скорочення'
            placeholder='наприклад: кг'
            value={value}
            onChangeText={onChange}
            error={errors.short?.message}
            required
          />
        )}
      />

      {errors.root?.message && (
        <Text className='text-center text-[13px] text-red'>
          {errors.root.message}
        </Text>
      )}

      <ButtonLoader
        variant='green'
        loading={isLoading}
        loaderColor='#FFFFFF'
        loaderSize='small'
        className='mt-2 w-full py-3.5'
        onPress={handleSubmit(onSubmit)}
      >
        Зберегти
      </ButtonLoader>
    </View>
  );
}

