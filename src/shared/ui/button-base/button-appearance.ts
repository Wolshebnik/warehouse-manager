export type ButtonVariant = 'green' | 'red' | 'orange' | 'blue' | 'neutral';
export type ButtonAppearance = 'solid' | 'outline';

export const solidVariantClassNames: Record<ButtonVariant, string> = {
  green: 'bg-green',
  red: 'bg-red',
  orange: 'bg-orange',
  blue: 'bg-blue',
  neutral: 'bg-neutral-soft',
};

export const outlineVariantClassNames: Record<ButtonVariant, string> = {
  green: 'border-green',
  red: 'border-red',
  orange: 'border-orange',
  blue: 'border-blue',
  neutral: 'border-neutral',
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
