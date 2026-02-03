// ViewModel - Lógica de apresentação e estado para Home
import { useAuth } from '@/shared/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { FeaturedProduct, HomeModel, Reward, RewardModel } from './HomeModel';

export function useHomeViewModel() {
  const { user, isAuthenticated, logout, updatePoints } = useAuth();
  const router = useRouter();
  const [claimedRewards, setClaimedRewards] = useState<Set<string>>(new Set());

  // Simulação de dados do usuário - em produção, isso viria do backend
  // Streak de treinos consecutivos
  const userStreak = 5; // Exemplo: 5 dias consecutivos
  // Metas semanais completadas
  const weeklyGoals = 2; // Exemplo: 2 treinos esta semana
  // Total de metas cumpridas
  const totalGoals = 8; // Exemplo: 8 metas cumpridas no total

  // Removido: A navegação de autenticação é gerenciada pelo _layout.tsx
  // para evitar tentativas de navegação antes do Root Layout estar montado

  const menuItems = HomeModel.getMenuItems(user?.points || 0);
  const featuredProducts = HomeModel.getFeaturedProducts(user?.points || 0);
  const bannerProduct = HomeModel.getFeaturedBannerProduct(user?.points || 0);

  // Obter recompensas disponíveis
  const allRewards = RewardModel.getAvailableRewards(
    userStreak,
    weeklyGoals,
    totalGoals,
  );
  const rewards = allRewards.map((reward) => ({
    ...reward,
    claimed: claimedRewards.has(reward.id),
  }));

  const handleProductPress = (product: FeaturedProduct) => {
    // Navegar para a loja quando o produto for clicado
    router.push('/(tabs)/loja');
  };

  const handleClaimReward = (reward: Reward) => {
    if (!user) return;

    if (reward.claimed) {
      Alert.alert(
        'Recompensa já resgatada',
        'Você já resgatou esta recompensa.',
      );
      return;
    }

    if (!RewardModel.canClaimReward(reward)) {
      Alert.alert(
        'Reward not available',
        `Você ainda não cumpriu os requisitos para esta recompensa.${
          reward.progress
            ? `\n\nProgresso: ${reward.progress.current}/${reward.progress.target} ${reward.progress.label}`
            : ''
        }`,
      );
      return;
    }

    Alert.alert(
      'Recompensa Resgatada! 🎉',
      `You earned ${reward.points} points!\n\n${reward.title}`,
      [
        {
          text: 'OK',
          onPress: () => {
            updatePoints(reward.points);
            setClaimedRewards((prev) => new Set(prev).add(reward.id));
          },
        },
      ],
    );
  };

  return {
    user,
    isAuthenticated,
    menuItems,
    featuredProducts,
    bannerProduct,
    rewards,
    handleProductPress,
    handleClaimReward,
    logout,
  };
}
