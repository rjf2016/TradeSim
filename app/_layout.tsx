import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{ contentStyle: { backgroundColor: Colors.background } }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modal)/stock/[id]"
          options={{
            contentStyle: { backgroundColor: Colors.sheet },
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
