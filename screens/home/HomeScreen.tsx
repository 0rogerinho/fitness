// View - UI Component for Home
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Shadows } from '@/constants/theme';

import { useTheme } from '@/shared/contexts/ThemeContext';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FeaturedProduct } from './HomeModel';

import { Ionicons } from '@expo/vector-icons';
import { useHomeViewModel } from './HomeViewModel';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const {
    user,
    isAuthenticated,
    menuItems,
    featuredProducts,
    bannerProduct,
    rewards,
    handleProductPress,
    handleClaimReward,
    logout,
  } = useHomeViewModel();
  const { toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  if (!isAuthenticated || !user) {
    return null;
  }

  const renderProductCard = (product: FeaturedProduct) => {
    const categoryIcon =
      product.category === 'roupas'
        ? 'tshirt.fill'
        : product.category === 'tenis'
        ? 'shoe.fill'
        : product.category === 'suplementos'
        ? 'pills.fill'
        : 'bag.fill';

    return (
      <TouchableOpacity
        key={product.id}
        style={[
          styles.productCard,
          { backgroundColor: colors.card, borderColor: colors.cardBorder },
          isDark && Shadows.card,
        ]}
        onPress={() => handleProductPress(product)}
        activeOpacity={0.8}
      >
        {/* Product Image */}
        {product.image && (
          <View style={styles.productImageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
            {product.canAfford && (
              <View
                style={[
                  styles.affordableBadge,
                  {
                    backgroundColor: colors.success,
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 1,
                  },
                ]}
              >
                <ThemedText style={styles.affordableBadgeText}>
                  Available
                </ThemedText>
              </View>
            )}
            <View
              style={[
                styles.discountBadgeOverlay,
                { backgroundColor: colors.error },
              ]}
            >
              <ThemedText style={styles.discountBadgeText}>
                {product.discount}
              </ThemedText>
            </View>
          </View>
        )}

        <View style={styles.productInfo}>
          <ThemedText
            type="defaultSemiBold"
            style={styles.productName}
            numberOfLines={2}
          >
            {product.name}
          </ThemedText>
          <ThemedText style={styles.productDescription} numberOfLines={2}>
            {product.description}
          </ThemedText>

          <View style={styles.priceContainer}>
            <ThemedText style={styles.originalPrice}>
              R$ {product.originalPrice.toFixed(2)}
            </ThemedText>
            <ThemedText
              type="title"
              style={[styles.discountPrice, { color: colors.tint }]}
            >
              R$ {product.discountPrice.toFixed(2)}
            </ThemedText>
          </View>

          <View style={styles.pointsRow}>
            <IconSymbol size={16} name="star.fill" color={colors.tint} />
            <ThemedText style={[styles.pointsText, { color: colors.tint }]}>
              {product.pointsRequired} points
            </ThemedText>
            {!product.canAfford && (
              <ThemedText style={styles.insufficientText}>
                ({product.pointsRequired - user.points} points needed)
              </ThemedText>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
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
          <View style={styles.headerTop}>
            <View style={styles.headerTextContainer}>
              <ThemedText type="title" style={styles.welcomeText}>
                Hello, {user.name}! 👋
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                Ready to train today?
              </ThemedText>
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={[
                  styles.headerButton,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.cardBorder,
                  },
                  isDark && Shadows.button,
                ]}
                onPress={() => router.push('/perfil')}
                activeOpacity={0.7}
              >
                <IconSymbol
                  size={22}
                  name="person.circle.fill"
                  color={colors.tint}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.headerButton,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.cardBorder,
                  },
                  isDark && Shadows.button,
                ]}
                onPress={toggleTheme}
                activeOpacity={0.7}
              >
                {colorScheme === 'dark' ? (
                  <Ionicons name="sunny" size={22} color={colors.tint} />
                ) : (
                  <Ionicons name="moon" size={22} color={colors.tint} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Points Card */}
        <View
          style={[
            styles.pointsCard,
            { backgroundColor: colors.tint, borderColor: colors.tint },
            isDark && Shadows.card,
          ]}
        >
          <View style={styles.pointsHeader}>
            <View
              style={[
                styles.pointsIconContainer,
                { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
              ]}
            >
              <IconSymbol size={32} name="star.fill" color="#FFFFFF" />
            </View>
            <View style={styles.pointsInfo}>
              <ThemedText
                style={[
                  styles.pointsLabel,
                  { color: 'rgba(255, 255, 255, 0.9)' },
                ]}
              >
                Your Points
              </ThemedText>
              <ThemedText
                type="title"
                style={[styles.pointsValue, { color: '#FFFFFF' }]}
              >
                {user.points}
              </ThemedText>
            </View>
          </View>
          <ThemedText
            style={[
              styles.pointsSubtext,
              { color: 'rgba(255, 255, 255, 0.9)' },
            ]}
          >
            Keep training to earn more and unlock discounts! 💪
          </ThemedText>
        </View>

        {/* Featured Product Banner */}
        {bannerProduct && (
          <TouchableOpacity
            style={[
              styles.bannerContainer,
              { backgroundColor: colors.card, borderColor: colors.cardBorder },
              isDark && Shadows.card,
            ]}
            onPress={() => handleProductPress(bannerProduct)}
            activeOpacity={0.9}
          >
            {/* Image at Top */}
            {bannerProduct.image && (
              <View style={styles.bannerImageWrapper}>
                <View
                  style={[
                    styles.bannerImageContainer,
                    {
                      backgroundColor:
                        colorScheme === 'dark'
                          ? 'rgba(255, 255, 255, 0.15)'
                          : colors.surface,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: bannerProduct.image }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />
                  <View
                    style={[
                      styles.bannerDiscountBadge,
                      {
                        backgroundColor: colors.error,
                        position: 'absolute',
                        top: 16,
                        right: 16,
                      },
                    ]}
                  >
                    <ThemedText style={styles.bannerDiscountBadgeText}>
                      {bannerProduct.discount}
                    </ThemedText>
                  </View>
                </View>
              </View>
            )}

            {/* Text Content Below */}
            <View style={styles.bannerContent}>
              <View
                style={[
                  styles.bannerBadge,
                  {
                    backgroundColor:
                      colorScheme === 'dark'
                        ? 'rgba(255, 255, 255, 0.3)'
                        : colors.tint,
                  },
                ]}
              >
                <IconSymbol size={14} name="sparkles" color="#FFFFFF" />
                <ThemedText style={styles.bannerBadgeText}>
                  SPECIAL OFFER
                </ThemedText>
              </View>

              <ThemedText
                type="title"
                style={[
                  styles.bannerTitle,
                  {
                    color: colorScheme === 'dark' ? '#FFFFFF' : colors.text,
                    textShadowColor:
                      colorScheme === 'dark'
                        ? 'rgba(0, 0, 0, 0.3)'
                        : 'transparent',
                  },
                ]}
                numberOfLines={2}
              >
                {bannerProduct.name}
              </ThemedText>

              <ThemedText
                style={[
                  styles.bannerDescription,
                  {
                    color:
                      colorScheme === 'dark'
                        ? 'rgba(255, 255, 255, 0.9)'
                        : colors.icon,
                  },
                ]}
                numberOfLines={2}
              >
                {bannerProduct.description}
              </ThemedText>

              <View style={styles.bannerPriceContainer}>
                <ThemedText
                  style={[
                    styles.bannerOriginalPrice,
                    {
                      color:
                        colorScheme === 'dark'
                          ? 'rgba(255, 255, 255, 0.6)'
                          : colors.icon,
                    },
                  ]}
                >
                  R$ {bannerProduct.originalPrice.toFixed(2)}
                </ThemedText>
                <ThemedText
                  type="title"
                  style={[
                    styles.bannerDiscountPrice,
                    {
                      color: colorScheme === 'dark' ? '#FFFFFF' : colors.tint,
                      textShadowColor:
                        colorScheme === 'dark'
                          ? 'rgba(0, 0, 0, 0.2)'
                          : 'transparent',
                    },
                  ]}
                >
                  R$ {bannerProduct.discountPrice.toFixed(2)}
                </ThemedText>
              </View>

              <View style={styles.bannerPointsContainer}>
                <View
                  style={[
                    styles.bannerPointsIcon,
                    {
                      backgroundColor:
                        colorScheme === 'dark'
                          ? 'rgba(255, 255, 255, 0.2)'
                          : colors.surface,
                    },
                  ]}
                >
                  <IconSymbol
                    size={20}
                    name="star.fill"
                    color={colorScheme === 'dark' ? '#FFFFFF' : colors.tint}
                  />
                </View>
                <ThemedText
                  style={[
                    styles.bannerPointsText,
                    {
                      color: colorScheme === 'dark' ? '#FFFFFF' : colors.text,
                      textShadowColor:
                        colorScheme === 'dark'
                          ? 'rgba(0, 0, 0, 0.2)'
                          : 'transparent',
                    },
                  ]}
                >
                  {bannerProduct.pointsRequired} points
                </ThemedText>
              </View>

              <View
                style={[
                  styles.bannerFooter,
                  {
                    borderTopColor:
                      colorScheme === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : colors.cardBorder,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.bannerFooterText,
                    {
                      color:
                        colorScheme === 'dark'
                          ? 'rgba(255, 255, 255, 0.95)'
                          : colors.text,
                    },
                  ]}
                >
                  Tap to see details →
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Rewards Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Earn Points
              </ThemedText>
              <ThemedText style={styles.sectionSubtitle}>
                Redeem rewards for your achievements
              </ThemedText>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rewardsScroll}
            style={styles.rewardsContainer}
          >
            {rewards.map((reward) => {
              const canClaim = reward.isAvailable && !reward.claimed;
              const progressPercentage = reward.progress
                ? (reward.progress.current / reward.progress.target) * 100
                : 0;

              return (
                <TouchableOpacity
                  key={reward.id}
                  style={[
                    styles.rewardCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: canClaim
                        ? colors.success
                        : colors.cardBorder,
                      borderWidth: canClaim ? 2 : 1,
                    },
                    isDark && Shadows.button,
                  ]}
                  onPress={() => handleClaimReward(reward)}
                  activeOpacity={0.8}
                  disabled={!canClaim}
                >
                  <View style={styles.rewardCardHeader}>
                    <View
                      style={[
                        styles.rewardIconContainer,
                        {
                          backgroundColor: canClaim
                            ? colors.success + '20'
                            : colors.icon + '15',
                        },
                      ]}
                    >
                      <IconSymbol
                        size={24}
                        name={reward.icon as any}
                        color={canClaim ? colors.success : colors.icon}
                      />
                    </View>
                    {reward.claimed && (
                      <View
                        style={[
                          styles.claimedBadge,
                          { backgroundColor: colors.icon },
                        ]}
                      >
                        <IconSymbol
                          size={14}
                          name="checkmark.circle.fill"
                          color="#FFFFFF"
                        />
                        <ThemedText style={styles.claimedBadgeText}>
                          Claimed
                        </ThemedText>
                      </View>
                    )}
                  </View>

                  <View style={styles.rewardInfo}>
                    <ThemedText
                      type="defaultSemiBold"
                      style={styles.rewardTitle}
                      numberOfLines={2}
                    >
                      {reward.title}
                    </ThemedText>
                    <ThemedText
                      style={styles.rewardDescription}
                      numberOfLines={2}
                    >
                      {reward.description}
                    </ThemedText>

                    {reward.progress && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View
                            style={[
                              styles.progressFill,
                              {
                                width: `${Math.min(progressPercentage, 100)}%`,
                                backgroundColor: canClaim
                                  ? colors.success
                                  : colors.tint,
                              },
                            ]}
                          />
                        </View>
                        <ThemedText style={styles.progressText}>
                          {reward.progress.current}/{reward.progress.target}{' '}
                          {reward.progress.label}
                        </ThemedText>
                      </View>
                    )}

                    <View style={styles.rewardPoints}>
                      <IconSymbol
                        size={18}
                        name="star.fill"
                        color={colors.tint}
                      />
                      <ThemedText
                        type="title"
                        style={[
                          styles.rewardPointsText,
                          { color: colors.tint },
                        ]}
                      >
                        +{reward.points}
                      </ThemedText>
                    </View>

                    {canClaim && (
                      <View
                        style={[
                          styles.claimButton,
                          { backgroundColor: colors.success },
                        ]}
                      >
                        <ThemedText style={styles.claimButtonText}>
                          Redeem Now
                        </ThemedText>
                      </View>
                    )}
                    {!canClaim && !reward.claimed && (
                      <View
                        style={[
                          styles.claimButton,
                          { backgroundColor: colors.icon, opacity: 0.5 },
                        ]}
                      >
                        <ThemedText style={styles.claimButtonText}>
                          Unavailable
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Featured Products
              </ThemedText>
              <ThemedText style={styles.sectionSubtitle}>
                Exclusive discounts with your points
              </ThemedText>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/loja')}
              activeOpacity={0.7}
            >
              <ThemedText style={[styles.seeAllText, { color: colors.tint }]}>
                See all
              </ThemedText>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
            style={styles.productsContainer}
          >
            {featuredProducts.map(renderProductCard)}
          </ScrollView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  welcomeText: {
    fontSize: 34,
    marginBottom: 8,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    opacity: 0.7,
    fontWeight: '500',
  },
  pointsCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 64,
  },
  pointsIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pointsInfo: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },
  pointsLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '600',
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: -1.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 56,
  },
  pointsSubtext: {
    fontSize: 15,
    fontWeight: '500',
  },
  bannerContainer: {
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 32,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  bannerImageWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  bannerContent: {
    padding: 24,
    paddingTop: 20,
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 12,
  },
  bannerBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.8,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 16,
  },
  bannerPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  bannerOriginalPrice: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  bannerDiscountPrice: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: -1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  bannerPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  bannerPointsIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerPointsText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bannerRight: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  bannerImageContainer: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  bannerIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bannerDiscountBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  bannerDiscountBadgeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bannerFooter: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  bannerFooterText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 4,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: '500',
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  rewardsContainer: {
    marginHorizontal: -20,
  },
  rewardsScroll: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 16,
  },
  rewardCard: {
    width: 260,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  rewardCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rewardIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  claimedBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  rewardInfo: {
    gap: 12,
  },
  rewardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 13,
    opacity: 0.7,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 4,
  },
  progressContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
    fontWeight: '500',
  },
  rewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  rewardPointsText: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  claimButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  productsContainer: {
    marginHorizontal: -20,
  },
  productsScroll: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 16,
  },
  productCard: {
    width: 280,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  productImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  productIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadgeOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 1,
  },
  affordableBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  affordableBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  productInfo: {
    gap: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    opacity: 0.7,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 4,
  },
  priceContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  originalPrice: {
    fontSize: 14,
    opacity: 0.5,
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  discountPrice: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  pointsText: {
    fontSize: 15,
    fontWeight: '600',
  },
  insufficientText: {
    fontSize: 12,
    opacity: 0.6,
    fontWeight: '500',
    marginLeft: 4,
  },
  menuGrid: {
    gap: 16,
  },
  menuItemContainer: {
    marginBottom: 4,
  },
  menuItem: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  menuIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: '600',
  },
  menuItemDescription: {
    fontSize: 14,
    opacity: 0.65,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 32,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    opacity: 0.7,
    fontWeight: '500',
  },
});
