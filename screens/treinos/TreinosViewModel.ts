// ViewModel - Presentation logic and state for Workouts
import { useAuth } from '@/shared/contexts/AuthContext';
import { generateWorkout } from '@/shared/services/aiService';
import {
  SavedWorkout,
  WorkoutProgress,
  WorkoutStorage,
} from '@/shared/services/workoutStorage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Modality, Objective, TreinosModel } from './TreinosModel';

export function useTreinosViewModel() {
  const router = useRouter();
  const { updatePoints } = useAuth();
  const [loading, setLoading] = useState(true);
  const [savedWorkout, setSavedWorkout] = useState<SavedWorkout | null>(null);
  const [progress, setProgress] = useState<WorkoutProgress | null>(null);

  useEffect(() => {
    loadWorkout();
  }, []);

  const loadWorkout = async () => {
    try {
      setLoading(true);
      const workout = await WorkoutStorage.getWorkout();
      setSavedWorkout(workout);

      if (workout) {
        const workoutProgress = await WorkoutStorage.getProgress(workout.id);
        setProgress(workoutProgress);
      }
    } catch (error) {
      console.error('Error loading workout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkout = () => {
    router.push('/treino-chat' as any);
  };

  const handleViewWorkout = () => {
    if (!savedWorkout) return;

    router.push({
      pathname: '/treino-detalhes',
      params: {
        workout: JSON.stringify(savedWorkout),
        modality: savedWorkout.modality,
        objective: savedWorkout.objective,
        fromSaved: 'true',
      },
    } as any);
  };

  const handleSelectModality = async (
    modality: Modality,
    objective: Objective,
  ) => {
    if (TreinosModel.shouldShowQuestionnaire(modality, objective)) {
      router.push({
        pathname: '/questionario',
        params: { modality, objective },
      } as any);
      return;
    }

    setLoading(true);
    try {
      const workout = await generateWorkout(modality, objective);
      router.push({
        pathname: '/treino-detalhes',
        params: {
          workout: JSON.stringify(workout),
          modality,
          objective,
        },
      } as any);
    } catch (error) {
      Alert.alert('Error', 'Could not generate workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    savedWorkout,
    progress,
    handleCreateWorkout,
    handleViewWorkout,
    handleSelectModality,
    workoutOptions: TreinosModel.getWorkoutOptions(),
    refreshWorkout: loadWorkout,
  };
}
