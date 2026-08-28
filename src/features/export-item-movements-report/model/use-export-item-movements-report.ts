import { useCallback, useRef, useState } from 'react';
import type { LayoutChangeEvent, View } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

export function useExportItemMovementsReport() {
  const [isExporting, setIsExporting] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<Date>(() => new Date());
  const exportRef = useRef<View>(null);
  const layoutResolverRef = useRef<(() => void) | null>(null);

  const handleLayout = useCallback((_event: LayoutChangeEvent) => {
    if (layoutResolverRef.current) {
      layoutResolverRef.current();
      layoutResolverRef.current = null;
    }
  }, []);

  const exportReport = useCallback(async () => {
    if (isExporting) {
      return;
    }

    setIsExporting(true);

    try {
      const layoutReady = new Promise<void>((resolve) => {
        layoutResolverRef.current = resolve;
      });

      setGeneratedAt(new Date());

      await layoutReady;

      if (!exportRef.current) {
        throw new Error('Export view reference is not available');
      }

      const base64Data = await captureRef(exportRef.current, {
        format: 'png',
        quality: 1,
        result: 'base64',
      });

      try {
        await Clipboard.setImageAsync(base64Data);
      } catch {}

      const fileUri = await captureRef(exportRef.current, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });

      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (isSharingAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/png',
          dialogTitle: 'Поділитися рухами товару',
          UTI: 'public.png',
        });
      }
    } finally {
      layoutResolverRef.current = null;
      setIsExporting(false);
    }
  }, [isExporting]);

  return {
    exportRef,
    exportReport,
    generatedAt,
    handleLayout,
    isExporting,
  };
}
