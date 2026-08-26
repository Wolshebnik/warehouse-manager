export type ButtonVariant = 'green' | 'red' | 'orange' | 'blue' | 'neutral';
export type ButtonAppearance = 'solid' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const buttonSizeContainerClassNames: Record<ButtonSize, string> = {
  sm: 'min-h-[32px] px-3.5 py-1',
  md: 'min-h-[48px] px-4 py-3',
  lg: 'min-h-[52px] px-5 py-3.5',
};

export const buttonSizeTextClassNames: Record<ButtonSize, string> = {
  sm: 'text-[13px] leading-4',
  md: 'text-[15px] leading-[22px]',
  lg: 'text-[16px] leading-[24px]',
};

export const solidVariantClassNames: Record<ButtonVariant, string> = {
  green: 'bg-green',
  red: 'bg-red',
  orange: 'bg-orange',
  blue: 'bg-blue',
  neutral: 'bg-neutral-soft',
};

export const outlineVariantClassNames: Record<ButtonVariant, string> = {
  green: 'border-green bg-transparent',
  red: 'border-red bg-transparent',
  orange: 'border-orange bg-transparent',
  blue: 'border-blue bg-transparent',
  neutral: 'border-neutral bg-transparent',
};

export const outlineTextClassNames: Record<ButtonVariant, string> = {
  green: 'text-green',
  red: 'text-red',
  orange: 'text-orange',
  blue: 'text-blue',
  neutral: 'text-neutral',
};

export const solidTextClassNames: Record<ButtonVariant, string> = {
  green: 'text-white',
  red: 'text-white',
  orange: 'text-white',
  blue: 'text-white',
  neutral: 'text-text-primary',
};

export const outlineRippleColors: Record<ButtonVariant, string> = {
  green: 'rgba(37, 117, 33, 0.16)',
  red: 'rgba(199, 34, 32, 0.16)',
  orange: 'rgba(246, 169, 56, 0.16)',
  blue: 'rgba(87, 154, 249, 0.16)',
  neutral: 'rgba(168, 172, 177, 0.16)',
};

