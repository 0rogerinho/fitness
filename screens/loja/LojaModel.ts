// Model - Types and interfaces for Store
export type ProductCategory = 'sports' | 'food' | 'withdrawal';

export interface Product {
  id: string;
  name: string;
  description: string;
  points: number;
  category: ProductCategory;
  discount?: string;
}

export class LojaModel {
  static getProducts(): Product[] {
    return [
      {
        id: '1',
        name: 'Adidas Discount - 20%',
        description: 'Discount on Adidas sports products',
        points: 200,
        category: 'sports',
        discount: '20% OFF',
      },
      {
        id: '2',
        name: 'Nike Discount - 15%',
        description: 'Discount on Nike shoes and clothing',
        points: 150,
        category: 'sports',
        discount: '15% OFF',
      },
      {
        id: '3',
        name: 'Fitness Meal Combo',
        description: 'Discount on fitness meals',
        points: 100,
        category: 'food',
        discount: 'R$ 20 OFF',
      },
      {
        id: '4',
        name: 'Supplements Discount',
        description: '15% off supplements',
        points: 120,
        category: 'food',
        discount: '15% OFF',
      },
      {
        id: '5',
        name: 'Cash Withdrawal',
        description: 'Withdrawal available 3x per year (Next date: 04/01/2026)',
        points: 1000,
        category: 'withdrawal',
      },
    ];
  }

  static getCategories() {
    return [
      { id: 'all', name: 'All', icon: 'square.grid.2x2' },
      { id: 'sports', name: 'Sports', icon: 'dumbbell.fill' },
      { id: 'food', name: 'Food', icon: 'fork.knife' },
      { id: 'withdrawal', name: 'Withdrawal', icon: 'dollarsign.circle.fill' },
    ];
  }

  static filterProducts(products: Product[], category: string): Product[] {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  }

  static canRedeem(userPoints: number, productPoints: number): boolean {
    return userPoints >= productPoints;
  }
}
