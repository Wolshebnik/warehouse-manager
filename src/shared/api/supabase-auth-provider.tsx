import { useEffect, useState, type PropsWithChildren } from 'react';
import { View } from 'react-native';

import { signInWithEnvCredentials, supabase } from '@/shared/api/supabase';
import { CircularProgressLoader } from '@/shared/ui/circular-progress-loader';
import { ButtonBase } from '@/shared/ui/button-base';
import { Text } from '@/shared/ui/text';

type AuthState = 'loading' | 'ready' | 'error';

export function SupabaseAuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [retryAttempt, setRetryAttempt] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (isMounted && event === 'SIGNED_OUT') {
        setAuthState('error');
      }
    });

    void signInWithEnvCredentials()
      .then(() => {
        if (isMounted) {
          setAuthState('ready');
        }
      })
      .catch(() => {
        if (isMounted) {
          setAuthState('error');
        }
      });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [retryAttempt]);

  const retryAuth = () => {
    setAuthState('loading');
    setRetryAttempt((attempt) => attempt + 1);
  };

  if (authState === 'loading') {
    return (
      <View className='flex-1 items-center justify-center bg-background'>
        <CircularProgressLoader color='#257521' size='large' />
      </View>
    );
  }

  if (authState === 'error') {
    return (
      <View className='flex-1 items-center justify-center bg-background p-6'>
        <Text className='mb-4 text-center text-text-muted'>
          Не вдалося підключитися до Supabase.
        </Text>
        <ButtonBase variant='green' onPress={retryAuth}>
          Повторити
        </ButtonBase>
      </View>
    );
  }

  return <>{children}</>;
}
