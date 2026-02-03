// View - Componente de UI para Questionário
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuestionarioViewModel } from './QuestionarioViewModel';

export default function QuestionarioScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { formData, loading, updateFormField, handleSubmit } =
    useQuestionarioViewModel();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Platform.select({
              ios: insets.top + 20,
              android: insets.top + 20,
              default: insets.top + 20,
            }),
          },
        ]}
      >
        <ThemedText type="title" style={styles.title}>
          Questionário de Hipertrofia
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Fill in the information to generate your personalized workout
        </ThemedText>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Height (cm)</ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: colors.text, borderColor: colors.icon },
              ]}
              placeholder="Ex: 175"
              placeholderTextColor={colors.icon}
              value={formData.height}
              onChangeText={(value) => updateFormField('height', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Weight (kg)</ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: colors.text, borderColor: colors.icon },
              ]}
              placeholder="Ex: 75"
              placeholderTextColor={colors.icon}
              value={formData.weight}
              onChangeText={(value) => updateFormField('weight', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Age (years)</ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: colors.text, borderColor: colors.icon },
              ]}
              placeholder="Ex: 25"
              placeholderTextColor={colors.icon}
              value={formData.age}
              onChangeText={(value) => updateFormField('age', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Gender</ThemedText>
            <View style={styles.genderButtons}>
              {(['masculino', 'feminino', 'outro'] as const).map((g) => {
                const label = {
                  masculino: 'Male',
                  feminino: 'Female',
                  outro: 'Other',
                }[g];
                return (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderButton,
                      {
                        backgroundColor:
                          formData.gender === g ? colors.tint : 'transparent',
                        borderColor: colors.icon,
                      },
                    ]}
                    onPress={() => updateFormField('gender', g)}
                  >
                    <ThemedText
                      style={[
                        styles.genderButtonText,
                        { color: formData.gender === g ? '#fff' : colors.text },
                      ]}
                    >
                      {label}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>
              How many times per week do you plan to train?
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: colors.text, borderColor: colors.icon },
              ]}
              placeholder="Ex: 3"
              placeholderTextColor={colors.icon}
              value={formData.frequency}
              onChangeText={(value) => updateFormField('frequency', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>
              Any injury or comorbidity? (optional)
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                styles.inputMultiline,
                { color: colors.text, borderColor: colors.icon },
              ]}
              placeholder="E.g. knee injury, diabetes, hypertension..."
              placeholderTextColor={colors.icon}
              value={formData.injuryOrComorbidity}
              onChangeText={(value) =>
                updateFormField('injuryOrComorbidity', value)
              }
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.tint }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.submitButtonText}>
                Generate Personalized Workout
              </ThemedText>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
