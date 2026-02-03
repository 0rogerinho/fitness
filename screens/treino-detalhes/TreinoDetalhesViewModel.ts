// ViewModel - Presentation logic and state for Workout Details
import { useAuth } from '@/shared/contexts/AuthContext';
import { SavedWorkout, WorkoutStorage } from '@/shared/services/workoutStorage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { TreinoDetalhesModel, Workout } from './TreinoDetalhesModel';

export function useTreinoDetalhesViewModel() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { updatePoints } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [savedWorkout, setSavedWorkout] = useState<SavedWorkout | null>(null);

  const workout: Workout | null = TreinoDetalhesModel.parseWorkoutFromParams(
    params.workout as string,
  );

  const isFromSaved = params.fromSaved === 'true';

  useEffect(() => {
    if (isFromSaved && workout) {
      // Load saved workout to get the ID
      loadSavedWorkout();
    }
  }, [isFromSaved]);

  const loadSavedWorkout = async () => {
    try {
      const saved = await WorkoutStorage.getWorkout();
      if (saved) {
        setSavedWorkout(saved);
        // Check if already completed today
        const progress = await WorkoutStorage.getProgress(saved.id);
        const today = new Date().toISOString().split('T')[0];
        if (progress?.completedDates.includes(today)) {
          setCompleted(true);
        }
      }
    } catch (error) {
      console.error('Error loading saved workout:', error);
    }
  };

  const handleCompleteWorkout = async () => {
    if (completed) {
      Alert.alert(
        'Workout already completed!',
        'You have already registered this workout today.',
      );
      return;
    }

    try {
      const pointsEarned = 50;
      updatePoints(pointsEarned);

      // If it's a saved workout, update progress
      if (isFromSaved && savedWorkout) {
        await WorkoutStorage.markWorkoutCompleted(savedWorkout.id);
      }

      setCompleted(true);
      Alert.alert(
        'Congratulations! 🎉',
        `You earned ${pointsEarned} points for completing this workout!`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ],
      );
    } catch (error) {
      console.error('Error completing workout:', error);
      Alert.alert('Error', 'Could not register workout. Please try again.');
    }
  };

  return {
    workout,
    completed,
    handleCompleteWorkout,
    isValid: TreinoDetalhesModel.validateWorkout(workout),
  };
}
