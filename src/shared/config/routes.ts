export const ROUTES = {
  HOME: '/',
  HISTORY: '/history',
  SETTINGS: '/settings',
  SETTINGS_ITEMS: '/settings/items',
  SETTINGS_ITEMS_ARCHIVED: '/settings/items/archived',
  SETTINGS_UNITS: '/settings/units',
  ITEM_DETAILS: (id: string) => `/items/${id}` as const,
  ITEM_MOVEMENTS: (id: string) => `/items/${id}/movements` as const,
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
