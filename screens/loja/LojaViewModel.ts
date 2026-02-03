// ViewModel - Presentation logic and state for Store
import { useAuth } from '@/shared/contexts/AuthContext';
import { useState } from 'react';
import { Alert } from 'react-native';
import { LojaModel, Product } from './LojaModel';

export function useLojaViewModel() {
  const { user, updatePoints } = useAuth();
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'sports' | 'food' | 'withdrawal'
  >('all');

  const products = LojaModel.getProducts();
  const filteredProducts = LojaModel.filterProducts(products, activeCategory);
  const categories = LojaModel.getCategories();

  const handleRedeem = (product: Product) => {
    if (!user) return;

    if (!LojaModel.canRedeem(user.points, product.points)) {
      Alert.alert(
        'Insufficient Points',
        `You need ${product.points} points to redeem this item.`,
      );
      return;
    }

    if (product.category === 'withdrawal') {
      Alert.alert(
        'Cash Withdrawal',
        'Withdrawal is available only 3 times per year. The next date is 04/01/2026. You will be notified when it is available.',
        [{ text: 'OK' }],
      );
      return;
    }

    Alert.alert(
      'Redemption Confirmed!',
      `You redeemed: ${product.name}\n\nDiscount code will be sent by email.`,
      [
        {
          text: 'OK',
          onPress: () => {
            updatePoints(-product.points);
          },
        },
      ],
    );
  };

  return {
    user,
    products: filteredProducts,
    categories,
    activeCategory,
    setActiveCategory,
    handleRedeem,
  };
}
