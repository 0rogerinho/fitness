// ViewModel - Lógica de apresentação e estado para Questionário
import { generateWorkout } from '@/shared/services/aiService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { QuestionarioFormData, QuestionarioModel } from './QuestionarioModel';

export function useQuestionarioViewModel() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState<QuestionarioFormData>({
    height: '',
    weight: '',
    age: '',
    gender: '',
    frequency: '',
    injuryOrComorbidity: '',
  });
  const [loading, setLoading] = useState(false);

  const updateFormField = <K extends keyof QuestionarioFormData>(
    field: K,
    value: QuestionarioFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const validationError = QuestionarioModel.validateForm(formData);
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    setLoading(true);
    try {
      const userInfo = QuestionarioModel.parseFormData(formData);
      const workout = await generateWorkout(
        params.modality as 'corrida' | 'musculacao',
        params.objective as '5km' | '10km' | 'emagrecimento' | 'hipertrofia',
        userInfo,
      );

      router.push({
        pathname: '/treino-detalhes',
        params: {
          workout: JSON.stringify(workout),
          modality: params.modality,
          objective: params.objective,
        },
      } as any);
    } catch (error) {
      Alert.alert('Error', 'Could not generate workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    updateFormField,
    handleSubmit,
    modality: params.modality,
    objective: params.objective,
  };
}
