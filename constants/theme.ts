/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Theme } from '@react-navigation/native';
import { Platform } from 'react-native';

// Paleta de cores moderna para app fitness com IA e redes sociais
// Combina energia fitness, tecnologia IA e cores sociais vibrantes
const tintColorLight = '#FF6B35'; // Laranja energético (fitness)
const tintColorDark = '#FF8C61'; // Laranja claro para dark mode

export const Colors = {
  light: {
    text: '#1A1A1A',
    background: '#FAFAFA',
    tint: tintColorLight,
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorLight,

    // Cores principais
    primary: '#FF6B35', // Laranja energético (fitness)
    secondary: '#4ECDC4', // Turquesa moderno (IA/tech)
    accent: '#9B59B6', // Roxo vibrante (redes sociais)

    // Cores de status
    success: '#10B981', // Verde sucesso
    warning: '#F59E0B', // Amarelo aviso
    error: '#EF4444', // Vermelho erro
    info: '#3B82F6', // Azul informação

    // Cores de IA/Tech
    ai: '#6366F1', // Índigo para elementos de IA
    aiGlow: '#818CF8', // Brilho IA
    tech: '#00D4FF', // Ciano tech

    // Cores sociais
    social: '#8B5CF6', // Roxo social
    socialSecondary: '#EC4899', // Rosa social

    // Cores de superfície
    card: '#FFFFFF',
    cardBorder: '#E5E7EB',
    surface: '#F3F4F6',
    surfaceElevated: '#FFFFFF',

    // Gradientes
    gradientStart: '#FF6B35', // Laranja
    gradientEnd: '#4ECDC4', // Turquesa
    gradientFitness: '#FF6B35', // Fitness
    gradientAI: '#6366F1', // IA
    gradientSocial: '#8B5CF6', // Social

    // Cores especiais
    highlight: '#FFE66D', // Amarelo destaque
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    text: '#F5F5F5',
    background: '#0F0F0F',
    tint: tintColorDark,
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,

    // Cores principais
    primary: '#FF8C61', // Laranja claro (fitness)
    secondary: '#6EDDD6', // Turquesa claro (IA/tech)
    accent: '#B794F6', // Roxo claro (redes sociais)

    // Cores de status
    success: '#34D399', // Verde claro sucesso
    warning: '#FBBF24', // Amarelo claro aviso
    error: '#F87171', // Vermelho claro erro
    info: '#60A5FA', // Azul claro informação

    // Cores de IA/Tech
    ai: '#818CF8', // Índigo claro para elementos de IA
    aiGlow: '#A5B4FC', // Brilho IA claro
    tech: '#22D3EE', // Ciano claro tech

    // Cores sociais
    social: '#A78BFA', // Roxo claro social
    socialSecondary: '#F472B6', // Rosa claro social

    // Cores de superfície
    card: '#1A1A1A',
    cardBorder: '#2D2D2D',
    surface: '#141414',
    surfaceElevated: '#1F1F1F',

    // Gradientes
    gradientStart: '#FF8C61', // Laranja claro
    gradientEnd: '#6EDDD6', // Turquesa claro
    gradientFitness: '#FF8C61', // Fitness
    gradientAI: '#818CF8', // IA
    gradientSocial: '#A78BFA', // Social

    // Cores especiais
    highlight: '#FDE047', // Amarelo claro destaque
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
};

/** Sombras reduzidas para tema escuro (botões e cards). Use com isDark para evitar sombras fortes no dark mode. */
export const Shadows = {
  button: Platform.select({
    ios: { shadowOpacity: 0.06, shadowRadius: 6 },
    android: { elevation: 2 },
    default: {},
  }),
  card: Platform.select({
    ios: { shadowOpacity: 0.06, shadowRadius: 6 },
    android: { elevation: 2 },
    default: {},
  }),
  /** Para elementos que precisam de sombra um pouco mais visível no dark (ex.: logo) */
  strong: Platform.select({
    ios: { shadowOpacity: 0.12, shadowRadius: 8 },
    android: { elevation: 3 },
    default: {},
  }),
};

// Fontes do sistema (paridade visual iOS / Android)
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  android: {
    /** Android: sans-serif = Roboto (fonte do sistema) */
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Temas customizados para React Navigation
export const LightTheme: Theme & { fonts?: any } = {
  dark: false,
  colors: {
    primary: Colors.light.primary,
    background: Colors.light.background,
    card: Colors.light.card,
    text: Colors.light.text,
    border: Colors.light.cardBorder,
    notification: Colors.light.error,
  },
  fonts: {
    regular: {
      fontFamily: Fonts?.sans || 'system',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: Fonts?.sans || 'system',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: Fonts?.sans || 'system',
      fontWeight: '700' as const,
    },
    heavy: {
      fontFamily: Fonts?.sans || 'system',
      fontWeight: '800' as const,
    },
  },
};

export const DarkTheme: Theme & { fonts?: any } = {
  dark: true,
  colors: {
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    card: Colors.dark.card,
    text: Colors.dark.text,
    border: Colors.dark.cardBorder,
    notification: Colors.dark.error,
  },
  fonts: {
    regular: {
      fontFamily: Fonts?.sans || 'system',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: Fonts?.sans || 'system',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: Fonts?.sans || 'system',
      fontWeight: '700' as const,
    },
    heavy: {
      fontFamily: Fonts?.sans || 'system',
      fontWeight: '800' as const,
    },
  },
};
