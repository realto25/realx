import { Stack } from 'expo-router';

export default function ManagerLayout() {
  return (
    <Stack>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard', headerShown: false }} />
      <Stack.Screen name="chat" options={{ title: 'Chat with Admin' }} />
      <Stack.Screen name="attendance" options={{ title: 'Mark Attendance' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="clients" options={{ title: 'Assigned Clients' }} />
      <Stack.Screen name="leave" options={{ title: 'Request Leave' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
    </Stack>
  );
} 