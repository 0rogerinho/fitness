// Model - Tipos e interfaces para Pontos
export interface Activity {
  id: string;
  name: string;
  points: number;
  date: string;
}

export interface PointsInfo {
  totalPoints: number;
  totalActivities: number;
}

export class PontosModel {
  static getMockActivities(): Activity[] {
    return [
      { id: '1', name: 'Treino de Hipertrofia', points: 50, date: '26/01/2026' },
      { id: '2', name: 'Treino de Corrida 5km', points: 30, date: '25/01/2026' },
      { id: '3', name: 'Treino de Emagrecimento', points: 40, date: '24/01/2026' },
      { id: '4', name: 'Compartilhamento na Rede Social', points: 10, date: '23/01/2026' },
    ];
  }

  static calculatePointsInfo(activities: Activity[]): PointsInfo {
    return {
      totalPoints: activities.reduce((sum, activity) => sum + activity.points, 0),
      totalActivities: activities.length,
    };
  }
}
