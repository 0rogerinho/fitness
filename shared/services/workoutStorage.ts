// Serviço de storage para persistir treinos do usuário
// Implementação temporária em memória até que AsyncStorage seja instalado
// Para instalar: pnpm add @react-native-async-storage/async-storage

// Fallback em memória para desenvolvimento
const memoryStorage: Record<string, string> = {};

// Interface para AsyncStorage
interface AsyncStorageInterface {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// Implementação que tenta usar AsyncStorage real, com fallback para memória
const getAsyncStorage = (): AsyncStorageInterface => {
  try {
    // Tentar importar dinamicamente
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AsyncStorageModule = require('@react-native-async-storage/async-storage');
    return AsyncStorageModule.default || AsyncStorageModule;
  } catch {
    // Fallback para memória se o módulo não estiver disponível
    return {
      async getItem(key: string): Promise<string | null> {
        return memoryStorage[key] || null;
      },
      async setItem(key: string, value: string): Promise<void> {
        memoryStorage[key] = value;
      },
      async removeItem(key: string): Promise<void> {
        delete memoryStorage[key];
      },
    };
  }
};

const AsyncStorage = getAsyncStorage();

const WORKOUT_STORAGE_KEY = '@fitness:user_workout';
const WORKOUT_PROGRESS_KEY = '@fitness:workout_progress';

export interface SavedWorkout {
  id: string;
  title: string;
  description: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: string;
    rest: string;
    notes?: string;
    videoUrl?: string;
  }>;
  duration: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  tips: string[];
  modality: 'corrida' | 'musculacao';
  objective: '5km' | '10km' | 'emagrecimento' | 'hipertrofia';
  userInfo: {
    height: number;
    weight: number;
    age: number;
    gender: 'masculino' | 'feminino' | 'outro';
    frequency: number;
    objective?: string;
    injuryOrComorbidity?: string;
  };
  createdAt: string;
}

export interface WorkoutProgress {
  workoutId: string;
  completedDates: string[]; // ISO date strings
  exerciseProgress: Record<
    string,
    {
      lastWeight?: number;
      lastReps?: number;
      lastSets?: number;
      completedDates: string[];
    }
  >;
  weeklyStats: Array<{
    week: string; // "2025-W01"
    completedWorkouts: number;
    totalMinutes: number;
  }>;
}

export class WorkoutStorage {
  static async saveWorkout(workout: SavedWorkout): Promise<void> {
    try {
      await AsyncStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(workout));
    } catch (error) {
      console.error('Error saving workout:', error);
      throw error;
    }
  }

  static async getWorkout(): Promise<SavedWorkout | null> {
    try {
      const data = await AsyncStorage.getItem(WORKOUT_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data) as SavedWorkout;
    } catch (error) {
      console.error('Error loading workout:', error);
      return null;
    }
  }

  static async deleteWorkout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(WORKOUT_STORAGE_KEY);
      await AsyncStorage.removeItem(WORKOUT_PROGRESS_KEY);
    } catch (error) {
      console.error('Error deleting workout:', error);
      throw error;
    }
  }

  static async saveProgress(progress: WorkoutProgress): Promise<void> {
    try {
      await AsyncStorage.setItem(
        WORKOUT_PROGRESS_KEY,
        JSON.stringify(progress),
      );
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  }

  static async getProgress(workoutId: string): Promise<WorkoutProgress | null> {
    try {
      const data = await AsyncStorage.getItem(WORKOUT_PROGRESS_KEY);
      if (!data) {
        // Criar progresso inicial
        const initialProgress: WorkoutProgress = {
          workoutId,
          completedDates: [],
          exerciseProgress: {},
          weeklyStats: [],
        };
        await this.saveProgress(initialProgress);
        return initialProgress;
      }
      const progress = JSON.parse(data) as WorkoutProgress;
      if (progress.workoutId !== workoutId) {
        // Resetar progresso se o treino mudou
        const initialProgress: WorkoutProgress = {
          workoutId,
          completedDates: [],
          exerciseProgress: {},
          weeklyStats: [],
        };
        await this.saveProgress(initialProgress);
        return initialProgress;
      }
      return progress;
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  }

  static async markWorkoutCompleted(workoutId: string): Promise<void> {
    try {
      const progress = await this.getProgress(workoutId);
      if (!progress) return;

      const today = new Date().toISOString().split('T')[0];
      if (!progress.completedDates.includes(today)) {
        progress.completedDates.push(today);

        // Atualizar estatísticas semanais
        const week = this.getWeekString(new Date());
        const weekStat = progress.weeklyStats.find(
          (stat) => stat.week === week,
        );
        if (weekStat) {
          weekStat.completedWorkouts += 1;
        } else {
          progress.weeklyStats.push({
            week,
            completedWorkouts: 1,
            totalMinutes: 0, // Pode ser calculado depois
          });
        }

        await this.saveProgress(progress);
      }
    } catch (error) {
      console.error('Error marking workout as complete:', error);
      throw error;
    }
  }

  static getWeekString(date: Date): string {
    const year = date.getFullYear();
    const oneJan = new Date(year, 0, 1);
    const numberOfDays = Math.floor(
      (date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000),
    );
    const week = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  }
}
