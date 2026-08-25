import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    'Missing Supabase env vars. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY in your .env file.',
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      void supabase.auth.startAutoRefresh();
    } else {
      void supabase.auth.stopAutoRefresh();
    }
  });
}

let signInPromise: Promise<void> | undefined;

export function signInWithEnvCredentials(): Promise<void> {
  if (signInPromise) return signInPromise;

  signInPromise = supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      throw new Error('Supabase session unavailable.');
    }

    if (data.session) return;

    const email = process.env.EXPO_PUBLIC_LOGIN;
    const password = process.env.EXPO_PUBLIC_PASSWORD;

    if (!email || !password) {
      throw new Error('Missing Supabase authentication env vars.');
    }

    return supabase.auth.signInWithPassword({
      email,
      password,
    }).then(({ data: signInData, error: signInError }) => {
      if (signInError || !signInData.session) {
        throw new Error('Supabase authentication failed.');
      }
    });
  }).catch(() => {
    throw new Error('Supabase authentication failed.');
  }).finally(() => {
    signInPromise = undefined;
  });

  return signInPromise;
}
