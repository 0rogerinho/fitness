// Model - Types and interfaces for Workouts
export type Modality = 'corrida' | 'musculacao';
export type Objective = '5km' | '10km' | 'emagrecimento' | 'hipertrofia';

export interface WorkoutOption {
  modality: Modality;
  objective: Objective;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  requiresQuestionnaire: boolean;
}

export class TreinosModel {
  static getWorkoutOptions(): WorkoutOption[] {
    return [
      {
        modality: 'corrida',
        objective: '5km',
        title: 'Running 5km',
        description: 'Complete program to reach 5km',
        icon: 'figure.run',
        iconColor: '#FF6B6B',
        requiresQuestionnaire: false,
      },
      {
        modality: 'corrida',
        objective: '10km',
        title: 'Running 10km',
        description: 'Complete program to reach 10km',
        icon: 'figure.run',
        iconColor: '#FF6B6B',
        requiresQuestionnaire: false,
      },
      {
        modality: 'musculacao',
        objective: 'emagrecimento',
        title: 'Weight Loss',
        description: 'Workout focused on fat burning and definition',
        icon: 'flame.fill',
        iconColor: '#10B981',
        requiresQuestionnaire: false,
      },
      {
        modality: 'musculacao',
        objective: 'hipertrofia',
        title: 'Hypertrophy',
        description: 'Muscle mass gain (questionnaire required)',
        icon: 'dumbbell.fill',
        iconColor: '#6366F1',
        requiresQuestionnaire: true,
      },
    ];
  }

  static shouldShowQuestionnaire(
    modality: Modality,
    objective: Objective,
  ): boolean {
    return modality === 'musculacao' && objective === 'hipertrofia';
  }
}
