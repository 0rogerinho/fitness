// View - Componente de UI para Chat de Criação de Treino
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTreinoChatViewModel } from './TreinoChatViewModel';

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  text: string;
  options?: string[];
  field?: string;
}

export default function TreinoChatScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    messages,
    currentQuestion,
    userAnswers,
    loading,
    handleSelectOption,
    handleSubmitAnswer,
    canGenerateWorkout,
  } = useTreinoChatViewModel();

  useEffect(() => {
    // Scroll para o final quando novas mensagens aparecerem
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.type === 'user'
                  ? styles.userMessageContainer
                  : styles.aiMessageContainer,
              ]}
            >
              {message.type === 'ai' && (
                <View
                  style={[
                    styles.aiAvatar,
                    { backgroundColor: colors.tint + '20' },
                  ]}
                >
                  <IconSymbol size={20} name="sparkles" color={colors.tint} />
                </View>
              )}
              <View
                style={[
                  styles.messageBubble,
                  message.type === 'user'
                    ? { backgroundColor: colors.tint }
                    : {
                        backgroundColor: colors.card,
                        borderColor: colors.cardBorder,
                      },
                ]}
              >
                <ThemedText
                  style={[
                    styles.messageText,
                    message.type === 'user' && { color: '#fff' },
                  ]}
                >
                  {message.text}
                </ThemedText>
              </View>
            </View>
          ))}

          {currentQuestion && (
            <View style={styles.optionsContainer}>
              {currentQuestion.options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor:
                        userAnswers[currentQuestion.field || ''] === option
                          ? colors.tint
                          : colors.card,
                      borderColor: colors.cardBorder,
                    },
                    isDark && Shadows.button,
                  ]}
                  onPress={() =>
                    handleSelectOption(currentQuestion.field || '', option)
                  }
                  activeOpacity={0.7}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      userAnswers[currentQuestion.field || ''] === option && {
                        color: '#fff',
                      },
                    ]}
                  >
                    {option}
                  </ThemedText>
                  {userAnswers[currentQuestion.field || ''] === option && (
                    <IconSymbol
                      size={18}
                      name="checkmark.circle.fill"
                      color="#fff"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.tint} />
              <ThemedText style={styles.loadingText}>
                Generating your workout...
              </ThemedText>
            </View>
          )}
        </ScrollView>

        {currentQuestion && !loading && (
          <View
            style={[
              styles.inputContainer,
              { borderTopColor: colors.cardBorder },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor: canGenerateWorkout
                    ? colors.tint
                    : colors.icon,
                  opacity: canGenerateWorkout ? 1 : 0.6,
                },
              ]}
              onPress={handleSubmitAnswer}
              disabled={!canGenerateWorkout}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.submitButtonText}>
                {currentQuestion.field && userAnswers[currentQuestion.field]
                  ? 'Próxima Pergunta'
                  : 'Selecione uma opção'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    opacity: 0.7,
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 100,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
    gap: 8,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
  },
  optionsContainer: {
    marginTop: 8,
    marginBottom: 16,
    gap: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    padding: 16,
  },
  loadingText: {
    fontSize: 14,
    opacity: 0.7,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    backgroundColor: 'transparent',
  },
  submitButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
