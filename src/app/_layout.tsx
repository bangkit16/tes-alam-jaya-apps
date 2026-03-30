import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import '../global.css';

// Tahan splash screen sampai font siap
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Bold': Poppins_700Bold,
  });

  const toastConfig = {
    success: (props: React.ComponentProps<typeof BaseToast>) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green', width: '90%' }}
        contentContainerStyle={{ paddingHorizontal: 13 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '500',
        }}
      />
    ),
    error: (props: React.ComponentProps<typeof ErrorToast>) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red', width: '90%' }}
        contentContainerStyle={{ paddingHorizontal: 13 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '500',
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <View
          className='flex-1 bg-gray-200'
          onLayout={onLayoutRootView}
        >
          <Stack screenOptions={{ headerShown: false }} />
          <PortalHost />
        </View>
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </>
  );
}
