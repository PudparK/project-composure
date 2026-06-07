import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import { AuthProvider, useAuth } from "../features/auth/AuthProvider";
import { AuthLoadingScreen } from "../features/auth/screens/AuthLoadingScreen";
import { AuthScreen } from "../features/auth/screens/AuthScreen";

function RootNavigator() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (!session) {
    return <AuthScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
    </AuthProvider>
  );
}
