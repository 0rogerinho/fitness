// Model - Types and interfaces for Home
export interface MenuItem {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: string;
  gradient: [string, string];
  iconBg: string;
}

export interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discount: string;
  pointsRequired: number;
  category: 'roupas' | 'tenis' | 'suplementos' | 'acessorios';
  image?: string;
  canAfford: boolean;
}

export class HomeModel {
  static getMenuItems(userPoints: number): MenuItem[] {
    return [
      {
        id: 'treinos',
        title: 'Workouts',
        description: 'AI-powered personalized workouts',
        route: '/(tabs)/treinos',
        icon: 'dumbbell.fill',
        gradient: ['#FF6B6B', '#FF8E8E'],
        iconBg: '#FF6B6B20',
      },
      {
        id: 'perfil',
        title: 'Profile',
        description: 'Your profile and statistics',
        route: '/(tabs)/perfil',
        icon: 'person.circle.fill',
        gradient: ['#FFD93D', '#FFE66D'],
        iconBg: '#FFD93D20',
      },
      {
        id: 'rede-social',
        title: 'Social',
        description: 'Community and challenges',
        route: '/(tabs)/rede-social',
        icon: 'person.2.fill',
        gradient: ['#6BCF7F', '#8DD9A0'],
        iconBg: '#6BCF7F20',
      },
      {
        id: 'loja',
        title: 'Shop',
        description: 'Redeem your points',
        route: '/(tabs)/loja',
        icon: 'bag.fill',
        gradient: ['#4D96FF', '#6BA8FF'],
        iconBg: '#4D96FF20',
      },
    ];
  }

  static getFeaturedProducts(userPoints: number): FeaturedProduct[] {
    const products: FeaturedProduct[] = [
      {
        id: '1',
        name: 'Premium Fitness T-Shirt',
        description: 'Dry-fit shirt with quick-dry technology',
        originalPrice: 89.9,
        discountPrice: 59.9,
        discount: '33% OFF',
        pointsRequired: 300,
        category: 'roupas',
        canAfford: userPoints >= 300,
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      },
      {
        id: '2',
        name: 'Nike Air Max Sneakers',
        description: 'Sports shoes with maximum comfort and cushioning',
        originalPrice: 599.9,
        discountPrice: 449.9,
        discount: '25% OFF',
        pointsRequired: 500,
        category: 'tenis',
        canAfford: userPoints >= 500,
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      },
      {
        id: '3',
        name: 'Pre-Workout Energy Boost',
        description:
          'Pre-workout with caffeine and beta-alanine for maximum performance',
        originalPrice: 79.9,
        discountPrice: 49.9,
        discount: '38% OFF',
        pointsRequired: 250,
        category: 'suplementos',
        canAfford: userPoints >= 250,
        image:
          'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
      },
      {
        id: '4',
        name: 'Workout Shorts',
        description: 'Elastic shorts with pockets for phone and keys',
        originalPrice: 69.9,
        discountPrice: 39.9,
        discount: '43% OFF',
        pointsRequired: 200,
        category: 'roupas',
        canAfford: userPoints >= 200,
        image:
          'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop',
      },
      {
        id: '5',
        name: 'Isolated Whey Protein',
        description: 'High-quality isolated protein, 900g',
        originalPrice: 129.9,
        discountPrice: 89.9,
        discount: '31% OFF',
        pointsRequired: 400,
        category: 'suplementos',
        canAfford: userPoints >= 400,
        image:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      },
      {
        id: '6',
        name: 'Adidas Ultraboost Sneakers',
        description: 'Running shoes with Boost technology',
        originalPrice: 699.9,
        discountPrice: 549.9,
        discount: '21% OFF',
        pointsRequired: 600,
        category: 'tenis',
        canAfford: userPoints >= 600,
        image:
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
      },
      {
        id: '7',
        name: '750ml Thermos Bottle',
        description: 'Stainless steel bottle with thermal insulation',
        originalPrice: 49.9,
        discountPrice: 29.9,
        discount: '40% OFF',
        pointsRequired: 150,
        category: 'acessorios',
        canAfford: userPoints >= 150,
        image:
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
      },
      {
        id: '8',
        name: 'Fitness Legging',
        description: 'High compression legging with high waist',
        originalPrice: 99.9,
        discountPrice: 59.9,
        discount: '40% OFF',
        pointsRequired: 280,
        category: 'roupas',
        canAfford: userPoints >= 280,
        image:
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      },
    ];

    return products;
  }

  static getCategoryIcon(category: FeaturedProduct['category']): string {
    const icons = {
      roupas: 'tshirt.fill',
      tenis: 'shoe.fill',
      suplementos: 'pills.fill',
      acessorios: 'bag.fill',
    };
    return icons[category];
  }

  static getFeaturedBannerProduct(userPoints: number): FeaturedProduct | null {
    // Returns the featured product for the banner (usually the most popular or with the biggest discount)
    const products = this.getFeaturedProducts(userPoints);

    if (products.length === 0) return null;

    // Selects the product with the highest discount percentage that the user can afford
    const affordableProducts = products.filter((p) => p.canAfford);

    if (affordableProducts.length > 0) {
      // If there are affordable products, choose the one with the highest discount percentage
      return affordableProducts.reduce((best, current) => {
        // Extract discount percentage (e.g. "33% OFF" -> 33)
        const bestMatch = best.discount.match(/(\d+)%/);
        const currentMatch = current.discount.match(/(\d+)%/);

        const bestDiscount = bestMatch ? parseFloat(bestMatch[1]) : 0;
        const currentDiscount = currentMatch ? parseFloat(currentMatch[1]) : 0;

        return currentDiscount > bestDiscount ? current : best;
      });
    }

    // If there are no affordable products, return the one closest to being affordable
    // Prioritizes products with the highest discount
    const sortedByPoints = [...products].sort((a, b) => {
      // First sort by required points
      if (a.pointsRequired !== b.pointsRequired) {
        return a.pointsRequired - b.pointsRequired;
      }
      // If they have the same points, sort by discount
      const aMatch = a.discount.match(/(\d+)%/);
      const bMatch = b.discount.match(/(\d+)%/);
      const aDiscount = aMatch ? parseFloat(aMatch[1]) : 0;
      const bDiscount = bMatch ? parseFloat(bMatch[1]) : 0;
      return bDiscount - aDiscount;
    });

    return sortedByPoints[0] || null;
  }
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  type: 'streak' | 'goal' | 'social' | 'weekly' | 'achievement';
  isAvailable: boolean;
  progress?: {
    current: number;
    target: number;
    label: string;
  };
  claimed: boolean;
}

export class RewardModel {
  static getAvailableRewards(
    userStreak: number = 0,
    weeklyGoals: number = 0,
    totalGoals: number = 0,
  ): Reward[] {
    // Data simulation - in production, this would come from the backend
    return [
      {
        id: 'streak-3',
        title: '3-Day Streak',
        description: 'Complete 3 consecutive workouts',
        points: 50,
        icon: 'flame.fill',
        type: 'streak',
        isAvailable: userStreak >= 3,
        progress: {
          current: userStreak,
          target: 3,
          label: 'consecutive days',
        },
        claimed: false,
      },
      {
        id: 'streak-7',
        title: '7-Day Streak',
        description: 'Complete 7 consecutive workouts',
        points: 150,
        icon: 'flame.fill',
        type: 'streak',
        isAvailable: userStreak >= 7,
        progress: {
          current: userStreak,
          target: 7,
          label: 'consecutive days',
        },
        claimed: false,
      },
      {
        id: 'streak-30',
        title: '30-Day Streak',
        description: 'Complete 30 consecutive workouts',
        points: 500,
        icon: 'flame.fill',
        type: 'streak',
        isAvailable: userStreak >= 30,
        progress: {
          current: userStreak,
          target: 30,
          label: 'consecutive days',
        },
        claimed: false,
      },
      {
        id: 'weekly-goal',
        title: 'Weekly Goal',
        description: 'Complete your weekly workout goal',
        points: 100,
        icon: 'target',
        type: 'goal',
        isAvailable: weeklyGoals >= 3,
        progress: {
          current: weeklyGoals,
          target: 3,
          label: 'workouts this week',
        },
        claimed: false,
      },
      {
        id: 'first-week',
        title: 'First Workout of the Week',
        description: 'Complete your first workout this week',
        points: 25,
        icon: 'calendar',
        type: 'weekly',
        isAvailable: weeklyGoals >= 1,
        progress: {
          current: weeklyGoals,
          target: 1,
          label: 'workout(s) this week',
        },
        claimed: false,
      },
      {
        id: 'share-social',
        title: 'Share on Social',
        description: 'Share your progress on social',
        points: 30,
        icon: 'square.and.arrow.up.fill',
        type: 'social',
        isAvailable: true,
        claimed: false,
      },
      {
        id: 'total-goals',
        title: '10 Goals Completed',
        description: 'Complete 10 workout goals in total',
        points: 200,
        icon: 'trophy.fill',
        type: 'achievement',
        isAvailable: totalGoals >= 10,
        progress: {
          current: totalGoals,
          target: 10,
          label: 'goals completed',
        },
        claimed: false,
      },
      {
        id: 'total-goals-50',
        title: '50 Goals Completed',
        description: 'Complete 50 workout goals in total',
        points: 1000,
        icon: 'trophy.fill',
        type: 'achievement',
        isAvailable: totalGoals >= 50,
        progress: {
          current: totalGoals,
          target: 50,
          label: 'goals completed',
        },
        claimed: false,
      },
    ];
  }

  static canClaimReward(reward: Reward): boolean {
    return reward.isAvailable && !reward.claimed;
  }
}
