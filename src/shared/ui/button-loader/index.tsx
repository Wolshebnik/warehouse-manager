import type { ReactNode } from 'react';

import { ButtonBase, type ButtonBaseProps } from '@/shared/ui/button-base';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';

export interface ButtonLoaderProps extends ButtonBaseProps {
  children?: ReactNode;
  loaderColor?: string;
  loaderSize?: 'small' | 'large';
  loading?: boolean;
}

export function ButtonLoader({
  children,
  loading = false,
  disabled,
  loaderColor = '#FFFFFF',
  loaderSize = 'small',
  ...props
}: ButtonLoaderProps) {
  return (
    <ButtonBase {...props} disabled={disabled || loading}>
      {loading ? (
        <CircularProgressLoader color={loaderColor} size={loaderSize} />
      ) : (
        children
      )}
    </ButtonBase>
  );
}
