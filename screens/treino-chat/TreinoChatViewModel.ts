// ViewModel - Lógica de apresentação e estado para Chat de Treino
import { generateWorkout } from '@/shared/services/aiService';
import { SavedWorkout, WorkoutStorage } from '@/shared/services/workoutStorage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  text: string;
  options?: string[];
  field?: string;
}

interface Question {
  field: string;
  text: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    field: 'objective',
    text: 'What is your main goal?',
    options: [
      'Weight loss',
      'Hypertrophy (Muscle gain)',
      'Endurance',
      'Strength',
      'Definition',
    ],
  },
  {
    field: 'frequency',
    text: 'How many times per week can you train?',
    options: ['2 times', '3 times', '4 times', '5 times', '6 times'],
  },
  {
    field: 'age',
    text: 'What is your age?',
    options: [
      '18-25 years',
      '26-35 years',
      '36-45 years',
      '46-55 years',
      '56+ years',
    ],
  },
  {
    field: 'weight',
    text: 'What is your current weight? (kg)',
    options: [
      'Less than 60kg',
      '60-70kg',
      '71-80kg',
      '81-90kg',
      '91-100kg',
      'More than 100kg',
    ],
  },
  {
    field: 'height',
    text: 'What is your height? (cm)',
    options: [
      'Less than 160cm',
      '160-170cm',
      '171-180cm',
      '181-190cm',
      'More than 190cm',
    ],
  },
  {
    field: 'gender',
    text: 'What is your gender?',
    options: ['Male', 'Female', 'Other'],
  },
  {
    field: 'injuryOrComorbidity',
    text: 'Do you have any injury or comorbidity?',
    options: [
      'None',
      'Yes - muscle/joint injury',
      'Yes - comorbidity (e.g. diabetes, hypertension)',
      'Yes - injury and comorbidity',
    ],
  },
  {
    field: 'experience',
    text: 'What is your experience level?',
    options: ['Beginner', 'Intermediate', 'Advanced'],
  },
];

export function useTreinoChatViewModel() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      text: "Hello! 👋 I'll help you create a personalized workout. I'll ask a few questions to better understand your needs.",
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      // Adicionar pergunta como mensagem da IA
      const questionMessage: ChatMessage = {
        id: `question-${currentQuestionIndex}`,
        type: 'ai',
        text: currentQuestion.text,
        options: currentQuestion.options,
        field: currentQuestion.field,
      };
      setMessages((prev) => {
        // Evitar duplicatas
        const exists = prev.some((msg) => msg.id === questionMessage.id);
        if (exists) return prev;
        return [...prev, questionMessage];
      });
    }
  }, [currentQuestionIndex, currentQuestion]);

  const handleSelectOption = (field: string, option: string) => {
    setUserAnswers((prev) => ({ ...prev, [field]: option }));

    // Adicionar resposta do usuário como mensagem
    const userMessage: ChatMessage = {
      id: `answer-${field}-${Date.now()}`,
      type: 'user',
      text: option,
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion) return;

    const answer = userAnswers[currentQuestion.field];
    if (!answer) {
      Alert.alert('Attention', 'Please select an option before continuing.');
      return;
    }

    // Se não for a última pergunta, ir para a próxima
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Última pergunta - gerar treino
      await generateWorkoutFromAnswers();
    }
  };

  const generateWorkoutFromAnswers = async () => {
    setLoading(true);

    try {
      // Converter respostas para formato esperado
      const userInfo = parseAnswersToUserInfo(userAnswers);
      const { modality, objective } =
        determineModalityAndObjective(userAnswers);

      // Gerar treino
      const workout = await generateWorkout(modality, objective, userInfo);

      // Salvar treino
      const savedWorkout: SavedWorkout = {
        id: Date.now().toString(),
        ...workout,
        modality,
        objective,
        userInfo,
        createdAt: new Date().toISOString(),
      };

      await WorkoutStorage.saveWorkout(savedWorkout);

      // Mensagem de sucesso
      const successMessage: ChatMessage = {
        id: 'success',
        type: 'ai',
        text: 'Perfect! 🎉 Your personalized workout was created successfully! You can now view it on the workouts screen.',
      };
      setMessages((prev) => [...prev, successMessage]);

      // Redirecionar após um breve delay
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'Could not generate workout. Please try again.');
      setLoading(false);
    }
  };

  const parseAnswersToUserInfo = (answers: Record<string, string>) => {
    const parseAge = (ageStr: string): number => {
      if (ageStr.includes('18-25')) return 22;
      if (ageStr.includes('26-35')) return 30;
      if (ageStr.includes('36-45')) return 40;
      if (ageStr.includes('46-55')) return 50;
      return 60;
    };

    const parseWeight = (weightStr: string): number => {
      if (weightStr.includes('Menos de 60')) return 55;
      if (weightStr.includes('60-70')) return 65;
      if (weightStr.includes('71-80')) return 75;
      if (weightStr.includes('81-90')) return 85;
      if (weightStr.includes('91-100')) return 95;
      return 105;
    };

    const parseHeight = (heightStr: string): number => {
      if (heightStr.includes('Menos de 160')) return 155;
      if (heightStr.includes('160-170')) return 165;
      if (heightStr.includes('171-180')) return 175;
      if (heightStr.includes('181-190')) return 185;
      return 195;
    };

    const parseFrequency = (freqStr: string): number => {
      return parseInt(freqStr.split(' ')[0]);
    };

    return {
      age: parseAge(answers.age || ''),
      weight: parseWeight(answers.weight || ''),
      height: parseHeight(answers.height || ''),
      gender: (answers.gender?.toLowerCase() || 'masculino') as
        | 'masculino'
        | 'feminino'
        | 'outro',
      frequency: parseFrequency(answers.frequency || '3 vezes'),
      objective: answers.objective || '',
      injuryOrComorbidity: answers.injuryOrComorbidity || 'None',
    };
  };

  const determineModalityAndObjective = (
    answers: Record<string, string>,
  ): {
    modality: 'corrida' | 'musculacao';
    objective: '5km' | '10km' | 'emagrecimento' | 'hipertrofia';
  } => {
    const objective = answers.objective?.toLowerCase() || '';

    if (
      objective.includes('emagrecimento') ||
      objective.includes('definição')
    ) {
      return { modality: 'musculacao', objective: 'emagrecimento' };
    }
    if (objective.includes('hipertrofia') || objective.includes('massa')) {
      return { modality: 'musculacao', objective: 'hipertrofia' };
    }
    if (objective.includes('resistência')) {
      return { modality: 'corrida', objective: '10km' };
    }

    // Default
    return { modality: 'musculacao', objective: 'hipertrofia' };
  };

  const canGenerateWorkout = currentQuestion
    ? !!userAnswers[currentQuestion.field]
    : false;

  return {
    messages,
    currentQuestion,
    userAnswers,
    loading,
    handleSelectOption,
    handleSubmitAnswer,
    canGenerateWorkout,
  };
}
