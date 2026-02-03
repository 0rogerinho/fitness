// View - UI component for Workout Details
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Exercise } from './TreinoDetalhesModel';
import { useTreinoDetalhesViewModel } from './TreinoDetalhesViewModel';

// Default video when exercise has no videoUrl (each exercise will have its own URL later)
const DEFAULT_EXERCISE_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

type ThemeColors = ReturnType<(typeof Colors)[keyof typeof Colors]>;

/** Carousel card: exercise execution video + data (sets, reps, etc.) */
function ExerciseCarouselItem({
  exercise,
  index,
  colors,
  isActive,
}: {
  exercise: Exercise;
  index: number;
  colors: ThemeColors;
  isActive: boolean;
}) {
  const videoSource = exercise.videoUrl || DEFAULT_EXERCISE_VIDEO;
  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
  });

  useEffect(() => {
    if (!isActive) player.pause();
  }, [isActive, player]);

  return (
    <View
      style={[
        styles.carouselCard,
        {
          width: CARD_WIDTH,
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      <View
        style={[
          styles.cardVideoContainer,
          {
            backgroundColor: colors.surface,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <VideoView
          style={[styles.cardVideo, { height: VIDEO_HEIGHT }]}
          player={player}
          nativeControls
          contentFit="contain"
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>
      <View style={styles.exerciseHeader}>
        <View
          style={[
            styles.exerciseNumberBadge,
            { backgroundColor: colors.tint + '20' },
          ]}
        >
          <ThemedText style={[styles.exerciseNumber, { color: colors.tint }]}>
            {index + 1}
          </ThemedText>
        </View>
        <ThemedText type="defaultSemiBold" style={styles.exerciseName}>
          {exercise.name}
        </ThemedText>
      </View>
      <View style={styles.exerciseDetails}>
        <View
          style={[
            styles.exerciseDetailCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <IconSymbol size={20} name="repeat" color={colors.tint} />
          <View style={styles.exerciseDetailContent}>
            <ThemedText style={styles.exerciseDetailLabel}>Sets</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={styles.exerciseDetailValue}
            >
              {exercise.sets}
            </ThemedText>
          </View>
        </View>
        <View
          style={[
            styles.exerciseDetailCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <IconSymbol size={20} name="arrow.clockwise" color={colors.tint} />
          <View style={styles.exerciseDetailContent}>
            <ThemedText style={styles.exerciseDetailLabel}>Reps</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={styles.exerciseDetailValue}
            >
              {exercise.reps}
            </ThemedText>
          </View>
        </View>
        <View
          style={[
            styles.exerciseDetailCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <IconSymbol size={20} name="timer" color={colors.tint} />
          <View style={styles.exerciseDetailContent}>
            <ThemedText style={styles.exerciseDetailLabel}>Rest</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={styles.exerciseDetailValue}
            >
              {exercise.rest}
            </ThemedText>
          </View>
        </View>
      </View>
      {exercise.notes && (
        <View
          style={[
            styles.exerciseNotesContainer,
            {
              backgroundColor: colors.highlight + '20',
              borderColor: colors.highlight + '40',
            },
          ]}
        >
          <IconSymbol size={16} name="lightbulb.fill" color={colors.warning} />
          <ThemedText style={styles.exerciseNotes}>{exercise.notes}</ThemedText>
        </View>
      )}
    </View>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_PADDING = 20;
const CARD_WIDTH = SCREEN_WIDTH - CAROUSEL_PADDING * 2;
const VIDEO_ASPECT_RATIO = 16 / 9;
const VIDEO_HEIGHT = CARD_WIDTH / VIDEO_ASPECT_RATIO;

export default function TreinoDetalhesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { workout, completed, handleCompleteWorkout, isValid } =
    useTreinoDetalhesViewModel();
  const insets = useSafeAreaInsets();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const carouselRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const index = viewableItems[0]?.index;
      if (index != null) setCurrentExerciseIndex(index);
    },
    [],
  );
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderExerciseCard = useCallback(
    ({ item, index }: { item: Exercise; index: number }) => (
      <ExerciseCarouselItem
        exercise={item}
        index={index}
        colors={colors}
        isActive={currentExerciseIndex === index}
      />
    ),
    [colors, currentExerciseIndex],
  );

  // Normalize difficulty to English (data may come in Portuguese from other modules)
  const getDifficultyKey = (difficulty: string) => {
    const map: Record<string, string> = {
      Iniciante: 'Beginner',
      Intermediário: 'Intermediate',
      Avançado: 'Advanced',
      Beginner: 'Beginner',
      Intermediate: 'Intermediate',
      Advanced: 'Advanced',
    };
    return map[difficulty] ?? difficulty;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (getDifficultyKey(difficulty)) {
      case 'Beginner':
        return colors.success;
      case 'Intermediate':
        return colors.warning;
      case 'Advanced':
        return colors.error;
      default:
        return colors.tint;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (getDifficultyKey(difficulty)) {
      case 'Beginner':
        return 'leaf.fill';
      case 'Intermediate':
        return 'flame.fill';
      case 'Advanced':
        return 'bolt.fill';
      default:
        return 'chart.bar.fill';
    }
  };

  if (!isValid) {
    return (
      <ThemedView style={styles.container}>
        <View
          style={[
            styles.header,
            {
              paddingTop: Platform.select({
                ios: insets.top + 10,
                android: insets.top + 10,
                default: insets.top + 10,
              }),
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol size={24} name="chevron.left" color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <IconSymbol
            size={48}
            name="exclamationmark.triangle.fill"
            color={colors.error}
          />
          <ThemedText type="subtitle" style={styles.errorText}>
            Error loading workout
          </ThemedText>
          <ThemedText style={styles.errorSubtext}>
            Please try again later
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <View
            style={[
              styles.heroIconContainer,
              { backgroundColor: colors.tint + '20' },
            ]}
          >
            <IconSymbol size={40} name="dumbbell.fill" color={colors.tint} />
          </View>
          <ThemedText type="title" style={styles.title}>
            {workout!.title}
          </ThemedText>
          <ThemedText style={styles.description}>
            {workout!.description}
          </ThemedText>
        </View>

        {/* Info Cards */}
        <View style={styles.infoContainer}>
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View
              style={[
                styles.infoIconContainer,
                { backgroundColor: colors.info + '20' },
              ]}
            >
              <IconSymbol size={24} name="clock.fill" color={colors.info} />
            </View>
            <ThemedText type="defaultSemiBold" style={styles.infoLabel}>
              Duration
            </ThemedText>
            <ThemedText style={styles.infoValue}>
              {workout!.duration}
            </ThemedText>
          </View>

          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View
              style={[
                styles.infoIconContainer,
                {
                  backgroundColor:
                    getDifficultyColor(workout!.difficulty) + '20',
                },
              ]}
            >
              <IconSymbol
                size={24}
                name={getDifficultyIcon(workout!.difficulty)}
                color={getDifficultyColor(workout!.difficulty)}
              />
            </View>
            <ThemedText type="defaultSemiBold" style={styles.infoLabel}>
              Difficulty
            </ThemedText>
            <View
              style={[
                styles.difficultyBadge,
                {
                  backgroundColor:
                    getDifficultyColor(workout!.difficulty) + '20',
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.difficultyText,
                  { color: getDifficultyColor(workout!.difficulty) },
                ]}
              >
                {getDifficultyKey(workout!.difficulty)}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Exercises Section - Carousel (each card with its video) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              size={24}
              name="list.bullet.rectangle.fill"
              color={colors.tint}
            />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Exercises ({workout!.exercises.length})
            </ThemedText>
          </View>

          {/* Exercise carousel */}
          <View style={styles.carouselWrapper}>
            <FlatList
              ref={carouselRef}
              data={workout!.exercises}
              keyExtractor={(_, i) => String(i)}
              renderItem={renderExerciseCard}
              horizontal
              pagingEnabled
              snapToInterval={CARD_WIDTH + 16}
              snapToAlignment="start"
              decelerationRate="fast"
              getItemLayout={(_, index) => ({
                length: CARD_WIDTH + 16,
                offset: (CARD_WIDTH + 16) * index,
                index,
              })}
              contentContainerStyle={styles.carouselContent}
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
            />
            {/* Page indicator */}
            <View style={styles.pagination}>
              {workout!.exercises.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    {
                      backgroundColor:
                        index === currentExerciseIndex
                          ? colors.tint
                          : colors.cardBorder,
                      width: index === currentExerciseIndex ? 20 : 8,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Tips Section */}
        {workout!.tips && workout!.tips.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol size={24} name="star.fill" color={colors.warning} />
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Important Tips
              </ThemedText>
            </View>
            <View
              style={[
                styles.tipsContainer,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              {workout!.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <View
                    style={[
                      styles.tipIconContainer,
                      { backgroundColor: colors.warning + '20' },
                    ]}
                  >
                    <IconSymbol
                      size={16}
                      name="checkmark.circle.fill"
                      color={colors.warning}
                    />
                  </View>
                  <ThemedText style={styles.tipText}>{tip}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Complete button */}
        <TouchableOpacity
          style={[
            styles.completeButton,
            {
              backgroundColor: completed ? colors.success : colors.tint,
              ...(isDark
                ? Shadows.button
                : Platform.select({
                    ios: {
                      shadowColor: completed ? colors.success : colors.tint,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                    },
                    android: { elevation: 6 },
                  })),
            },
          ]}
          onPress={handleCompleteWorkout}
          activeOpacity={0.8}
        >
          {completed ? (
            <>
              <IconSymbol size={24} name="checkmark.circle.fill" color="#fff" />
              <ThemedText style={styles.completeButtonText}>
                Workout Completed
              </ThemedText>
            </>
          ) : (
            <>
              <IconSymbol size={24} name="checkmark.circle" color="#fff" />
              <ThemedText style={styles.completeButtonText}>
                Mark as Complete
              </ThemedText>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  content: {
    padding: 20,
    paddingTop: 80,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 16,
  },
  errorText: {
    fontSize: 20,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  heroCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
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
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 24,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  infoCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
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
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  cardVideoContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
  },
  cardVideo: {
    width: '100%',
  },
  carouselWrapper: {
    marginBottom: 8,
  },
  carouselContent: {
    paddingHorizontal: CAROUSEL_PADDING,
    paddingBottom: 12,
    gap: 16,
  },
  carouselCard: {
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    borderWidth: 1,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
  },
  exerciseCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
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
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  exerciseNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  exerciseName: {
    fontSize: 18,
    flex: 1,
    flexShrink: 1,
  },
  exerciseDetails: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  exerciseDetailCard: {
    flex: 1,
    width: '100%',
    minWidth: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  exerciseDetailContent: {
    flex: 1,
    minWidth: 0,
  },
  exerciseDetailLabel: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  exerciseDetailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseNotesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  exerciseNotes: {
    fontSize: 14,
    flex: 1,
    flexShrink: 1,
    lineHeight: 20,
    opacity: 0.9,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 12,
  },
  videoButtonText: {
    fontSize: 15,
  },
  tipsContainer: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
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
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  tipIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
    flexShrink: 1,
    opacity: 0.9,
  },
  completeButton: {
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
