// Model - Types and interfaces for Workout Details
export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
  /** URL of the exercise execution demo video */
  videoUrl?: string;
}

export interface Workout {
  title: string;
  description: string;
  exercises: Exercise[];
  duration: string;
  difficulty: string;
  tips: string[];
}

export class TreinoDetalhesModel {
  static parseWorkoutFromParams(
    workoutParam: string | string[] | undefined,
  ): Workout | null {
    if (!workoutParam) return null;

    try {
      const workoutString = Array.isArray(workoutParam)
        ? workoutParam[0]
        : workoutParam;
      return JSON.parse(workoutString);
    } catch {
      return null;
    }
  }

  static validateWorkout(workout: Workout | null): boolean {
    return workout !== null && !!workout.title && !!workout.exercises;
  }
}
