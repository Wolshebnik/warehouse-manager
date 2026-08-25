export interface PastelColor {
  border: string;
  primary: string;
  soft: string;
}

export const PASTEL_COLORS: readonly PastelColor[] = [
  { primary: '#257521', soft: '#EAF4E4', border: '#D2E8C7' },
  { primary: '#D97706', soft: '#FEF5E8', border: '#FCDCA5' },
  { primary: '#2563EB', soft: '#EFF4FE', border: '#CFE0FD' },
  { primary: '#7C3AED', soft: '#F5F3FF', border: '#DDD6FE' },
  { primary: '#E11D48', soft: '#FFF1F2', border: '#FECDD3' },
  { primary: '#0D9488', soft: '#F0FDFA', border: '#CCFBF1' },
  { primary: '#4F46E5', soft: '#EEF2FF', border: '#E0E7FF' },
  { primary: '#0284C7', soft: '#F0F9FF', border: '#BAE6FD' },
  { primary: '#CA8A04', soft: '#FEFCE8', border: '#FEF08A' },
  { primary: '#64748B', soft: '#F1F5F9', border: '#E2E8F0' },
] as const;

export function getPastelColorByIndex(index: number): PastelColor {
  const normalizedIndex = Math.abs(index) % PASTEL_COLORS.length;
  return PASTEL_COLORS[normalizedIndex];
}

export function getPastelColorById(id?: string | null): PastelColor {
  if (!id) return PASTEL_COLORS[0];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % PASTEL_COLORS.length;
  return PASTEL_COLORS[index];
}

export function assignPastelColors<T>(items: readonly T[]): PastelColor[] {
  return items.map((_, index) => PASTEL_COLORS[index % PASTEL_COLORS.length]);
}
