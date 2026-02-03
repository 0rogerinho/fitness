// View - Componente de UI para Pontos
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePontosViewModel } from './PontosViewModel';

export default function PontosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const { user, activities, pointsInfo } = usePontosViewModel();
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
            Your Points
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
            <IconSymbol size={48} name="star.fill" color={colors.tint} />
          </View>
          <ThemedText
            type="title"
            style={[styles.pointsValue, { color: colors.tint }]}
          >
            {user?.points || 0}
          </ThemedText>
          <ThemedText style={styles.pointsLabel}>Available Points</ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.card, borderColor: colors.cardBorder },
              isDark && Shadows.card,
            ]}
          >
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: colors.success + '20' },
              ]}
            >
              <IconSymbol
                size={24}
                name="arrow.up.circle.fill"
                color={colors.success}
              />
            </View>
            <ThemedText type="subtitle" style={styles.statValue}>
              {pointsInfo.totalPoints}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Total Ganho</ThemedText>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.card, borderColor: colors.cardBorder },
              isDark && Shadows.card,
            ]}
          >
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: colors.tint + '20' },
              ]}
            >
              <IconSymbol
                size={24}
                name="checkmark.circle.fill"
                color={colors.tint}
              />
            </View>
            <ThemedText type="subtitle" style={styles.statValue}>
              {pointsInfo.totalActivities}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Atividades</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Activity History
          </ThemedText>
          {activities.map((activity) => (
            <View
              key={activity.id}
              style={[
                styles.activityCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
                isDark && Shadows.card,
              ]}
            >
              <View style={styles.activityInfo}>
                <ThemedText type="defaultSemiBold" style={styles.activityName}>
                  {activity.name}
                </ThemedText>
                <ThemedText style={styles.activityDate}>
                  {activity.date}
                </ThemedText>
              </View>
              <View
                style={[styles.pointsBadge, { backgroundColor: colors.tint }]}
              >
                <IconSymbol size={16} name="star.fill" color="#fff" />
                <ThemedText style={styles.pointsBadgeText}>
                  +{activity.points}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.infoSection,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            How to Earn Points?
          </ThemedText>
          <View style={styles.infoItem}>
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: colors.tint + '20' },
              ]}
            >
              <IconSymbol size={20} name="dumbbell.fill" color={colors.tint} />
            </View>
            <ThemedText style={styles.infoText}>
              Complete workouts: 30-50 points per workout
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
                name="square.and.arrow.up.fill"
                color={colors.tint}
              />
            </View>
            <ThemedText style={styles.infoText}>
              Share on social: 10 points
            </ThemedText>
          </View>
          <View style={styles.infoItem}>
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: colors.tint + '20' },
              ]}
            >
              <IconSymbol size={20} name="person.2.fill" color={colors.tint} />
            </View>
            <ThemedText style={styles.infoText}>
              Tag friends in posts: 5 points per tag
            </ThemedText>
          </View>
          <View style={styles.infoItem}>
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: colors.tint + '20' },
              ]}
            >
              <IconSymbol size={20} name="trophy.fill" color={colors.tint} />
            </View>
            <ThemedText style={styles.infoText}>
              Join challenges: Various points
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
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  pointsCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
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
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsValue: {
    fontSize: 64,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -2,
  },
  pointsLabel: {
    fontSize: 16,
    opacity: 0.7,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
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
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: '600',
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  activityDate: {
    fontSize: 14,
    opacity: 0.6,
    fontWeight: '500',
  },
  pointsBadge: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pointsBadgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  infoSection: {
    marginBottom: 30,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '500',
    lineHeight: 22,
  },
});
