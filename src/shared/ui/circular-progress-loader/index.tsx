import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native';

type CircularProgressLoaderProps = {
  className?: string;
  color?: string;
  size?: 'small' | 'large' | number;
} & ActivityIndicatorProps;

export function CircularProgressLoader({
  size = 'small',
  color = '#FFFFFF',
  className,
  ...props
}: CircularProgressLoaderProps) {
  return (
    <ActivityIndicator
      {...props}
      size={size}
      color={color}
      className={className}
    />
  );
}
