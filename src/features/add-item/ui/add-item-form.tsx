import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import {
  type CreateItemDto,
  createItemSchema,
  type Item,
  useArchiveItem,
  useCreateItem,
  useRestoreItem,
  useUpdateItem,
} from '@/entities/item';
import { useGetUnits } from '@/entities/unit';
import { ButtonLoader } from '@/shared/ui/button-loader';
import { InputBase } from '@/shared/ui/input-base';
import { Select } from '@/shared/ui/select';
import { Text } from '@/shared/ui/text';

interface AddItemFormProps {
  item?: Item | null;
  onCancel: () => void;
  onRestored?: () => void;
  restoreOnly?: boolean;
}

export function AddItemForm({
  item,
  onCancel,
  onRestored,
  restoreOnly = false,
}: AddItemFormProps) {
  const { data: units = [] } = useGetUnits();
  const { mutateAsync: createItemMutation, isPending: isCreatePending } =
    useCreateItem();
  const { mutateAsync: updateItemMutation, isPending: isUpdatePending } =
    useUpdateItem();
  const { mutateAsync: archiveItemMutation, isPending: isArchivePending } =
    useArchiveItem();
  const { mutateAsync: restoreItemMutation, isPending: isRestorePending } =
    useRestoreItem();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateItemDto>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      name: item?.name ?? '',
      description: item?.description ?? '',
      unit_id: item?.unit_id ?? '',
    },
  });

  const onSubmit = async (data: CreateItemDto) => {
    try {
      const descriptionValue = data.description?.trim() ? data.description.trim() : null;

      if (item) {
        await updateItemMutation({
          id: item.id,
          dto: {
            name: data.name,
            description: descriptionValue,
            unit_id: data.unit_id,
          },
        });
      } else {
        await createItemMutation({
          ...data,
          description: descriptionValue,
        });
      }
      onCancel();
    } catch {
      setError('root', {
        message: 'Не вдалося зберегти товар. Спробуйте ще раз.',
      });
    }
  };

  const handleArchive = async () => {
    if (!item) return;

    try {
      await archiveItemMutation(item.id);
      onCancel();
    } catch {
      setError('root', {
        message: 'Не вдалося архівувати товар. Спробуйте ще раз.',
      });
    }
  };

  const handleRestore = async () => {
    if (!item) return;

    try {
      await restoreItemMutation(item.id);
      onRestored?.();
      onCancel();
    } catch {
      setError('root', {
        message: 'Не вдалося відновити товар. Спробуйте ще раз.',
      });
    }
  };

  const isLoading =
    isSubmitting ||
    isCreatePending ||
    isUpdatePending ||
    isArchivePending ||
    isRestorePending;

  if (restoreOnly) {
    return (
      <View className='gap-4 py-2'>
        {errors.root?.message && (
          <Text className='text-center text-[13px] text-red'>
            {errors.root.message}
          </Text>
        )}
        <ButtonLoader
          variant='green'
          loading={isRestorePending}
          loaderColor='#FFFFFF'
          loaderSize='small'
          className='w-full py-3.5'
          onPress={() => void handleRestore()}
        >
          Відновити товар
        </ButtonLoader>
      </View>
    );
  }

  return (
    <View className='gap-2 py-2'>
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange, value } }) => (
          <InputBase
            bottomSheet
            label='Назва товару'
            placeholder='наприклад: Онлайн'
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
            required
          />
        )}
      />

      <Controller
        control={control}
        name='description'
        render={({ field: { onChange, value } }) => (
          <InputBase
            bottomSheet
            label='Опис'
            placeholder='наприклад: Опис товару'
            value={value ?? ''}
            onChangeText={onChange}
            error={errors.description?.message}
          />
        )}
      />

      <Controller
        control={control}
        name='unit_id'
        render={({ field: { onChange, value } }) => (
          <Select
            error={errors.unit_id?.message}
            label='Одиниця виміру'
            onChange={onChange}
            options={units.map((unit) => ({
              label: `${unit.name} (${unit.short})`,
              value: unit.id,
            }))}
            placeholder='Оберіть одиницю виміру'
            required
            value={value}
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

      {item && !item.is_archived && (
        <ButtonLoader
          appearance='outline'
          variant='red'
          loading={isArchivePending}
          loaderColor='#C72220'
          loaderSize='small'
          className='w-full py-3.5'
          onPress={() => void handleArchive()}
        >
          Архівувати товар
        </ButtonLoader>
      )}
    </View>
  );
}
