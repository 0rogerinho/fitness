// View - UI component for Store
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LojaModel } from './LojaModel';
import { useLojaViewModel } from './LojaViewModel';

export default function LojaScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const {
    user,
    products,
    categories,
    activeCategory,
    setActiveCategory,
    handleRedeem,
  } = useLojaViewModel();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Platform.select({
              ios: insets.top + 10,
              android: insets.top + 10,
              default: insets.top + 10,
            }),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Points Store
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Exchange your points for real benefits
          </ThemedText>
        </View>

        <View
          style={[
            styles.pointsCard,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
            isDark && Shadows.card,
          ]}
        >
          <View
            style={[
              styles.pointsIconWrapper,
              { backgroundColor: colors.tint + '20' },
            ]}
          >
            <IconSymbol size={36} name="star.fill" color={colors.tint} />
          </View>
          <ThemedText
            type="title"
            style={[styles.pointsValue, { color: colors.tint }]}
          >
            {user?.points || 0}
          </ThemedText>
          <ThemedText style={styles.pointsLabel}>Available Points</ThemedText>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    activeCategory === category.id ? colors.tint : colors.card,
                  borderColor:
                    activeCategory === category.id
                      ? colors.tint
                      : colors.cardBorder,
                },
                isDark && Shadows.button,
              ]}
              onPress={() => setActiveCategory(category.id as any)}
              activeOpacity={0.8}
            >
              <IconSymbol
                size={20}
                name={category.icon as any}
                color={activeCategory === category.id ? '#fff' : colors.icon}
              />
              <ThemedText
                style={[
                  styles.categoryButtonText,
                  {
                    color:
                      activeCategory === category.id ? '#fff' : colors.text,
                    fontWeight: activeCategory === category.id ? '600' : '500',
                  },
                ]}
              >
                {category.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productsContainer}>
          {products.map((product) => {
            const canRedeem = LojaModel.canRedeem(
              user?.points || 0,
              product.points,
            );
            return (
              <View
                key={product.id}
                style={[
                  styles.productCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.cardBorder,
                  },
                  isDark && Shadows.card,
                ]}
              >
                <View style={styles.productHeader}>
                  <View style={styles.productInfo}>
                    <View style={styles.productTitleRow}>
                      <ThemedText
                        type="defaultSemiBold"
                        style={styles.productName}
                      >
                        {product.name}
                      </ThemedText>
                      {product.discount && (
                        <View
                          style={[
                            styles.discountBadge,
                            { backgroundColor: colors.success },
                          ]}
                        >
                          <ThemedText style={styles.discountText}>
                            {product.discount}
                          </ThemedText>
                        </View>
                      )}
                    </View>
                    <ThemedText style={styles.productDescription}>
                      {product.description}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.productFooter}>
                  <View style={styles.pointsContainer}>
                    <IconSymbol
                      size={20}
                      name="star.fill"
                      color={colors.tint}
                    />
                    <ThemedText
                      type="defaultSemiBold"
                      style={[styles.productPoints, { color: colors.tint }]}
                    >
                      {product.points} points
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.redeemButton,
                      {
                        backgroundColor: canRedeem ? colors.tint : colors.icon,
                        opacity: canRedeem ? 1 : 0.6,
                      },
                      isDark && Shadows.button,
                    ]}
                    onPress={() => handleRedeem(product)}
                    disabled={!canRedeem}
                    activeOpacity={0.8}
                  >
                    <IconSymbol
                      size={18}
                      name={canRedeem ? 'checkmark.circle.fill' : 'lock.fill'}
                      color="#fff"
                    />
                    <ThemedText style={styles.redeemButtonText}>
                      Redeem
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={[
            styles.infoSection,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Important Information
          </ThemedText>
          <View style={styles.infoItem}>
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: colors.tint + '20' },
              ]}
            >
              <IconSymbol size={20} name="calendar" color={colors.tint} />
            </View>
            <ThemedText style={styles.infoText}>
              Discounts are valid for 30 days after redemption
            </ThemedText>
          </View>
          <View style={styles.infoItem}>
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: colors.tint + '20' },
              ]}
            >
              <IconSymbol
                size={20}
                name="dollarsign.circle.fill"
                color={colors.tint}
              />
            </View>
            <ThemedText style={styles.infoText}>
              Cash withdrawal available 3 times per year (April, August,
              December)
            </ThemedText>
          </View>
          <View style={styles.infoItem}>
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: colors.tint + '20' },
              ]}
            >
              <IconSymbol size={20} name="envelope.fill" color={colors.tint} />
            </View>
            <ThemedText style={styles.infoText}>
              Discount codes are sent by email after redemption
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    marginTop: 10,
  },
  title: {
    fontSize: 34,
    marginBottom: 8,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    fontWeight: '500',
  },
  pointsCard: {
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    minHeight: 200,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pointsIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsValue: {
    fontSize: 56,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -2,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 64,
  },
  pointsLabel: {
    fontSize: 16,
    opacity: 0.7,
    fontWeight: '500',
  },
  categories: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  categoryButtonText: {
    fontSize: 15,
  },
  productsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  productCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productHeader: {
    marginBottom: 16,
  },
  productInfo: {
    gap: 10,
  },
  productTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 12,
  },
  productName: {
    fontSize: 19,
    fontWeight: '600',
    flex: 1,
  },
  productDescription: {
    fontSize: 15,
    opacity: 0.7,
    fontWeight: '500',
    lineHeight: 22,
  },
  discountBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productPoints: {
    fontSize: 19,
    fontWeight: '600',
  },
  redeemButton: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  redeemButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 30,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: '600',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
    fontWeight: '500',
  },
});
