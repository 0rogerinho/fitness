import { useTheme } from '@/shared/contexts/ThemeContext';

export function useColorScheme(): 'light' | 'dark' {
  try {
    const { colorScheme } = useTheme();
    return colorScheme;
  } catch {
    // Fallback se o contexto não estiver disponível
    const { useColorScheme: useRNColorScheme } = require('react-native');
    return useRNColorScheme() ?? 'light';
  }
}
