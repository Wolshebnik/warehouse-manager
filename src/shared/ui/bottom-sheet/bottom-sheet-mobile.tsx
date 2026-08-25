import { useCallback, useEffect, useRef } from 'react';

import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { X } from '@/shared/assets/svg';
import { Text } from '@/shared/ui/text';

import { type BottomSheetProps } from './types';

export function BottomSheetMobile({
  children,
  isOpen,
  title,
  onClose,
}: BottomSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const hasPresentedRef = useRef(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
      hasPresentedRef.current = true;
      return;
    }

    if (hasPresentedRef.current) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  useEffect(() => {
    const modalRef = bottomSheetModalRef.current;
    return () => {
      if (hasPresentedRef.current) {
        modalRef?.dismiss();
      }
    };
  }, []);

  const handleDismiss = useCallback(() => {
    hasPresentedRef.current = false;
    onClose();
  }, [onClose]);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
        pressBehavior='close'
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      onDismiss={handleDismiss}
      enablePanDownToClose
      handleIndicatorStyle={{
        backgroundColor: '#DADFDB',
        width: 48,
        height: 5,
        borderRadius: 9999,
      }}
      backgroundStyle={{
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
      }}
    >
      <BottomSheetView
        className='px-5'
        style={{
          paddingBottom: Math.max(insets.bottom, 16),
        }}
      >
        <View className='mb-3 flex-row items-center justify-between'>
          {title && (
            <Text
              className='min-w-0 flex-1 font-bold text-[18px] leading-6 text-text-primary'
              numberOfLines={1}
            >
              {title}
            </Text>
          )}

          <Pressable
            accessibilityLabel='Закрити панель'
            accessibilityRole='button'
            className='ml-auto h-8 w-8 shrink-0 items-center justify-center rounded-full active:bg-neutral-soft'
            onPress={handleClose}
          >
            <X className='text-text-primary' height={14} width={14} />
          </Pressable>
        </View>

        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}
