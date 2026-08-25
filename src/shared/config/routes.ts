export const ROUTES = {
  HOME: '/',
  HISTORY: '/history',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
