// View - UI component for Login
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Shadows } from '@/constants/theme';

import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import type { SymbolViewProps } from 'expo-symbols';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLoginViewModel } from './LoginViewModel';

const { width, height } = Dimensions.get('window');

// Background component with gym elements (iOS / default)
function GymBackground({
  colors,
  isDark,
}: {
  colors: typeof Colors.light;
  isDark: boolean;
}) {
  return (
    <View style={styles.backgroundContainer}>
      {/* Large weight plate (top right corner) */}
      <View
        style={[
          styles.weightPlate,
          {
            backgroundColor: colors.gradientStart + '25',
            top: -80,
            right: -60,
            width: 200,
            height: 200,
          },
          isDark && Shadows.card,
        ]}
      >
        <View
          style={[
            styles.weightPlateHole,
            { backgroundColor: colors.background },
          ]}
        />
      </View>

      {/* Horizontal barbell (top) */}
      <View
        style={[
          styles.barbell,
          {
            backgroundColor: colors.gradientEnd + '30',
            top: 100,
            left: -50,
            width: 300,
            height: 12,
          },
          isDark && Shadows.card,
        ]}
      />

      {/* Medium weight plate (left side) */}
      <View
        style={[
          styles.weightPlate,
          {
            backgroundColor: colors.secondary + '20',
            bottom: 200,
            left: -80,
            width: 160,
            height: 160,
          },
          isDark && Shadows.card,
        ]}
      >
        <View
          style={[
            styles.weightPlateHole,
            { backgroundColor: colors.background },
          ]}
        />
      </View>

      {/* Vertical barbell (right side) */}
      <View
        style={[
          styles.barbell,
          {
            backgroundColor: colors.tint + '25',
            top: height * 0.4,
            right: -30,
            width: 12,
            height: 250,
          },
          isDark && Shadows.card,
        ]}
      />

      {/* Small plate (bottom center) */}
      <View
        style={[
          styles.weightPlate,
          {
            backgroundColor: colors.accent + '20',
            bottom: 150,
            right: width * 0.3,
            width: 120,
            height: 120,
          },
          isDark && Shadows.card,
        ]}
      >
        <View
          style={[
            styles.weightPlateHole,
            { backgroundColor: colors.background },
          ]}
        />
      </View>

      {/* Grid pattern (subtle background) */}
      <View style={styles.gridPattern}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.gridLine,
              {
                backgroundColor: colors.cardBorder + '15',
                top: (i * height) / 8,
              },
            ]}
          />
        ))}
      </View>

      {/* Gym icons stamped on background */}
      <View style={styles.stampedIcons}>
        {/* Icon 1 - Bicycle (Top left corner) */}
        <View style={[styles.stampedIcon, { top: height * 0.15, left: '8%' }]}>
          <IconSymbol
            size={45}
            name="bicycle"
            color={colors.cardBorder + '60'}
          />
        </View>

        {/* Icon 2 - Dumbbell (Left center) */}
        <View style={[styles.stampedIcon, { top: height * 0.61, left: '20%' }]}>
          <IconSymbol
            size={45}
            name="dumbbell.fill"
            color={colors.cardBorder + '60'}
          />
        </View>

        {/* Icon 3 - Gym (Right center) */}
        <View style={[styles.stampedIcon, { top: height * 0.1, right: '28%' }]}>
          <IconSymbol
            size={45}
            name="figure.strengthtraining.traditional"
            color={colors.cardBorder + '60'}
          />
        </View>
      </View>
    </View>
  );
}

// Modern input component
function ModernInput({
  icon,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  isFocused,
  colors,
  isDark,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
}: {
  icon: SymbolViewProps['name'];
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  colors: typeof Colors.light;
  isDark: boolean;
  secureTextEntry?: boolean;
  keyboardType?: string;
  autoCapitalize?: string;
  autoComplete?: string;
}) {
  return (
    <View style={styles.inputWrapper}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDark ? colors.card + 'CC' : colors.card + 'F0',
            borderColor: isFocused ? colors.tint : colors.cardBorder + '60',
            borderWidth: isFocused ? 2 : 1,
          },
          isDark && Shadows.card,
        ]}
      >
        <View
          style={[styles.iconWrapper, { backgroundColor: colors.tint + '15' }]}
        >
          <IconSymbol size={18} name={icon} color={colors.tint} />
        </View>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.icon + 'AA'}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType as any}
          autoCapitalize={autoCapitalize as any}
          autoComplete={autoComplete as any}
        />
      </View>
    </View>
  );
}

// Test account card component
function MockAccountCard({
  colors,
  isDark,
}: {
  colors: typeof Colors.light;
  isDark: boolean;
}) {
  return (
    <View
      style={[
        styles.mockAccountCard,
        {
          backgroundColor: isDark ? colors.card + 'E6' : colors.card + 'F5',
          borderColor: colors.tint + '30',
        },
        isDark && Shadows.card,
      ]}
    >
      <View style={styles.mockAccountHeader}>
        <View
          style={[styles.iconBadge, { backgroundColor: colors.tint + '20' }]}
        >
          <IconSymbol size={20} name="key.fill" color={colors.tint} />
        </View>
        <ThemedText type="defaultSemiBold" style={styles.mockAccountTitle}>
          Test Account
        </ThemedText>
      </View>
      <View style={styles.mockAccountInfo}>
        <View style={styles.mockAccountRow}>
          <IconSymbol size={18} name="envelope.fill" color={colors.tint} />
          <ThemedText style={styles.mockAccountText}>
            <ThemedText style={styles.mockAccountLabel}>Email: </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ color: colors.tint }}>
              teste@fitness.com
            </ThemedText>
          </ThemedText>
        </View>
        <View style={styles.mockAccountRow}>
          <IconSymbol size={18} name="lock.fill" color={colors.tint} />
          <ThemedText style={styles.mockAccountText}>
            <ThemedText style={styles.mockAccountLabel}>Password: </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ color: colors.tint }}>
              123456
            </ThemedText>
          </ThemedText>
        </View>
      </View>
      <View style={[styles.badge, { backgroundColor: colors.success + '20' }]}>
        <IconSymbol size={14} name="star.fill" color={colors.success} />
        <ThemedText style={[styles.badgeText, { color: colors.success }]}>
          500 initial points
        </ThemedText>
      </View>
    </View>
  );
}

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const {
    isLogin,
    formData,
    loading,
    updateFormField,
    toggleMode,
    handleSubmit,
  } = useLoginViewModel();

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const isDark = colorScheme === 'dark';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {Platform.OS !== 'android' && (
        <GymBackground colors={colors} isDark={isDark} />
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header with animated logo */}
          <View style={styles.header}>
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  backgroundColor: colors.card,
                  transform: [{ scale: pulseAnim }],
                },
                isDark && Shadows.strong,
              ]}
            >
              <View
                style={[
                  styles.logoGradient,
                  { backgroundColor: colors.tint + '20' },
                ]}
              />
              <IconSymbol size={56} name="dumbbell.fill" color={colors.tint} />
            </Animated.View>
            <ThemedText
              type="title"
              style={[styles.title, { color: colors.text }]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              Fitness AI
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.text }]}>
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </ThemedText>
          </View>

          {isLogin && <MockAccountCard colors={colors} isDark={isDark} />}

          <View style={styles.form}>
            {!isLogin && (
              <ModernInput
                icon="person.fill"
                placeholder="Full name"
                value={formData.name}
                onChangeText={(value) => updateFormField('name', value)}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                isFocused={focusedInput === 'name'}
                colors={colors}
                isDark={isDark}
                autoCapitalize="words"
              />
            )}

            <ModernInput
              icon="envelope.fill"
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => updateFormField('email', value)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              isFocused={focusedInput === 'email'}
              colors={colors}
              isDark={isDark}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <ModernInput
              icon="lock.fill"
              placeholder="Password"
              value={formData.password}
              onChangeText={(value) => updateFormField('password', value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              isFocused={focusedInput === 'password'}
              colors={colors}
              isDark={isDark}
              secureTextEntry
              autoComplete="password"
            />

            {/* Button with gradient */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: colors.tint,
                  opacity: loading ? 0.7 : 1,
                },
                isDark && Shadows.button,
              ]}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.buttonGradient,
                  { backgroundColor: colors.secondary + '40' },
                ]}
              />
              {loading ? (
                <ThemedText style={styles.buttonText}>Loading...</ThemedText>
              ) : (
                <>
                  <Ionicons
                    name={isLogin ? 'log-in-outline' : 'person-add-outline'}
                    size={22}
                    color="#fff"
                  />
                  <ThemedText style={styles.buttonText}>
                    {isLogin ? 'Sign in' : 'Sign up'}
                  </ThemedText>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={toggleMode}
              activeOpacity={0.7}
            >
              <ThemedText style={[styles.switchText, { color: colors.text }]}>
                {isLogin
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <ThemedText
                  style={[styles.switchTextBold, { color: colors.tint }]}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  androidBackground: {
    backgroundColor: 'transparent',
  },
  androidStripes: {
    position: 'absolute',
    width: width * 1.5,
    height: height * 1.5,
    top: -height * 0.3,
    left: -width * 0.2,
  },
  androidStripe: {
    position: 'absolute',
    top: 0,
    height: height * 1.8,
  },
  androidCircle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  weightPlate: {
    position: 'absolute',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  weightPlateHole: {
    width: '30%',
    height: '30%',
    borderRadius: 1000,
  },
  barbell: {
    position: 'absolute',
    borderRadius: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  gridPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  gridLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    left: 0,
  },
  stampedIcons: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  stampedIcon: {
    position: 'absolute',
    opacity: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    minHeight: height * 0.9,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    paddingHorizontal: 8,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logoGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -1.5,
    lineHeight: 56,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 19,
    textAlign: 'center',
    opacity: 0.8,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 4,
    gap: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    fontSize: 17,
    fontWeight: '600',
  },
  button: {
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonGradient: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  switchButton: {
    marginTop: 28,
    alignItems: 'center',
    padding: 14,
  },
  switchText: {
    fontSize: 16,
    opacity: 0.8,
    fontWeight: '500',
  },
  switchTextBold: {
    fontWeight: '700',
    opacity: 1,
  },
  mockAccountCard: {
    borderWidth: 1.5,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  mockAccountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockAccountTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  mockAccountInfo: {
    gap: 14,
    marginBottom: 16,
  },
  mockAccountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mockAccountText: {
    fontSize: 16,
    opacity: 0.85,
    fontWeight: '500',
  },
  mockAccountLabel: {
    opacity: 0.65,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
