// View - UI component for Profile
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePerfilViewModel } from './PerfilViewModel';

const { width } = Dimensions.get('window');
const GRID_PADDING = 20;
const GRID_GAP = 10;
const NUM_COLUMNS = width >= 400 ? 4 : 3; // 4 colunas em telas largas, 3 em menores
const POST_SIZE =
  (width - GRID_PADDING * 2 - GRID_GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

export default function PerfilScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    profile,
    posts,
    workoutStats,
    selectedTab,
    setSelectedTab,
    beforeImage,
    afterImage,
    setBeforeImage,
    setAfterImage,
    logout,
  } = usePerfilViewModel();

  if (!profile) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading profile...</ThemedText>
      </ThemedView>
    );
  }

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
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol size={24} name="chevron.left" color={colors.text} />
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.headerTitle}>
            {profile.name}
          </ThemedText>
          <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
            <IconSymbol size={24} name="ellipsis" color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Information */}
        <View style={styles.profileSection}>
          {/* Profile Photo and Main Stats */}
          <View style={styles.profileTop}>
            <View style={styles.profileImageContainer}>
              {profile.profileImage ? (
                <Image
                  source={{ uri: profile.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View
                  style={[
                    styles.profileImagePlaceholder,
                    { backgroundColor: colors.tint },
                  ]}
                >
                  <ThemedText style={styles.profileImageText}>
                    {profile.name.charAt(0).toUpperCase()}
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Stats (Posts, Followers, Following) */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <ThemedText type="title" style={styles.statNumber}>
                  {profile.stats.posts}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Posts</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText type="title" style={styles.statNumber}>
                  {profile.stats.followers}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Followers</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText type="title" style={styles.statNumber}>
                  {profile.stats.following}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Following</ThemedText>
              </View>
            </View>
          </View>

          {/* Name and Bio */}
          <View style={styles.profileInfo}>
            <ThemedText type="subtitle" style={styles.profileName}>
              {profile.name}
            </ThemedText>
            {profile.bio && (
              <ThemedText style={styles.profileBio}>{profile.bio}</ThemedText>
            )}
          </View>

          {/* Workout Stats and Rank */}
          <View
            style={[
              styles.workoutStatsCard,
              { backgroundColor: colors.card, borderColor: colors.cardBorder },
              isDark && Shadows.card,
            ]}
          >
            <View style={styles.workoutStatsRow}>
              <View style={styles.workoutStatItem}>
                <View
                  style={[
                    styles.workoutStatIcon,
                    { backgroundColor: colors.tint + '20' },
                  ]}
                >
                  <IconSymbol
                    size={20}
                    name="dumbbell.fill"
                    color={colors.tint}
                  />
                </View>
                <View style={styles.workoutStatInfo}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.workoutStatNumber}
                  >
                    {profile.stats.workoutsCompleted}
                  </ThemedText>
                  <ThemedText style={styles.workoutStatLabel}>
                    Workouts
                  </ThemedText>
                </View>
              </View>

              <View style={styles.workoutStatItem}>
                <View
                  style={[
                    styles.workoutStatIcon,
                    { backgroundColor: colors.success + '20' },
                  ]}
                >
                  <IconSymbol
                    size={20}
                    name="flame.fill"
                    color={colors.success}
                  />
                </View>
                <View style={styles.workoutStatInfo}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.workoutStatNumber}
                  >
                    {profile.stats.currentStreak}
                  </ThemedText>
                  <ThemedText style={styles.workoutStatLabel}>
                    Streak
                  </ThemedText>
                </View>
              </View>

              <View style={styles.workoutStatItem}>
                <View
                  style={[
                    styles.workoutStatIcon,
                    { backgroundColor: colors.warning + '20' },
                  ]}
                >
                  <IconSymbol
                    size={20}
                    name="star.fill"
                    color={colors.warning}
                  />
                </View>
                <View style={styles.workoutStatInfo}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.workoutStatNumber}
                  >
                    {profile.stats.totalPoints}
                  </ThemedText>
                  <ThemedText style={styles.workoutStatLabel}>
                    Points
                  </ThemedText>
                </View>
              </View>

              <View style={styles.workoutStatItem}>
                <View
                  style={[
                    styles.workoutStatIcon,
                    { backgroundColor: colors.info + '20' },
                  ]}
                >
                  <IconSymbol
                    size={20}
                    name="trophy.fill"
                    color={colors.info}
                  />
                </View>
                <View style={styles.workoutStatInfo}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.workoutStatNumber}
                  >
                    #{profile.stats.rankingPosition}
                  </ThemedText>
                  <ThemedText style={styles.workoutStatLabel}>Rank</ThemedText>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Seção Antes e Depois */}
        <View style={styles.beforeAfterSection}>
          <View style={styles.beforeAfterHeader}>
            <IconSymbol size={24} name="sparkles" color={colors.tint} />
            <ThemedText type="subtitle" style={styles.beforeAfterTitle}>
              My Transformation
            </ThemedText>
          </View>
          <View
            style={[
              styles.beforeAfterCard,
              { backgroundColor: colors.card, borderColor: colors.cardBorder },
              isDark && Shadows.card,
            ]}
          >
            <View style={styles.beforeAfterContainer}>
              {/* Before Photo */}
              <TouchableOpacity
                style={styles.beforeAfterImageContainer}
                onPress={async () => {
                  const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                  if (status !== 'granted') {
                    alert('We need permission to access your photos!');
                    return;
                  }
                  const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                  });
                  if (!result.canceled && result.assets[0]) {
                    setBeforeImage(result.assets[0].uri);
                  }
                }}
                activeOpacity={0.8}
              >
                {beforeImage ? (
                  <Image
                    source={{ uri: beforeImage }}
                    style={styles.beforeAfterImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={[
                      styles.beforeAfterPlaceholder,
                      { backgroundColor: colors.cardBorder },
                    ]}
                  >
                    <IconSymbol
                      size={40}
                      name="camera.fill"
                      color={colors.icon}
                    />
                    <ThemedText style={styles.beforeAfterPlaceholderText}>
                      Before
                    </ThemedText>
                  </View>
                )}
                {beforeImage && (
                  <View style={styles.beforeAfterLabel}>
                    <ThemedText style={styles.beforeAfterLabelText}>
                      BEFORE
                    </ThemedText>
                  </View>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.beforeAfterDivider}>
                <View
                  style={[
                    styles.beforeAfterDividerLine,
                    { backgroundColor: colors.cardBorder },
                  ]}
                />
                <View
                  style={[
                    styles.beforeAfterDividerIcon,
                    { backgroundColor: colors.tint },
                  ]}
                >
                  <IconSymbol size={20} name="arrow.right" color="#FFFFFF" />
                </View>
                <View
                  style={[
                    styles.beforeAfterDividerLine,
                    { backgroundColor: colors.cardBorder },
                  ]}
                />
              </View>

              {/* After Photo */}
              <TouchableOpacity
                style={styles.beforeAfterImageContainer}
                onPress={async () => {
                  const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                  if (status !== 'granted') {
                    alert('We need permission to access your photos!');
                    return;
                  }
                  const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                  });
                  if (!result.canceled && result.assets[0]) {
                    setAfterImage(result.assets[0].uri);
                  }
                }}
                activeOpacity={0.8}
              >
                {afterImage ? (
                  <Image
                    source={{ uri: afterImage }}
                    style={styles.beforeAfterImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={[
                      styles.beforeAfterPlaceholder,
                      { backgroundColor: colors.cardBorder },
                    ]}
                  >
                    <IconSymbol
                      size={40}
                      name="camera.fill"
                      color={colors.icon}
                    />
                    <ThemedText style={styles.beforeAfterPlaceholderText}>
                      After
                    </ThemedText>
                  </View>
                )}
                {afterImage && (
                  <View style={styles.beforeAfterLabel}>
                    <ThemedText style={styles.beforeAfterLabelText}>
                      AFTER
                    </ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {(!beforeImage || !afterImage) && (
              <ThemedText style={styles.beforeAfterHint}>
                Tap on images to add your transformation photos
              </ThemedText>
            )}
          </View>
        </View>

        {/* Tabs (Posts / Workouts) */}
        <View
          style={[
            styles.tabsContainer,
            { borderBottomColor: colors.cardBorder },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'posts' && {
                borderBottomColor: colors.tint,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setSelectedTab('posts')}
            activeOpacity={0.7}
          >
            <IconSymbol
              size={20}
              name={selectedTab === 'posts' ? 'grid.fill' : 'grid'}
              color={selectedTab === 'posts' ? colors.tint : colors.icon}
            />
            <ThemedText
              style={[
                styles.tabText,
                selectedTab === 'posts' && {
                  color: colors.tint,
                  fontWeight: '600',
                },
              ]}
            >
              Posts
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'treinos' && {
                borderBottomColor: colors.tint,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setSelectedTab('treinos')}
            activeOpacity={0.7}
          >
            <IconSymbol
              size={20}
              name={selectedTab === 'treinos' ? 'dumbbell.fill' : 'dumbbell'}
              color={selectedTab === 'treinos' ? colors.tint : colors.icon}
            />
            <ThemedText
              style={[
                styles.tabText,
                selectedTab === 'treinos' && {
                  color: colors.tint,
                  fontWeight: '600',
                },
              ]}
            >
              Workouts
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Selected tab content */}
        {selectedTab === 'posts' ? (
          <View style={styles.postsGrid}>
            {posts.map((post) => (
              <TouchableOpacity
                key={post.id}
                style={styles.postItem}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: '/post-detalhes',
                    params: { postId: post.id, userName: profile.name },
                  } as any)
                }
              >
                {post.image ? (
                  <Image
                    source={{ uri: post.image }}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={[
                      styles.postImagePlaceholder,
                      { backgroundColor: colors.cardBorder },
                    ]}
                  >
                    <IconSymbol size={32} name="photo" color={colors.icon} />
                  </View>
                )}
                <View style={styles.postOverlay}>
                  <View style={styles.postOverlayStats}>
                    <IconSymbol size={16} name="heart.fill" color="#FFFFFF" />
                    <ThemedText
                      style={[styles.postOverlayText, { color: '#FFFFFF' }]}
                    >
                      {post.likes}
                    </ThemedText>
                  </View>
                  <View style={styles.postOverlayStats}>
                    <IconSymbol
                      size={16}
                      name="bubble.left.fill"
                      color="#FFFFFF"
                    />
                    <ThemedText
                      style={[styles.postOverlayText, { color: '#FFFFFF' }]}
                    >
                      {post.comments}
                    </ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.workoutsList}>
            {workoutStats.map((workout) => (
              <View
                key={workout.id}
                style={[
                  styles.workoutCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.cardBorder,
                  },
                  isDark && Shadows.card,
                ]}
              >
                <View style={styles.workoutCardHeader}>
                  <View
                    style={[
                      styles.workoutTypeIcon,
                      { backgroundColor: colors.tint + '20' },
                    ]}
                  >
                    <IconSymbol
                      size={24}
                      name="dumbbell.fill"
                      color={colors.tint}
                    />
                  </View>
                  <View style={styles.workoutCardInfo}>
                    <ThemedText
                      type="defaultSemiBold"
                      style={styles.workoutType}
                    >
                      {workout.type}
                    </ThemedText>
                    <ThemedText style={styles.workoutDate}>
                      {workout.date}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.workoutCardFooter}>
                  <View style={styles.workoutCardStat}>
                    <IconSymbol
                      size={16}
                      name="clock.fill"
                      color={colors.icon}
                    />
                    <ThemedText style={styles.workoutCardStatText}>
                      {workout.duration} min
                    </ThemedText>
                  </View>
                  <View style={styles.workoutCardStat}>
                    <IconSymbol
                      size={16}
                      name="star.fill"
                      color={colors.tint}
                    />
                    <ThemedText
                      style={[
                        styles.workoutCardStatText,
                        { color: colors.tint },
                      ]}
                    >
                      +{workout.points} points
                    </ThemedText>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Sign out button */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
            },
          ]}
          onPress={() => logout()}
          activeOpacity={0.7}
        >
          <IconSymbol
            size={22}
            name="rectangle.portrait.and.arrow.right"
            color={colors.error}
          />
          <ThemedText style={[styles.logoutText, { color: colors.error }]}>
            Sign out
          </ThemedText>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#FF6B35',
  },
  profileImagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF6B35',
  },
  profileImageText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    opacity: 0.7,
    fontWeight: '500',
  },
  profileInfo: {
    marginBottom: 20,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  profileBio: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    fontWeight: '500',
  },
  workoutStatsCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginTop: 12,
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
  workoutStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutStatItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  workoutStatIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  workoutStatInfo: {
    alignItems: 'center',
  },
  workoutStatNumber: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  workoutStatLabel: {
    fontSize: 11,
    opacity: 0.7,
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: GRID_PADDING,
    gap: GRID_GAP,
  },
  postItem: {
    width: POST_SIZE,
    height: POST_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  postOverlayStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postOverlayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  workoutsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  workoutCard: {
    borderRadius: 16,
    padding: 16,
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
  workoutCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workoutCardInfo: {
    flex: 1,
  },
  workoutType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 13,
    opacity: 0.7,
    fontWeight: '500',
  },
  workoutCardFooter: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  workoutCardStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  workoutCardStatText: {
    fontSize: 14,
    fontWeight: '500',
  },
  beforeAfterSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  beforeAfterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  beforeAfterTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  beforeAfterCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  beforeAfterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  beforeAfterImageContainer: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  beforeAfterImage: {
    width: '100%',
    height: '100%',
  },
  beforeAfterPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  beforeAfterPlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.7,
  },
  beforeAfterLabel: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  beforeAfterLabelText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  beforeAfterDivider: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  beforeAfterDividerLine: {
    width: 1,
    height: 20,
  },
  beforeAfterDividerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  beforeAfterHint: {
    marginTop: 12,
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
