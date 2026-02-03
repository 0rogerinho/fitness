import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { Platform, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors, DarkTheme, LightTheme } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/shared/contexts/AuthContext';
import { ThemeProvider as AppThemeProvider } from '@/shared/contexts/ThemeContext';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

// Manter splash visível até as fontes (ícones) estarem carregadas
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Aguardar um tick para garantir que o router está pronto
    const timer = setTimeout(() => {
      const inAuthGroup = segments[0] === '(tabs)';

      if (!isAuthenticated && inAuthGroup) {
        router.replace('/login');
      } else if (isAuthenticated && segments[0] === 'login') {
        router.replace('/(tabs)');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isAuthenticated, segments, router]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal', title: 'Modal' }}
      />
      <Stack.Screen name="questionario" options={{ title: 'Questionário' }} />
      <Stack.Screen name="treino-chat" options={{ title: 'Create Workout' }} />
      <Stack.Screen
        name="treino-detalhes"
        options={{ title: 'Workout Details' }}
      />
      <Stack.Screen name="perfil" options={{ headerShown: false }} />
      <Stack.Screen
        name="post-detalhes"
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  const statusBarBg =
    colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;

  // Carregar fonte Ionicons antes de exibir o app (resolve ícones não aparecerem no Android)
  const [fontsLoaded, fontError] = useFonts({
    ...Ionicons.font,
  });

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Paridade Android: barras do sistema (status + navegação) seguem o tema
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(statusBarBg);
    }
  }, [statusBarBg]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <AuthProvider>
            <ThemeProvider value={theme}>
              <RootLayoutNav />
              <StatusBar
                style={colorScheme === 'dark' ? 'light' : 'dark'}
                translucent={Platform.OS === 'android'}
                backgroundColor={
                  Platform.OS === 'android' ? statusBarBg : 'transparent'
                }
              />
            </ThemeProvider>
          </AuthProvider>
        </AppThemeProvider>
      </SafeAreaProvider>
    </View>
  );
}
