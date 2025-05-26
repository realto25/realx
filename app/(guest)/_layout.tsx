import { Stack } from 'expo-router';

export default function ManagerLayout() {
  return (
    <Stack>
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="qr-code" options={{ headerShown: false }} />
      <Stack.Screen name="projects" options={{ headerShown: false }} />
      <Stack.Screen name="saved-location" options={{ headerShown: false }} />
      <Stack.Screen name="security" options={{ headerShown: false }} />
      <Stack.Screen name="wishlist" options={{ headerShown: false }} />
      <Stack.Screen name="terms" options={{ headerShown: false }} />
      <Stack.Screen name="help-center" options={{ headerShown: false }} />
    </Stack>
  );
} 