// ViewModel - Lógica de apresentação e estado para Pontos
import { useAuth } from '@/shared/contexts/AuthContext';
import { Activity, PontosModel } from './PontosModel';

export function usePontosViewModel() {
  const { user } = useAuth();
  const activities: Activity[] = PontosModel.getMockActivities();
  const pointsInfo = PontosModel.calculatePointsInfo(activities);

  return {
    user,
    activities,
    pointsInfo,
  };
}
