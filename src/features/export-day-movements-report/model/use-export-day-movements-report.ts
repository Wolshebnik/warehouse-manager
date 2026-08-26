import { useCallback, useRef, useState } from 'react';
import { type View } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

export function useExportDayMovementsReport() {
  const [isExporting, setIsExporting] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<Date>(() => new Date());
  const exportRef = useRef<View>(null);

  const exportReport = useCallback(async () => {
    if (isExporting) {
      return;
    }

    setIsExporting(true);
    setGeneratedAt(new Date());

    try {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          setTimeout(resolve, 50);
        });
      });

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
          dialogTitle: 'Поділитися операціями за день',
          UTI: 'public.png',
        });
      }
    } finally {
      setIsExporting(false);
    }
  }, [isExporting]);

  return {
    exportRef,
    exportReport,
    generatedAt,
    isExporting,
  };
}
