// View - UI component for Workouts
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import {
  WorkoutProgress,
  WorkoutStorage,
} from '@/shared/services/workoutStorage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTreinosViewModel } from './TreinosViewModel';

export default function TreinosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const {
    loading,
    savedWorkout,
    progress,
    handleCreateWorkout,
    handleViewWorkout,
    refreshWorkout,
  } = useTreinosViewModel();
  const insets = useSafeAreaInsets();

  // Reload workout when screen receives focus
  useFocusEffect(
    React.useCallback(() => {
      refreshWorkout();
    }, []),
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
          <ThemedText style={styles.loadingText}>Loading...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  // If no workout, show create button
  if (!savedWorkout) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.emptyContent,
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
          <View style={styles.emptyHeader}>
            <View
              style={[
                styles.emptyIconContainer,
                { backgroundColor: colors.tint + '20' },
              ]}
            >
              <IconSymbol size={64} name="dumbbell.fill" color={colors.tint} />
            </View>
            <ThemedText type="title" style={styles.emptyTitle}>
              Create Your Custom Workout
            </ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Our AI will create a perfect workout for you based on your needs
              and goals
            </ThemedText>
          </View>

          <TouchableOpacity
            style={[
              styles.createButton,
              { backgroundColor: colors.tint },
              isDark && Shadows.button,
            ]}
            onPress={handleCreateWorkout}
            activeOpacity={0.8}
          >
            <IconSymbol size={24} name="sparkles" color="#fff" />
            <ThemedText style={styles.createButtonText}>
              Create Workout with AI
            </ThemedText>
          </TouchableOpacity>

          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
          >
            <ThemedText type="subtitle" style={styles.infoTitle}>
              How does it work?
            </ThemedText>
            <View style={styles.infoItem}>
              <IconSymbol size={20} name="1.circle.fill" color={colors.tint} />
              <ThemedText style={styles.infoText}>
                Answer a few questions about yourself
              </ThemedText>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol size={20} name="2.circle.fill" color={colors.tint} />
              <ThemedText style={styles.infoText}>
                Our AI analyzes your answers
              </ThemedText>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol size={20} name="3.circle.fill" color={colors.tint} />
              <ThemedText style={styles.infoText}>
                Receive a personalized workout
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    );
  }

  // If workout exists, show dashboard
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
            My Workout
          </ThemedText>
          <ThemedText style={styles.subtitle}>{savedWorkout.title}</ThemedText>
        </View>

        <TouchableOpacity
          style={[
            styles.workoutCard,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
            isDark && Shadows.button,
          ]}
          onPress={handleViewWorkout}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.workoutIconContainer,
              { backgroundColor: colors.tint + '20' },
            ]}
          >
            <IconSymbol size={32} name="dumbbell.fill" color={colors.tint} />
          </View>
          <View style={styles.workoutInfo}>
            <ThemedText type="defaultSemiBold" style={styles.workoutTitle}>
              {savedWorkout.title}
            </ThemedText>
            <ThemedText style={styles.workoutDescription}>
              {savedWorkout.description}
            </ThemedText>
            <View style={styles.workoutMeta}>
              <View style={styles.workoutMetaItem}>
                <IconSymbol size={16} name="clock.fill" color={colors.icon} />
                <ThemedText style={styles.workoutMetaText}>
                  {savedWorkout.duration}
                </ThemedText>
              </View>
              <View style={styles.workoutMetaItem}>
                <IconSymbol
                  size={16}
                  name="chart.bar.fill"
                  color={colors.icon}
                />
                <ThemedText style={styles.workoutMetaText}>
                  {savedWorkout.difficulty}
                </ThemedText>
              </View>
            </View>
          </View>
          <IconSymbol size={20} name="chevron.right" color={colors.icon} />
        </TouchableOpacity>

        {/* Progress Dashboard */}
        <View style={styles.dashboardSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Progress
          </ThemedText>

          <View style={styles.statsGrid}>
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
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
              <ThemedText
                type="title"
                style={[styles.statValue, { color: colors.tint }]}
              >
                {progress?.completedDates.length || 0}
              </ThemedText>
              <ThemedText style={styles.statLabel}>
                Workouts Completed
              </ThemedText>
            </View>

            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
                isDark && Shadows.card,
              ]}
            >
              <View
                style={[
                  styles.statIconContainer,
                  { backgroundColor: '#10B98120' },
                ]}
              >
                <IconSymbol size={24} name="flame.fill" color="#10B981" />
              </View>
              <ThemedText
                type="title"
                style={[styles.statValue, { color: '#10B981' }]}
              >
                {getCurrentWeekWorkouts(progress)}
              </ThemedText>
              <ThemedText style={styles.statLabel}>This Week</ThemedText>
            </View>
          </View>

          {/* Weekly Progress Chart */}
          {progress && progress.weeklyStats.length > 0 && (
            <View
              style={[
                styles.chartCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
                isDark && Shadows.card,
              ]}
            >
              <ThemedText type="defaultSemiBold" style={styles.chartTitle}>
                Workouts per Week
              </ThemedText>
              <View style={styles.chartContainer}>
                {progress.weeklyStats.slice(-4).map((stat, index) => (
                  <View key={index} style={styles.chartBarContainer}>
                    <View style={styles.chartBarWrapper}>
                      <View
                        style={[
                          styles.chartBar,
                          {
                            height: `${Math.min(
                              (stat.completedWorkouts / 7) * 100,
                              100,
                            )}%`,
                            backgroundColor: colors.tint,
                          },
                        ]}
                      />
                    </View>
                    <ThemedText style={styles.chartLabel}>
                      {stat.completedWorkouts}
                    </ThemedText>
                    <ThemedText style={styles.chartWeekLabel}>
                      Week {index + 1}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Recent History */}
          {progress && progress.completedDates.length > 0 && (
            <View
              style={[
                styles.historyCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
                isDark && Shadows.card,
              ]}
            >
              <ThemedText type="defaultSemiBold" style={styles.historyTitle}>
                Recent History
              </ThemedText>
              {progress.completedDates
                .slice(-5)
                .reverse()
                .map((date, index) => (
                  <View key={index} style={styles.historyItem}>
                    <View
                      style={[
                        styles.historyIcon,
                        { backgroundColor: colors.tint + '20' },
                      ]}
                    >
                      <IconSymbol
                        size={16}
                        name="checkmark.circle.fill"
                        color={colors.tint}
                      />
                    </View>
                    <ThemedText style={styles.historyDate}>
                      {formatDate(date)}
                    </ThemedText>
                  </View>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function getCurrentWeekWorkouts(progress: WorkoutProgress | null): number {
  if (!progress) return 0;
  const currentWeek = WorkoutStorage.getWeekString(new Date());
  const weekStat = progress.weeklyStats.find(
    (stat) => stat.week === currentWeek,
  );
  return weekStat?.completedWorkouts || 0;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
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
    marginTop: 4,
    fontWeight: '500',
  },
  emptyHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 28,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
    fontWeight: '500',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginBottom: 32,
    minWidth: 280,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  infoTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 15,
    flex: 1,
    fontWeight: '500',
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
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
  workoutIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 20,
    marginBottom: 6,
    fontWeight: '600',
  },
  workoutDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  workoutMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  workoutMetaText: {
    fontSize: 13,
    opacity: 0.7,
    fontWeight: '500',
  },
  dashboardSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    opacity: 0.7,
    fontWeight: '500',
    textAlign: 'center',
  },
  chartCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
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
  chartTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 150,
    paddingHorizontal: 8,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  chartBarWrapper: {
    width: '80%',
    height: 100,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '100%',
    borderRadius: 8,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  chartWeekLabel: {
    fontSize: 11,
    opacity: 0.6,
    fontWeight: '500',
  },
  historyCard: {
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
  historyTitle: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 15,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {
    fontSize: 16,
    opacity: 0.7,
    fontWeight: '500',
  },
});
