import { Link, usePathname } from 'expo-router';
import { Pressable, View } from 'react-native';

import { BoxItems, Calendar, Settings } from '@/shared/assets/svg';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';
import { Text } from '@/shared/ui/text';

const navigationItems = [
  { href: ROUTES.HOME, label: 'Остатки', Icon: BoxItems },
  { href: ROUTES.HISTORY, label: 'История', Icon: Calendar },
  { href: ROUTES.SETTINGS, label: 'Настройки', Icon: Settings },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <View className='border-t border-border bg-surface'>
      <View className='flex-row'>
        {navigationItems.map(({ href, label, Icon }) => {
          const isActive =
            pathname === href ||
            (href !== ROUTES.HOME && pathname.startsWith(href));

          return (
            <Link key={href} href={href} asChild>
              <Pressable
                accessibilityRole='tab'
                accessibilityState={{ selected: isActive }}
                className='relative flex-1 items-center py-3'
              >
                {isActive && (
                  <View className='absolute top-0 left-[25%] right-[25%] h-0.5 rounded-full bg-green' />
                )}

                <Icon
                  className={cn(
                    'mb-1',
                    isActive ? 'text-green' : 'text-neutral',
                  )}
                  height={24}
                  width={24}
                />

                <Text
                  className={cn(
                    'text-[11px] font-semibold leading-4',
                    isActive ? 'text-green' : 'text-text-muted',
                  )}
                >
                  {label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}
