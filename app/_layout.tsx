import { Stack, useSegments, useRouter } from "expo-router";
import { Colors } from "../constants/Constants";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/src/contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { userToken, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    
    const isAuthScreen = String(segments[0]) === 'login' || String(segments[0]) === 'mfa' || String(segments[0]) === 'register' || String(segments[0]) === 'two-factor-setup';

    if (!userToken && !isAuthScreen) {
      // Usuario nao logado tentando acessar conteudo restrito
      router.replace('/login' as any);
    } else if (userToken && isAuthScreen) {
      // Usuario ja logado tentando acessar rotas de autenticacao
      router.replace('/(tabs)' as any);
    }
  }, [userToken, segments, isLoading]);

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: Colors.light.background } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="mfa" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="two-factor-setup" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
